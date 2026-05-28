import type { Metadata } from "next";
import Link from "next/link";
import ReviewForm from "./ReviewForm";

export const metadata: Metadata = {
  title: "Отзывы клиентов о тату-мастере Сергее Анисимове в Перово",
  description:
    "Отзывы клиентов Anisimov Art Tattoo. Реальные тату-сеансы в Москве, Перово / ВАО. Оставьте отзыв после сеанса на ручную проверку.",
  alternates: {
    canonical: "/reviews",
  },
};

const approvedReviews: Array<{
  name: string;
  date: string;
  work?: string;
  text: string;
}> = [];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-10">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.7em] text-zinc-500 sm:text-sm">
            ANISIMOVARTTATTOO
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-wide sm:text-4xl">
            Отзывы клиентов
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Здесь будут опубликованы только отзывы реальных клиентов после
            проверки мастером. Без купленных оценок и автоматической публикации.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="approved-reviews">
          <h2 id="approved-reviews" className="text-2xl font-semibold tracking-wide">
            Подтверждённые отзывы
          </h2>

          {approvedReviews.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6">
              <p className="text-sm leading-relaxed text-zinc-400">
                Мы только начинаем собирать отзывы прямо на сайте. До появления
                первых подтверждённых отзывов можно посмотреть существующую
                историю работ и комментарии клиентов на Профи.ру.
              </p>
              <a
                href="https://profi.ru/profile/AnisimovSV6/#reviews-tab"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-zinc-600 px-5 py-2.5 text-sm text-zinc-100 transition hover:border-zinc-300"
              >
                Смотреть отзывы на Профи.ру
              </a>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {approvedReviews.map((review) => (
                <article
                  key={`${review.name}-${review.date}-${review.text}`}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6"
                >
                  <p className="text-base font-medium text-zinc-100">{review.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {review.date}
                    {review.work ? ` · ${review.work}` : ""}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">{review.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 border-t border-zinc-900 pt-10" aria-labelledby="send-review">
          <h2 id="send-review" className="text-2xl font-semibold tracking-wide">
            Оставить отзыв после сеанса
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Были на сеансе у Сергея? Расскажите, что делали и как прошёл опыт.
            Отзыв сначала поступит мастеру на проверку и только затем может быть
            опубликован на этой странице.
          </p>
          <ReviewForm />
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-100 transition hover:border-zinc-300"
          >
            На главную
          </Link>
          <Link
            href="/booking"
            className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white"
          >
            Записаться на сеанс
          </Link>
        </div>
      </div>
    </main>
  );
}
