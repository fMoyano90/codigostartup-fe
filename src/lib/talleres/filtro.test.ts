import { describe, expect, it } from "vitest";
import { talleres } from "@/data/talleres";
import { categoriasDeTalleres, filtrarTalleres } from "./filtro";

describe("filtrarTalleres", () => {
  it("sin criterios devuelve el catálogo completo", () => {
    expect(filtrarTalleres(talleres)).toHaveLength(9);
    expect(filtrarTalleres(talleres, { texto: "  " })).toHaveLength(9);
  });

  it("filtra por texto en título, resumen, categoría y público", () => {
    expect(filtrarTalleres(talleres, { texto: "marketing" }).map((t) => t.slug)).toEqual([
      "ia-para-marketing",
    ]);
    expect(filtrarTalleres(talleres, { texto: "emprendedores" }).map((t) => t.slug)).toEqual([
      "videos-ugc-con-ia",
    ]);
    expect(filtrarTalleres(talleres, { texto: "faena" }).map((t) => t.slug)).toEqual([
      "ia-para-operaciones-y-faenas",
    ]);
    expect(filtrarTalleres(talleres, { texto: "recursos humanos" }).map((t) => t.slug)).toEqual([
      "ia-para-recursos-humanos",
    ]);
  });

  it("filtra por categoría exacta", () => {
    expect(filtrarTalleres(talleres, { categoria: "Marketing" }).map((t) => t.slug)).toEqual([
      "ia-para-marketing",
    ]);
    expect(filtrarTalleres(talleres, { categoria: "Liderazgo" }).map((t) => t.slug)).toEqual([
      "ia-para-lideres-y-jefaturas",
    ]);
  });

  it("filtra por duración en horas", () => {
    expect(filtrarTalleres(talleres, { duracion: "4" }).map((t) => t.slug)).toEqual([
      "videos-ugc-con-ia",
    ]);
    expect(filtrarTalleres(talleres, { duracion: "8" })).toHaveLength(8);
  });

  it("combina criterios y devuelve vacío cuando no hay coincidencias", () => {
    expect(filtrarTalleres(talleres, { texto: "marketing", duracion: "4" })).toHaveLength(0);
    expect(filtrarTalleres(talleres, { texto: "inexistente" })).toHaveLength(0);
  });
});

describe("categoriasDeTalleres", () => {
  it("devuelve las 9 categorías únicas ordenadas", () => {
    const categorias = categoriasDeTalleres(talleres);
    expect(categorias).toHaveLength(9);
    expect(categorias[0]).toBe("Automatización e IA");
    expect(categorias).toContain("Emprendimiento");
    expect(categorias).toContain("Operaciones y Faenas");
  });
});