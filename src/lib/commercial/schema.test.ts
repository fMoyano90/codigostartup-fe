import { describe, expect, it } from "vitest";
import { assertUniqueSlugs, serviceSchema } from "./schema";

function validService(overrides: Record<string, unknown> = {}) {
  return {
    slug: "sitios-web",
    name: "Sitios web",
    need: "presencia-digital",
    shortDescription: "Descripción breve",
    hero: { title: "Título", description: "Descripción" },
    audience: [],
    problems: [],
    solutionTypes: [],
    deliverables: [],
    capabilities: ["ux-ui"],
    process: [],
    relatedProjects: [],
    faq: [],
    cta: {
      title: "CTA",
      description: "Descripción CTA",
      label: "Contactar",
      formType: "sitios-web",
    },
    seo: { title: "SEO", description: "Descripción SEO" },
    editorialStatus: "draft",
    editorialNotes: ["Pendiente revisión"],
    ...overrides,
  };
}

describe("serviceSchema", () => {
  it("accepts a complete draft service", () => {
    expect(serviceSchema.safeParse(validService()).success).toBe(true);
  });

  it("rejects a service outside the target architecture", () => {
    const result = serviceSchema.safeParse(validService({ slug: "marketing" }));
    expect(result.success).toBe(false);
  });

  it("rejects an unknown transverse capability", () => {
    const result = serviceSchema.safeParse(validService({ capabilities: ["marketing"] }));
    expect(result.success).toBe(false);
  });

  it("rejects incomplete CTA data", () => {
    const result = serviceSchema.safeParse(validService({ cta: { title: "CTA" } }));
    expect(result.success).toBe(false);
  });

  it("rejects an incomplete service marked as ready", () => {
    const result = serviceSchema.safeParse(
      validService({ editorialStatus: "ready", editorialNotes: [] })
    );
    expect(result.success).toBe(false);
  });

  it("requires drafts to identify their editorial pending work", () => {
    const result = serviceSchema.safeParse(validService({ editorialNotes: [] }));
    expect(result.success).toBe(false);
  });
});

describe("assertUniqueSlugs", () => {
  it("throws when a collection contains duplicate slugs", () => {
    expect(() => assertUniqueSlugs([{ slug: "a" }, { slug: "a" }], "prueba")).toThrow(
      "Hay slugs duplicados en prueba"
    );
  });
});
