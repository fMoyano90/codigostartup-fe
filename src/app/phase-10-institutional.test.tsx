import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { capabilities } from "@/data/capabilities";
import { processCapabilitySlugs, processPhases, teamGallery } from "@/data/institutional";
import { projects } from "@/data/projects";
import AboutPage from "./nosotros/page";
import ProcessPage from "./proceso/page";

describe("phase 10 institutional pages", () => {
  it("defines the eight process phases with client participation and deliverables", () => {
    expect(processPhases.map(({ title }) => title)).toEqual([
      "Diagnóstico",
      "Definición de alcance",
      "Diseño y prototipo",
      "Construcción",
      "Entregas semanales",
      "Pruebas",
      "Lanzamiento",
      "Evolución",
    ]);

    for (const phase of processPhases) {
      expect(phase.clientParticipation.length).toBeGreaterThan(20);
      expect(phase.deliverables.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("renders the complete process, transversal capabilities and progress controls", () => {
    const html = renderToStaticMarkup(<ProcessPage />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/Cómo participa el cliente/g)).toHaveLength(8);
    expect(html.match(/Qué recibe/g)).toHaveLength(8);
    expect(html).toContain("Alcance y precio claros");
    expect(html).toContain("Avance demostrable");
    expect(html).toContain("Revisión conjunta");
    expect(html).toContain("Documentación y traspaso");
    expect(html).toContain("/contacto?origen=proceso");

    for (const slug of processCapabilitySlugs) {
      expect(html).toContain(capabilities.find((capability) => capability.slug === slug)?.name);
    }
  });

  it("renders about information from canonical projects without inventing personal profiles", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("QUIÉNES SOMOS");
    expect(html).toContain("Qué resolvemos");
    expect(html).toContain("El equipo");
    expect(html).toContain("Experiencia relevante");
    expect(html).toContain("Forma de trabajar");
    expect(html).toContain("Producto propio");
    expect(html).toContain("Valores");
    expect(html).toContain("Pendiente editorial");
    expect(html).not.toContain("Página en evolución");
    expect(html).not.toContain("años de experiencia");
    expect(html).toContain("/contacto?origen=nosotros");

    for (const project of projects) expect(html).toContain(`/proyectos/${project.slug}`);
  });

  it("uses only institutional photographs registered in canonical data", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(teamGallery).toHaveLength(4);
    for (const image of teamGallery) {
      expect(existsSync(join(process.cwd(), "public", image.src.replace(/^\//, "")))).toBe(true);
      expect(html).toContain(encodeURIComponent(image.src));
      expect(html).toContain(image.alt);
    }
  });
});
