// app/sketches/page.tsx
import fs from "fs";
import path from "path";
import SketchesClient from "./SketchesClient";

export const runtime = "nodejs";

export default function SketchesPage() {
  const sketchesDir = path.join(process.cwd(), "public", "sketches");

  let images: string[] = [];

  try {
    const files = fs.readdirSync(sketchesDir);

    images = files
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, "ru"))
      .map((file) => `/sketches/${file}`);
  } catch (e) {
    // если папки нет или она пустая — просто пустой список без падения
    images = [];
  }

  return <SketchesClient images={images} />;
}
