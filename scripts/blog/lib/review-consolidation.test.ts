import { describe, it, expect } from "vitest";
import { consolidateReviews } from "./review-consolidation";
import type { ReviewResult, ReviewsByKey } from "@/lib/blog/review-schema";

function review(overrides: Partial<ReviewResult> & { reviewer: ReviewResult["reviewer"] }): ReviewResult {
  return {
    score: 8,
    approved: true,
    strengths: [],
    problems: [],
    recommendations: [],
    ...overrides,
  };
}

function allGoodReviews(): ReviewsByKey {
  return {
    audience: review({ reviewer: "audience" }),
    businessValue: review({ reviewer: "business-value" }),
    pedagogy: review({ reviewer: "pedagogy" }),
    writing: review({ reviewer: "writing" }),
    seo: review({ reviewer: "seo" }),
  };
}

describe("consolidateReviews", () => {
  it("approves an article when every required review scores at least the minimum and there are no blocking problems", () => {
    const report = consolidateReviews("articulo", allGoodReviews(), "2026-07-21T00:00:00.000Z");
    expect(report.approved).toBe(true);
  });

  it("computes totalScore as the average across all five reviews", () => {
    const reviews = allGoodReviews();
    reviews.audience = review({ reviewer: "audience", score: 10 });
    reviews.businessValue = review({ reviewer: "business-value", score: 10 });
    reviews.pedagogy = review({ reviewer: "pedagogy", score: 6 });
    reviews.writing = review({ reviewer: "writing", score: 6 });
    reviews.seo = review({ reviewer: "seo", score: 8 });
    // average of 10, 10, 6, 6, 8 = 8
    const report = consolidateReviews("articulo", reviews, "2026-07-21T00:00:00.000Z");
    expect(report.totalScore).toBe(8);
  });

  it("rejects an article when a required review scores below the minimum", () => {
    const reviews = allGoodReviews();
    reviews.pedagogy = review({ reviewer: "pedagogy", score: 5 });
    const report = consolidateReviews("articulo", reviews, "2026-07-21T00:00:00.000Z");
    expect(report.approved).toBe(false);
  });

  it("does not require the seo review to meet the minimum score (seoIsBlocking: false)", () => {
    const reviews = allGoodReviews();
    reviews.seo = review({ reviewer: "seo", score: 2 });
    const report = consolidateReviews("articulo", reviews, "2026-07-21T00:00:00.000Z");
    expect(report.approved).toBe(true);
  });

  it("rejects an article with a blocking problem even if scores are otherwise fine", () => {
    const reviews = allGoodReviews();
    reviews.writing = review({
      reviewer: "writing",
      problems: [{ severity: "blocking", message: "Contenido incoherente con el título" }],
    });
    const report = consolidateReviews("articulo", reviews, "2026-07-21T00:00:00.000Z");
    expect(report.approved).toBe(false);
    expect(report.blockingProblems).toContain(
      "[writing] Contenido incoherente con el título"
    );
  });

  it("rejects an article when even a non-required review (seo) reports a blocking problem", () => {
    const reviews = allGoodReviews();
    reviews.seo = review({
      reviewer: "seo",
      problems: [{ severity: "blocking", message: "Compite consigo mismo por la misma búsqueda" }],
    });
    const report = consolidateReviews("articulo", reviews, "2026-07-21T00:00:00.000Z");
    expect(report.approved).toBe(false);
  });

  it("collects recommendations from every reviewer", () => {
    const reviews = allGoodReviews();
    reviews.audience = review({ reviewer: "audience", recommendations: ["Agregar un ejemplo"] });
    reviews.seo = review({ reviewer: "seo", recommendations: ["Ajustar el meta title"] });
    const report = consolidateReviews("articulo", reviews, "2026-07-21T00:00:00.000Z");
    expect(report.recommendations).toEqual(
      expect.arrayContaining(["Agregar un ejemplo", "Ajustar el meta title"])
    );
  });
});
