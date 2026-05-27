// app/gallery/page.tsx
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import GalleryClient, { type GalleryImage } from "./GalleryClient";

const featuredFile = "00-blackgrey-medved-rukav-sergey-anisimov.png";

const portfolioMetadata: Record<
  string,
  Omit<GalleryImage, "src"> & { order: number }
> = {
  [featuredFile]: {
    order: 0,
    featured: true,
    title: "Медведь — 2/3 рукава в чёрно-белой графике",
    alt: "Black&grey татуировка с медведем и черепом на 2/3 рукава — мастер Сергей Анисимов, Москва, Перово",
    description:
      "Крупная black&grey-композиция на руку: медведь, природные элементы и череп. Работа тату-мастера Сергея Анисимова.",
  },
};

export const metadata: Metadata = {
  title: "Портфолио тату-мастера в Перово: black&grey и художественные работы",
  description:
    "Портфолио Сергея Анисимова: художественные татуировки и black&grey-композиции в Москве, Перово / ВАО. Запись на консультацию.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  let images: GalleryImage[] = [];

  try {
    const files = fs
      .readdirSync(galleryDir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

    images = files
      .map((file, index) => {
        const data = portfolioMetadata[file];

        return {
          src: `/gallery/${file}`,
          title: data?.title ?? `Работа из портфолио №${index + 1}`,
          alt:
            data?.alt ??
            `Работа из портфолио тату-мастера Сергея Анисимова в Москве`,
          description: data?.description,
          featured: data?.featured ?? false,
          order: data?.order ?? 100 + index,
          file,
        };
      })
      .sort((a, b) => a.order - b.order || a.file.localeCompare(b.file, "ru"))
      .map(({ order: _order, file: _file, ...image }) => image);
  } catch {
    images = [];
  }

  return <GalleryClient images={images} />;
}
