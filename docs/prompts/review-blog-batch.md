# Plantilla — Revisar todos los borradores pendientes

Revisa todos los artículos en `content/blog/drafts/`.

## Selección

Procesa solamente los que:

- tengan `reviewStatus: pending`;
- no tengan ya un reporte válido en `reports/blog/<slug>.json`;
- no presenten errores estructurales críticos (`npm run blog:validate -- <slug>`).

## Para cada artículo

1. Ejecuta `npm run blog:validate -- <slug>`. Si tiene errores bloqueantes, omítelo y repórtalo — no lo evalúes editorialmente todavía.
2. Lee los 5 prompts de revisión:
   - `prompts/blog/audience-review.md`
   - `prompts/blog/business-value-review.md`
   - `prompts/blog/pedagogy-review.md`
   - `prompts/blog/writing-review.md`
   - `prompts/blog/seo-review.md`
3. Evalúa el artículo de forma independiente con cada criterio. No suavices resultados para que apruebe más contenido del que realmente cumple el estándar.
4. Guarda cada evaluación en `reports/blog/reviews/<slug>/<reviewer>.json` con el esquema `ReviewResult` (ver `src/lib/blog/review-schema.ts`).
5. Ejecuta `npm run blog:review-report -- <slug>` para consolidar.

No modifiques el contenido del artículo en este paso. No apruebes. No publiques.

## Al terminar el lote

1. Ejecuta `npm run blog:review-summary`.
2. Entrega un resumen con:
   - cantidad revisada;
   - cantidad aprobada editorialmente;
   - cantidad con cambios requeridos;
   - errores estructurales encontrados;
   - problemas bloqueantes;
   - problemas más frecuentes;
   - puntaje promedio;
   - artículos que necesitan verificación humana especial (afirmaciones sin respaldo, temas sensibles, etc.).
