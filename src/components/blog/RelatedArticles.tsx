import { ArticleCard } from "@/components/blog/ArticleCard";
import type { ArticleMetadata } from "@/lib/blog/article-loader";

export function RelatedArticles({ articles }: { articles: ArticleMetadata[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="related-articles" aria-labelledby="related-articles-heading">
      <h2 id="related-articles-heading" className="related-articles-title">
        Artículos relacionados
      </h2>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.fileSlug} article={article} />
        ))}
      </div>
    </section>
  );
}
