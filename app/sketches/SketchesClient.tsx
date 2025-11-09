// app/sketches/SketchesClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SketchesClientProps = {
  images: string[];
};

export default function SketchesClient({ images }: SketchesClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hasImages = images.length > 0;

  const openModal = (index: number) => {
    setActiveIndex(index);
  };

  const closeModal = () => {
    setActiveIndex(null);
  };

  const showPrev = () => {
    if (!hasImages || activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  };

  const showNext = () => {
    if (!hasImages || activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        {/* Логотип + бренд по центру */}
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <img
            src="/logo/anisimovarttattoo-logo.png"
            alt="Логотип Anisimovarttattoo"
            className="h-20 sm:h-24 md:h-32 w-auto mb-4"
          />
          <p className="text-lg sm:text-2xl md:text-3xl tracking-[0.7em] uppercase text-zinc-500 text-center">
            ANISIMOVARTTATTOO
          </p>
        </div>

        {/* Заголовок + кнопка "На главную" */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="text-center sm:text-left space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
              Эскизы месяца −30%
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              Ограниченный набор эскизов с акционной ценой. Каждый дизайн можно
              адаптировать под анатомию и масштаб.
            </p>
          </div>

          <Link
            href="/"
            className="self-center sm:self-auto rounded-full border border-zinc-700 px-5 py-2 text-xs sm:text-sm font-medium tracking-wide
                       text-zinc-100 bg-black hover:border-zinc-300 hover:text-zinc-50 hover:bg-zinc-900 transition"
          >
            На главную
          </Link>
        </header>

        {/* Сетка эскизов */}
        {hasImages ? (
          <section className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => openModal(index)}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-black to-zinc-950/80
                           hover:border-zinc-500/80 hover:shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all duration-300"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={src}
                    alt={`Эскиз ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                <div className="flex items-center justify-between px-4 py-3 text-xs sm:text-sm text-zinc-300">
                  <span>Эскиз #{index + 1}</span>
                  <span className="text-emerald-400/90">−30%</span>
                </div>
              </button>
            ))}
          </section>
        ) : (
          <p className="text-center text-zinc-500">
            Пока здесь нет эскизов. Скоро появится новая подборка.
          </p>
        )}

        {/* Модальное окно просмотра эскиза */}
        {activeIndex !== null && hasImages && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-3xl mx-4 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-black to-zinc-950/90
                         shadow-[0_0_60px_rgba(0,0,0,0.95)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 text-xs sm:text-sm text-zinc-400">
                <span>Просмотр эскиза #{activeIndex + 1}</span>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-[11px] sm:text-xs hover:border-zinc-300 hover:text-zinc-50 transition"
                >
                  Закрыть
                </button>
              </div>

              <div className="relative px-4 pb-6 pt-4 sm:px-6">
                <div className="relative mx-auto max-w-[90%] md:max-w-[80%]">
                  <div className="relative w-full">
                    {/* Стрелка влево */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showPrev();
                      }}
                      className="absolute left-[-32px] top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full
                                 border border-zinc-700 bg-black/60 hover:border-zinc-300 hover:bg-black/90 transition"
                    >
                      <span className="text-sm text-zinc-200">◀</span>
                    </button>

                    {/* Картинка */}
                    <div className="relative aspect-[3/4] max-h-[90vh]">
                      <Image
                        src={images[activeIndex]}
                        alt={`Эскиз ${activeIndex + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Стрелка вправо */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showNext();
                      }}
                      className="absolute right-[-32px] top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full
                                 border border-zinc-700 bg-black/60 hover:border-zinc-300 hover:bg-black/90 transition"
                    >
                      <span className="text-sm text-zinc-200">▶</span>
                    </button>
                  </div>
                </div>

                {/* Подпись под эскизом */}
                <p className="mt-4 text-center text-xs sm:text-sm text-zinc-400">
                  Эскиз #{activeIndex + 1}. Композиция может быть адаптирована
                  под ваш участок тела и масштаб.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
