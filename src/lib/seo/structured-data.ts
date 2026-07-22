import { siteConfig } from "@/config/site";
import type { Service } from "@/lib/commercial/schema";

type JsonLdObject = Record<string, unknown>;

export type BreadcrumbEntry = {
  name: string;
  /** URL absoluta o ruta; se omite en el último elemento cuando no aplica. */
  url?: string;
};

/** Referencia reutilizable a la organización, sin repetir todos sus campos. */
function organizationRef(): JsonLdObject {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
  };
}

/**
 * Organization con solo datos reales del repositorio: nombre, sitio, logo,
 * contacto por correo y perfiles sociales configurados. Sin dirección,
 * teléfono fijo, valoraciones ni años de experiencia (no se inventan).
 */
export function buildOrganizationSchema(): JsonLdObject {
  const sameAs = [siteConfig.social.linkedin, siteConfig.social.instagram].filter(
    (url): url is string => Boolean(url),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/logo.svg`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer support",
      availableLanguage: ["Spanish"],
    },
  };
}

export function buildWebSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    inLanguage: "es-CL",
    publisher: organizationRef(),
  };
}

export function buildServiceSchema(service: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    serviceType: service.name,
    url: `${siteConfig.baseUrl}/soluciones/${service.slug}`,
    provider: organizationRef(),
    areaServed: { "@type": "Country", name: "Chile" },
  };
}

export function buildFaqPageSchema(
  faq: ReadonlyArray<{ question: string; answer: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildBreadcrumbSchema(items: ReadonlyArray<BreadcrumbEntry>): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
