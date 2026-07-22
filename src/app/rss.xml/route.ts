import { siteConfig } from "@/config/site";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";
import { getArticleCanonicalUrl, isInternalCanonicalUrl } from "@/lib/blog/article-urls";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const feedUrl = `${siteConfig.baseUrl}/rss.xml`;
  const articles = getAllPublishedArticles();
  const items = articles
    .map((article) => ({ article, url: getArticleCanonicalUrl(article) }))
    // Un feed del dominio no debería enlazar a otro origen (simetría con el sitemap).
    .filter(({ url }) => isInternalCanonicalUrl(url))
    .map(({ article, url }) => {
      const articleUrl = escapeXml(url);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${escapeXml(article.description)}</description>
      <category>${escapeXml(article.category)}</category>
      <pubDate>${new Date(article.publishedAt as string).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Código Startup</title>
    <link>${siteConfig.baseUrl}/blog</link>
    <description>Guías para crear productos digitales, automatizar procesos y tomar mejores decisiones tecnológicas.</description>
    <language>es-CL</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
