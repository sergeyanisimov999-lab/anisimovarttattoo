// app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID_MAIN = process.env.TELEGRAM_CHAT_ID_MAIN;
const CHAT_ID_SECOND = process.env.TELEGRAM_CHAT_ID_SECOND;

// Папка для сохранения заявок и файлов
const submissionsDir = path.join(process.cwd(), "booking_submissions");

if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const attachment = formData.get("attachment") as File | null;

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    let savedFileName: string | null = null;

    // 1) Сохраняем файл, если он есть
    if (attachment && attachment.size > 0) {
      const origName = attachment.name || "attachment";
      const safeName = origName.replace(/[^\w.\-а-яА-Я]/g, "_");
      const fileName = `file-${timestamp}-${safeName}`;
      const filePath = path.join(submissionsDir, fileName);

      const bytes = Buffer.from(await attachment.arrayBuffer());
      fs.writeFileSync(filePath, bytes);

      savedFileName = fileName;
    }

    // 2) Сохраняем JSON с заявкой
    const jsonName = `request-${timestamp}.json`;
    const jsonPath = path.join(submissionsDir, jsonName);

    const payload = {
      timestamp,
      name,
      phone,
      notes,
      attachment: savedFileName,
    };

    fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf-8");

    // 3) Отправляем уведомление в Telegram
    if (!BOT_TOKEN || !CHAT_ID_MAIN || !CHAT_ID_SECOND) {
      console.warn(
        "TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID_* не заданы. Уведомление в Telegram не отправлено."
      );
    } else {
      const baseTextUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const baseFileUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;

      const textLines = [
        "🆕 <b>Новый заказ</b>",
        "",
        `<b>Имя:</b> ${name || "—"}`,
        `<b>Телефон:</b> ${phone || "—"}`,
        "",
        `<b>Описание:</b>`,
        notes || "—",
        "",
        savedFileName
          ? `<b>Файл:</b> сохранён в папке booking_submissions как <code>${savedFileName}</code>`
          : `<b>Файл:</b> не прикреплён`,
      ];

      const message = textLines.join("\n");

      // ---------- 3.1. Текст в оба аккаунта ----------
      const res1 = await fetch(baseTextUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID_MAIN,
          text: message,
          parse_mode: "HTML",
        }),
      });
      const data1 = await res1.json();
      console.log("Telegram MAIN response:", data1);

      const res2 = await fetch(baseTextUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID_SECOND,
          text: message,
          parse_mode: "HTML",
        }),
      });
      const data2 = await res2.json();
      console.log("Telegram SECOND response:", data2);

      // ---------- 3.2. Если есть файл — отправляем как документ ----------
      if (savedFileName) {
        const fullFilePath = path.join(submissionsDir, savedFileName);
        try {
          const fileBuffer = fs.readFileSync(fullFilePath);

          const caption = "📎 Приложенный файл к заявке";

          // Функция отправки документа в один чат
          const sendDocToChat = async (chatId: string | undefined) => {
            if (!chatId) return;

            const form = new FormData();
            form.append("chat_id", chatId);
            form.append("caption", caption);
            form.append("document", new Blob([fileBuffer]), savedFileName);

            const res = await fetch(baseFileUrl, {
              method: "POST",
              body: form as any,
            });

            const data = await res.json();
            console.log(`Telegram document response for chat ${chatId}:`, data);
          };

          await sendDocToChat(CHAT_ID_MAIN);
          await sendDocToChat(CHAT_ID_SECOND);
        } catch (fileErr) {
          console.error("Не удалось отправить файл в Telegram:", fileErr);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Ошибка в /api/booking:", e);
    return NextResponse.json(
      { ok: false, error: "Ошибка сервера при обработке заявки" },
      { status: 500 }
    );
  }
}
