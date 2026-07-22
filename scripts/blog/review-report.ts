import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import matter from "gray-matter";
import {
  reviewerIds,
  REVIEWER_KEY_BY_ID,
  safeParseReviewResult,
  type ReviewsByKey,
} from "@/lib/blog/review-schema";
import { consolidateReviews } from "./lib/review-consolidation";
import { findArticleDir, readRaw, writeRaw } from "./lib/fs-content";

const { positionals } = parseArgs({ allowPositionals: true });
const fileSlug = positionals[0];

if (!fileSlug) {
  console.error("Uso: npm run blog:review-report -- <slug>");
  process.exit(1);
}

const REPORTS_DIR = path.join(process.cwd(), "reports", "blog");
const reviewsDir = path.join(REPORTS_DIR, "reviews", fileSlug);

const missing: string[] = [];
const invalid: string[] = [];
const reviewsByKey = {} as ReviewsByKey;

for (const reviewerId of reviewerIds) {
  const filePath = path.join(reviewsDir, `${reviewerId}.json`);

  if (!fs.existsSync(filePath)) {
    missing.push(reviewerId);
    continue;
  }

  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    invalid.push(`${reviewerId} (JSON inválido)`);
    continue;
  }

  const parsed = safeParseReviewResult(json);
  if (!parsed.success) {
    invalid.push(`${reviewerId} (esquema inválido: ${parsed.error.issues[0]?.message})`);
    continue;
  }
  if (parsed.data.reviewer !== reviewerId) {
    invalid.push(
      `${reviewerId} (el campo "reviewer" del archivo es "${parsed.data.reviewer}", debería ser "${reviewerId}")`
    );
    continue;
  }

  const key = REVIEWER_KEY_BY_ID[reviewerId];
  reviewsByKey[key] = parsed.data;
}

if (missing.length > 0 || invalid.length > 0) {
  console.error(`No se puede consolidar la revisión de "${fileSlug}":`);
  if (missing.length > 0) {
    console.error(`  Faltan evaluaciones: ${missing.join(", ")}`);
  }
  if (invalid.length > 0) {
    console.error(`  Evaluaciones inválidas: ${invalid.join(", ")}`);
  }
  console.error(
    `\nGenera los archivos en reports/blog/reviews/${fileSlug}/<reviewer>.json siguiendo los prompts en prompts/blog/.`
  );
  process.exit(1);
}

const report = consolidateReviews(fileSlug, reviewsByKey, new Date().toISOString());

fs.mkdirSync(REPORTS_DIR, { recursive: true });
fs.writeFileSync(path.join(REPORTS_DIR, `${fileSlug}.json`), JSON.stringify(report, null, 2), "utf-8");
console.log(`Reporte guardado en reports/blog/${fileSlug}.json`);
console.log(`approved: ${report.approved} — totalScore: ${report.totalScore}`);
if (report.blockingProblems.length > 0) {
  console.log("Problemas bloqueantes:");
  for (const problem of report.blockingProblems) console.log(`  - ${problem}`);
}

const dir = findArticleDir(fileSlug);
if (!dir) {
  console.warn(
    `No se encontró "${fileSlug}" en content/blog/ — el reporte se guardó pero no se actualizó el frontmatter.`
  );
} else {
  const raw = readRaw(dir, fileSlug);
  const { data, content } = matter(raw);
  const updatedFrontmatter = {
    ...data,
    reviewStatus: report.approved ? "passed" : "changes_required",
    reviewScore: report.totalScore,
  };
  writeRaw(dir, fileSlug, matter.stringify(content, updatedFrontmatter));
  console.log(
    `Frontmatter actualizado en content/blog/${dir}/${fileSlug}.mdx — reviewStatus: ${updatedFrontmatter.reviewStatus}, reviewScore: ${updatedFrontmatter.reviewScore}`
  );
}
