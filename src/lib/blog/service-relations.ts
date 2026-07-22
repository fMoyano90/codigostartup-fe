import { getAllPublishedArticles, type ArticleMetadata } from "@/lib/blog/article-loader";
import type { ServiceSlug } from "@/lib/commercial/schema";

const funnelScore = { awareness: 1, consideration: 2, decision: 3 } as const;
const intentScore = { informational: 1, commercial: 2, transactional: 3 } as const;

function relevanceScore(article: ArticleMetadata, serviceSlug: ServiceSlug) {
  return (
    (article.cta.target === serviceSlug ? 100 : 0)
    + funnelScore[article.funnelStage] * 10
    + intentScore[article.intent]
  );
}

export function getArticlesForService(
  serviceSlug: ServiceSlug,
  articles: ArticleMetadata[] = getAllPublishedArticles(),
  limit = 3,
) {
  return articles
    .filter((article) => article.services.includes(serviceSlug))
    .sort((a, b) => {
      const scoreDifference = relevanceScore(b, serviceSlug) - relevanceScore(a, serviceSlug);
      if (scoreDifference !== 0) return scoreDifference;
      return Date.parse(b.publishedAt ?? "") - Date.parse(a.publishedAt ?? "");
    })
    .slice(0, limit);
}
