"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Не удалось отправить отзыв");

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-7"
    >
      <div className="space-y-1.5">
        <label htmlFor="review-name" className="block text-sm text-zinc-300">
          Имя или как указать вас на сайте
        </label>
        <input
          id="review-name"
          name="displayName"
          maxLength={80}
          required
          placeholder="Например: Анна или Максим К."
          className="w-full rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="review-month" className="block text-sm text-zinc-300">
            Месяц сеанса
          </label>
          <input
            id="review-month"
            name="sessionMonth"
            type="month"
            required
            className="w-full rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5 text-sm text-zinc-100 focus:border-zinc-300 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="review-work" className="block text-sm text-zinc-300">
            Что делали
            <span className="ml-1 text-xs text-zinc-500">(необязательно)</span>
          </label>
          <input
            id="review-work"
            name="workType"
            maxLength={120}
            placeholder="Например: предплечье, black&grey"
            className="w-full rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="review-text" className="block text-sm text-zinc-300">
          Ваш отзыв
        </label>
        <textarea
          id="review-text"
          name="reviewText"
          required
          minLength={20}
          maxLength={1500}
          rows={5}
          placeholder="Как прошёл сеанс, понравился ли результат, как ощущалось общение с мастером..."
          className="w-full resize-none rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="review-company">Компания</label>
        <input id="review-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
        <input
          type="checkbox"
          name="publishConsent"
          value="yes"
          required
          className="mt-1 h-4 w-4 accent-zinc-100"
        />
        <span>
          Разрешаю опубликовать мой отзыв на сайте с указанным именем или
          псевдонимом и информацией о месяце сеанса.
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
        <input
          type="checkbox"
          name="dataConsent"
          value="yes"
          required
          className="mt-1 h-4 w-4 accent-zinc-100"
        />
        <span>
          Согласен(на) на обработку переданных данных для проверки и публикации
          отзыва. Ознакомился(лась) с{" "}
          <Link className="text-zinc-200 underline underline-offset-4" href="/privacy">
            политикой конфиденциальности
          </Link>
          .
        </span>
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-zinc-100 py-2.5 text-sm font-medium text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Отправляю..." : "Отправить отзыв на проверку"}
        </button>

        {status === "success" && (
          <p className="mt-3 text-sm text-emerald-400">
            Спасибо! Отзыв отправлен на проверку и появится на сайте после подтверждения.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">
            Отзыв не удалось отправить. Попробуйте ещё раз позже.
          </p>
        )}
      </div>
    </form>
  );
}
