// app/booking/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Ошибка");

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-xl mx-auto px-4 pt-10 pb-16">
        {/* Верхний заголовок */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm tracking-[0.7em] uppercase text-zinc-500">
            ANISIMOVARTTATTOO
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-wide">
            Заявка на сеанс
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Коротко расскажи о желаемой тату, оставь контакт и при желании
            прикрепи эскиз или референс. Я отвечу с вариантами по эскизу и дате.
          </p>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950/60 px-4 sm:px-6 py-6 sm:py-7 shadow-[0_0_50px_rgba(0,0,0,0.85)]"
        >
          {/* Имя */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm text-zinc-300">
              Имя
            </label>
            <input
              name="name"
              required
              placeholder="Как к тебе обращаться"
              className="w-full rounded-2xl bg-black border border-zinc-700/80 px-3.5 py-2.5 text-sm
                         text-zinc-100 placeholder:text-zinc-500
                         focus:outline-none focus:border-zinc-300 focus:ring-0"
            />
          </div>

          {/* Телефон */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm text-zinc-300">
              Номер телефона
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+7 ___ ___-__-__"
              className="w-full rounded-2xl bg-black border border-zinc-700/80 px-3.5 py-2.5 text-sm
                         text-zinc-100 placeholder:text-zinc-500
                         focus:outline-none focus:border-zinc-300 focus:ring-0"
            />
          </div>

          {/* Пожелания */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm text-zinc-300">
              Кратко о желаемой тату
            </label>
            <textarea
              name="notes"
              required
              rows={4}
              placeholder="Зона на теле, стиль, примерный размер, важные детали..."
              className="w-full rounded-2xl bg-black border border-zinc-700/80 px-3.5 py-2.5 text-sm
                         text-zinc-100 placeholder:text-zinc-500
                         focus:outline-none focus:border-zinc-300 focus:ring-0 resize-none"
            />
          </div>

          {/* Файл */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm text-zinc-300">
              Прикрепить файл (эскиз / реф / фото)
              <span className="text-zinc-500 text-[11px] sm:text-xs ml-1">
                (необязательно)
              </span>
            </label>
            <div className="rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5 text-sm text-zinc-300">
              <input
                type="file"
                name="attachment"
                className="block w-full text-xs sm:text-sm text-zinc-300 file:mr-3 file:rounded-full file:border-0 file:bg-zinc-800 file:px-3 file:py-1.5 file:text-xs file:text-zinc-100 hover:file:bg-zinc-700"
              />
              <p className="mt-1 text-[11px] sm:text-xs text-zinc-500">
                Можно приложить эскиз, референсы или фото зоны на теле.
              </p>
            </div>
          </div>

          {/* Кнопка + статус */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-zinc-100 text-black py-2.5 text-sm font-medium tracking-wide
                         hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Отправляю..." : "Отправить запрос"}
            </button>

            {status === "success" && (
              <p className="text-[11px] sm:text-xs text-emerald-400">
                Заявка сохранена и отправлена. Я свяжусь с тобой, как только
                посмотрю детали.
              </p>
            )}
            {status === "error" && (
              <p className="text-[11px] sm:text-xs text-red-400">
                Что-то пошло не так. Попробуй ещё раз позже.
              </p>
            )}
          </div>
        </form>

        {/* Назад на главную */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-200 underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
}
