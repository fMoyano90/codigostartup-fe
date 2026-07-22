# Arquitectura del blog MDX — Fase 1 (análisis)

> Este documento es el entregable de la Fase 1 de `TODO-blog.md`: diagnóstico del repo y arquitectura propuesta para el sistema editorial del blog. No implica cambios de código; sirve de referencia para las Fases 2-5.

## Contexto

`TODO-blog.md` define un sistema editorial en 5 fases para construir un blog estático MDX sin backend/CMS, con flujo `draft → validación → revisión IA → aprobación humana → publicación`. Esta fase es puramente de análisis: diagnosticar el repo actual y proponer la arquitectura, sin instalar dependencias ni escribir código del blog todavía.

El repo se exploró con dos agentes en paralelo (stack técnico + convenciones visuales), confirmado con lecturas directas de los archivos clave. El resultado cambia supuestos importantes: **no hay ningún precedente real de rutas anidadas ni de MDX en este proyecto** — el sitio es hoy una landing única (`src/app/page.tsx`) más HTML estático suelto en `public/`.

## Diagnóstico del proyecto

**Stack:** Next.js 16.1.6 (App Router), React 19.2.4, TypeScript 5 (`strict: true`), Tailwind v4, npm (`package-lock.json`). Alias `@/* → ./src/*` en `tsconfig.json`. Scripts actuales: solo `dev`, `build`, `start`, `lint` — **no existe `typecheck` ni `test`**.

**Rutas:** `src/app/` solo tiene `layout.tsx` + `page.tsx` (home). No hay subcarpetas de rutas, ni layouts anidados, ni breadcrumbs. Las páginas comerciales mencionadas en el git log (`physical.html`, `petshop.html`, `piscinas.html`) **no son rutas de Next**: son HTML estático servido desde `public/`, sin relación con App Router. El blog será el primer caso real de rutas anidadas del repo.

**Componentes:** `src/components/` es una carpeta plana con 8 componentes, todos de efectos visuales/animación (GSAP, three.js, ogl vía `Galaxy`, `DotGrid`, `Magnet`, `LogoLoop`, etc.). **No existe ningún componente de UI de contenido** (Card, Button, Container, Navbar, Footer): la nav y el footer del home están inline en `page.tsx`, estilizados con clases en `globals.css`.

**Estilos:** Tailwind v4 se usa mínimamente; el grueso del diseño es CSS plano hecho a mano en `src/app/globals.css` (2127 líneas), con variables en `:root` y clases BEM-like (`.service-card`, `.portfolio-card`). Los `.service-card`/`.portfolio-card` (glassmorphism, barra de acento animada, gradiente que vira a amarillo/violeta en hover) son la base visual más reutilizable para tarjetas de artículo.

**Colores de marca:** los hex del brief no están 1:1 en el código. Los tokens reales son `--ink:#0a0a0a` (coincide exacto), `--volt:#fdc828` (≈ `#FCC828`), `--volt-dim:#efc459` (≈ `#F9D782`), `--violet:#7c3aed` (bastante distinto de `#894CE0`). Dos HTML estáticos sueltos usan un `--purple-color:#894CE0` diferente al token oficial — es drift de marca, no una fuente de verdad.

**Decisión:** el blog debe usar los tokens ya existentes en `globals.css` (son la paleta oficial vigente), no reintroducir los hex exactos del brief, para no crear una segunda paleta compitiendo con la ya establecida.

**Riesgo de UX confirmado:** `globals.css` aplica `cursor: none !important` a todo elemento en dispositivos con hover, y depende de que `HomeAnimations.tsx` monte dinámicamente un div `#cs-cursor` como reemplazo — pero ese componente solo se usa en el home. Si el blog no lo incluye, sus páginas quedarían **sin ningún cursor visible** en desktop. Hay que corregirlo en Fase 2 (acotar la regla a una clase `.home` en vez de aplicarla globalmente).

**SEO:** metadata está bien resuelta pero es 100% estática y única (home). `sitemap.xml` y `robots.txt` son **archivos estáticos manuales en `public/`**, no `app/sitemap.ts`/`app/robots.ts` dinámicos. Para el blog esto debe migrar a los dynamic route handlers de Next, y los archivos estáticos actuales deben eliminarse para evitar conflicto de rutas duplicadas.

