export const reviewRules = {
  minimumScorePerRequiredReview: 7,

  requiredReviews: ["audience", "businessValue", "pedagogy", "writing"] as const,

  seoIsBlocking: false,
  blockingSeverityFailsArticle: true,
} as const;

export type ReviewRules = typeof reviewRules;
