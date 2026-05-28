import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности и обработки персональных данных",
  description:
    "Как Anisimov Art Tattoo использует данные из формы записи и формы отзыва.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-10">
        <Link
          href="/"
          className="inline-flex rounded-full border border-zinc-700 px-4 py-1.5 text-xs text-zinc-300 transition hover:border-zinc-300 hover:text-zinc-50 sm:text-sm"
        >
          На главную
        </Link>

        <p className="mt-10 text-xs uppercase tracking-[0.32em] text-zinc-500">
          Anisimov Art Tattoo
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-wide sm:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Эта страница объясняет, какие данные передаются через формы сайта
          Anisimov Art Tattoo и для чего они используются.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-300 sm:text-base">
          <section>
            <h2 className="text-xl font-medium text-zinc-100">
              Кто обрабатывает данные
            </h2>
            <p className="mt-3">
              Анисимов Сергей Владимирович, тату-мастер Anisimov Art Tattoo.
              Для вопросов по данным:{" "}
              <a className="underline underline-offset-4" href="mailto:sergeyanisimov999@gmail.com">
                sergeyanisimov999@gmail.com
              </a>{" "}
              или{" "}
              <a className="underline underline-offset-4" href="tel:+79779286477">
                +7 977 928-64-77
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-100">
              Форма записи на сеанс
            </h2>
            <p className="mt-3">
              Через форму записи могут передаваться имя, номер телефона,
              сведения о желаемой татуировке, предполагаемом бюджете и
              прикреплённое изображение. Эти данные используются только для
              рассмотрения заявки, связи с вами и обсуждения будущего сеанса.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-100">
              Форма отзыва
            </h2>
            <p className="mt-3">
              Через форму отзыва могут передаваться имя или псевдоним, месяц и
              год сеанса, описание работы и текст отзыва. Отзыв не публикуется
              автоматически: сначала он проверяется мастером. Публикация
              возможна только при отмеченном согласии на публикацию.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-100">
              Как поступают обращения
            </h2>
            <p className="mt-3">
              После отправки формы сведения направляются мастеру через
              защищённый канал уведомлений в мессенджере для обработки заявки
              или проверки отзыва. Данные не используются для массовых
              рассылок и не публикуются без вашего согласия.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-100">
              Как попросить удалить данные
            </h2>
            <p className="mt-3">
              Можно написать на{" "}
              <a className="underline underline-offset-4" href="mailto:sergeyanisimov999@gmail.com">
                sergeyanisimov999@gmail.com
              </a>{" "}
              с просьбой уточнить или удалить данные, переданные через сайт.
            </p>
          </section>
        </div>

        <p className="mt-12 border-t border-zinc-900 pt-6 text-xs text-zinc-500">
          Дата публикации: 28.05.2026.
        </p>
      </div>
    </main>
  );
}
