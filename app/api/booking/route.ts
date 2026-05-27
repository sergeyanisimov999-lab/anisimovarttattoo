// app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = ((formData.get("name") as string) || "").trim();
    const phone = ((formData.get("phone") as string) || "").trim();
    const description = (((formData.get("description") || formData.get("notes")) as string) || "").trim();
    const file = formData.get("attachment") as File | null;

    // ---------- 1. Локальное сохранение (только если НЕ Vercel) ----------
    if (!process.env.VERCEL) {
      const baseDir = path.join(process.cwd(), "booking_submissions");
      const now = new Date().toISOString().replace(/[:.]/g, "-");

      await fs.mkdir(baseDir, { recursive: true });

      // Сохраняем JSON с текстовыми полями
      const jsonPath = path.join(baseDir, `request-${now}.json`);
      await fs.writeFile(
        jsonPath,
        JSON.stringify(
          {
            createdAt: new Date().toISOString(),
            name,
            phone,
            description,
          },
          null,
          2
        ),
        "utf-8"
      );

      // Сохраняем файл, если есть
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const safeName = file.name || "attachment";
        const filePath = path.join(baseDir, `${now}-${safeName}`);
        await fs.writeFile(filePath, buffer);
      }
    }

    // ---------- 2. Подготовка Telegram ----------
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const mainId = process.env.TELEGRAM_CHAT_ID_MAIN;
    const secondId = process.env.TELEGRAM_CHAT_ID_SECOND;

    const chatIds = [mainId, secondId].filter(Boolean) as string[];

    if (!token || chatIds.length === 0) {
      console.error("Telegram env missing", {
        hasToken: !!token,
        chatIds,
      });
      return NextResponse.json(
        { ok: false, error: "Telegram env vars missing" },
        { status: 500 }
      );
    }

    const apiBase = `https://api.telegram.org/bot${token}`;

    const textLines = [
      "✨ Новый заказ тату",
      "",
      `👤 Имя: ${name || "не указано"}`,
      `📞 Телефон: ${phone || "не указан"}`,
      "",
      `💬 Пожелания: ${description || "не указаны"}`,
    ];
    const text = textLines.join("\n");

    // ---------- 3. Готовим файл для Телеги, если есть ----------
    let fileBlob: Blob | null = null;
    let fileFilename = "attachment.jpg";

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      fileBlob = new Blob([arrayBuffer], {
        type: file.type || "application/octet-stream",
      });
      fileFilename = file.name || fileFilename;
    }

    // ---------- 4. Отправка в Telegram ----------
    await Promise.all(
      chatIds.map(async (chatId) => {
        // Сначала текст
        const msgResp = await fetch(`${apiBase}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        });

        const msgData = await msgResp.json();
        if (!msgData.ok) {
          console.error("Telegram sendMessage error", chatId, msgData);
        }

        // Потом фото, если есть
        if (fileBlob) {
          const fd = new FormData();
          fd.append("chat_id", chatId);
          fd.append("photo", fileBlob, fileFilename);

          const photoResp = await fetch(`${apiBase}/sendPhoto`, {
            method: "POST",
            body: fd,
          });

          const photoData = await photoResp.json();
          if (!photoData.ok) {
            console.error("Telegram sendPhoto error", chatId, photoData);
          }
        }
      })
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Ошибка в /api/booking:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
