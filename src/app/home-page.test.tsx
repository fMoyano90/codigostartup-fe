import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { homeClientProjects, services } from "@/data/commercial";
import { talleres } from "@/data/talleres";
import Home from "./page";

vi.mock("@/components/HomeAnimationsLoader", () => ({ default: () => null }));

const visibleSlugs = ["automatizacion-de-procesos", "software-a-medida", "desarrollo-mvp", "auditoria-y-evolucion"] as const;
const hiddenSlugs = ["sitios-web", "tiendas-online", "aplicaciones-web", "aplicaciones-moviles"] as const;

describe("home distributor", () => {
  it("renders one clear hero and the complete commercial journey", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("¿Qué necesitas resolver?");
    expect(html).toContain("OPTIMIZAMOS EL TRABAJO MANUAL");
    expect(html).toContain("Los bloqueos operativos que frenan la productividad de tu empresa");
    expect(html).toContain("Talleres de IA Aplicada");
    expect(html).toContain("EL MÉTODO IDEA");
    expect(html).toContain("Información, conocimiento y opinión");
    expect(html).toContain("El equipo técnico que ejecuta contigo");
    expect(html).toContain("Antes de dar el siguiente paso");
    expect(html).toContain('href="/contacto"');
    expect(html).toContain('href="#talleres"');
  });

  it("distributes visitors to visible services, workshops and real client projects", () => {
    const html = renderToStaticMarkup(<Home />);

    for (const slug of visibleSlugs) {
      const service = services.find((item) => item.slug === slug);
      if (!service) throw new Error(`Falta el servicio ${slug} para las pruebas`);
      expect(html).toContain(`/soluciones/${slug}`);
      expect(html).toContain(service.name);
    }

    for (const slug of hiddenSlugs) {
      expect(html).not.toContain(`/soluciones/${slug}`);
    }

    expect(html).toContain("Talleres de IA Corporativos");
    expect(html).toContain("Agentes de IA y Bases de Conocimiento");
    expect(html).toContain("Programas In-Company a medida");

    for (const taller of talleres) {
      expect(html).toContain(`/talleres/${taller.slug}`);
      expect(html).toContain(taller.titulo);
    }

    for (const project of homeClientProjects) {
      expect(html).toContain(`/proyectos/${project.slug}`);
      expect(html).toContain(project.name);
    }
  });

  it("does not present marketing as a service and renders FAQ accordion", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).not.toContain("Marketing y publicidad digital");
    expect(html.match(/<details/g)).toHaveLength(4);
    expect(html.match(/<summary/g)).toHaveLength(4);
  });
});
