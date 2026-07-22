import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { serviceSlugValues } from "@/lib/commercial/schema";
import ServiceRoutePage from "./page";
import { servicePageConfig } from "./service-page-config";

const phase8Slugs = [
  "automatizacion-de-procesos",
  "aplicaciones-web",
  "aplicaciones-moviles",
  "auditoria-y-evolucion",
] as const;

async function renderService(slug: string) {
  const page = await ServiceRoutePage({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(page);
}

describe("phase 8 service routes", () => {
  it("has complete configuration and ready content for every service", () => {
    expect(Object.keys(servicePageConfig).sort()).toEqual([...serviceSlugValues].sort());

    for (const service of services) {
      expect(service.editorialStatus).toBe("ready");
      expect(service.editorialNotes).toEqual([]);
      expect(service.faq.length).toBeGreaterThan(0);
      expect(servicePageConfig[service.slug].lead.fields.length).toBeGreaterThan(3);
    }
  });

  it("renders automation guidance, articles, and its contextual form", async () => {
    const html = await renderService("automatizacion-de-procesos");

    expect(html).not.toContain("Página en evolución");
    expect(html).toContain("Automatizar primero donde existe claridad y repetición");
    expect(html).toContain("Contenido relacionado");
    expect(html).toContain('name="repetitiveTasks"');
    expect(html).toContain('name="frequency"');
    expect(html).toContain("Detectar tareas automatizables");
    expect(html).not.toContain("project-card-grid");
  });

  it("renders web application types, real projects, and specific fields", async () => {
    const html = await renderService("aplicaciones-web");

    expect(html).toContain("SaaS");
    expect(html).toContain("Plataformas B2B");
    expect(html).toContain("Entrena");
    expect(html).toContain("NextDrill Admin");
    expect(html).toContain("Núcleo Gestor");
    expect(html).toContain('name="appProblem"');
    expect(html).toContain('name="appStage"');
  });

  it("renders mobile operating contexts, real projects, and specific fields", async () => {
    const html = await renderService("aplicaciones-moviles");

    expect(html).toContain("La aplicación debe responder al lugar donde se utiliza");
    expect(html).toContain("Sin conexión");
    expect(html).toContain("Entrena");
    expect(html).toContain("Núcleo Gestor");
    expect(html).toContain('name="mobileUsers"');
    expect(html).toContain('name="connectivity"');
  });

  it("renders the audit scope and does not invent a related case", async () => {
    const html = await renderService("auditoria-y-evolucion");

    expect(html).toContain("Diagnóstico técnico");
    expect(html).toContain("¿Necesitan acceso al código fuente?");
    expect(html).toContain("Contenido relacionado");
    expect(html).toContain('name="systemProblem"');
    expect(html).toContain('name="codeAccess"');
    expect(html).toContain('name="documentation"');
    expect(html).not.toContain("project-card-grid");
  });

  it("keeps distinct contextual fields across the Phase 8 forms", () => {
    const fieldSets = phase8Slugs.map((slug) =>
      servicePageConfig[slug].lead.fields.map(({ name }) => name).join(","),
    );

    expect(new Set(fieldSets).size).toBe(phase8Slugs.length);
  });

  it("connects every service form to lead tracking and the booking calendar", async () => {
    for (const service of services) {
      const html = await renderService(service.slug);

      expect(html).toContain(`name="service" value="${service.slug}"`);
      expect(html).toContain(`name="formType" value="${service.cta.formType}"`);
      expect(html).toContain(`name="cta" value="service-form-${service.slug}"`);
      expect(html).toContain(siteConfig.contact.bookingUrl);
      expect(html).toContain("Prefiero agendar una reunión");
    }
  });
});
