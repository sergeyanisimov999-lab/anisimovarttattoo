"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка отправки");

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none";

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.7em] text-zinc-500 sm:text-sm">
            ANISIMOVARTTATTOO
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-wide sm:text-3xl">
            Заявка на сеанс
          </h1>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base">
            Расскажите о проекте — так я сразу смогу оценить формат,
            количество сеансов и подойдём ли мы друг другу.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950/60 px-4 py-6 shadow-[0_0_50px_rgba(0,0,0,0.85)] sm:px-6 sm:py-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm text-zinc-300" htmlFor="booking-name">
                Имя
              </label>
              <input id="booking-name" name="name" maxLength={80} required placeholder="Как к вам обращаться" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm text-zinc-300" htmlFor="booking-phone">
                Телефон
              </label>
              <input id="booking-phone" type="tel" name="phone" maxLength={30} required placeholder="+7 ___ ___-__-__" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm text-zinc-300" htmlFor="project-type">
                Тип работы
              </label>
              <select id="project-type" name="projectType" required className={inputClass}>
                <option value="">Выберите вариант</option>
                <option value="Новая татуировка">Новая татуировка</option>
                <option value="Перекрытие / доработка">Перекрытие / доработка</option>
                <option value="Крупный проект / рукав">Крупный проект / рукав</option>
                <option value="Консультация по идее">Консультация по идее</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm text-zinc-300" htmlFor="body-area">
                Зона на теле
              </label>
              <input id="body-area" name="bodyArea" maxLength={100} required placeholder="Например: предплечье, плечо" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm text-zinc-300" htmlFor="approx-size">
                Примерный размер
              </label>
              <input id="approx-size" name="approxSize" maxLength={100} required placeholder="Например: 15×10 см или 1/2 рукава" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm text-zinc-300" htmlFor="budget">
                Ориентир по бюджету
              </label>
              <select id="budget" name="budget" required className={inputClass}>
                <option value="">Выберите диапазон</option>
                <option value="До 15 000 ₽">До 15 000 ₽</option>
                <option value="15 000–25 000 ₽">15 000–25 000 ₽</option>
                <option value="25 000–40 000 ₽">25 000–40 000 ₽</option>
                <option value="40 000 ₽ и выше">40 000 ₽ и выше</option>
                <option value="Нужно обсудить после оценки">Нужно обсудить после оценки</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm text-zinc-300" htmlFor="multiple-sessions">
              Если проект крупный, готовы к нескольким сеансам?
            </label>
            <select id="multiple-sessions" name="multipleSessions" required className={inputClass}>
              <option value="">Выберите вариант</option>
              <option value="Да, понимаю формат крупной работы">Да, понимаю формат крупной работы</option>
              <option value="Готов(а) обсудить">Готов(а) обсудить</option>
              <option value="Хочу уложиться в один сеанс">Хочу уложиться в один сеанс</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm text-zinc-300" htmlFor="booking-description">
              Идея и пожелания
            </label>
            <textarea
              id="booking-description"
              name="description"
              required
              maxLength={2000}
              rows={4}
              placeholder="Стиль, сюжет, что важно сохранить или перекрыть, желаемые сроки..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm text-zinc-300" htmlFor="attachment">
              Прикрепить фото / референс
              <span className="ml-1 text-xs text-zinc-500">(необязательно)</span>
            </label>
            <div className="rounded-2xl border border-zinc-700/80 bg-black px-3.5 py-2.5">
              <input
                id="attachment"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                name="attachment"
                className="block w-full text-xs text-zinc-300 file:mr-3 file:rounded-full file:border-0 file:bg-zinc-800 file:px-3 file:py-1.5 file:text-xs file:text-zinc-100 hover:file:bg-zinc-700 sm:text-sm"
              />
              <p className="mt-2 text-xs text-zinc-500">
                JPG, PNG или WEBP до 10 МБ: референс или фото зоны / старой работы.
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
            <input
              type="checkbox"
              name="dataConsent"
              value="yes"
              required
              className="mt-1 h-4 w-4 accent-zinc-100"
            />
            <span>
              Согласен(на) на обработку данных для рассмотрения заявки и связи со
              мной. Ознакомился(лась) с{" "}
              <Link className="text-zinc-200 underline underline-offset-4" href="/privacy">
                политикой конфиденциальности
              </Link>
              .
            </span>
          </label>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="booking-company">Компания</label>
            <input id="booking-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-zinc-100 py-2.5 text-sm font-medium tracking-wide text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Отправляю..." : "Отправить заявку"}
            </button>

            {status === "success" && (
              <p className="text-sm text-emerald-400">
                Заявка отправлена. Я свяжусь с вами после просмотра деталей.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Что-то пошло не так. Попробуйте ещё раз позже.
              </p>
            )}
          </div>
        </form>

        <div className="mt-6 flex justify-center gap-4 text-sm">
          <Link className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200" href="/">
            На главную
          </Link>
          <Link className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200" href="/privacy">
            Конфиденциальность
          </Link>
        </div>
      </div>
    </main>
  );
}
