import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import ServiceRoutePage from "./page";
import { servicePageConfig } from "./service-page-config";

const phase7Slugs = ["sitios-web", "software-a-medida", "desarrollo-mvp"] as const;

async function renderService(slug: string) {
  const page = await ServiceRoutePage({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(page);
}

describe("phase 7 service routes", () => {
  it("marks the three primary service records as editorially ready", () => {
    for (const slug of phase7Slugs) {
      const service = services.find((item) => item.slug === slug);
      expect(service?.editorialStatus).toBe("ready");
      expect(service?.editorialNotes).toEqual([]);
      expect(service?.faq.length).toBeGreaterThan(0);
    }
  });

  it("renders the complete websites page and its contextual form", async () => {
    const html = await renderService("sitios-web");

    expect(html).not.toContain("Página en evolución");
    expect(html).toContain("Sitio corporativo");
    expect(html).toContain("Fundamentos de SEO técnico");
    expect(html).toContain("¿El sitio quedará preparado para SEO?");
    expect(html).toContain('name="websiteGoal"');
    expect(html).toContain('name="contentManagement"');
    expect(html).toContain("Cotizar mi sitio web");
  });

  it("renders software integrations, real cases, articles, and specific fields", async () => {
    const html = await renderService("software-a-medida");

    expect(html).toContain("Conectar herramientas exige revisar lo que realmente permiten");
    expect(html).toContain("SubTech");
    expect(html).toContain("NextDrill Admin");
    expect(html).toContain("Contenido relacionado");
    expect(html).toContain('name="process"');
    expect(html).toContain('name="currentMethod"');
    expect(html).toContain('name="systems"');
  });

  it("explains MVP stages and prioritization with a contextual form", async () => {
    const html = await renderService("desarrollo-mvp");

    expect(html).toContain("Idea, prototipo, MVP y producto no son lo mismo");
    expect(html).toContain("Menos funciones, más capacidad de aprender");
    expect(html).toContain("Entrena");
    expect(html).toContain("Contenido relacionado");
    expect(html).toContain('name="problem"');
    expect(html).toContain('name="prototype"');
    expect(html).toContain('name="validationGoal"');
  });

  it("defines distinct lead fields for each primary service", () => {
    const fieldSets = phase7Slugs.map((slug) =>
      servicePageConfig[slug].lead.fields.map(({ name }) => name).join(","),
    );

    expect(new Set(fieldSets).size).toBe(phase7Slugs.length);
  });
});
