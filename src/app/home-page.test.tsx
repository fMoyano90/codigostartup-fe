import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { capabilities, homeClientProjects, services } from "@/data/commercial";
import Home from "./page";

vi.mock("@/components/HomeAnimationsLoader", () => ({ default: () => null }));

describe("home distributor", () => {
  it("renders one clear hero and the complete commercial journey", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("¿Qué necesitas resolver?");
    expect(html).toContain("Problemas que resolvemos");
    expect(html).toContain("Todo lo necesario para construir y lanzar");
    expect(html).toContain("CONSTRUIMOS PORQUE TAMBIÉN EMPRENDEMOS");
    expect(html).toContain("Tecnología explicada desde el negocio");
    expect(html).toContain("El equipo técnico que ejecuta contigo");
    expect(html).toContain("Antes de dar el siguiente paso");
    expect(html).toContain('href="/contacto"');
  });

  it("distributes visitors to every typed service and real client project", () => {
    const html = renderToStaticMarkup(<Home />);

    for (const service of services) {
      expect(html).toContain(`/soluciones/${service.slug}`);
      expect(html).toContain(service.name);
    }

    for (const project of homeClientProjects) {
      expect(html).toContain(`/proyectos/${project.slug}`);
      expect(html).toContain(project.name);
    }
  });

  it("presents marketing disciplines as capabilities instead of a service", () => {
    const html = renderToStaticMarkup(<Home />);

    for (const capability of capabilities) {
      expect(html).toContain(capability.name);
    }

    expect(html).not.toContain("Marketing y publicidad digital");
    expect(html.match(/<details/g)).toHaveLength(4);
    expect(html.match(/<summary/g)).toHaveLength(4);
  });
});
