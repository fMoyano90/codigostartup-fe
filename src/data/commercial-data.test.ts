import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  capabilities,
  homeClientProjects,
  homeServiceGroups,
  projects,
  services,
  siteConfig,
} from "./commercial";
import { serviceSlugValues } from "@/lib/commercial/schema";

describe("commercial data", () => {
  it("defines exactly the seven services in the target architecture", () => {
    expect(services.map(({ slug }) => slug)).toEqual(serviceSlugValues);
    expect(services.some(({ slug }) => slug === ("marketing" as string))).toBe(false);
  });

  it("keeps marketing concerns as capabilities instead of services", () => {
    const capabilityNames = capabilities.map(({ name }) => name);
    expect(capabilityNames).toEqual(
      expect.arrayContaining(["Estrategia", "UX/UI", "Contenido", "SEO", "Analítica"])
    );
  });

  it("keeps project and service relationships reciprocal", () => {
    for (const service of services) {
      for (const projectSlug of service.relatedProjects) {
        const project = projects.find(({ slug }) => slug === projectSlug);
        expect(project?.relatedServices).toContain(service.slug);
      }
    }

    for (const project of projects) {
      for (const serviceSlug of project.relatedServices) {
        const service = services.find(({ slug }) => slug === serviceSlug);
        expect(service?.relatedProjects).toContain(project.slug);
      }
    }
  });

  it("references only published related articles", () => {
    const publishedDir = join(process.cwd(), "content", "blog", "published");
    const publishedSlugs = new Set(
      readdirSync(publishedDir)
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""))
    );

    for (const service of services) {
      for (const articleSlug of service.relatedArticles) {
        expect(publishedSlugs.has(articleSlug), `${articleSlug} debe estar publicado`).toBe(true);
      }
    }
  });

  it("keeps the three client cases used by the current home", () => {
    expect(homeClientProjects.map(({ slug }) => slug)).toEqual(["subtech", "entrena", "nextdrill"]);
    expect(homeClientProjects.every(({ kind }) => kind === "client")).toBe(true);
  });

  it("keeps home groups connected to services or capabilities", () => {
    for (const group of homeServiceGroups) {
      expect(group.serviceSlugs.length + group.capabilitySlugs.length).toBeGreaterThan(0);
    }
  });

  it("centralizes the current contact information", () => {
    expect(siteConfig.contact.whatsappUrl).toContain(siteConfig.contact.whatsappNumber);
    expect(siteConfig.contact.email).toBe("hola@codigostartup.com");
  });
});
