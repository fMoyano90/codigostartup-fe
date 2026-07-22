/**
 * Renderiza un bloque JSON-LD escapando `<` para impedir que un cierre de
 * etiqueta dentro de los datos rompa el `<script>` (mismo criterio que usaba
 * el escaping inline previo del artículo de blog).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
