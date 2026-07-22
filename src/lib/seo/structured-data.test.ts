import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildWebSiteSchema,
} from "./structured-data";

describe("structured data builders", () => {
  it("builds an Organization from real config data only", () => {
    const org = buildOrganizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe(siteConfig.name);
    expect(org.url).toBe(siteConfig.baseUrl);
    expect(org.logo).toBe(`${siteConfig.baseUrl}/logo.svg`);
    expect((org.contactPoint as { email: string }).email).toBe(siteConfig.contact.email);
  });

  it("omits sameAs when no social profiles are configured", () => {
    const sameAs = [siteConfig.social.linkedin, siteConfig.social.instagram].filter(Boolean);
    const org = buildOrganizationSchema();
    if (sameAs.length === 0) {
      expect(org.sameAs).toBeUndefined();
    } else {
      expect(org.sameAs).toEqual(sameAs);
    }
  });

  it("builds a WebSite in the site locale", () => {
    const site = buildWebSiteSchema();
    expect(site["@type"]).toBe("WebSite");
    expect(site.inLanguage).toBe("es-CL");
    expect((site.publisher as { name: string }).name).toBe(siteConfig.name);
  });

  it("builds a Service with an Organization provider and canonical url", () => {
    const service = services.find((item) => item.slug === "sitios-web")!;
    const schema = buildServiceSchema(service);
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe(service.name);
    expect(schema.url).toBe(`${siteConfig.baseUrl}/soluciones/sitios-web`);
    expect((schema.provider as { "@type": string })["@type"]).toBe("Organization");
  });

  it("mirrors service FAQ entries into a FAQPage", () => {
    const service = services.find((item) => item.slug === "sitios-web")!;
    const schema = buildFaqPageSchema(service.faq);
    const mainEntity = schema.mainEntity as Array<{
      "@type": string;
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(schema["@type"]).toBe("FAQPage");
    expect(mainEntity).toHaveLength(service.faq.length);
    expect(mainEntity[0].name).toBe(service.faq[0].question);
    expect(mainEntity[0].acceptedAnswer.text).toBe(service.faq[0].answer);
  });

  it("numbers breadcrumb positions and only emits item when a url exists", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Inicio", url: "https://codigostartup.com" },
      { name: "Actual" },
    ]);
    const list = schema.itemListElement as Array<Record<string, unknown>>;
    expect(list[0].position).toBe(1);
    expect(list[0].item).toBe("https://codigostartup.com");
    expect(list[1].position).toBe(2);
    expect(list[1].item).toBeUndefined();
  });
});
