import fs from "node:fs";
import path from "node:path";
import { safeParseArticleReviewReport, type ArticleReviewReport } from "@/lib/blog/review-schema";

const REPORTS_DIR = path.join(process.cwd(), "reports", "blog");

export type ReviewReportStatus =
  | { status: "missing" }
  | { status: "invalid" }
  | { status: "valid"; report: ArticleReviewReport };

/**
 * Reads `reports/blog/<slug>.json`, written by `blog:review-report` (Phase 4).
 * - "missing": that command hasn't run yet for this article — approve.ts
 *   treats this as "review not available yet", not as a failure.
 * - "invalid": the file exists but is corrupted or doesn't match the schema —
 *   approve.ts treats this as a blocking problem, unlike "missing".
 * - "valid": parsed report, check `.approved`.
 */
export function readReviewReport(fileSlug: string): ReviewReportStatus {
  const reportPath = path.join(REPORTS_DIR, `${fileSlug}.json`);
  if (!fs.existsSync(reportPath)) return { status: "missing" };

  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  } catch {
    return { status: "invalid" };
  }

  const parsed = safeParseArticleReviewReport(json);
  if (!parsed.success) return { status: "invalid" };

  return { status: "valid", report: parsed.data };
}

export function appendApprovalAudit(entry: {
  fileSlug: string;
  timestamp: string;
  reason: string;
  bypassedIssues: string[];
}): void {
  const auditPath = path.join(REPORTS_DIR, "approvals-audit.jsonl");
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.appendFileSync(auditPath, `${JSON.stringify(entry)}\n`, "utf-8");
}
