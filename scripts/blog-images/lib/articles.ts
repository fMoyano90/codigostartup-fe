import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ArticleImage, ArticleInfo } from "./types";

export const PUBLISHED_DIR = path.join(process.cwd(), "content", "blog", "published");
export const IMAGE_DIR = path.join(process.cwd(), "public", "images", "blog");

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function isSafeSlug(slug: string): boolean {
  // Kebab-case estricto: excluye "/", "..", espacios y caracteres peligrosos.
  return SLUG_RE.test(slug);
}

/** Parsea el campo image del frontmatter (objeto {src, alt}) de forma tolerante. */
function parseImage(data: Record<string, unknown>): ArticleImage | null {
  const img = data.image;
  if (img && typeof img === "object") {
    const record = img as Record<string, unknown>;
    const src = typeof record.src === "string" ? record.src : "";
    const alt = typeof record.alt === "string" ? record.alt : "";
    if (src.startsWith("/") && src.length > 1) {
      return { src, alt: alt || src };
    }
  }
  return null;
}

/** Lee todos los artículos publicados con sus datos relevantes. */
export function listArticles(): ArticleInfo[] {
  if (!fs.existsSync(PUBLISHED_DIR)) return [];
  const articles: ArticleInfo[] = [];
  for (const file of fs.readdirSync(PUBLISHED_DIR)) {
    if (!file.endsWith(".mdx")) continue;
    const filePath = path.join(PUBLISHED_DIR, file);
    const slug = file.replace(/\.mdx$/, "");
    if (!isSafeSlug(slug)) continue;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const title = String(data.title ?? "").trim();
    if (!title) continue; // Ignorar artículos sin título válido.
    const currentImage = parseImage(data);
    const currentImageFile = currentImage
      ? path.join(process.cwd(), "public", currentImage.src.replace(/^\//, ""))
      : null;
    articles.push({
      filePath,
      slug,
      title,
      description: String(data.description ?? "").trim(),
      category: String(data.category ?? "").trim() || "sin-categoria",
      currentImage,
      currentImageFile:
        currentImageFile && fs.existsSync(currentImageFile) ? currentImageFile : null,
    });
  }
  return articles.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Ruta esperada de la imagen generada para un slug. */
export function imageOutputPath(slug: string): string {
  return path.join(IMAGE_DIR, `${slug}.webp`);
}

/** Ruta pública (URL) de la imagen generada para un slug. */
export function imagePublicUrl(slug: string): string {
  return `/images/blog/${slug}.webp`;
}

export function articleExists(slug: string): boolean {
  return fs.existsSync(path.join(PUBLISHED_DIR, `${slug}.mdx`));
}
