export const editorialRules = {
  minimumWords: 900,
  maximumWords: 2500,
  minimumInternalLinks: 2,
  minimumReviewScore: 7,

  requiredFrontmatterFields: [
    "title",
    "slug",
    "description",
    "excerpt",
    "category",
    "audience",
    "intent",
    "funnelStage",
    "services",
    "cta",
    "author",
    "status",
    "seo",
  ] as const,

  blockedExpressions: [
    "En el mundo actual",
    "En la era digital",
    "Es importante destacar",
    "Cabe señalar",
    "Llevar tu negocio al siguiente nivel",
    "Solución revolucionaria",
    "Sin lugar a dudas",
    "En conclusión",
  ],
} as const;

export type EditorialRules = typeof editorialRules;
