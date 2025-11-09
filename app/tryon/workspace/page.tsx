// app/tryon/workspace/page.tsx
"use client";

import React, {
  useState,
  ChangeEvent,
  useRef,
  PointerEvent as ReactPointerEvent,
  CSSProperties,
} from "react";
import { useRouter } from "next/navigation";
import { useTryOn } from "../TryOnContext";

type Position = {
  x: number;
  y: number;
};

const blendOptions: { value: CSSProperties["mixBlendMode"]; label: string }[] =
  [
    { value: "normal", label: "Обычный" },
    { value: "multiply", label: "Умножение" },
    { value: "overlay", label: "Overlay" },
    { value: "soft-light", label: "Soft light" },
    { value: "screen", label: "Screen" },
  ];

const WorkspacePage = () => {
  const router = useRouter();
  const { bodyPreview, sketchPreview } = useTryOn();

  // кто сверху
  const [topLayer, setTopLayer] = useState<"sketch" | "body">("sketch");

  // настройки верхнего слоя
  const [opacity, setOpacity] = useState<number>(0.8);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  // режим наложения
  const [blendMode, setBlendMode] = useState<CSSProperties["mixBlendMode"]>(
    "normal"
  );

  // позиция верхнего слоя (перетаскивание)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<Position | null>(null);
  const initialPosRef = useRef<Position>({ x: 0, y: 0 });

  // если нет картинок — уводим назад
  if (!bodyPreview || !sketchPreview) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold tracking-wide">
            Недостаточно данных для примерки
          </h1>
          <p className="text-zinc-400 text-sm">
            Сначала выбери фото тела и эскиз на предыдущем шаге.
          </p>
          <button
            onClick={() => router.push("/tryon")}
            className="inline-flex items-center justify-center rounded-full border border-zinc-600 px-6 py-2 text-sm font-medium tracking-wide hover:border-zinc-300 hover:text-zinc-50 transition"
          >
            Вернуться к загрузке
          </button>
        </div>
      </main>
    );
  }

  const isSketchOnTop = topLayer === "sketch";
  const topSrc = isSketchOnTop ? sketchPreview : bodyPreview;
  const bottomSrc = isSketchOnTop ? bodyPreview : sketchPreview;

  const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOpacity(parseFloat(e.target.value));

  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setScale(parseFloat(e.target.value));

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRotation(parseFloat(e.target.value));

  const handleReset = () => {
    setOpacity(0.8);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setBlendMode("normal");
  };

  const handleSwapLayers = () => {
    setTopLayer((prev) => (prev === "sketch" ? "body" : "sketch"));
  };

  // === перетаскивание верхнего слоя (мышь + палец) ===
  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { ...position };
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    setPosition({
      x: initialPosRef.current.x + dx,
      y: initialPosRef.current.y + dy,
    });
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
        {/* Хедер */}
        <header className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logo-dark.png"
              alt="Anisimovarttattoo"
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                ANISIMOVARTTATTOO
              </p>
              <p className="text-xs text-zinc-400">
                Искусство, которое становится частью тебя
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/tryon")}
            className="text-xs sm:text-sm rounded-full border border-zinc-700 px-4 py-1.5 hover:border-zinc-300 hover:text-zinc-50 transition"
          >
            Назад к загрузке
          </button>
        </header>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Рабочая область */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between mb-2">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
                Примерка тату
              </h1>
              <p className="text-xs text-zinc-500">
                сверху —{" "}
                <span className="text-zinc-200">
                  {isSketchOnTop ? "эскиз" : "тело"}
                </span>
              </p>
            </div>

            <div className="relative w-full max-w-[720px] mx-auto">
              <div className="relative w-full aspect-[3/4] rounded-[32px] border border-zinc-800 bg-gradient-to-b from-zinc-950 via-black to-zinc-900/80 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] touch-none">
                {/* Нижний слой (статичный) */}
                <img
                  src={bottomSrc}
                  alt="Нижний слой"
                  className="absolute inset-0 m-auto max-h-full max-w-full object-contain opacity-95"
                  draggable={false}
                />

                {/* Обёртка верхнего слоя: ловит мышь/палец */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                >
                  <img
                    src={topSrc}
                    alt="Верхний слой"
                    style={{
                      opacity,
                      mixBlendMode: blendMode ?? "normal",
                      transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale}) rotate(${rotation}deg)`,
                    }}
                    className="max-h-full max-w-full object-contain pointer-events-none select-none"
                    draggable={false}
                  />
                </div>

                {/* Лёгкий металлический ободок */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[28px] border border-zinc-700/70 shadow-[0_0_40px_rgba(255,255,255,0.06)_inset]" />
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 max-w-md pt-1">
              Верхний слой можно двигать мышью или пальцем, менять масштаб,
              прозрачность и угол. Финальное расположение тату уточняется лично
              перед сеансом.
            </p>
          </div>

          {/* Панель управления */}
          <div className="space-y-6 lg:space-y-7 bg-gradient-to-b from-zinc-950/90 to-black/90 border border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.95)]">
            <h2 className="text-sm font-medium tracking-[0.18em] uppercase text-zinc-400">
              Панель управления
            </h2>

            {/* Прозрачность */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.18em] text-zinc-500">
                  Прозрачность верхнего слоя
                </span>
                <span className="text-zinc-200">
                  {Math.round(opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={opacity}
                onChange={handleOpacityChange}
                className="w-full accent-zinc-200"
              />
            </div>

            {/* Масштаб */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.18em] text-zinc-500">
                  Масштаб
                </span>
                <span className="text-zinc-200">
                  {Math.round(scale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.05}
                max={1.6}
                step={0.01}
                value={scale}
                onChange={handleScaleChange}
                className="w-full accent-zinc-200"
              />
            </div>

            {/* Поворот */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.18em] text-zinc-500">
                  Поворот
                </span>
                <span className="text-zinc-200">
                  {rotation > 0 ? "+" : ""}
                  {Math.round(rotation)}°
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={rotation}
                onChange={handleRotationChange}
                className="w-full accent-zinc-200"
              />
            </div>

            {/* Режим наложения */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.18em] text-zinc-500">
                  Режим наложения
                </span>
                <span className="text-zinc-200">
                  {
                    (blendOptions.find((b) => b.value === blendMode) ??
                      blendOptions[0]).label
                  }
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blendOptions.map((opt) => {
                  const active = opt.value === blendMode;
                  return (
                    <button
                      key={opt.value || "normal"}
                      type="button"
                      onClick={() => setBlendMode(opt.value)}
                      className={`px-3 py-1.5 rounded-full text-[11px] border transition ${
                        active
                          ? "border-zinc-200 text-zinc-50 bg-zinc-900"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleSwapLayers}
                className="flex-1 min-w-[140px] rounded-full border border-zinc-600 px-4 py-2 text-xs sm:text-sm font-medium tracking-wide hover:border-zinc-200 hover:text-zinc-50 transition"
              >
                Поменять местами слои
              </button>
              <button
                onClick={handleReset}
                className="flex-1 min-w-[140px] rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-xs sm:text-sm font-medium tracking-wide hover:border-zinc-300 hover:bg-зinc-900 transition"
              >
                Сбросить настройки
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkspacePage;
