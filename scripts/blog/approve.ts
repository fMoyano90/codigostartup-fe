import { parseArgs } from "node:util";
import readline from "node:readline/promises";
import matter from "gray-matter";
import { listAllSlugs, readRaw, writeRaw, findArticleDir } from "./lib/fs-content";
import { validateArticleContent } from "./lib/validate-article";
import { canApprove, applyApproval, type ReviewGate } from "./lib/transitions";
import { formatIssue, todayIsoDate } from "./lib/report";
import { readReviewReport, appendApprovalAudit } from "./lib/review-report";
import { safeParseArticleFrontmatter } from "@/lib/blog/article-schema";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    yes: { type: "boolean", default: false },
    force: { type: "boolean", default: false },
    reason: { type: "string" },
  },
});

const fileSlug = positionals[0];
if (!fileSlug) {
  console.error("Uso: npm run blog:approve -- <slug> [--yes] [--force --reason \"...\"]");
  process.exit(1);
}

const dir = findArticleDir(fileSlug);
if (dir !== "drafts") {
  console.error(
    dir
      ? `"${fileSlug}" está en content/blog/${dir}/, no en drafts/ — solo se aprueban borradores.`
      : `No se encontró el artículo "${fileSlug}" en content/blog/drafts/.`
  );
  process.exit(1);
}

const raw = readRaw("drafts", fileSlug);
const { data } = matter(raw);
const parsed = safeParseArticleFrontmatter(data);

if (!parsed.success) {
  console.error(`El frontmatter de "${fileSlug}" no es válido estructuralmente:`);
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".") || "(raíz)"}: ${issue.message}`);
  }
  console.error("\n--force no aplica a errores estructurales. Corrige el frontmatter primero.");
  process.exit(1);
}

const frontmatter = parsed.data;

const allFileSlugs = listAllSlugs().map((entry) => entry.fileSlug);
const validation = validateArticleContent(raw, fileSlug, "drafts", allFileSlugs);

const reviewReportStatus = readReviewReport(fileSlug);
const reviewGate: ReviewGate =
  reviewReportStatus.status === "missing"
    ? "not-available"
    : reviewReportStatus.status === "invalid"
      ? "invalid"
      : reviewReportStatus.report.approved
        ? "approved"
        : "not-approved";

const check = canApprove(frontmatter, validation.issues, reviewGate);

if (!check.ok) {
  console.log(`No se puede aprobar "${fileSlug}": ${check.reason}`);
  for (const issue of validation.issues) console.log(formatIssue(issue));

  if (!values.force) {
    process.exit(1);
  }
  if (!values.reason) {
    console.error('\n--force requiere --reason "motivo de la aprobación forzada".');
    process.exit(1);
  }
}

async function confirm(): Promise<boolean> {
  if (values.yes || values.force) return true;
  if (!process.stdin.isTTY) {
    console.error('Entorno no interactivo: pasa --yes para confirmar sin preguntar.');
    return false;
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`¿Confirmas aprobar "${fileSlug}"? (s/N) `);
  rl.close();
  return answer.trim().toLowerCase() === "s";
}

async function main() {
  const confirmed = await confirm();
  if (!confirmed) {
    console.log("Aprobación cancelada.");
    process.exit(1);
  }

  const today = todayIsoDate();
  const updatedFrontmatter = applyApproval(frontmatter, today);
  const updatedRaw = matter.stringify(matter(raw).content, updatedFrontmatter);
  writeRaw("drafts", fileSlug, updatedRaw);

  if (!check.ok && values.force) {
    appendApprovalAudit({
      fileSlug,
      timestamp: new Date().toISOString(),
      reason: values.reason!,
      bypassedIssues: validation.issues.map((issue) => issue.message),
    });
    console.log(`Aprobación forzada registrada en reports/blog/approvals-audit.jsonl.`);
  }

  console.log(
    `"${fileSlug}" aprobado. status: approved, approvedAt: ${today} (permanece en content/blog/drafts/).`
  );
}

main();
