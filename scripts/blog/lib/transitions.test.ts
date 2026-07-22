import { describe, it, expect } from "vitest";
import {
  canApprove,
  applyApproval,
  canPublish,
  applyPublish,
  applyRejection,
} from "./transitions";
import { safeParseArticleFrontmatter, type BlogArticleFrontmatter } from "@/lib/blog/article-schema";
import type { ValidationIssue } from "./validate-article";

function baseFrontmatter(overrides: Partial<BlogArticleFrontmatter> = {}): BlogArticleFrontmatter {
  return {
    title: "Título",
    slug: "titulo",
    description: "Descripción",
    excerpt: "Excerpt",
    category: "crear-productos-digitales",
    tags: [],
    audience: ["founders"],
    intent: "informational",
    funnelStage: "awareness",
    services: ["desarrollo-mvp"],
    cta: { type: "service", target: "desarrollo-mvp" },
    author: "Código Startup",
    status: "draft",
    featured: false,
    createdAt: "2026-07-21",
    updatedAt: "2026-07-21",
    seo: {
      title: "Título SEO",
      description: "Descripción SEO",
      primaryKeyword: "keyword",
      secondaryKeywords: [],
    },
    relatedArticles: [],
    ...overrides,
  };
}

const noIssues: ValidationIssue[] = [];
const blockingIssues: ValidationIssue[] = [
  { level: "error", message: "Algo está mal" },
];

describe("canApprove / applyApproval", () => {
  it("allows approving a draft with no blocking issues", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    expect(canApprove(frontmatter, noIssues, "not-available")).toEqual({ ok: true });
  });

  it("refuses to approve an article that isn't in draft status", () => {
    const frontmatter = baseFrontmatter({ status: "approved", approvedAt: "2026-07-22" });
    const result = canApprove(frontmatter, noIssues, "not-available");
    expect(result.ok).toBe(false);
  });

  it("refuses to approve a draft with blocking validation errors", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const result = canApprove(frontmatter, blockingIssues, "not-available");
    expect(result.ok).toBe(false);
  });

  it("refuses to approve when the review report exists and isn't approved", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const result = canApprove(frontmatter, noIssues, "not-approved");
    expect(result.ok).toBe(false);
  });

  it("refuses to approve when the review report is invalid", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const result = canApprove(frontmatter, noIssues, "invalid");
    expect(result.ok).toBe(false);
  });

  it("allows approving when the review report exists and is approved", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const result = canApprove(frontmatter, noIssues, "approved");
    expect(result.ok).toBe(true);
  });

  it("sets status, approvedAt and updatedAt", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const updated = applyApproval(frontmatter, "2026-07-22");
    expect(updated.status).toBe("approved");
    expect(updated.approvedAt).toBe("2026-07-22");
    expect(updated.updatedAt).toBe("2026-07-22");
  });
});

describe("canPublish / applyPublish", () => {
  it("refuses to publish a draft that was never approved", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const result = canPublish(frontmatter, noIssues);
    expect(result.ok).toBe(false);
  });

  it("refuses to publish an approved article that still has blocking errors", () => {
    const frontmatter = baseFrontmatter({ status: "approved", approvedAt: "2026-07-22" });
    const result = canPublish(frontmatter, blockingIssues);
    expect(result.ok).toBe(false);
  });

  it("allows publishing an approved article with no blocking errors", () => {
    const frontmatter = baseFrontmatter({ status: "approved", approvedAt: "2026-07-22" });
    const result = canPublish(frontmatter, noIssues);
    expect(result.ok).toBe(true);
  });

  it("sets status, publishedAt and updatedAt", () => {
    const frontmatter = baseFrontmatter({ status: "approved", approvedAt: "2026-07-22" });
    const updated = applyPublish(frontmatter, "2026-07-23");
    expect(updated.status).toBe("published");
    expect(updated.publishedAt).toBe("2026-07-23");
    expect(updated.updatedAt).toBe("2026-07-23");
  });
});

describe("applyRejection", () => {
  it("sets status to rejected and bumps updatedAt", () => {
    const frontmatter = baseFrontmatter({ status: "draft" });
    const updated = applyRejection(frontmatter, "2026-07-24");
    expect(updated.status).toBe("rejected");
    expect(updated.approvedAt).toBeNull();
    expect(updated.publishedAt).toBeNull();
    expect(updated.updatedAt).toBe("2026-07-24");
  });
});

describe("transition schema invariants", () => {
  it("keeps approval, publication and rejection outputs valid", () => {
    const approved = applyApproval(baseFrontmatter(), "2026-07-22");
    const published = applyPublish(approved, "2026-07-22");
    const rejected = applyRejection(approved, "2026-07-22");

    expect(safeParseArticleFrontmatter(approved).success).toBe(true);
    expect(safeParseArticleFrontmatter(published).success).toBe(true);
    expect(safeParseArticleFrontmatter(rejected).success).toBe(true);
  });
});
