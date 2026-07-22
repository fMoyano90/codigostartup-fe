import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";
import { GET } from "./route";

describe("RSS feed", () => {
  it("publishes every visible article and excludes draft-directory content", async () => {
    const response = GET();
    const xml = await response.text();
    const published = getAllPublishedArticles();
    const draftSlugs = readdirSync(join(process.cwd(), "content", "blog", "drafts"))
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));

    expect(response.headers.get("Content-Type")).toContain("application/rss+xml");
    expect(xml.match(/<item>/g)).toHaveLength(published.length);
    for (const article of published) expect(xml).toContain(`/blog/${article.fileSlug}`);
    for (const draftSlug of draftSlugs) expect(xml).not.toContain(`/blog/${draftSlug}`);
  });

  it("only links to internal canonical URLs on this domain", async () => {
    const xml = await GET().text();
    const links = [...xml.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1]);
    const itemLinks = links.filter((link) => link.includes("/blog/") && !link.endsWith("/blog"));
    expect(itemLinks.length).toBeGreaterThan(0);
    for (const link of itemLinks) {
      expect(link.startsWith(siteConfig.baseUrl)).toBe(true);
    }
  });
});
