import fs from "node:fs";
import path from "node:path";

export type ArticleStatusDir = "drafts" | "published" | "rejected";

export const ARTICLE_STATUS_DIRS: ArticleStatusDir[] = [
  "drafts",
  "published",
  "rejected",
];

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

export function statusDirPath(dir: ArticleStatusDir): string {
  return path.join(CONTENT_ROOT, dir);
}

export function articleFilePath(dir: ArticleStatusDir, fileSlug: string): string {
  return path.join(statusDirPath(dir), `${fileSlug}.mdx`);
}

export function listSlugs(dir: ArticleStatusDir): string[] {
  const dirPath = statusDirPath(dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

export function listAllSlugs(): { fileSlug: string; dir: ArticleStatusDir }[] {
  return ARTICLE_STATUS_DIRS.flatMap((dir) =>
    listSlugs(dir).map((fileSlug) => ({ fileSlug, dir }))
  );
}

export function readRaw(dir: ArticleStatusDir, fileSlug: string): string {
  return fs.readFileSync(articleFilePath(dir, fileSlug), "utf-8");
}

export function writeRaw(dir: ArticleStatusDir, fileSlug: string, raw: string): void {
  fs.mkdirSync(statusDirPath(dir), { recursive: true });
  fs.writeFileSync(articleFilePath(dir, fileSlug), raw, "utf-8");
}

export function articleExists(dir: ArticleStatusDir, fileSlug: string): boolean {
  return fs.existsSync(articleFilePath(dir, fileSlug));
}

/** Finds which status directory currently holds a given slug (searched in a fixed order). */
export function findArticleDir(fileSlug: string): ArticleStatusDir | null {
  for (const dir of ARTICLE_STATUS_DIRS) {
    if (articleExists(dir, fileSlug)) return dir;
  }
  return null;
}

/**
 * Moves an article's raw content from one status directory to another.
 * Refuses to overwrite an existing file at the destination.
 */
export function moveArticle(
  fromDir: ArticleStatusDir,
  toDir: ArticleStatusDir,
  fileSlug: string,
  raw: string
): void {
  if (articleExists(toDir, fileSlug)) {
    throw new Error(
      `Ya existe un artículo con slug "${fileSlug}" en content/blog/${toDir}/ — no se sobrescribe.`
    );
  }
  writeRaw(toDir, fileSlug, raw);
  fs.unlinkSync(articleFilePath(fromDir, fileSlug));
}
