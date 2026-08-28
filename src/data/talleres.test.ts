import { describe, expect, it } from "vitest";
import { tallerSchema, tallerSlugValues } from "@/lib/commercial/schema";
import { talleres, totalHorasTalleres } from "./talleres";

describe("talleres (fuente maestra)", () => {
  it("contiene exactamente los 9 talleres con slugs únicos", () => {
    expect(talleres).toHaveLength(9);
    expect(talleres.map((t) => t.slug)).toEqual(tallerSlugValues);
    expect(new Set(talleres.map((t) => t.slug)).size).toBe(9);
  });

  it("suma 68 horas totales: 4 h para Videos UGC y 8 h para el resto", () => {
    expect(totalHorasTalleres(talleres)).toBe(68);

    const ugc = talleres.find((t) => t.slug === "videos-ugc-con-ia");
    expect(ugc?.duracionHoras).toBe(4);

    for (const taller of talleres.filter((t) => t.slug !== "videos-ugc-con-ia")) {
      expect(taller.duracionHoras).toBe(8);
    }
  });

  it("el taller aprobado (UGC) tiene módulos que suman exactamente 4 horas", () => {
    const ugc = talleres.find((t) => t.slug === "videos-ugc-con-ia");
    expect(ugc?.estado).toBe("aprobado");
    const minutos = ugc?.modulos.reduce((acc, m) => acc + m.minutos, 0) ?? 0;
    expect(minutos).toBe(240);
  });

  it("los 8 talleres en borrador declaran su pendiente editorial", () => {
    for (const taller of talleres.filter((t) => t.estado === "borrador")) {
      expect(taller.estado).toBe("borrador");
      expect(taller.pendiente.length).toBeGreaterThan(0);
      expect(taller.entregable).toContain("[Pendiente:");
    }
  });

  it("todos los talleres incluyen el módulo de ciberseguridad y SEO", () => {
    for (const taller of talleres) {
      expect(taller.ciberseguridad).toBe(true);
      expect(taller.seo.title.length).toBeGreaterThan(0);
      expect(taller.seo.description.length).toBeGreaterThan(0);
    }
  });

  it("el esquema Zod rechaza talleres inválidos", () => {
    const invalido = tallerSchema.safeParse({
      ...talleres[0],
      slug: "slug-inventado",
      modulos: [{ titulo: "Único", minutos: 10 }],
      estado: "aprobado",
      pendiente: [],
    });
    expect(invalido.success).toBe(false);

    const sinPendiente = tallerSchema.safeParse({
      ...talleres[1],
      estado: "borrador",
      pendiente: [],
    });
    expect(sinPendiente.success).toBe(false);
  });
});