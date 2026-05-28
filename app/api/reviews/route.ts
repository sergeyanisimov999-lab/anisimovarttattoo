import { NextRequest, NextResponse } from "next/server";

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

    const displayName = clean(formData.get("displayName"), 80);
    const sessionMonth = clean(formData.get("sessionMonth"), 20);
    const workType = clean(formData.get("workType"), 120);
    const reviewText = clean(formData.get("reviewText"), 1500);
    const publishConsent = formData.get("publishConsent") === "yes";
    const dataConsent = formData.get("dataConsent") === "yes";

    if (
      !displayName ||
      !sessionMonth ||
      reviewText.length < 20 ||
      !publishConsent ||
      !dataConsent
    ) {
      return NextResponse.json({ ok: false, error: "Invalid review form" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = [
      process.env.TELEGRAM_CHAT_ID_MAIN,
      process.env.TELEGRAM_CHAT_ID_SECOND,
    ].filter(Boolean) as string[];

    if (!token || chatIds.length === 0) {
      console.error("Telegram env missing for review form");
      return NextResponse.json({ ok: false, error: "Notification unavailable" }, { status: 500 });
    }

    const text = [
      "⭐ Новый отзыв на модерацию",
      "",
      `👤 Имя для публикации: ${displayName}`,
      `📅 Месяц сеанса: ${sessionMonth}`,
      `🎨 Что делали: ${workType || "не указано"}`,
      "",
      `💬 Отзыв: ${reviewText}`,
      "",
      "✅ Согласие на публикацию: да",
      "✅ Согласие на обработку данных: да",
      "",
      "Не публиковать автоматически — сначала подтвердить, что это реальный клиент.",
    ].join("\n");

    const apiBase = `https://api.telegram.org/bot${token}`;

    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        const response = await fetch(`${apiBase}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        const data = await response.json();
        return data.ok;
      })
    );

    if (results.some((result) => !result)) {
      return NextResponse.json({ ok: false, error: "Telegram notification failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка в /api/reviews:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
