import { parseArgs } from "node:util";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import {
  listAllSlugs,
  readRaw,
  findArticleDir,
  moveArticle,
  articleExists,
} from "./lib/fs-content";
import { validateArticleContent } from "./lib/validate-article";
import { canPublish, applyPublish } from "./lib/transitions";
import { formatIssue, todayIsoDate } from "./lib/report";
import { safeParseArticleFrontmatter } from "@/lib/blog/article-schema";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    "skip-build": { type: "boolean", default: false },
  },
});

const fileSlug = positionals[0];
if (!fileSlug) {
  console.error("Uso: npm run blog:publish -- <slug> [--skip-build]");
  process.exit(1);
}

const dir = findArticleDir(fileSlug);
if (dir !== "drafts") {
  console.error(
    dir
      ? `"${fileSlug}" está en content/blog/${dir}/, no en drafts/ — solo se publican artículos aprobados.`
      : `No se encontró el artículo "${fileSlug}" en content/blog/drafts/.`
  );
  process.exit(1);
}

if (articleExists("published", fileSlug)) {
  console.error(`Ya existe un artículo publicado con el slug "${fileSlug}" — no se sobrescribe.`);
  process.exit(1);
}

const raw = readRaw("drafts", fileSlug);
const { data } = matter(raw);
const parsed = safeParseArticleFrontmatter(data);

if (!parsed.success) {
  console.error(`El frontmatter de "${fileSlug}" no es válido:`);
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".") || "(raíz)"}: ${issue.message}`);
  }
  process.exit(1);
}

const allFileSlugs = listAllSlugs().map((entry) => entry.fileSlug);
const validation = validateArticleContent(raw, fileSlug, "drafts", allFileSlugs);
const check = canPublish(parsed.data, validation.issues);

if (!check.ok) {
  console.error(`No se puede publicar "${fileSlug}": ${check.reason}`);
  for (const issue of validation.issues) console.error(formatIssue(issue));
  process.exit(1);
}

const today = todayIsoDate();
const updatedFrontmatter = applyPublish(parsed.data, today);
const updatedRaw = matter.stringify(matter(raw).content, updatedFrontmatter);

moveArticle("drafts", "published", fileSlug, updatedRaw);
console.log(`"${fileSlug}" movido a content/blog/published/. status: published, publishedAt: ${today}.`);

if (values["skip-build"]) {
  console.log("--skip-build indicado: no se ejecutó typecheck/lint/build.");
  process.exit(0);
}

try {
  console.log("\nEjecutando typecheck, lint y build...\n");
  execSync("npm run typecheck && npm run lint && npm run build", { stdio: "inherit" });
  console.log(`\n"${fileSlug}" publicado y verificado correctamente.`);
} catch {
  console.error(
    `\nEl build falló después de publicar "${fileSlug}". Revirtiendo a content/blog/drafts/ (status: approved)...`
  );
  moveArticle("published", "drafts", fileSlug, raw);
  console.error(`Revertido. "${fileSlug}" quedó de nuevo en drafts/ sin cambios.`);
  process.exit(1);
}
