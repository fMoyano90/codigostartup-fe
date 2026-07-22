import fs from "node:fs";
import path from "node:path";
import { listAllSlugs } from "./lib/fs-content";
import { safeParseArticleReviewReport } from "@/lib/blog/review-schema";

const REPORTS_DIR = path.join(process.cwd(), "reports", "blog");

const entries = listAllSlugs();

let reviewed = 0;
let approved = 0;
let changesRequired = 0;
const withoutReport: string[] = [];
const invalidReports: string[] = [];
const scores: number[] = [];
const problemCounts = new Map<string, number>();

for (const entry of entries) {
  const reportPath = path.join(REPORTS_DIR, `${entry.fileSlug}.json`);

  if (!fs.existsSync(reportPath)) {
    withoutReport.push(entry.fileSlug);
    continue;
  }

  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  } catch {
    invalidReports.push(entry.fileSlug);
    continue;
  }

  const parsed = safeParseArticleReviewReport(json);
  if (!parsed.success) {
    invalidReports.push(entry.fileSlug);
    continue;
  }

  reviewed += 1;
  scores.push(parsed.data.totalScore);
  if (parsed.data.approved) approved += 1;
  else changesRequired += 1;

  for (const review of Object.values(parsed.data.reviews)) {
    for (const problem of review.problems) {
      const key = `[${review.reviewer}] ${problem.message}`;
      problemCounts.set(key, (problemCounts.get(key) ?? 0) + 1);
    }
  }
}

const averageScore =
  scores.length > 0 ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : null;

const topProblems = [...problemCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

console.log(`Artículos totales: ${entries.length}`);
console.log(`Revisados (con reporte válido): ${reviewed}`);
console.log(`Aprobados editorialmente: ${approved}`);
console.log(`Con cambios requeridos: ${changesRequired}`);
console.log(`Sin reporte: ${withoutReport.length}${withoutReport.length ? ` (${withoutReport.join(", ")})` : ""}`);
console.log(
  `Reportes inválidos: ${invalidReports.length}${invalidReports.length ? ` (${invalidReports.join(", ")})` : ""}`
);
console.log(`Puntaje promedio: ${averageScore ?? "-"}`);

if (topProblems.length > 0) {
  console.log("\nProblemas más frecuentes:");
  for (const [message, count] of topProblems) {
    console.log(`  (${count}x) ${message}`);
  }
}
