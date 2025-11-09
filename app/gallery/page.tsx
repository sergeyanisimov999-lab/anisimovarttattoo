// app/gallery/page.tsx
// app/gallery/page.tsx
import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  let images: string[] = [];

  try {
    const files = fs.readdirSync(galleryDir);

    images = files
      // берём только .jpg / .jpeg / .png
      .filter((file) => /\.(jpe?g|png)$/i.test(file))
      // немного наводим порядок по имени
      .sort((a, b) => a.localeCompare(b, "ru"))
      // превращаем в пути для <img src="...">
      .map((file) => `/gallery/${file}`);
  } catch (e) {
    // если папки нет — просто пустой массив, без падения
    images = [];
  }

  return <GalleryClient images={images} />;
}
