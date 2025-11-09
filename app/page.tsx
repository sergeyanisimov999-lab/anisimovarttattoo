// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16 flex flex-col">
        {/* Логотип + крупная надпись ANISIMOVARTTATTOO по центру */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <img
            src="/logo/anisimovarttattoo-logo.png"
            alt="Логотип Anisimovarttattoo"
            className="h-32 sm:h-40 md:h-48 w-auto mb-4"
          />
          <p className="text-lg sm:text-2xl md:text-3xl tracking-[0.7em] uppercase text-zinc-500">
            ANISIMOVARTTATTOO
          </p>
        </div>

        {/* Основной блок: слева текст, справа фото */}
        <section className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Левая колонка: слоган, текст, кнопки */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
                Искусство, которое становится
                <br />
                частью тебя...
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl">
                Премиальные тату в артхаус-эстетике: чистые линии, продуманная
                композиция и уважение к телу. Атмосфера личного салона, а не
                поточной студии.
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Записаться → форма на /booking */}
              <Link
                href="/booking"
                className="rounded-full px-8 py-2.5 text-sm font-medium tracking-wide
                           bg-zinc-100 text-black border border-zinc-100
                           hover:bg-white hover:border-white hover:text-black
                           transition"
              >
                Записаться
              </Link>

              {/* Отзывы */}
              <Link
                href="/reviews"
                className="rounded-full px-8 py-2.5 text-sm font-medium tracking-wide
                           border border-zinc-700 bg-black
                           text-зinc-200 hover:border-zinc-300 hover:text-zinc-50
                           transition"
              >
                Отзывы
              </Link>

              {/* Примерка тату онлайн */}
              <Link
                href="/tryon"
                className="rounded-full px-8 py-2.5 text-sm font-medium tracking-wide
                           border border-zinc-500/80 bg-zinc-950
                           text-zinc-100 hover:border-zinc-200
                           hover:text-zinc-50 hover:bg-zinc-900
                           transition whitespace-nowrap"
              >
                Примерка тату онлайн
              </Link>

              {/* Портфолио */}
              <Link
                href="/gallery"
                className="rounded-full px-7 py-2.5 text-sm font-medium tracking-wide
                           border border-zinc-800 bg-black
                           text-zinc-300 hover:border-zinc-400 hover:text-zinc-50
                           transition"
              >
                Портфолио
              </Link>

              {/* Эскизы месяца −30% */}
              <Link
                href="/sketches"
                className="rounded-full px-7 py-2.5 text-sm font-medium tracking-wide
                           border border-zinc-900 bg-black
                           text-zinc-400 hover:border-zinc-400 hover:text-zinc-50
                           transition"
              >
                Эскизы месяца −30%
              </Link>
            </div>

            {/* Текст под кнопками */}
            <p className="text-sm sm:text-base text-zinc-500 pt-4 max-w-md">
              Индивидуальные сеансы по предварительной записи. Перед тату —
              онлайн-примерка, подбор эскиза и финальная композиция.
            </p>
          </div>

          {/* Правая колонка: фото без рамки, подпись под фото */}
          <div className="flex justify-center lg:justify-end lg:mt-2">
            <div className="w-full max-w-[320px] sm:max-w-[360px]">
              {/* Карточка с фото */}
              <div className="relative rounded-[32px] bg-gradient-to-b from-zinc-950 via-black to-zinc-950/90 overflow-hidden shadow-[0_0_70px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[3/4]">
                  <img
                    src="/artist/sergey-main.png"
                    alt="Сергей Анисимов"
                    className="h-full w-full object-cover"
                  />
                  {/* Лёгкий градиент по низу, чтобы фото мягко уходило в чёрный */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Подпись под фото */}
              <div className="mt-3">
                <p className="text-sm sm:text-base text-zinc-300">
                  Авторские эскизы, внимание к деталям и честный диалог перед
                  сеансом. Без случайных решений.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
