import { z } from "zod";

export const reviewerIds = [
  "audience",
  "business-value",
  "pedagogy",
  "writing",
  "seo",
] as const;

export type ReviewerId = (typeof reviewerIds)[number];

/** Maps the kebab-case reviewer id (file names, ReviewResult.reviewer) to the
 * camelCase key used in ArticleReviewReport.reviews / reviewRules.requiredReviews. */
export const REVIEWER_KEY_BY_ID = {
  audience: "audience",
  "business-value": "businessValue",
  pedagogy: "pedagogy",
  writing: "writing",
  seo: "seo",
} as const;

export type ReviewKey = (typeof REVIEWER_KEY_BY_ID)[ReviewerId];

export const problemSeverityValues = ["blocking", "important", "minor"] as const;

export const reviewResultSchema = z.object({
  reviewer: z.enum(reviewerIds),
  score: z.number().min(0).max(10),
  approved: z.boolean(),
  strengths: z.array(z.string()).default([]),
  problems: z
    .array(
      z.object({
        severity: z.enum(problemSeverityValues),
        message: z.string().min(1),
        location: z.string().optional(),
      })
    )
    .default([]),
  recommendations: z.array(z.string()).default([]),
});

export type ReviewResult = z.infer<typeof reviewResultSchema>;

const reviewsShapeSchema = z.object({
  audience: reviewResultSchema,
  businessValue: reviewResultSchema,
  pedagogy: reviewResultSchema,
  writing: reviewResultSchema,
  seo: reviewResultSchema,
});

export type ReviewsByKey = z.infer<typeof reviewsShapeSchema>;

export const articleReviewReportSchema = z.object({
  slug: z.string(),
  reviewedAt: z.string(),
  approved: z.boolean(),
  totalScore: z.number(),
  reviews: reviewsShapeSchema,
  blockingProblems: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export type ArticleReviewReport = z.infer<typeof articleReviewReportSchema>;

export function safeParseReviewResult(data: unknown) {
  return reviewResultSchema.safeParse(data);
}

export function safeParseArticleReviewReport(data: unknown) {
  return articleReviewReportSchema.safeParse(data);
}
