import type { Taller } from "@/lib/commercial/schema";

export type FiltroTalleres = {
  texto?: string;
  categoria?: string;
  duracion?: string;
};

/**
 * Filtra el catálogo por texto (título, resumen, categoría y público),
 * categoría exacta y duración en horas. Devuelve el array original si no
 * hay criterios activos.
 */
export function filtrarTalleres(talleres: Taller[], filtro: FiltroTalleres = {}): Taller[] {
  const texto = (filtro.texto ?? "").trim().toLowerCase();
  const categoria = (filtro.categoria ?? "").trim();
  const duracion = (filtro.duracion ?? "").trim();

  if (!texto && !categoria && !duracion) return talleres;

  return talleres.filter((taller) => {
    if (texto) {
      const haystack = [taller.titulo, taller.resumen, taller.categoria, taller.publico]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(texto)) return false;
    }
    if (categoria && taller.categoria !== categoria) return false;
    if (duracion && String(taller.duracionHoras) !== duracion) return false;
    return true;
  });
}

export function categoriasDeTalleres(talleres: Taller[]): string[] {
  return Array.from(new Set(talleres.map((taller) => taller.categoria))).sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}