# Flujo editorial del blog

Este documento describe el flujo editorial completo: validación estructural determinista (Fase 3), revisión editorial asistida por IA (Fase 4), aprobación humana y publicación. Ningún comando de este documento invoca una API de IA — la revisión de la Fase 4 la ejecuta el agente que trabaja en el repositorio (Codex, Claude, etc.), leyendo los prompts en `prompts/blog/` y escribiendo los resultados como JSON.

## Estructura de contenido

```text
content/blog/
  drafts/      — borradores. Incluye artículos con status "draft" y "approved".
  published/   — únicamente artículos con status "published". Es lo único que se renderiza en /blog.
  rejected/    — artículos descartados. Conservan su contenido íntegro.
```

Un artículo se identifica por el nombre de archivo (sin extensión), que debe coincidir con el campo `slug` del frontmatter — `blog:validate` falla si no coinciden.

## Estados (`ArticleStatus`)

```text
draft → approved → published
  ↓
rejected
```

- **draft**: recién creado o en corrección. Vive en `content/blog/drafts/`.
- **approved**: aprobado por una persona, pero **sigue en `content/blog/drafts/`** — `blog:approve` nunca mueve el archivo.
- **published**: movido a `content/blog/published/` por `blog:publish`. Es el único estado visible en producción.
- **rejected**: movido a `content/blog/rejected/` por `blog:reject`. El contenido se conserva.

## Reglas editoriales centralizadas

`src/config/editorial-rules.ts` define, en un solo lugar, las reglas que usan tanto `blog:validate` como `blog:approve`/`blog:publish`:

- `minimumWords` / `maximumWords` (900–2500)
- `minimumInternalLinks` (2)
- `requiredFrontmatterFields`
- `blockedExpressions` (se reportan como **advertencia**, no como error)

## Validación (`npm run blog:validate`)

```bash
npm run blog:validate                # valida todos los artículos (drafts + published + rejected)
npm run blog:validate -- <slug>      # valida solo uno
```

Verifica, por artículo: esquema de frontmatter (zod), que el slug del archivo coincida con el del frontmatter, categoría válida, fechas válidas, conteo de palabras, ausencia de un segundo H1 en el cuerpo (el H1 ya lo renderiza el layout desde `frontmatter.title`), mínimo de enlaces internos, imágenes sin `alt`, artículos relacionados inexistentes, slugs duplicados entre carpetas, y expresiones desaconsejadas (como advertencia).

Clasifica cada hallazgo como `error`, `warning` o `info`, imprime un reporte en consola, escribe `reports/blog/validation-summary.json` (`{ processed, valid, warnings, invalid }`) y termina con código de salida `1` si existe al menos un `error`.

## Listado (`npm run blog:list`)

```bash
npm run blog:list
npm run blog:list -- --status draft
npm run blog:list -- --category software-para-empresas
```

Muestra slug, título, categoría, estado, fecha, `reviewScore` (si existe) y cantidad de errores de validación por artículo.

## Revisión editorial asistida por IA (Fase 4)

Cinco revisores conceptuales evalúan cada borrador desde ángulos distintos: `audience`, `business-value`, `pedagogy`, `writing`, `seo`. Ningún script llama a una API — el agente que trabaja en el repositorio lee el prompt de cada revisor y escribe el resultado como JSON.

### Prompts de revisión (`prompts/blog/`)

```text
prompts/blog/
  audience-review.md        — ¿está escrito para founders/empresarios, no para developers?
  business-value-review.md  — ¿el lector puede tomar una decisión con esto?
  pedagogy-review.md        — ¿la progresión y claridad enseñan bien el tema?
  writing-review.md         — ortografía, clichés, tono artificial, texto genérico
  seo-review.md             — intención de búsqueda, keywords, duplicación
  improvement.md            — cómo corregir un borrador con `reviewStatus: changes_required`
```

Cada prompt le pide al agente evaluar `content/blog/drafts/<slug>.mdx` y guardar el resultado (tipo `ReviewResult`, definido en `src/lib/blog/review-schema.ts`) en:

```text
reports/blog/reviews/<slug>/<reviewer>.json
```

por ejemplo `reports/blog/reviews/mi-articulo/audience.json`. El campo `reviewer` dentro del JSON debe coincidir con el nombre del archivo (`audience`, `business-value`, `pedagogy`, `writing` o `seo`).

### Reglas de aprobación (`src/config/review-rules.ts`)

```ts
minimumScorePerRequiredReview: 7
requiredReviews: ['audience', 'businessValue', 'pedagogy', 'writing']  // seo queda fuera
seoIsBlocking: false
blockingSeverityFailsArticle: true
```

Un artículo queda **editorialmente aprobado** cuando los 4 revisores obligatorios puntúan ≥ 7 **y** ningún revisor —incluido SEO— reportó un problema de severidad `blocking`. El puntaje de SEO no exige el mínimo de 7 (`seoIsBlocking: false`), pero un problema `blocking` de SEO sí puede reprobar el artículo (`blockingSeverityFailsArticle: true`).

### Consolidación (`npm run blog:review-report -- <slug>`)

```bash
npm run blog:review-report -- <slug>
```

No invoca ninguna IA — solo lee, valida y consolida lo que el agente ya escribió:

