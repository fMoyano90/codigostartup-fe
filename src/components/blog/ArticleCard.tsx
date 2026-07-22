import Link from "next/link";
import { getCategoryBySlug } from "@/config/blog-categories";
import { formatArticleDate } from "@/lib/blog/article-utils";
import type { ArticleMetadata } from "@/lib/blog/article-loader";

export function ArticleCard({ article }: { article: ArticleMetadata }) {
  const category = getCategoryBySlug(article.category);

  return (
    <article className="article-card">
      {category && (
        <div className="article-card-category">{category.name}</div>
      )}
      <h3 className="article-card-title">
        <Link href={`/blog/${article.fileSlug}`}>{article.title}</Link>
      </h3>
      <p className="article-card-excerpt">{article.excerpt}</p>
      <div className="article-card-meta">
        {article.publishedAt && <span>{formatArticleDate(article.publishedAt)}</span>}
        <span>·</span>
        <span>{article.readingTime} min de lectura</span>
      </div>
      <Link href={`/blog/${article.fileSlug}`} className="article-card-link">
        Leer artículo →
      </Link>
    </article>
  );
}
