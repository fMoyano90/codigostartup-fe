import type { ReactElement } from "react";

/** Dimensiones y tipo estándar de Open Graph, reutilizados por cada ruta. */
export const ogImageSize = { width: 1200, height: 630 } as const;
export const ogImageContentType = "image/png";

const INK = "#0a0a0a";
const PARCHMENT = "#ede8df";
const PARCH_DIM = "#8a8278";
const EMBER = "#ff6a3d";
const VOLT = "#fdc828";

type OgImageInput = {
  /** Título principal (nombre del servicio, título del artículo, etc.). */
  title: string;
  /** Etiqueta superior opcional (categoría, sección). */
  eyebrow?: string;
};

/**
 * Composición compartida para todas las imágenes sociales del sitio. Usa la
 * fuente por defecto que empaqueta `next/og`, así el render es determinista y
 * sin dependencias externas. Cada `opengraph-image.tsx` la envuelve en un
 * `ImageResponse` con `ogImageSize`.
 */
export function renderOgImage({ title, eyebrow }: OgImageInput): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: INK,
        padding: "80px",
        backgroundImage: `radial-gradient(circle at 85% 15%, rgba(255,106,61,0.18), transparent 45%)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: EMBER, display: "flex" }} />
        <div
          style={{
            display: "flex",
            marginLeft: 20,
            fontSize: 34,
            fontWeight: 700,
            color: PARCHMENT,
            letterSpacing: "-0.5px",
          }}
        >
          Código Startup
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: VOLT,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            color: PARCHMENT,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: 72, height: 6, borderRadius: 4, backgroundColor: EMBER, display: "flex" }} />
        <div style={{ display: "flex", marginLeft: 24, fontSize: 26, color: PARCH_DIM }}>
          Productos digitales que perduran
        </div>
      </div>
    </div>
  );
}
