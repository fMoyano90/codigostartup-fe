import type { ArticleInfo } from "./types";

/**
 * Estilo visual compartido por todas las portadas. Se antepone al tema concreto
 * de cada artículo para mantener una identidad consistente.
 */
const STYLE_BLOCK = `Fotografía editorial moderna en horizontal (16:9), contexto empresarial y tecnológico, pequeñas y medianas empresas de Latinoamérica. Personas reales solo si aportan a la escena. Espacios de trabajo, documentos, procesos, dashboards, aplicaciones y flujos. Acentos visuales morados y amarillos. Profesional, moderno y cercano. Iluminación realista. Composición con espacio visual despejado para funcionar como portada. Sin texto, sin logotipos, sin marcas de agua, sin robots genéricos, sin cerebros luminosos, sin hologramas futuristas, sin pantallas deformadas, sin elementos flotantes incoherentes, sin apariencia genérica de banco de imágenes.`;

/** Descarta frases introductorias ("¿Qué es...?", "Cómo...", etc.) del tema visual. */
function themeFromTitle(title: string): string {
  return title
    .replace(/^[¿?]?\s*(qué|qué es|qué es un|qué es una|qué es el|qué es la|cómo|cómo un|cómo una|cuál|cual|cuánto|cuando|cuándo|dónde|por qué)\s+/i, "")
    .replace(/\s*\?$/, "")
    .trim();
}

/**
 * Construye un prompt único por artículo: bloque de estilo + tema concreto.
 * El tema combina título (depurado) con la descripción para dar contexto.
 */
export function buildPrompt(article: ArticleInfo): string {
  const theme = themeFromTitle(article.title) || article.title;
  const desc = article.description.trim();
  const detail = desc ? ` Contexto del artículo: ${desc}` : "";
  return `${STYLE_BLOCK} Tema de la portada: ${theme}.${detail}`.trim();
}
