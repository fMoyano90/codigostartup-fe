import { ImageResponse } from "next/og";
import { services } from "@/data/services";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Servicio de Código Startup";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return services.map(({ slug }) => ({ slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  return new ImageResponse(
    renderOgImage({ title: service?.name ?? "Soluciones", eyebrow: "Solución" }),
    { ...size },
  );
}
