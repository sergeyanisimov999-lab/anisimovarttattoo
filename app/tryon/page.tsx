// app/tryon/page.tsx
"use client";

import React, { useRef, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useTryOn } from "./TryOnContext";

const TryOnUploadPage = () => {
  const router = useRouter();
  const { setBodyPreview, setSketchPreview, bodyPreview, sketchPreview } =
    useTryOn();

  const bodyInputRef = useRef<HTMLInputElement | null>(null);
  const sketchInputRef = useRef<HTMLInputElement | null>(null);

  const [bodyFileName, setBodyFileName] = useState<string | null>(null);
  const [sketchFileName, setSketchFileName] = useState<string | null>(null);

  const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setBodyPreview(url);
    setBodyFileName(file.name);

    // при смене тела сбрасываем эскиз
    setSketchPreview(null);
    setSketchFileName(null);
    if (sketchInputRef.current) {
      sketchInputRef.current.value = "";
    }
  };

  const handleSketchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSketchPreview(url);
    setSketchFileName(file.name);
  };

  const canContinue = !!bodyPreview && !!sketchPreview;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10 lg:py-16">
        {/* Хедер */}
        <header className="flex items-center justify-between gap-4 mb-12">
  <div className="flex items-center gap-4">
    <img
      src="/logo/logo-dark.png"
      alt="Anisimovarttattoo"
      className="h-11 w-auto"
    />
    <div className="space-y-1">
      <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-zinc-500">
        ANISIMOVARTTATTOO
      </p>
      <p className="text-xs sm:text-sm text-zinc-400">
        Искусство, которое становится частью тебя
      </p>
    </div>
  </div>
</header>


        <section className="space-y-10">
          <div className="max-w-xl space-y-3">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
              Примерка тату онлайн
            </h1>
            <p className="text-sm text-zinc-400">
              Загрузите фото участка тела и эскиз. На следующем шаге вы сможете
              настроить масштаб, прозрачность и поворот татуировки.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Карточка тела */}
            <button
              type="button"
              onClick={() => bodyInputRef.current?.click()}
              className="group relative flex flex-col rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950/90 to-black/90 px-5 py-6 text-left shadow-[0_0_40px_rgba(0,0,0,0.85)] hover:border-zinc-300/80 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Ваше фото
                  </p>
                  <p className="text-sm text-zinc-300">
                    Участок тела для примерки
                  </p>
                </div>
                <span className="text-[11px] rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 group-hover:border-zinc-300">
                  Выбрать файл
                </span>
              </div>

              <div className="relative flex-1 flex items-center justify-center rounded-2xl border border-zinc-800/70 bg-zinc-950/80 overflow-hidden min-h-[180px]">
                {bodyPreview ? (
                  <img
                    src={bodyPreview}
                    alt="Фото тела"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <p className="text-xs text-zinc-500 text-center px-4">
                    Подойдёт обычное фото с хорошим освещением. Желательно без
                    сильного наклона и с видимой плоскостью кожи.
                  </p>
                )}
              </div>

              <p className="mt-3 text-[11px] text-zinc-500">
                {bodyFileName ? (
                  <>
                    Выбран файл:{" "}
                    <span className="text-zinc-200">{bodyFileName}</span>
                  </>
                ) : (
                  "Форматы: JPG, PNG. Лучше без сильной компрессии."
                )}
              </p>

              <input
                ref={bodyInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBodyChange}
              />
            </button>

            {/* Карточка эскиза */}
            <button
              type="button"
              disabled={!bodyPreview}
              onClick={() => bodyPreview && sketchInputRef.current?.click()}
              className={`group relative flex flex-col rounded-3xl border px-5 py-6 text-left shadow-[0_0_40px_rgba(0,0,0,0.85)] ${
                bodyPreview
                  ? "border-zinc-800/80 bg-gradient-to-b from-zinc-950/90 to-black/90 hover:border-zinc-300/80 transition"
                  : "border-zinc-800/60 bg-zinc-950/70 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Ваш эскиз
                  </p>
                  <p className="text-sm text-zinc-300">
                    Рисунок татуировки для примерки
                  </p>
                </div>
                <span className="text-[11px] rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 group-hover:border-zinc-300">
                  {bodyPreview ? "Выбрать файл" : "Сначала фото"}
                </span>
              </div>

              <div className="relative flex-1 flex items-center justify-center rounded-2xl border border-zinc-800/70 bg-zinc-950/80 overflow-hidden min-h-[180px]">
                {sketchPreview ? (
                  <img
                    src={sketchPreview}
                    alt="Эскиз"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <p className="text-xs text-zinc-500 text-center px-4">
                    Можно загрузить готовый эскиз или набросок. На следующем
                    шаге мы аккуратно положим его на кожу.
                  </p>
                )}
              </div>

              <p className="mt-3 text-[11px] text-zinc-500">
                {sketchFileName ? (
                  <>
                    Выбран файл:{" "}
                    <span className="text-zinc-200">{sketchFileName}</span>
                  </>
                ) : bodyPreview ? (
                  "Форматы: JPG, PNG. Желательно на нейтральном фоне."
                ) : (
                  "Эта карточка станет активной после выбора фото."
                )}
              </p>

              <input
                ref={sketchInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSketchChange}
              />
            </button>
          </div>

          {/* Кнопка перехода в workspace */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => router.push("/tryon/workspace")}
              className={`rounded-full px-10 py-2.5 text-sm font-medium tracking-wide border transition ${
                canContinue
                  ? "border-zinc-200 text-zinc-50 hover:bg-zinc-50 hover:text-black"
                  : "border-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Перейти к примерке
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TryOnUploadPage;
