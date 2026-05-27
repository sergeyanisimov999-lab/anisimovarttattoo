// app/gallery/GalleryClient.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description?: string;
  featured?: boolean;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

const DEFAULT_ZOOM = 0.9;

const GalleryClient: React.FC<GalleryClientProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
  const touchStartXRef = useRef<number | null>(null);

  const selectedImage = activeIndex !== null ? images[activeIndex] : null;
  const featuredIndex = images.findIndex((image) => image.featured);
  const featuredImage = featuredIndex >= 0 ? images[featuredIndex] : null;
  const gridImages = images
    .map((image, index) => ({ image, index }))
    .filter(({ image }) => !image.featured);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setZoom(DEFAULT_ZOOM);
  };

  const handleClose = () => {
    setActiveIndex(null);
    setZoom(DEFAULT_ZOOM);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(e.target.value));
  };

  const showNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return Math.min(prev + 1, images.length - 1);
    });
    setZoom(DEFAULT_ZOOM);
  };

  const showPrev = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return Math.max(prev - 1, 0);
    });
    setZoom(DEFAULT_ZOOM);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - touchStartXRef.current;
    const threshold = 50;

    if (deltaX > threshold) showPrev();
    if (deltaX < -threshold) showNext();

    touchStartXRef.current = null;
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = selectedImage ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedImage]);

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        <header className="mb-10 text-center">
          <p className="text-lg sm:text-2xl md:text-3xl tracking-[0.7em] uppercase text-zinc-500">
            ANISIMOVARTTATTOO
          </p>
          <h1 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-wide">
            Портфолио тату-мастера Сергея Анисимова
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Художественные татуировки, black&amp;grey-графика и крупные
            композиции. Москва, Перово / ВАО.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center text-xs sm:text-sm rounded-full border border-zinc-700 px-4 py-1.5 hover:border-zinc-300 hover:text-zinc-50 transition"
            >
              На главную
            </a>
            <a
              href="/booking"
              className="inline-flex items-center text-xs sm:text-sm rounded-full border border-zinc-500 bg-zinc-100 text-black px-4 py-1.5 hover:bg-white transition"
            >
              Записаться
            </a>
          </div>
        </header>

        {featuredImage && (
          <section className="mb-12" aria-labelledby="featured-work-title">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(240px,2fr)] items-center">
              <button
                type="button"
                onClick={() => handleOpen(featuredIndex)}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60"
              >
                <img
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  className="w-full max-h-[760px] object-contain bg-black group-hover:scale-[1.01] transition-transform duration-300"
                />
              </button>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Витринная работа
                </p>
                <h2 id="featured-work-title" className="text-xl sm:text-2xl font-medium tracking-wide">
                  {featuredImage.title}
                </h2>
                {featuredImage.description && (
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                    {featuredImage.description}
                  </p>
                )}
                <p className="text-sm text-zinc-500">
                  Приём в Москве, район Перово. Запись и обсуждение проекта —
                  через форму или по телефону.
                </p>
              </div>
            </div>
          </section>
        )}

        <section aria-label="Галерея работ">
          {images.length === 0 ? (
            <p className="text-sm text-zinc-500">
              В галерее пока нет изображений.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {gridImages.map(({ image, index }) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => handleOpen(index)}
                  aria-label={image.title}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-950/60 hover:border-zinc-300/80 transition"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <p className="mt-6 text-[11px] text-zinc-500 max-w-md">
          Цвет и контраст на фото могут отличаться от живой кожи из-за
          освещения и обработки. Зажившие результаты можно обсудить перед
          записью.
        </p>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-black rounded-none sm:rounded-3xl border border-zinc-700/80 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-zinc-800 text-xs sm:text-sm flex-none">
              <span className="text-zinc-300 tracking-wide">
                {selectedImage.title}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-zinc-600 px-3 py-1 text-[11px] hover:border-zinc-300 hover:text-zinc-50 transition"
              >
                Закрыть
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              {activeIndex !== null && activeIndex > 0 && (
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Предыдущая работа"
                  className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-zinc-600/70 hover:bg-black/90 hover:border-zinc-300 transition z-10"
                >
                  <span className="inline-block border-y-[6px] border-y-transparent border-r-[8px] border-r-zinc-400 mr-[1px]" />
                </button>
              )}

              <div
                className="scroll-area relative w-full h-full overflow-auto flex items-center justify-center px-3 sm:px-4 py-3 sm:py-4"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  style={{ transform: `scale(${zoom})` }}
                  className="max-h-[80vh] w-auto max-w-full object-contain transition-transform duration-200"
                />
              </div>

              {activeIndex !== null && activeIndex < images.length - 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Следующая работа"
                  className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-zinc-600/70 hover:bg-black/90 hover:border-zinc-300 transition z-10"
                >
                  <span className="inline-block border-y-[6px] border-y-transparent border-l-[8px] border-l-zinc-400 ml-[1px]" />
                </button>
              )}
            </div>

            {selectedImage.description && (
              <p className="px-4 pb-3 text-xs text-zinc-400 flex-none">
                {selectedImage.description}
              </p>
            )}

            <div className="px-4 pb-4 pt-2 border-t border-zinc-800 flex-none sm:hidden">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="uppercase tracking-[0.18em] text-zinc-500">
                  Масштаб
                </span>
                <span className="text-zinc-200">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={zoom}
                onChange={handleZoomChange}
                className="w-full accent-zinc-200"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryClient;
