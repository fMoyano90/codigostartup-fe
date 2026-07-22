import { describe, it, expect } from "vitest";
import { safeParseReviewResult, safeParseArticleReviewReport } from "./review-schema";

function validReviewResult(overrides: Record<string, unknown> = {}) {
  return {
    reviewer: "audience",
    score: 8,
    approved: true,
    strengths: ["Explica bien el impacto de negocio"],
    problems: [],
    recommendations: [],
    ...overrides,
  };
}

describe("reviewResultSchema", () => {
  it("accepts a valid ReviewResult", () => {
    expect(safeParseReviewResult(validReviewResult()).success).toBe(true);
  });

  it("rejects a reviewer outside the configured list", () => {
    const result = safeParseReviewResult(validReviewResult({ reviewer: "no-existe" }));
    expect(result.success).toBe(false);
  });

  it("rejects a score outside the 0-10 range", () => {
    expect(safeParseReviewResult(validReviewResult({ score: 11 })).success).toBe(false);
    expect(safeParseReviewResult(validReviewResult({ score: -1 })).success).toBe(false);
  });

  it("rejects a problem with an invalid severity", () => {
    const result = safeParseReviewResult(
      validReviewResult({ problems: [{ severity: "urgent", message: "x" }] })
    );
    expect(result.success).toBe(false);
  });

  it("accepts a problem without the optional location field", () => {
    const result = safeParseReviewResult(
      validReviewResult({ problems: [{ severity: "minor", message: "x" }] })
    );
    expect(result.success).toBe(true);
  });
});

function validReview(reviewer: string, score = 8) {
  return { reviewer, score, approved: true, strengths: [], problems: [], recommendations: [] };
}

describe("articleReviewReportSchema", () => {
  it("accepts a valid consolidated report", () => {
    const result = safeParseArticleReviewReport({
      slug: "articulo",
      reviewedAt: new Date().toISOString(),
      approved: true,
      totalScore: 8,
      reviews: {
        audience: validReview("audience"),
        businessValue: validReview("business-value"),
        pedagogy: validReview("pedagogy"),
        writing: validReview("writing"),
        seo: validReview("seo"),
      },
      blockingProblems: [],
      recommendations: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejects a report missing one of the five reviews", () => {
    const result = safeParseArticleReviewReport({
      slug: "articulo",
      reviewedAt: new Date().toISOString(),
      approved: true,
      totalScore: 8,
      reviews: {
        audience: validReview("audience"),
        businessValue: validReview("business-value"),
        pedagogy: validReview("pedagogy"),
        writing: validReview("writing"),
        // seo missing
      },
      blockingProblems: [],
      recommendations: [],
    });
    expect(result.success).toBe(false);
  });
});