**MDX/testing:** cero dependencias de Markdown/MDX instaladas (`gray-matter`, `next-mdx-remote`, `@next/mdx`, `contentlayer`, zod, etc. — ninguna). Cero framework de testing (`vitest`/`jest` ausentes). Todo esto debe agregarse desde cero.

## Arquitectura recomendada

### Renderizado MDX

Recomiendo **`next-mdx-remote/rsc`** (no `@next/mdx`). Razón: `@next/mdx` convierte archivos `.mdx` bajo `app/` directamente en rutas — no encaja con el requisito de que el estado editorial (`drafts/published/rejected`) viva en `content/blog/` fuera del árbol de rutas y determine qué se expone. `next-mdx-remote/rsc` permite leer el MDX con `fs` desde cualquier carpeta y compilarlo dentro de un Server Component async, cumpliendo "no depender del cliente para el contenido principal" sin ningún hack de rutas.

Complementos justificados:

- **`gray-matter`** — parseo de frontmatter, estándar de facto, cero configuración.
- **`zod`** — define y valida el esquema de frontmatter (`BlogArticleFrontmatter`) y de topics una sola vez, reutilizable entre `lib/blog/article-schema.ts` y los scripts (`validate`, `approve`, `publish`), evitando duplicar reglas de validación a mano.
- **`remark-gfm`** — tablas/listas de tareas en MDX (el brief pide "tablas responsivas").
- **`rehype-slug` + `rehype-autolink-headings`** — anchors automáticos en encabezados, necesarios para el "índice navegable" opcional.
- **`yaml`** — parseo de `content/sources/topics/*.yml` (paquete moderno con tipos TS, independiente de la versión interna de `gray-matter`).
- **`tsx`** (devDependency) — ejecutar los scripts TS de `scripts/blog/*.ts` directamente (`npm run blog:validate` → `tsx scripts/blog/validate.ts`); no hay runtime de scripts TS hoy en el repo.
- **`vitest`** (devDependency) — no hay test runner; vitest es liviano, ESM-nativo y es lo que se necesita para las pruebas de Fase 3 (parsing frontmatter, transiciones de estado, etc.).

No se agrega ninguna librería de fechas/slugs adicional: tiempo de lectura y validación de slug son funciones triviales que no justifican una dependencia.

### Estructura de carpetas

Sigo la estructura del brief, pero coloco `lib/` y `config/` **dentro de `src/`** para que funcionen con el alias `@/*` ya existente (que solo mapea `./src/*`). `content/`, `scripts/`, `prompts/` y `reports/` quedan en la raíz porque no son código de aplicación compilado por Next.

```text
content/                          (raíz — datos, no código de Next)
  blog/{drafts,published,rejected}/
  sources/{topics,references}/

src/
  app/blog/
    page.tsx                      → /blog
    [slug]/page.tsx               → /blog/[slug]
    categoria/[slug]/page.tsx     → /blog/categoria/[slug]
    layout.tsx                    (nav/footer propios del blog, sin cursor custom)
  components/blog/
    ArticleCard.tsx                (basado en .service-card/.portfolio-card)
    ArticleLayout.tsx
    Breadcrumbs.tsx
    CategoryFilter.tsx
    ...
  config/
    blog-categories.ts
    editorial-rules.ts
  lib/blog/
    article-schema.ts             (zod)
    article-loader.ts             (fs + gray-matter + next-mdx-remote/rsc)
    article-utils.ts              (reading time, formateo fechas)
    category-utils.ts
    related-articles.ts

scripts/blog/                     (raíz — ejecutados con tsx, importan src/lib vía ruta relativa)
  validate.ts / approve.ts / publish.ts / reject.ts / list.ts
  review-report.ts / review-summary.ts / topics.ts / sync-topics.ts

prompts/blog/                     (raíz — markdown para agentes IA)
reports/blog/                     (raíz — reportes JSON generados)
```

`app/sitemap.ts` y `app/robots.ts` (dinámicos) reemplazan `public/sitemap.xml` y `public/robots.txt` (estos dos se eliminan para evitar conflicto de rutas). El sitemap enumera solo artículos en `published`.

