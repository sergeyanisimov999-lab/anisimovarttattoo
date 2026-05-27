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
              онлайн-примерка, подбор эскиза и финальная композиция. Москва,
              район Перово / ВАО.
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

        {/* Видимый локальный блок: полезен клиенту и поиску, без скрытых SEO-текстов */}
        <section
          className="mt-16 md:mt-24 border-t border-zinc-900 pt-10 md:pt-14"
          aria-labelledby="tattoo-master-perovo-heading"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
                Москва · Перово · ВАО
              </p>
              <h2
                id="tattoo-master-perovo-heading"
                className="text-2xl sm:text-3xl font-semibold tracking-wide"
              >
                Тату-мастер Сергей Анисимов в Перово
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400 max-w-2xl">
                Художественные татуировки, крупные black&amp;grey-композиции,
                индивидуальные эскизы, перекрытие и доработка старых работ.
                Приём проходит только по предварительной записи — сначала
                обсуждаем идею, место на теле и задачу по композиции.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                Адрес приёма:{" "}
                <span className="text-zinc-100">Москва, ул. Металлургов, д. 3</span>.
                Точный порядок встречи сообщаю после подтверждения записи.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/tatu-master-perovo"
                  className="rounded-full border border-zinc-600 px-6 py-2.5 text-sm text-zinc-100 hover:border-zinc-200 transition"
                >
                  Тату в Перово
                </Link>
                <a
                  href="tel:+79779286477"
                  className="rounded-full border border-zinc-800 px-6 py-2.5 text-sm text-zinc-300 hover:border-zinc-400 hover:text-zinc-50 transition"
                >
                  +7 977 928-64-77
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Направления
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Black&amp;grey, графика, крупные композиции на руку, плечо и
                  грудь, авторские проекты.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Доверие
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Портфолио работ и публичные отзывы клиентов доступны до
                  записи. Консультация — без случайных решений.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-amber-200/25 bg-gradient-to-br from-zinc-950 via-black to-amber-950/20 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_auto] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
                  Full day · 6 часов · 25 000 ₽
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-wide text-zinc-100">
                  Комфорт+ домой — за мой счёт
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300 max-w-2xl">
                  После длинного сеанса не нужно ехать в метро или искать
                  машину: при записи на full-day сеанс отвезу домой с
                  комфортом.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 max-w-2xl">
                  Одна поездка после сеанса. Москва и ближайшее Подмосковье —
                  до 15 км за МКАД. Маршрут согласовывается заранее; денежная
                  замена подарка не предусмотрена.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
                <Link
                  href="/booking"
                  className="rounded-full bg-zinc-100 px-6 py-2.5 text-center text-sm font-medium text-black hover:bg-white transition"
                >
                  Записаться на full-day
                </Link>
                <Link
                  href="/tatu-master-perovo#full-day"
                  className="rounded-full border border-zinc-700 px-6 py-2.5 text-center text-sm text-zinc-100 hover:border-zinc-300 transition"
                >
                  Условия
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
