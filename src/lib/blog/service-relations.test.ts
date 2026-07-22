import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import { getAllPublishedArticles, isPubliclyPublished } from "@/lib/blog/article-loader";
import { getArticlesForService } from "@/lib/blog/service-relations";

describe("metadata-driven article and service relations", () => {
  const articles = getAllPublishedArticles();

  it("classifies every published article with related services and a matching CTA", () => {
    for (const article of articles) {
      expect(article.services.length).toBeGreaterThan(0);
      expect(article.services.length).toBeLessThanOrEqual(3);
      expect(article.services).toContain(article.cta.target);
    }
  });

  it("selects a small relevant set for every service from article metadata", () => {
    for (const service of services) {
      const related = getArticlesForService(service.slug, articles);
      expect(related.length, `${service.slug} debe tener contenido relacionado`).toBeGreaterThan(0);
      expect(related.length).toBeLessThanOrEqual(3);
      expect(related.every((article) => article.services.includes(service.slug))).toBe(true);
    }
  });

  it("prioritizes articles whose contextual CTA targets the service", () => {
    const related = getArticlesForService("desarrollo-mvp", articles, 10);
    const firstIndirect = related.findIndex((article) => article.cta.target !== "desarrollo-mvp");
    const lastDirect = related.findLastIndex((article) => article.cta.target === "desarrollo-mvp");

    expect(firstIndirect === -1 || lastDirect < firstIndirect).toBe(true);
  });

  it("does not expose scheduled articles before their publication date", () => {
    expect(isPubliclyPublished(
      { status: "published", publishedAt: "2026-07-23" },
      Date.parse("2026-07-22T23:59:59Z"),
    )).toBe(false);
    expect(isPubliclyPublished(
      { status: "published", publishedAt: "2026-07-23" },
      Date.parse("2026-07-23T04:00:00Z"),
    )).toBe(true);
  });

  it("keeps representative article mappings semantically aligned", () => {
    const expectedTargets = {
      "no-compartir-contrasenas-por-whatsapp": "auditoria-y-evolucion",
      "como-definir-el-alcance-de-un-mvp": "desarrollo-mvp",
      "cuando-automatizar-un-proceso": "automatizacion-de-procesos",
      "que-significa-que-un-software-sea-escalable": "aplicaciones-web",
    } as const;

    for (const [fileSlug, serviceSlug] of Object.entries(expectedTargets)) {
      expect(articles.find((article) => article.fileSlug === fileSlug)?.cta.target).toBe(serviceSlug);
    }
  });
});