1. Lee las 5 evaluaciones en `reports/blog/reviews/<slug>/`.
2. Si falta alguna o no cumple el esquema `ReviewResult`, se detiene y explica cuál falta o por qué es inválida — no genera un reporte parcial.
3. Calcula `totalScore` (promedio de los 5 puntajes) y `approved` según las reglas de arriba.
4. Guarda el reporte consolidado (tipo `ArticleReviewReport`) en `reports/blog/<slug>.json`.
5. Actualiza **únicamente** `reviewStatus` (`passed` o `changes_required`) y `reviewScore` en el frontmatter del artículo — no toca el resto del MDX.

### Resumen por lotes (`npm run blog:review-summary`)

```bash
npm run blog:review-summary
```

Recorre todos los artículos (drafts + published + rejected) y muestra: cuántos tienen reporte válido, cuántos están aprobados, cuántos con cambios requeridos, puntaje promedio, los problemas más frecuentes, y qué archivos no tienen reporte o tienen uno inválido.

### Mejora de borradores (`prompts/blog/improvement.md`)

Cuando `reviewStatus: changes_required`, el prompt de mejora le indica al agente cómo corregir el borrador: resolver primero los problemas `blocking`, preservar objetivo/categoría/audiencia, no inventar datos, y volver a ejecutar validación + revisión + consolidación al terminar. Nunca aprueba ni publica por sí mismo.

## Aprobación (`npm run blog:approve -- <slug>`)

1. Busca el artículo en `content/blog/drafts/` — si no está ahí (ya publicado, rechazado o inexistente), falla.
2. Ejecuta la validación estructural completa.
3. Revisa `reports/blog/<slug>.json`:
   - **no existe** → el chequeo se omite (todavía no se corrió `blog:review-report` para este artículo);
   - **existe pero es inválido/corrupto** → bloquea la aprobación;
   - **existe y `approved: false`** → bloquea la aprobación;
   - **existe y `approved: true`** → no bloquea.
4. Sin errores bloqueantes: pide confirmación explícita (prompt interactivo si hay TTY; si no, exige `--yes`).
5. Actualiza `status: approved` y `approvedAt`, y **reescribe el mismo archivo en `drafts/`** — nunca lo mueve.

Para saltarse errores bloqueantes de forma explícita y auditable:

```bash
npm run blog:approve -- <slug> --force --reason "Motivo de la excepción"
```

`--force` **no** aplica a frontmatter estructuralmente inválido (eso siempre bloquea). Cada aprobación forzada queda registrada en `reports/blog/approvals-audit.jsonl`.

## Publicación (`npm run blog:publish -- <slug>`)

1. Exige que el artículo esté en `drafts/` con `status: approved` — no acepta `--force`.
2. Vuelve a validar por completo (enlaces internos, relacionados, etc.).
3. Verifica que no exista ya un artículo publicado con el mismo slug.
4. Actualiza `status: published`, `publishedAt`, `updatedAt`, y mueve el archivo a `content/blog/published/`.
5. Salvo `--skip-build`, ejecuta `npm run typecheck && npm run lint && npm run build`.
6. **Si el build falla, revierte automáticamente**: el archivo vuelve a `drafts/` con su contenido y estado originales, sin dejar el repositorio en un estado intermedio.

```bash
npm run blog:publish -- <slug>
npm run blog:publish -- <slug> --skip-build   # solo cuando se usa explícitamente
```

## Rechazo (`npm run blog:reject -- <slug>`)

```bash
npm run blog:reject -- <slug>
```

Mueve el artículo de `drafts/` a `content/blog/rejected/`, actualiza `status: rejected` y `updatedAt`. No borra ni recorta el contenido.

## Recuperación ante errores

- **`blog:validate` falla**: corrige el/los campo(s) señalados en el reporte y vuelve a ejecutar el comando; nada se mueve ni se publica automáticamente.
- **`blog:review-report` no puede consolidar**: el mensaje indica exactamente qué evaluaciones faltan o son inválidas en `reports/blog/reviews/<slug>/`; genera o corrige esos archivos con el prompt correspondiente y vuelve a ejecutar el comando.
- **`blog:approve` rechaza el artículo**: revisa `reports/blog/validation-summary.json`, `reports/blog/<slug>.json` o la salida en consola; usa `--force --reason "..."` solo si la excepción está justificada y debe quedar auditada.
- **`blog:publish` revierte por un build fallido**: el artículo queda de nuevo en `drafts/` en estado `approved`, listo para reintentar `blog:publish` una vez corregido el problema que rompió el build.
- **Recuperar un artículo rechazado**: mueve manualmente el archivo de `content/blog/rejected/` a `content/blog/drafts/` y cambia `status` a `draft`; luego continúa el flujo normal (`validate` → `approve` → `publish`).

## Pruebas

`npm run test` corre la suite de Vitest (`scripts/blog/lib/*.test.ts`, `src/lib/blog/*.test.ts`, `src/config/*.test.ts`), que cubre: parsing de frontmatter, validación de categorías, slugs duplicados, transiciones de estado, publicación sin aprobación previa, publicación con errores bloqueantes, movimiento de archivos entre carpetas (incluyendo el rechazo a sobrescribir), artículos relacionados inexistentes, el esquema de `ReviewResult`/`ArticleReviewReport`, y la lógica de consolidación (promedio de puntajes, reglas de aprobación, problemas bloqueantes de cualquier revisor).
