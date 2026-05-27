// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

const siteUrl = "https://anisimovarttattoo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Сергей Анисимов — тату-мастер в Москве, Перово | Anisimov Art Tattoo",
    template: "%s | Сергей Анисимов — Anisimov Art Tattoo",
  },
  description:
    "Тату-мастер Сергей Анисимов в Москве, район метро Перово / ВАО. Художественные татуировки, перекрытие старых тату, доработка и индивидуальные эскизы. Портфолио, отзывы и запись на консультацию.",
  keywords: [
    "Сергей Анисимов тату",
    "Anisimov Art Tattoo",
    "Anisimovarttattoo",
    "тату мастер Перово",
    "тату мастер ВАО",
    "тату мастер Москва",
    "перекрытие тату Москва",
    "перекрытие тату Перово",
    "художественная татуировка Москва",
    "индивидуальный эскиз тату",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Сергей Анисимов — тату-мастер в Москве, Перово",
    description:
      "Художественные татуировки, перекрытие и доработка тату. Приём в оборудованном частном кабинете в районе метро Перово по предварительной записи.",
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
    title: "Сергей Анисимов — тату-мастер в Москве, Перово",
    description:
      "Портфолио, отзывы и запись на тату, перекрытие или индивидуальный эскиз в Москве / ВАО.",
    images: ["/artist/sergey-main.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["TattooParlor", "ProfessionalService"],
  name: "Сергей Анисимов — Anisimov Art Tattoo",
  alternateName: ["Anisimovarttattoo", "Anisimov Art Tattoo"],
  url: siteUrl,
  image: `${siteUrl}/artist/sergey-main.png`,
  description:
    "Тату-мастер Сергей Анисимов: художественные татуировки, перекрытие старых тату, доработка и индивидуальные эскизы в Москве, район метро Перово / ВАО.",
  areaServed: [
    {
      "@type": "City",
      name: "Москва",
    },
    {
      "@type": "Place",
      name: "Перово, ВАО, Москва",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressRegion: "Москва",
    addressCountry: "RU",
    addressArea: "Перово, ВАО",
  },
  founder: {
    "@type": "Person",
    name: "Сергей Анисимов",
    jobTitle: "Тату-мастер",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Художественная татуировка",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Перекрытие старой татуировки",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Индивидуальный эскиз тату",
      },
    },
  ],
  sameAs: [
    "https://profi.ru/profile/AnisimovSV6/",
  ],
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
