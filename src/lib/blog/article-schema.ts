import { z } from "zod";
import { blogCategorySlugs } from "../../config/blog-categories";
import { serviceSlugSchema } from "@/lib/commercial/schema";
import { formatCalendarDate } from "@/lib/blog/article-utils";

export const articleStatusValues = [
  "draft",
  "approved",
  "published",
  "rejected",
] as const;

export type ArticleStatus = (typeof articleStatusValues)[number];

export const audienceValues = [
  "founders",
  "emprendedores",
  "empresarios",
  "gerentes",
] as const;

export type Audience = (typeof audienceValues)[number];

export const intentValues = [
  "informational",
  "commercial",
  "transactional",
] as const;

export const funnelStageValues = [
  "awareness",
  "consideration",
  "decision",
] as const;

export const reviewStatusValues = [
  "pending",
  "passed",
  "changes_required",
] as const;

export const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    "El slug debe ser kebab-case (minúsculas, números y guiones)"
  );

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida, se espera YYYY-MM-DD")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Fecha inválida, se espera un string parseable (ej: 2026-07-21)",
  });

const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  primaryKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url().optional(),
});

const articleImageSchema = z.object({
  src: z.string().regex(/^\/(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$)).+/, "image.src debe ser una ruta segura dentro de public"),
  alt: z.string().trim().min(1),
});

const articleCtaSchema = z.object({
  type: z.literal("service"),
  target: serviceSlugSchema,
});

export const blogArticleFrontmatterSchema = z.object({
  title: z.string().min(1, "title es obligatorio"),
  slug: slugSchema,
  description: z.string().min(1, "description es obligatorio"),
  excerpt: z.string().min(1, "excerpt es obligatorio"),

  category: z
    .string()
    .refine((value) => blogCategorySlugs.includes(value), {
      message: `category debe ser una de: ${blogCategorySlugs.join(", ")}`,
    }),
  tags: z.array(z.string()).default([]),

  audience: z.array(z.enum(audienceValues)).min(1, "audience no puede estar vacío"),

  intent: z.enum(intentValues),
  funnelStage: z.enum(funnelStageValues),
  services: z.array(serviceSlugSchema).min(1).max(3).refine(
    (services) => new Set(services).size === services.length,
    "services no puede contener valores duplicados",
  ),
  cta: articleCtaSchema,
  image: articleImageSchema.optional(),

  author: z.string().min(1, "author es obligatorio"),
  status: z.enum(articleStatusValues),
  featured: z.boolean().default(false),

  createdAt: dateStringSchema,
  updatedAt: dateStringSchema,
  approvedAt: dateStringSchema.nullable().optional(),
  publishedAt: dateStringSchema.nullable().optional(),

  seo: seoSchema,

  relatedArticles: z.array(z.string()).default([]),

  reviewStatus: z.enum(reviewStatusValues).optional(),
  reviewScore: z.number().min(0).max(10).nullable().optional(),
}).superRefine((article, ctx) => {
  if (!article.services.includes(article.cta.target)) {
    ctx.addIssue({
      code: "custom",
      path: ["cta", "target"],
      message: "cta.target debe estar incluido en services",
    });
  }

  if (article.status === "published" && !article.publishedAt) {
    ctx.addIssue({
      code: "custom",
      path: ["publishedAt"],
      message: "publishedAt es obligatorio cuando status es published",
    });
  }

  if (article.status !== "published" && article.publishedAt) {
    ctx.addIssue({
      code: "custom",
      path: ["publishedAt"],
      message: "publishedAt debe estar vacío mientras el artículo no esté publicado",
    });
  }

  if ((article.status === "approved" || article.status === "published") && !article.approvedAt) {
    ctx.addIssue({
      code: "custom",
      path: ["approvedAt"],
      message: "approvedAt es obligatorio para artículos aprobados o publicados",
    });
  }

  if ((article.status === "draft" || article.status === "rejected") && article.approvedAt) {
    ctx.addIssue({
      code: "custom",
      path: ["approvedAt"],
      message: "approvedAt debe estar vacío para borradores o artículos rechazados",
    });
  }

  const dates = [article.createdAt, article.approvedAt, article.publishedAt, article.updatedAt]
    .filter((value): value is string => Boolean(value))
    .map(Date.parse);
  if (dates.some((date, index) => index > 0 && date < dates[index - 1])) {
    ctx.addIssue({
      code: "custom",
      path: ["updatedAt"],
      message: "Las fechas del flujo editorial deben mantener orden cronológico",
    });
  }

  const today = formatCalendarDate(Date.now());
  if (article.status === "published" && article.publishedAt && article.publishedAt > today) {
    ctx.addIssue({
      code: "custom",
      path: ["publishedAt"],
      message: "Un artículo no puede marcarse como published antes de su fecha de publicación",
    });
  }
  if (article.updatedAt > today) {
    ctx.addIssue({
      code: "custom",
      path: ["updatedAt"],
      message: "updatedAt no puede estar en el futuro",
    });
  }
});

export type BlogArticleFrontmatter = z.infer<typeof blogArticleFrontmatterSchema>;

export function parseArticleFrontmatter(data: unknown): BlogArticleFrontmatter {
  return blogArticleFrontmatterSchema.parse(data);
}

export function safeParseArticleFrontmatter(data: unknown) {
  return blogArticleFrontmatterSchema.safeParse(data);
}
