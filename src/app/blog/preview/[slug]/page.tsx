import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCategoryBySlug } from "@/config/blog-categories";
import { getArticleBySlug } from "@/lib/blog/article-loader";
import { formatArticleDate } from "@/lib/blog/article-utils";

type Params = { slug: string };

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Dev-only preview of a draft. Always 404s in production so drafts never
 * get a reachable public route — see docs/blog-architecture.md.
 */
export default async function DraftPreviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  if (process.env.NODE_ENV === "production") notFound();

  const { slug } = await params;
  const article = await getArticleBySlug(slug, "drafts");
  if (!article) notFound();

  const { metadata: articleMetadata, content } = article;
  const category = getCategoryBySlug(articleMetadata.category);

  return (
    <main className="blog-article">
      <div className="draft-preview-banner">
        Vista previa de borrador — no visible en producción
      </div>

      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: articleMetadata.title }]}
      />

      <header className="article-header">
        {category && <div className="article-header-category">{category.name}</div>}
        <h1 className="article-header-title">{articleMetadata.title}</h1>
        <p className="article-header-desc">{articleMetadata.description}</p>
        <div className="article-header-meta">
          <span>{articleMetadata.author}</span>
          <span>·</span>
          <span>{formatArticleDate(articleMetadata.updatedAt)}</span>
          <span>·</span>
          <span>{articleMetadata.readingTime} min de lectura</span>
        </div>
      </header>

      <div className="article-prose">{content}</div>
    </main>
  );
}
