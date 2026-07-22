import { ImageResponse } from "next/og";
import { getCategoryBySlug } from "@/config/blog-categories";
import { getArticleMetadataBySlug, getPublishedSlugs } from "@/lib/blog/article-loader";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Artículo del blog de Código Startup";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const metadata = getArticleMetadataBySlug(slug);
  const category = metadata ? getCategoryBySlug(metadata.category) : undefined;

  return new ImageResponse(
    renderOgImage({ title: metadata?.title ?? "Blog", eyebrow: category?.name }),
    { ...size },
  );
}
