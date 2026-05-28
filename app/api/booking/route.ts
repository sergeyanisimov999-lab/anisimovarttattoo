import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

function clean(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    if (clean(formData.get("company"), 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(formData.get("name"), 80);
    const phone = clean(formData.get("phone"), 30);
    const projectType = clean(formData.get("projectType"), 100);
    const bodyArea = clean(formData.get("bodyArea"), 100);
    const approxSize = clean(formData.get("approxSize"), 100);
    const budget = clean(formData.get("budget"), 100);
    const multipleSessions = clean(formData.get("multipleSessions"), 120);
    const description = clean(formData.get("description") || formData.get("notes"), 2000);
    const dataConsent = formData.get("dataConsent") === "yes";
    const file = formData.get("attachment") as File | null;

    if (
      !name ||
      !phone ||
      !projectType ||
      !bodyArea ||
      !approxSize ||
      !budget ||
      !multipleSessions ||
      !description ||
      !dataConsent
    ) {
      return NextResponse.json({ ok: false, error: "Invalid booking form" }, { status: 400 });
    }

    if (file && file.size > 0) {
      const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
      if (!acceptedTypes.has(file.type) || file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ ok: false, error: "Unsupported attachment" }, { status: 400 });
      }
    }

    if (!process.env.VERCEL) {
      const baseDir = path.join(process.cwd(), "booking_submissions");
      const now = new Date().toISOString().replace(/[:.]/g, "-");

      await fs.mkdir(baseDir, { recursive: true });
      await fs.writeFile(
        path.join(baseDir, `request-${now}.json`),
        JSON.stringify(
          {
            createdAt: new Date().toISOString(),
            name,
            phone,
            projectType,
            bodyArea,
            approxSize,
            budget,
            multipleSessions,
            description,
            dataConsent,
          },
          null,
          2
        ),
        "utf-8"
      );

      if (file && file.size > 0) {
        const safeName = (file.name || "attachment.jpg").replace(/[^\p{L}\p{N}._-]+/gu, "_");
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(path.join(baseDir, `${now}-${safeName}`), buffer);
      }
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = [
      process.env.TELEGRAM_CHAT_ID_MAIN,
      process.env.TELEGRAM_CHAT_ID_SECOND,
    ].filter(Boolean) as string[];

    if (!token || chatIds.length === 0) {
      console.error("Telegram env missing for booking form");
      return NextResponse.json({ ok: false, error: "Notification unavailable" }, { status: 500 });
    }

    const text = [
      "✨ Новая заявка на тату",
      "",
      `👤 Имя: ${name}`,
      `📞 Телефон: ${phone}`,
      `🎨 Тип работы: ${projectType}`,
      `📍 Зона: ${bodyArea}`,
      `📐 Размер: ${approxSize}`,
      `💰 Бюджет: ${budget}`,
      `🗓 Несколько сеансов: ${multipleSessions}`,
      "",
      `💬 Идея: ${description}`,
      "",
      "✅ Согласие на обработку данных: да",
    ].join("\n");

    const apiBase = `https://api.telegram.org/bot${token}`;

    let fileBlob: Blob | null = null;
    let fileName = "attachment.jpg";
    if (file && file.size > 0) {
      fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
      fileName = file.name || fileName;
    }

    const deliveryResults = await Promise.all(
      chatIds.map(async (chatId) => {
        const messageResponse = await fetch(`${apiBase}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        const messageResult = await messageResponse.json();

        if (!messageResult.ok) return false;

        if (fileBlob) {
          const upload = new FormData();
          upload.append("chat_id", chatId);
          upload.append("photo", fileBlob, fileName);

          const photoResponse = await fetch(`${apiBase}/sendPhoto`, {
            method: "POST",
            body: upload,
          });
          const photoResult = await photoResponse.json();
          if (!photoResult.ok) return false;
        }

        return true;
      })
    );

    if (deliveryResults.some((delivered) => !delivered)) {
      return NextResponse.json({ ok: false, error: "Telegram notification failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка в /api/booking:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
