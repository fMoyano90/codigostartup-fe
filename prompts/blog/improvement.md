# Mejora de un borrador revisado

Usa este prompt para corregir un artículo en `content/blog/drafts/` después de que su revisión editorial haya quedado en `reviewStatus: changes_required`.

## Antes de escribir

1. Lee el artículo completo: `content/blog/drafts/<slug>.mdx`.
2. Lee su reporte consolidado: `reports/blog/<slug>.json` (campos `blockingProblems`, `recommendations`, y el detalle por revisor en `reviews`).
3. Lee las reglas editoriales: `src/config/editorial-rules.ts`.
4. Lee las reglas de aprobación: `src/config/review-rules.ts`.

## Qué corregir

1. Resuelve primero todos los problemas de severidad `blocking` listados en `blockingProblems` y en cada `reviews.<reviewer>.problems`.
2. Resuelve los problemas `important` cuando sea razonable sin alterar el artículo más de lo necesario.
3. Mejora los problemas `minor` solo si no requiere reescribir secciones enteras — no es obligatorio.

## Qué preservar

- El objetivo, la categoría, la intención (`intent`) y la audiencia (`audience`) del artículo — no los cambies sin una razón explícita y documentada en tu resumen final.
- Las ideas y afirmaciones que ya son correctas. Corregir no significa reescribir desde cero.
- La longitud del artículo dentro del rango permitido (`editorialRules.minimumWords` – `editorialRules.maximumWords`) — no elimines contenido útil solo para acortar.

## Qué no hacer

- No inventes estadísticas, precios, leyes, estudios, testimonios ni casos reales para "reforzar" un argumento. Si un dato necesita respaldo externo, señálalo explícitamente en tu resumen final como pendiente de verificación humana.
- No conviertas el artículo en contenido técnico para developers al intentar "profundizar".
- No modifiques artículos en `content/blog/published/` ni en `content/blog/rejected/` — este prompt aplica únicamente a borradores en `content/blog/drafts/`.
- No cambies el `status` del frontmatter. Ese campo lo gestionan `blog:approve` y `blog:publish`, no este prompt.

## Después de corregir

1. Muestra el `git diff` del archivo modificado antes de continuar.
2. Ejecuta `npm run blog:validate -- <slug>` y corrige cualquier error estructural nuevo que hayas introducido.
3. Vuelve a generar las 5 evaluaciones (`prompts/blog/audience-review.md`, `business-value-review.md`, `pedagogy-review.md`, `writing-review.md`, `seo-review.md`) sobre la versión corregida, sobrescribiendo los archivos en `reports/blog/reviews/<slug>/`.
4. Ejecuta `npm run blog:review-report -- <slug>` para consolidar el nuevo resultado.
5. No apruebes ni publiques — eso requiere una decisión humana explícita (`blog:approve`, `blog:publish`).

## Resumen a entregar

- Problemas resueltos vs. pendientes.
- Puntaje anterior vs. puntaje nuevo (`totalScore` del reporte).
- Cualquier afirmación que quede pendiente de verificación externa.
- Si algo no se corrigió, explica por qué (por ejemplo: requiere una decisión editorial que no corresponde tomar automáticamente).
