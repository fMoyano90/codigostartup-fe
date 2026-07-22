import { describe, it, expect } from "vitest";
import { safeParseArticleFrontmatter } from "./article-schema";

function validFrontmatter(overrides: Record<string, unknown> = {}) {
  return {
    title: "Título de prueba",
    slug: "titulo-de-prueba",
    description: "Descripción de prueba",
    excerpt: "Excerpt de prueba",
    category: "crear-productos-digitales",
    tags: ["prueba"],
    audience: ["founders"],
    intent: "informational",
    funnelStage: "awareness",
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

describe("blogArticleFrontmatterSchema", () => {
  it("accepts a valid frontmatter object", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter());
    expect(result.success).toBe(true);
  });

  it("rejects a category outside the configured list", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({ category: "no-existe" }));
    expect(result.success).toBe(false);
  });

  it("rejects a slug that isn't kebab-case", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({ slug: "Titulo_Con_Mayus" }));
    expect(result.success).toBe(false);
  });

  it("rejects an invalid date string", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({ createdAt: "no-es-una-fecha" }));
    expect(result.success).toBe(false);
  });

  it("rejects an empty audience array", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({ audience: [] }));
    expect(result.success).toBe(false);
  });

  it("rejects a status outside the ArticleStatus enum", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({ status: "archived" }));
    expect(result.success).toBe(false);
  });

  it("rejects when a required field is missing", () => {
    const withoutTitle: Record<string, unknown> = validFrontmatter();
    delete withoutTitle.title;
    const result = safeParseArticleFrontmatter(withoutTitle);
    expect(result.success).toBe(false);
  });
});
