import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { getArticleMetadataBySlug } from "@/lib/blog/article-loader";
import { getArticleCanonicalUrl } from "@/lib/blog/article-urls";
import ArticlePage, { generateMetadata } from "./[slug]/page";

const articleSlug = "como-definir-el-alcance-de-un-mvp";

describe("phase 12 commercial blog integration", () => {
  it("renders related services and a contextual service CTA from article metadata", async () => {
    const page = await ArticlePage({ params: Promise.resolve({ slug: articleSlug }) });
    const html = renderToStaticMarkup(page);

    expect(html).toContain("Soluciones relacionadas");
    expect(html).toContain('href="/soluciones/desarrollo-mvp"');
    expect(html).toContain('href="/soluciones/aplicaciones-web"');
    expect(html).toContain("Evaluemos la idea y lo que necesitas validar");
    expect(html).toContain('href="/contacto?servicio=desarrollo-mvp&amp;origen=blog"');
    expect(html).not.toContain(siteConfig.contact.whatsappUrl);
  });

  it("publishes article Open Graph metadata (social image comes from the opengraph-image route)", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: articleSlug }) });

    expect(metadata.openGraph).toMatchObject({
      siteName: siteConfig.name,
      locale: "es_CL",
      type: "article",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
    });
    // La imagen ya no se codifica en los metadatos: la genera el archivo
    // `opengraph-image.tsx` del segmento (título del artículo sobre marca).
    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });

  it("uses a canonical override consistently when one is configured", () => {
    const article = getArticleMetadataBySlug(articleSlug);
    if (!article) throw new Error("Falta artículo de prueba");
    const canonicalUrl = getArticleCanonicalUrl({
      ...article,
      seo: { ...article.seo, canonicalUrl: "https://example.com/original" },
    });

    expect(canonicalUrl).toBe("https://example.com/original");
  });
});
