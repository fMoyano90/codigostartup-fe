import Link from "next/link";
import { getCategoryBySlug } from "@/config/blog-categories";
import { formatArticleDate } from "@/lib/blog/article-utils";
import type { ArticleMetadata } from "@/lib/blog/article-loader";

export function FeaturedHeroCard({ article }: { article: ArticleMetadata }) {
  const category = getCategoryBySlug(article.category);

  return (
    <article className="featured-hero-card">
      {category && <div className="featured-hero-category">{category.name}</div>}
      <h3 className="featured-hero-title">
        <Link href={`/blog/${article.fileSlug}`}>{article.title}</Link>
      </h3>
      <p className="featured-hero-excerpt">{article.excerpt}</p>
      <div className="featured-hero-meta">
        {article.publishedAt && <span>{formatArticleDate(article.publishedAt)}</span>}
        <span>·</span>
        <span>{article.readingTime} min de lectura</span>
      </div>
      <Link href={`/blog/${article.fileSlug}`} className="featured-hero-link btn-primary">
        Leer artículo →
      </Link>
    </article>
  );
}
