import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/TrackView";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { RelatedServices } from "@/components/blog/RelatedServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { getCategoryBySlug } from "@/config/blog-categories";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import {
  getArticleBySlug,
  getPublishedSlugs,
} from "@/lib/blog/article-loader";
import { getRelatedArticles } from "@/lib/blog/related-articles";
import { formatArticleDate } from "@/lib/blog/article-utils";
import { getArticleCanonicalUrl } from "@/lib/blog/article-urls";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

/** Slugs outside `content/blog/published` 404 instead of rendering — drafts never leak to prod. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const { metadata } = article;
  const canonicalUrl = getArticleCanonicalUrl(metadata);

  return {
    // `seo.title` ya incluye la marca; `absolute` evita que la plantilla la duplique.
    title: { absolute: metadata.seo.title },
    description: metadata.seo.description,
    keywords: [metadata.seo.primaryKeyword, ...metadata.seo.secondaryKeywords],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metadata.seo.title,
      description: metadata.seo.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: metadata.publishedAt ?? undefined,
      modifiedTime: metadata.updatedAt,
      authors: [metadata.author],
      siteName: siteConfig.name,
      locale: "es_CL",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seo.title,
      description: metadata.seo.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { metadata, content } = article;
  const category = getCategoryBySlug(metadata.category);
  const related = getRelatedArticles(metadata);
  const relatedServices = metadata.services.flatMap((serviceSlug) => {
    const service = services.find((item) => item.slug === serviceSlug);
    return service ? [service] : [];
  });
  const ctaService = services.find((service) => service.slug === metadata.cta.target);
  const url = `${siteConfig.baseUrl}/blog/${metadata.fileSlug}`;
  const canonicalUrl = getArticleCanonicalUrl(metadata);
  // Imagen para datos estructurados: la del artículo si existe, si no el PNG
  // generado por la ruta opengraph-image (mejor que un SVG para Rich Results).
  const imageUrl = new URL(
    metadata.image?.src ?? `/blog/${metadata.fileSlug}/opengraph-image`,
    siteConfig.baseUrl,
  ).toString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    author: { "@type": "Person", name: metadata.author },
    datePublished: metadata.publishedAt,
    dateModified: metadata.updatedAt,
    mainEntityOfPage: canonicalUrl,
    image: imageUrl,
  };

  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: "Blog", url: `${siteConfig.baseUrl}/blog` },
    ...(category
      ? [{ name: category.name, url: `${siteConfig.baseUrl}/blog/categoria/${category.slug}` }]
      : []),
    { name: metadata.title, url },
  ]);

  return (
    <main className="blog-article">
      <TrackView
        event={ANALYTICS_EVENTS.readArticle}
        params={{ article: metadata.fileSlug, category: metadata.category }}
      />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          ...(category
            ? [{ label: category.name, href: `/blog/categoria/${category.slug}` }]
            : []),
          { label: metadata.title },
        ]}
      />

      <header className="article-header">
        {category && <div className="article-header-category">{category.name}</div>}
        <h1 className="article-header-title">{metadata.title}</h1>
        <p className="article-header-desc">{metadata.description}</p>
        {metadata.image && (
          <Image
            src={metadata.image.src}
            alt={metadata.image.alt}
            width={1200}
            height={630}
            className="article-header-image"
            priority
          />
        )}
        <div className="article-header-meta">
          <span>{metadata.author}</span>
          <span>·</span>
          {metadata.publishedAt && <span>{formatArticleDate(metadata.publishedAt)}</span>}
          <span>·</span>
          <span>{metadata.readingTime} min de lectura</span>
        </div>
      </header>

      <div className="article-prose">{content}</div>

      <RelatedServices services={relatedServices} />

      {ctaService && (
        <section className="article-cta article-cta--contextual" aria-labelledby="article-cta-heading">
          <span>Siguiente paso</span>
          <h2 id="article-cta-heading">{ctaService.cta.title}</h2>
          <p>{ctaService.cta.description}</p>
          <div>
            <TrackedLink
              href={`/soluciones/${ctaService.slug}`}
              event={ANALYTICS_EVENTS.clickArticleCta}
              params={{ article: metadata.fileSlug, service: ctaService.slug, cta_position: "article-primary" }}
              className="btn-primary"
            >
              Conocer {ctaService.name} →
            </TrackedLink>
            <TrackedLink
              href={`/contacto?servicio=${ctaService.slug}&origen=blog`}
              event={ANALYTICS_EVENTS.clickArticleCta}
              params={{ article: metadata.fileSlug, service: ctaService.slug, cta_position: "article-secondary" }}
              className="article-cta-secondary"
            >
              Evaluar mi proyecto
            </TrackedLink>
          </div>
        </section>
      )}

      <RelatedArticles articles={related} />
    </main>
  );
}
