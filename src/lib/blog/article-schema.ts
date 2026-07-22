import { z } from "zod";
import { blogCategorySlugs } from "../../config/blog-categories";

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
});

export type BlogArticleFrontmatter = z.infer<typeof blogArticleFrontmatterSchema>;

export function parseArticleFrontmatter(data: unknown): BlogArticleFrontmatter {
  return blogArticleFrontmatterSchema.parse(data);
}

export function safeParseArticleFrontmatter(data: unknown) {
  return blogArticleFrontmatterSchema.safeParse(data);
}
