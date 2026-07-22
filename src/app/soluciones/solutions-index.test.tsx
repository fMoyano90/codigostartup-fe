import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { capabilities, projects, services } from "@/data/commercial";
import SolutionsIndexPage from "./page";

describe("solutions index", () => {
  it("organizes the offer around the four business needs", () => {
    const html = renderToStaticMarkup(<SolutionsIndexPage />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Necesito atraer clientes");
    expect(html).toContain("Necesito ordenar mi operación");
    expect(html).toContain("Quiero lanzar un producto");
    expect(html).toContain("Mi sistema necesita mejorar");
  });

  it("includes every service with situations, detail link, and contextual CTA", () => {
    const html = renderToStaticMarkup(<SolutionsIndexPage />);

    for (const service of services) {
      expect(html).toContain(service.name);
      expect(html).toContain(service.shortDescription);
      expect(html).toContain(service.problems[0]);
      expect(html).toContain(`href="/soluciones/${service.slug}"`);
      expect(html).toContain(`href="/contacto?servicio=${service.slug}"`);
      expect(html).toContain(service.cta.label);
    }
  });

  it("renders transversal capabilities, real projects, and final evaluation", () => {
    const html = renderToStaticMarkup(<SolutionsIndexPage />);

    for (const capability of capabilities) expect(html).toContain(capability.name);
    for (const project of projects) expect(html).toContain(`/proyectos/${project.slug}`);

    expect(html).toContain("No son servicios aislados");
    expect(html).toContain("Productos construidos, lanzados y operando");
    expect(html).toContain('href="/contacto?origen=soluciones"');
    expect(html).not.toContain("Marketing y publicidad digital");
  });
});
