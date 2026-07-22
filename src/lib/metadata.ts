import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  /** Título corto de la página, sin marca. La plantilla del layout raíz añade "| Código Startup". */
  title: string;
  description: string;
  path: `/${string}`;
};

/**
 * Metadatos base para páginas estáticas. El `title` se combina con la plantilla
 * del layout raíz (`%s | Código Startup`) para el título del documento, mientras
 * que Open Graph/Twitter reciben el título ya con marca (esos campos no se templan).
 * La imagen social la aporta la convención de archivo `opengraph-image` de cada ruta.
 */
export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = `${siteConfig.baseUrl}${path}`;
  const brandedTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "es_CL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
    },
  };
}