### Rutas y control de borradores

- `/blog/[slug]` usa `generateStaticParams()` leyendo **solo** `content/blog/published/`, con `dynamicParams = false` — cualquier slug no publicado (incluyendo drafts) da 404 en build/producción, sin lógica condicional que pueda filtrarse.
- Listados (`/blog`, `/blog/categoria/[slug]`) y el sitemap leen exclusivamente `published/`.
- Preview de borradores en desarrollo (opcional, permitido por el brief): una ruta separada gateada por `process.env.NODE_ENV !== 'production'` → `notFound()` fuera de dev, para que nunca compile como ruta pública real.

### Estados y frontmatter

Implementar `ArticleStatus` y el `BlogArticleFrontmatter` tal como los define el brief, como schema de `zod` en `lib/blog/article-schema.ts`, reutilizado por el loader (build-time) y por los scripts (`validate`, `approve`, `publish`) para no duplicar reglas.

### Validaciones deterministas vs. revisión IA

**Deterministas (script `blog:validate`, sin IA):** esquema/tipos de frontmatter, categoría existente, slug válido y no duplicado, estado válido, fechas bien formadas, conteo de palabras (min/max), presencia de título/descripción/SEO fields, un solo `h1`, artículos relacionados existentes, alt-text en imágenes, expresiones bloqueadas (como warning). Todo esto es chequeable con reglas fijas.

**Asistidas por IA (Fase 4, sin API, ejecutadas por el agente):** todo lo que requiere juicio editorial — si el artículo realmente está dirigido a founders/gerentes y no a developers, si aporta valor de decisión de negocio, progresión pedagógica, calidad de redacción más allá de clichés detectables por regex, relevancia SEO real de la intención de búsqueda. Estos se guardan como `ReviewResult`/`ArticleReviewReport` en `reports/blog/<slug>.json` y se consolidan con `blog:review-report` (determinista: solo lee, valida esquema y promedia, no evalúa contenido).

## Riesgos

1. **Cursor global `cursor:none`** heredado por rutas del blog sin el follower que lo reemplaza → debe corregirse en Fase 2 (acotar a `.home`).
2. **Conflicto de rutas sitemap/robots**: no se puede tener `public/sitemap.xml` + `app/sitemap.ts` simultáneamente — eliminar los estáticos al introducir los dinámicos.
3. **`eslint-config-next@15.3.5` vs `next@16.1.6`** desalineados — no bloquea el blog pero puede dar warnings; no se toca en esta fase.
4. **Ningún test runner ni `typecheck` script hoy** — Fase 3 pide pruebas explícitamente, así que hay que introducir `vitest` y agregar `"typecheck": "tsc --noEmit"` a `package.json` antes de poder cumplir los "ejecuta typecheck/tests" de cada fase.
5. **Paleta de marca no coincide 1:1 con el brief** — usar los tokens reales de `globals.css`, no los hex del documento, para no fragmentar la identidad visual.
6. **`content/`, `scripts/`, `prompts/`, `reports/` fuera de `src/`** — los scripts en `scripts/blog/*.ts` deberán importar `src/lib/blog/*` por ruta relativa (o configurarse `tsx` con resolución de `paths`); no hay alias `@/*` disponible fuera de `src/`.

## Orden propuesto de implementación (Fases 2-5)

1. **Fase 2:** dependencias MDX + estructura `content/` + rutas públicas + categorías + frontmatter schema + 2 artículos de prueba + fix del cursor + sitemap/robots dinámicos.
2. **Fase 3:** `editorial-rules.ts`, scripts `validate/approve/publish/reject/list`, `vitest` + pruebas, `docs/blog-editorial-workflow.md`.
3. **Fase 4:** prompts de revisión, `ReviewResult`/`ArticleReviewReport`, `blog:review-report`, `blog:review-summary`, reglas de aprobación.
4. **Fase 5:** `content/sources/topics/`, prompts operativos de generación/revisión/mejora por lotes, `blog:topics`, `blog:sync-topics`, `docs/blog-operations.md`.

No avanzar a Fase 2 hasta validar este análisis con el equipo.
