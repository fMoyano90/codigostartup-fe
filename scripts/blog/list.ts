import { parseArgs } from "node:util";
import matter from "gray-matter";
import { listAllSlugs, readRaw } from "./lib/fs-content";
import { validateArticleContent } from "./lib/validate-article";
import { safeParseArticleFrontmatter } from "@/lib/blog/article-schema";

const { values } = parseArgs({
  options: {
    status: { type: "string" },
    category: { type: "string" },
  },
});

const allEntries = listAllSlugs();
const allFileSlugs = allEntries.map((entry) => entry.fileSlug);

const rows = allEntries.map((entry) => {
  const raw = readRaw(entry.dir, entry.fileSlug);
  const { data } = matter(raw);
  const parsed = safeParseArticleFrontmatter(data);
  const validation = validateArticleContent(raw, entry.fileSlug, entry.dir, allFileSlugs);

  return {
    fileSlug: entry.fileSlug,
    dir: entry.dir,
    title: parsed.success ? parsed.data.title : (data.title ?? "(sin título)"),
    category: parsed.success ? parsed.data.category : (data.category ?? "(inválida)"),
    status: parsed.success ? parsed.data.status : "(inválido)",
    updatedAt: parsed.success ? parsed.data.updatedAt : (data.updatedAt ?? "-"),
    reviewScore: parsed.success ? (parsed.data.reviewScore ?? "-") : "-",
    errorCount: validation.issues.filter((i) => i.level === "error").length,
  };
});

const filtered = rows.filter((row) => {
  if (values.status && row.status !== values.status) return false;
  if (values.category && row.category !== values.category) return false;
  return true;
});

console.log(
  ["SLUG", "TÍTULO", "CATEGORÍA", "ESTADO", "ACTUALIZADO", "SCORE", "ERRORES"].join(" | ")
);
for (const row of filtered) {
  console.log(
    [row.fileSlug, row.title, row.category, row.status, row.updatedAt, row.reviewScore, row.errorCount].join(
      " | "
    )
  );
}

console.log(`\n${filtered.length} artículo(s) listado(s) de ${rows.length} total(es).`);
