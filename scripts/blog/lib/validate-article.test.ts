import { describe, it, expect } from "vitest";
import { validateArticleContent, hasBlockingErrors } from "./validate-article";

function frontmatterBlock(overrides: Record<string, string> = {}) {
  const fields = {
    title: "Título de prueba",
    slug: "titulo-de-prueba",
    description: "Descripción de prueba",
    excerpt: "Excerpt de prueba",
    category: "crear-productos-digitales",
    audience: '["founders"]',
    intent: "informational",
    funnelStage: "awareness",
    services: '["desarrollo-mvp"]',
    author: "Código Startup",
    status: "draft",
    createdAt: "2026-07-21",
    updatedAt: "2026-07-21",
    approvedAt: "null",
    publishedAt: "null",
    ...overrides,
  };

  return `---
title: "${fields.title}"
slug: "${fields.slug}"
description: "${fields.description}"
excerpt: "${fields.excerpt}"
category: "${fields.category}"
audience: ${fields.audience}
intent: "${fields.intent}"
funnelStage: "${fields.funnelStage}"
services: ${fields.services}
cta:
  type: service
  target: desarrollo-mvp
author: "${fields.author}"
status: "${fields.status}"
featured: false
createdAt: "${fields.createdAt}"
updatedAt: "${fields.updatedAt}"
approvedAt: ${fields.approvedAt}
publishedAt: ${fields.publishedAt}
seo:
  title: "SEO"
  description: "SEO"
  primaryKeyword: "kw"
  secondaryKeywords: []
relatedArticles: []
---
`;
}

function longEnoughBody(): string {
  const paragraph =
    "Contenido de prueba con suficientes palabras para superar el mínimo exigido por las reglas editoriales del proyecto de blog. ";
  return Array(70).fill(paragraph).join("\n\n");
}

describe("validateArticleContent", () => {
  it("reports no errors for a well-formed article with enough internal links", () => {
    const body = `${longEnoughBody()}\n\n[link 1](/blog/otro-articulo) y [link 2](/blog/categoria/crear-productos-digitales).`;
    const raw = frontmatterBlock() + body;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    expect(hasBlockingErrors(result)).toBe(false);
  });

  it("flags malformed frontmatter as a critical error instead of throwing", () => {
    const raw = "---\ntitle: [unterminated\n---\ncontenido";
    const result = validateArticleContent(raw, "cualquiera", "drafts", []);
    expect(hasBlockingErrors(result)).toBe(true);
  });

  it("flags a slug mismatch between the filename and the frontmatter", () => {
    const raw = frontmatterBlock({ slug: "otro-slug" }) + longEnoughBody();
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    expect(
      result.issues.some((issue) => issue.message.includes("no coincide con el nombre de archivo"))
    ).toBe(true);
  });

  it("flags an article below the minimum word count", () => {
    const raw = frontmatterBlock() + "Texto muy corto.";
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    expect(result.issues.some((issue) => issue.message.includes("menos que el mínimo"))).toBe(true);
  });

  it("flags a body that repeats the H1 already rendered from frontmatter", () => {
    const raw = frontmatterBlock() + `# Encabezado duplicado\n\n${longEnoughBody()}`;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    expect(result.issues.some((issue) => issue.message.includes("H1"))).toBe(true);
  });

  it("flags a nonexistent related article", () => {
    const raw =
      frontmatterBlock({}).replace("relatedArticles: []", 'relatedArticles: ["no-existe"]') +
      `${longEnoughBody()}\n\n[link](/blog/otro) [link2](/blog/categoria/x)`;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    expect(
      result.issues.some((issue) => issue.message.includes('El artículo relacionado "no-existe" no existe'))
    ).toBe(true);
  });

  it("does not flag a related article that does exist", () => {
    const raw =
      frontmatterBlock({}).replace("relatedArticles: []", 'relatedArticles: ["otro-articulo"]') +
      `${longEnoughBody()}\n\n[link](/blog/otro) [link2](/blog/categoria/x)`;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", [
      "titulo-de-prueba",
      "otro-articulo",
    ]);
    expect(result.issues.some((issue) => issue.message.includes("no existe"))).toBe(false);
  });

  it("reports blocked expressions as warnings, not errors", () => {
    const raw =
      frontmatterBlock() + `En la era digital, ${longEnoughBody()}`;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    const blockedIssue = result.issues.find((issue) => issue.message.includes("desaconsejada"));
    expect(blockedIssue?.level).toBe("warning");
  });

  it("flags fewer internal links than the configured minimum", () => {
    const raw = frontmatterBlock() + `${longEnoughBody()}\n\n[único link](/blog/otro)`;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba", "otro"]);
    expect(result.issues.some((issue) => issue.message.includes("enlace(s) interno(s)"))).toBe(true);
  });

  it("flags a status that does not match its content directory", () => {
    const body = `${longEnoughBody()}\n\n[link](/blog/otro) [link2](/blog/categoria/x)`;
    const draftInPublished = validateArticleContent(
      frontmatterBlock() + body,
      "titulo-de-prueba",
      "published",
      ["titulo-de-prueba"],
    );
    const publishedInDrafts = validateArticleContent(
      frontmatterBlock({
        status: "published",
        approvedAt: '"2026-07-21"',
        publishedAt: '"2026-07-21"',
      }) + body,
      "titulo-de-prueba",
      "drafts",
      ["titulo-de-prueba"],
    );

    expect(draftInPublished.issues.some((issue) => issue.message.includes("no corresponde a la carpeta"))).toBe(true);
    expect(publishedInDrafts.issues.some((issue) => issue.message.includes("no corresponde a la carpeta"))).toBe(true);
  });

  it("flags an unclosed Callout tag", () => {
    const raw =
      frontmatterBlock() +
      `${longEnoughBody()}\n\n<Callout variant="tip" title="Unclosed"\n  Text\n</Callout>\n\n[link](/blog/otro) [link2](/blog/categoria/x)`;
    const result = validateArticleContent(raw, "titulo-de-prueba", "drafts", ["titulo-de-prueba"]);
    expect(result.issues.some((issue) => issue.message.includes("Etiqueta <Callout ...> malformada"))).toBe(true);
  });
});
