import { describe, expect, it } from "vitest";
import { talleres, totalHoras } from "./datos-talleres";
import { buildKitHtml } from "../../scripts/talleres/generar-kit";

describe("kit comercial (SCRUM-614)", () => {
  it("representa exactamente los 9 talleres del catálogo", () => {
    expect(talleres).toHaveLength(9);
  });

  it("tiene slugs únicos", () => {
    const slugs = talleres.map((taller) => taller.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cumple las reglas de duración: 4 h para Videos UGC y 8 h para los otros 8", () => {
    const ugc = talleres.find((taller) => taller.slug === "videos-ugc-con-ia");
    expect(ugc?.duracionHoras).toBe(4);

    const otros = talleres.filter((taller) => taller.slug !== "videos-ugc-con-ia");
    expect(otros).toHaveLength(8);
    expect(otros.every((taller) => taller.duracionHoras === 8)).toBe(true);
  });

  it("declara estado y fuente para trazabilidad interna (UGC aprobado)", () => {
    const ugc = talleres.find((taller) => taller.slug === "videos-ugc-con-ia");
    expect(ugc?.estado).toBe("aprobado");
    expect(ugc?.fuente).toContain("SCRUM-619");

    const provisionales = talleres.filter((taller) => taller.slug !== "videos-ugc-con-ia");
    expect(provisionales.every((taller) => taller.estado === "provisional")).toBe(true);
  });

  it("suma 68 horas totales (4 + 8 × 8)", () => {
    expect(totalHoras(talleres)).toBe(68);
  });

  it("todos los talleres tienen título, resumen y público", () => {
    for (const taller of talleres) {
      expect(taller.titulo.length).toBeGreaterThan(0);
      expect(taller.resumen.length).toBeGreaterThan(0);
      expect(taller.publico.length).toBeGreaterThan(0);
    }
  });
});

describe("catálogo compartible (HTML generado)", () => {
  const html = buildKitHtml();

  it("presenta los 9 talleres del catálogo", () => {
    for (const taller of talleres) {
      expect(html).toContain(taller.titulo);
    }
    expect(html.match(/class="card taller-card"/g)).toHaveLength(9);
  });

  it("está marcado como no indexable (noindex)", () => {
    expect(html).toContain('name="robots" content="noindex, nofollow"');
  });

  it("incluye modalidades presencial y online, responsabilidades, certificación y FAQ", () => {
    expect(html).toContain("Presencial in-company");
    expect(html).toContain("Online en vivo");
    expect(html).toContain("Responsabilidades");
    expect(html).toContain("Certificación");
    expect(html).toContain("Preguntas frecuentes");
    expect(html).toContain("hola@codigostartup.com");
  });

  it("no contiene precios, monedas ni datos internos del negocio", () => {
    const textoVisible = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<svg[\s\S]*?<\/svg>/gi, "")
      .replace(/<[^>]+>/g, " ");

    const patronesDePrecio = [
      /[$€£]\s?\d/,
      /\bCLP\b/i,
      /\b(?:IVA|UF)\b/i,
      /\b\d{1,3}(?:[.,]\d{3})+\b/,
      /\bPOR DEFINIR\b/i,
      /\bprovisional\b/i,
      /\bfuente\b/i,
      /\bmatriz\b/i,
    ];
    for (const patron of patronesDePrecio) {
      expect(textoVisible).not.toMatch(patron);
    }
  });

  it("no expone el estado ni la fuente interna de los datos", () => {
    expect(html).not.toContain("estado");
    expect(html).not.toContain("aprobado");
    expect(html).not.toContain("SCRUM-6");
  });
});