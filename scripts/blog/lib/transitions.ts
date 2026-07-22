import type { BlogArticleFrontmatter } from "@/lib/blog/article-schema";
import type { ValidationIssue } from "./validate-article";

/**
 * "not-available": blog:review-report never ran for this article — the
 *   check is skipped (Phase 4 output is optional until it exists).
 * "invalid": a report file exists but is corrupted or fails schema
 *   validation — treated as blocking, unlike "not-available".
 * "approved" / "not-approved": a valid consolidated ArticleReviewReport.
 */
export type ReviewGate = "not-available" | "invalid" | "approved" | "not-approved";

export type TransitionCheck = { ok: true } | { ok: false; reason: string };

function hasBlockingErrors(issues: ValidationIssue[]): boolean {
  return issues.some((issue) => issue.level === "error");
}

export function canApprove(
  frontmatter: BlogArticleFrontmatter,
  issues: ValidationIssue[],
  reviewGate: ReviewGate
): TransitionCheck {
  if (frontmatter.status !== "draft") {
    return { ok: false, reason: `El artículo está en estado "${frontmatter.status}", no "draft".` };
  }
  if (hasBlockingErrors(issues)) {
    return { ok: false, reason: "El artículo tiene errores de validación bloqueantes." };
  }
  if (reviewGate === "invalid") {
    return { ok: false, reason: "El reporte de revisión editorial (reports/blog/<slug>.json) es inválido." };
  }
  if (reviewGate === "not-approved") {
    return { ok: false, reason: "El reporte de revisión editorial no está aprobado." };
  }
  return { ok: true };
}

export function applyApproval(
  frontmatter: BlogArticleFrontmatter,
  today: string
): BlogArticleFrontmatter {
  return {
    ...frontmatter,
    status: "approved",
    approvedAt: today,
    publishedAt: null,
    updatedAt: today,
  };
}

export function canPublish(
  frontmatter: BlogArticleFrontmatter,
  issues: ValidationIssue[]
): TransitionCheck {
  if (frontmatter.status !== "approved") {
    return { ok: false, reason: `El artículo está en estado "${frontmatter.status}", no "approved".` };
  }
  if (!frontmatter.approvedAt) {
    return { ok: false, reason: "El artículo aprobado no tiene fecha de aprobación." };
  }
  if (hasBlockingErrors(issues)) {
    return { ok: false, reason: "El artículo tiene errores de validación bloqueantes." };
  }
  return { ok: true };
}

export function applyPublish(
  frontmatter: BlogArticleFrontmatter,
  today: string
): BlogArticleFrontmatter {
  return {
    ...frontmatter,
    status: "published",
    publishedAt: today,
    updatedAt: today,
  };
}

export function applyRejection(
  frontmatter: BlogArticleFrontmatter,
  today: string
): BlogArticleFrontmatter {
  return {
    ...frontmatter,
    status: "rejected",
    approvedAt: null,
    publishedAt: null,
    updatedAt: today,
  };
}
