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

  it("accepts an optional article image with accessible alternative text", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({
      image: { src: "/og-image.svg", alt: "Código Startup" },
    }));
    expect(result.success).toBe(true);
  });

  it("requires the CTA target to be one of the related services", () => {
    const result = safeParseArticleFrontmatter(validFrontmatter({
      services: ["desarrollo-mvp"],
      cta: { type: "service", target: "sitios-web" },
    }));
    expect(result.success).toBe(false);
  });

  it("requires publishedAt only for published articles", () => {
    const publishedWithoutDate = safeParseArticleFrontmatter(validFrontmatter({ status: "published" }));
    const draftWithDate = safeParseArticleFrontmatter(validFrontmatter({ publishedAt: "2026-07-21" }));
    const published = safeParseArticleFrontmatter(validFrontmatter({
      status: "published",
      approvedAt: "2026-07-21",
      publishedAt: "2026-07-21",
    }));

    expect(publishedWithoutDate.success).toBe(false);
    expect(draftWithDate.success).toBe(false);
    expect(published.success).toBe(true);
  });

  it("rejects duplicate services and unsafe image paths", () => {
    const duplicateServices = safeParseArticleFrontmatter(validFrontmatter({
      services: ["desarrollo-mvp", "desarrollo-mvp"],
    }));
    const remoteImage = safeParseArticleFrontmatter(validFrontmatter({
      image: { src: "//example.com/image.jpg", alt: "Imagen remota" },
    }));
    const traversalImage = safeParseArticleFrontmatter(validFrontmatter({
      image: { src: "/blog/../secret.png", alt: "Ruta inválida" },
    }));

    expect(duplicateServices.success).toBe(false);
    expect(remoteImage.success).toBe(false);
    expect(traversalImage.success).toBe(false);
  });
});
