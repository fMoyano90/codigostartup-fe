import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { getCategoryBySlug } from "@/config/blog-categories";
import { siteConfig } from "@/config/site";
import {
  getArticleBySlug,
  getPublishedSlugs,
} from "@/lib/blog/article-loader";
import { getRelatedArticles } from "@/lib/blog/related-articles";
import { formatArticleDate } from "@/lib/blog/article-utils";

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
  const url = `${siteConfig.baseUrl}/blog/${metadata.fileSlug}`;

  return {
    title: metadata.seo.title,
    description: metadata.seo.description,
    keywords: [metadata.seo.primaryKeyword, ...metadata.seo.secondaryKeywords],
    alternates: { canonical: metadata.seo.canonicalUrl ?? url },
    openGraph: {
      title: metadata.seo.title,
      description: metadata.seo.description,
      url,
      type: "article",
      publishedTime: metadata.publishedAt ?? undefined,
      modifiedTime: metadata.updatedAt,
      authors: [metadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seo.title,
      description: metadata.seo.description,
    },
  };
}

function escapeJsonLd(value: string): string {
  return value.replace(/</g, "\\u003c");
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
  const url = `${siteConfig.baseUrl}/blog/${metadata.fileSlug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    author: { "@type": "Person", name: metadata.author },
    datePublished: metadata.publishedAt,
    dateModified: metadata.updatedAt,
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${siteConfig.baseUrl}/blog` },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `${siteConfig.baseUrl}/blog/categoria/${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: metadata.title,
        item: url,
      },
    ],
  };

  return (
    <main className="blog-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(articleJsonLd)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(breadcrumbJsonLd)) }}
      />

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
        <div className="article-header-meta">
          <span>{metadata.author}</span>
          <span>·</span>
          {metadata.publishedAt && <span>{formatArticleDate(metadata.publishedAt)}</span>}
          <span>·</span>
          <span>{metadata.readingTime} min de lectura</span>
        </div>
      </header>

      <div className="article-prose">{content}</div>

      <section className="article-cta">
        <p>¿Quieres evaluar cómo aplicar esto a tu proyecto?</p>
        <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
          Cuéntanos tu caso →
        </a>
      </section>

      <RelatedArticles articles={related} />
    </main>
  );
}
