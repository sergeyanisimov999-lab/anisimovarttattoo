// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

const siteUrl = "https://anisimovarttattoo.vercel.app";
const publicPhone = "+7 977 928-64-77";
const phoneLink = "+79779286477";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Сергей Анисимов — тату-мастер в Перово, Москва | Anisimov Art Tattoo",
    template: "%s | Сергей Анисимов — Anisimov Art Tattoo",
  },
  description:
    "Тату-мастер Сергей Анисимов в Москве, Перово / ВАО. Художественные татуировки, black&grey, перекрытие и индивидуальные эскизы. Ул. Металлургов, д. 3, приём по записи.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Сергей Анисимов — тату-мастер в Перово, Москва",
    description:
      "Художественные татуировки, black&grey и перекрытие тату. Москва, ул. Металлургов, д. 3. Приём по предварительной записи.",
    siteName: "Anisimov Art Tattoo",
    locale: "ru_RU",
    images: [
      {
        url: "/artist/sergey-main.png",
        width: 900,
        height: 1200,
        alt: "Сергей Анисимов — тату-мастер Anisimov Art Tattoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Сергей Анисимов — тату-мастер в Перово, Москва",
    description:
      "Портфолио, отзывы и запись на тату в Москве / ВАО. Ул. Металлургов, д. 3.",
    images: ["/artist/sergey-main.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": `${siteUrl}/#tattoo-parlor`,
  name: "Anisimov Art Tattoo",
  alternateName: ["Anisimovarttattoo", "Сергей Анисимов — тату-мастер"],
  url: siteUrl,
  telephone: publicPhone,
  image: `${siteUrl}/artist/sergey-main.png`,
  description:
    "Тату-мастер Сергей Анисимов: художественные татуировки, black&grey, перекрытие старых тату, доработка и индивидуальные эскизы в Москве, Перово / ВАО.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Металлургов, д. 3",
    addressLocality: "Москва",
    addressRegion: "Москва",
    addressCountry: "RU",
  },
  areaServed: [
    { "@type": "City", name: "Москва" },
    { "@type": "Place", name: "Перово, ВАО, Москва" },
  ],
  employee: {
    "@type": "Person",
    name: "Сергей Анисимов",
    jobTitle: "Тату-мастер",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phoneLink,
    contactType: "Запись на сеанс",
    availableLanguage: "Russian",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Художественная татуировка" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Black&grey татуировка" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Перекрытие старой татуировки" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Индивидуальный эскиз тату" },
    },
    {
      "@type": "Offer",
      name: "Full-day сеанс 6 часов — поездка домой комфорт+ за счёт мастера",
      price: "25000",
      priceCurrency: "RUB",
      itemOffered: {
        "@type": "Service",
        name: "Full-day тату-сеанс 6 часов",
        description:
          "Шестичасовой тату-сеанс с одной поездкой домой после сеанса по Москве или в ближайшее Подмосковье до 15 км за МКАД при предварительном согласовании маршрута.",
      },
    },
  ],
  sameAs: ["https://profi.ru/profile/AnisimovSV6/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-black text-zinc-100 antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
