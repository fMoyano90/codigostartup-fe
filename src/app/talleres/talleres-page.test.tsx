import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { talleres, totalHorasTalleres } from "@/data/talleres";
import TalleresPage from "./page";

describe("página de talleres (catálogo)", () => {
  it("presenta el hero con datos rápidos y CTA de WhatsApp", () => {
    const html = renderToStaticMarkup(<TalleresPage />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Capacita a tu equipo");
    expect(html).toContain(String(totalHorasTalleres(talleres)));
    expect(html).toContain("Solicitar información");
    expect(html).toContain("wa.me/56966073259");
  });

  it("incluye el filtro de búsqueda con texto, categoría y duración", () => {
    const html = renderToStaticMarkup(<TalleresPage />);

    expect(html).toContain("Buscar taller");
    expect(html).toContain("Todas las categorías");
    expect(html).toContain("Toda duración");
    expect(html).toContain("4 horas");
    expect(html).toContain("8 horas");
    expect(html).toContain(`9 de ${talleres.length} talleres`);
  });

  it("incluye los 9 talleres con enlace a su ficha", () => {
    const html = renderToStaticMarkup(<TalleresPage />);

    for (const taller of talleres) {
      expect(html).toContain(taller.titulo);
      expect(html).toContain(`href="/talleres/${taller.slug}"`);
      expect(html).toContain(`${taller.duracionHoras} h · Taller práctico`);
    }
  });

  it("conserva modalidades y FAQ debajo del catálogo, sin mencionar OTEC", () => {
    const html = renderToStaticMarkup(<TalleresPage />);

    expect(html).toContain("Presencial in-company");
    expect(html).toContain("Online en vivo");
    expect(html).toContain("Jornada completa");
    expect(html).toContain("Resolvemos tus");
    expect(html).toContain("¿Cuánto duran los talleres?");
    expect(html).toContain("Formato estándar para emprendedores");
    expect(html).not.toContain("OTEC");
    expect(html).not.toContain("Cada parte sabe");
  });

  it("no muestra las secciones de marketing que viven en las fichas", () => {
    const html = renderToStaticMarkup(<TalleresPage />);

    expect(html).not.toContain("Tres pilares");
    expect(html).not.toContain("Seis razones");
    expect(html).not.toContain("[Pendiente: testimonio real de un participante]");
    expect(html).not.toContain("Así se vive");
  });
});