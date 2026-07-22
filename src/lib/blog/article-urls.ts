import { siteConfig } from "@/config/site";
import type { ArticleMetadata } from "@/lib/blog/article-loader";

export function getArticleCanonicalUrl(metadata: Pick<ArticleMetadata, "fileSlug" | "seo">) {
  return metadata.seo.canonicalUrl ?? `${siteConfig.baseUrl}/blog/${metadata.fileSlug}`;
}

export function isInternalCanonicalUrl(url: string) {
  try {
    return new URL(url).origin === new URL(siteConfig.baseUrl).origin;
  } catch {
    return false;
  }
}
