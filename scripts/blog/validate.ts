import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { listAllSlugs, readRaw, findArticleDir } from "./lib/fs-content";
import { validateArticleContent, hasBlockingErrors } from "./lib/validate-article";
import { findDuplicateSlugs } from "./lib/duplicates";
import { formatIssue } from "./lib/report";

const { positionals } = parseArgs({ allowPositionals: true });
const targetSlug = positionals[0];

const allEntries = listAllSlugs();
const allFileSlugs = allEntries.map((entry) => entry.fileSlug);

let entries = allEntries;
if (targetSlug) {
  const dir = findArticleDir(targetSlug);
  if (!dir) {
    console.error(`No se encontró el artículo "${targetSlug}" en drafts, published ni rejected.`);
    process.exit(1);
  }
  entries = [{ fileSlug: targetSlug, dir }];
}

const duplicates = findDuplicateSlugs(allEntries);

const results = entries.map((entry) => {
  const raw = readRaw(entry.dir, entry.fileSlug);
  const outcome = validateArticleContent(raw, entry.fileSlug, entry.dir, allFileSlugs);

  const duplicate = duplicates.find((d) => d.fileSlug === entry.fileSlug);
  if (duplicate) {
    outcome.issues.push({
      level: "error",
      message: `El slug "${entry.fileSlug}" existe en más de un directorio: ${duplicate.dirs.join(", ")}.`,
    });
  }

  return outcome;
});

console.log(`\nValidando ${results.length} artículo(s)...\n`);

for (const result of results) {
  const status = hasBlockingErrors(result)
    ? "INVÁLIDO"
    : result.issues.length > 0
      ? "OK (con advertencias)"
      : "OK";
  console.log(`content/blog/${result.dir}/${result.fileSlug}.mdx — ${status}`);
  for (const issue of result.issues) {
    console.log(formatIssue(issue));
  }
}

const processed = results.length;
const invalid = results.filter(hasBlockingErrors).length;
const warnings = results.filter(
  (r) => !hasBlockingErrors(r) && r.issues.some((i) => i.level === "warning")
).length;
const valid = processed - invalid - warnings;

const summary = { processed, valid, warnings, invalid };
console.log(`\nResumen: ${JSON.stringify(summary)}`);

const reportsDir = path.join(process.cwd(), "reports", "blog");
fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(
  path.join(reportsDir, "validation-summary.json"),
  JSON.stringify(summary, null, 2),
  "utf-8"
);

if (invalid > 0) {
  process.exitCode = 1;
}
