import { reviewRules } from "@/config/review-rules";
import type { ArticleReviewReport, ReviewsByKey } from "@/lib/blog/review-schema";

/**
 * Pure consolidation: turns 5 individual ReviewResults into one
 * ArticleReviewReport, applying reviewRules. No filesystem access, so it's
 * directly unit-testable.
 */
export function consolidateReviews(
  slug: string,
  reviews: ReviewsByKey,
  reviewedAt: string
): ArticleReviewReport {
  const allReviews = Object.values(reviews);

  const requiredScoresOk = reviewRules.requiredReviews.every(
    (key) => reviews[key].score >= reviewRules.minimumScorePerRequiredReview
  );

  const blockingProblems = allReviews.flatMap((review) =>
    review.problems
      .filter((problem) => problem.severity === "blocking")
      .map((problem) => `[${review.reviewer}] ${problem.message}`)
  );

  const approved =
    requiredScoresOk &&
    !(reviewRules.blockingSeverityFailsArticle && blockingProblems.length > 0);

  const totalScore =
    Math.round(
      (allReviews.reduce((sum, review) => sum + review.score, 0) / allReviews.length) * 10
    ) / 10;

  const recommendations = allReviews.flatMap((review) => review.recommendations);

  return {
    slug,
    reviewedAt,
    approved,
    totalScore,
    reviews,
    blockingProblems,
    recommendations,
  };
}
