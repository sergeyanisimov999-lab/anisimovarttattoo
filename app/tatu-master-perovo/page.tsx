// app/tatu-master-perovo/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://anisimovarttattoo.vercel.app";

export const metadata: Metadata = {
  title: "Тату-мастер в Перово, Москва — Сергей Анисимов",
  description:
    "Тату в Перово и ВАО: Сергей Анисимов, Anisimov Art Tattoo. Художественные татуировки, black&grey и перекрытие. Full-day 6 часов — 25 000 ₽, поездка домой комфорт+ за мой счёт.",
  alternates: {
    canonical: "/tatu-master-perovo",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/tatu-master-perovo`,
    title: "Тату-мастер в Перово — Сергей Анисимов",
    description:
      "Тату-мастер в Перово: портфолио, отзывы и запись. Full-day сеанс 6 часов — 25 000 ₽, поездка домой комфорт+ за мой счёт.",
    images: [
      {
        url: "/gallery/00-blackgrey-medved-rukav-sergey-anisimov.png",
        alt: "Black&grey татуировка с медведем на рукаве — Сергей Анисимов",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Где проходит сеанс?",
    answer:
      "Приём проходит по предварительной записи в Москве, ул. Металлургов, д. 3, район Перово / ВАО. Детали встречи сообщаю после подтверждения даты.",
  },
  {
    question: "Можно ли прийти с идеей или референсом?",
    answer:
      "Да. Перед записью можно прислать идею, фото зоны на теле или референсы. Я помогу подобрать композицию и формат работы.",
  },
  {
    question: "Делаете ли вы перекрытие старых тату?",
    answer:
      "Да, возможность перекрытия или доработки определяется после просмотра старой работы, размера, плотности пигмента и зоны на теле.",
  },
  {
    question: "Что входит в full-day сеанс?",
    answer:
      "Full-day — это шестичасовой сеанс стоимостью 25 000 ₽. После сеанса предусмотрена одна комфортная поездка домой за мой счёт: по Москве или в ближайшее Подмосковье до 15 км за МКАД, при предварительном согласовании маршрута.",
  },
];

export default function TattooMasterPerovoPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex text-xs sm:text-sm rounded-full border border-zinc-700 px-4 py-1.5 text-zinc-300 hover:border-zinc-300 hover:text-zinc-50 transition"
          >
            На главную
          </Link>

          <p className="mt-10 text-xs uppercase tracking-[0.32em] text-zinc-500">
            Anisimov Art Tattoo · Москва · Перово
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide max-w-3xl">
            Тату-мастер в Перово — Сергей Анисимов
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-3xl">
            Художественные татуировки, крупные black&amp;grey-композиции,
            индивидуальные эскизы, перекрытие и доработка старых тату.
            Принимаю по предварительной записи в Москве, район Перово / ВАО.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] items-start">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
            <img
              src="/gallery/00-blackgrey-medved-rukav-sergey-anisimov.png"
              alt="Black&grey татуировка с медведем и черепом на 2/3 рукава — Сергей Анисимов, Перово"
              className="w-full max-h-[860px] object-contain"
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">
                Адрес приёма
              </p>
              <p className="mt-3 text-base text-zinc-100">
                Москва, ул. Металлургов, д. 3
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Приём только по предварительной записи. Детали встречи
                сообщаются после согласования сеанса.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">
                Связь и запись
              </p>
              <a
                href="tel:+79779286477"
                className="mt-3 block text-lg text-zinc-100 hover:text-white transition"
              >
                +7 977 928-64-77
              </a>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-black hover:bg-white transition"
                >
                  Оставить заявку
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-full border border-zinc-600 px-5 py-2.5 text-sm text-zinc-100 hover:border-zinc-300 transition"
                >
                  Портфолио
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">
                Витринная работа
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Медведь — 2/3 рукава в чёрно-белой графике. Крупная композиция
                с проработкой формы руки и деталей.
              </p>
            </div>
          </div>
        </section>

        <section
          id="full-day"
          className="mt-12 overflow-hidden rounded-[32px] border border-amber-200/25 bg-gradient-to-br from-zinc-950 via-black to-amber-950/20 p-6 sm:p-8"
          aria-labelledby="full-day-heading"
        >
          <div className="grid gap-7 lg:grid-cols-[minmax(0,3fr)_minmax(250px,2fr)] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
                Специальный формат записи
              </p>
              <h2 id="full-day-heading" className="text-2xl sm:text-3xl font-semibold tracking-wide">
                Full-day · 6 часов · 25 000 ₽
              </h2>
              <p className="text-xl sm:text-2xl text-zinc-100">
                Поездка домой комфорт+ — за мой счёт
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400 max-w-2xl">
                После длинного сеанса не нужно ехать в метро или отдельно
                заказывать машину. Завершаем работу — и вы спокойно добираетесь
                домой с комфортом.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-black/45 p-5 space-y-4">
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">
                Условия предложения
              </p>
              <p className="text-sm leading-relaxed text-zinc-300">
                Одна поездка после оплаченного full-day сеанса. Москва и
                ближайшее Подмосковье — до 15 км за МКАД. Маршрут
                подтверждается до записи.
              </p>
              <p className="text-xs leading-relaxed text-zinc-500">
                Денежная замена поездки и компенсация при самостоятельном
                отъезде не предусмотрены.
              </p>
              <Link
                href="/booking"
                className="inline-flex rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-black hover:bg-white transition"
              >
                Записаться на full-day
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-14 border-t border-zinc-900 pt-10">
          <h2 className="text-2xl font-semibold tracking-wide">
            С какими задачами можно обратиться
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Художественная татуировка по индивидуальной идее",
              "Black&grey и графические крупные работы",
              "Перекрытие или доработка существующей татуировки",
              "Эскиз под конкретную зону на теле",
            ].map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 text-sm text-zinc-300"
              >
                {service}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-zinc-900 pt-10">
          <h2 className="text-2xl font-semibold tracking-wide">Вопросы перед записью</h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-zinc-900 p-5">
                <h3 className="text-base font-medium text-zinc-100">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/booking"
            className="rounded-full bg-zinc-100 px-7 py-2.5 text-sm font-medium text-black hover:bg-white transition"
          >
            Записаться на консультацию
          </Link>
          <Link
            href="/reviews"
            className="rounded-full border border-zinc-700 px-7 py-2.5 text-sm text-zinc-100 hover:border-zinc-300 transition"
          >
            Смотреть отзывы
          </Link>
        </div>
      </div>
    </main>
  );
}
