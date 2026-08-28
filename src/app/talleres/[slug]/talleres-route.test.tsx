import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { talleres } from "@/data/talleres";
import TallerRoutePage from "./page";

async function renderTaller(slug: string) {
  const page = await TallerRoutePage({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(page);
}

describe("ficha de taller (formato UANDES)", () => {
  it("genera una página por cada uno de los 9 talleres", async () => {
    const htmls = await Promise.all(talleres.map((taller) => renderTaller(taller.slug)));

    for (const taller of talleres) {
      expect(htmls.some((html) => html.includes(taller.titulo))).toBe(true);
    }
  });

  it("todas las fichas presentan hero con CTA, chips de datos y formulario", async () => {
    const html = await renderTaller("videos-ugc-con-ia");

    expect(html).toContain("Solicitar información");
    expect(html).toContain("wa.me/56966073259");
    expect(html).toContain("Duración");
    expect(html).toContain("Modalidad");
    expect(html).toContain("Certificado");
    expect(html).toContain('name="participants"');
    expect(html).toContain('name="description"');
    expect(html).toContain('value="talleres"');
    expect(html).toContain('value="taller-page"');
    expect(html).toContain('value="videos-ugc-con-ia"');
  });

  it("el taller aprobado (UGC) muestra programa en números, razones, resultados y testimonios pendientes", async () => {
    const ugc = talleres.find((t) => t.slug === "videos-ugc-con-ia");
    const html = await renderTaller(ugc!.slug);

    expect(html).toContain("El programa en números");
    expect(html).toContain("240");
    expect(html).toContain("Estrategia y guion");
    expect(html).toContain("Producción con IA");
    expect(html).toContain("Montaje en CapCut");
    expect(html).toContain("Cierre y sprint final");
    expect(html).toContain("Por qué elegir este");
    expect(html).toContain("Un solo proyecto transversal");
    expect(html).toContain("Resultados concretos");
    expect(html).toContain("Un archivo MP4 listo para publicación.");
    expect(html).toContain("Herramientas por etapa");
    expect(html).toContain("[Pendiente: testimonio real de un participante]");
    expect(html).not.toContain("Ficha en preparación");
  });

  it("los talleres en borrador omiten secciones sin contenido real y muestran el aviso en preparación", async () => {
    const borrador = talleres.find((t) => t.slug === "ia-para-marketing");
    const html = await renderTaller(borrador!.slug);

    expect(html).toContain("Ficha en preparación");
    expect(html).toContain(borrador!.publico);
    expect(html).toContain("8 h");
    expect(html).not.toContain("El programa en números");
    expect(html).not.toContain("Por qué elegir este");
    expect(html).not.toContain("Resultados concretos");
    expect(html).not.toContain("Herramientas por etapa");
    expect(html).not.toContain("[Pendiente: testimonio real de un participante]");
  });
});