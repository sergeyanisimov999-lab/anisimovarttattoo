// app/reviews/page.tsx
import React from "react";

const ReviewsPage = () => {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-16">
        {/* Хедер */}
        <header className="mb-10 text-center">
          <p className="text-xs sm:text-sm tracking-[0.7em] uppercase text-zinc-500">
            ANISIMOVARTTATTOO
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
            Отзывы и рейтинг
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Основные отзывы и рейтинг по моей работе находятся на Профи.ру.
            Там — живые комментарии клиентов, реальная статистика и долгосрочные
            результаты по выполненным тату-сеансам.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="https://profi.ru/profile/AnisimovSV6/#reviews-tab"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-600 bg-zinc-900/60 px-6 py-2.5 text-xs sm:text-sm tracking-wide uppercase hover:border-zinc-200 hover:text-zinc-50 hover:bg-zinc-900 transition"
            >
              Смотреть отзывы и рейтинг на Профи.ру
            </a>
            <p className="text-[11px] sm:text-xs text-zinc-500">
              Ссылка откроется в новой вкладке. Там можно посмотреть подробные
              отзывы, оценки и историю выполненных заказов.
            </p>
          </div>
        </header>

        <div className="mt-10 flex justify-center">
          <a
            href="/"
            className="text-xs sm:text-sm rounded-full border border-zinc-700 px-4 py-1.5 hover:border-zinc-300 hover:text-zinc-50 transition"
          >
            На главную
          </a>
        </div>
      </div>
    </main>
  );
};

export default ReviewsPage;
