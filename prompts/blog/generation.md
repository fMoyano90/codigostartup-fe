# Generación de un artículo a partir de un tema

Usa este prompt para convertir un tema de `content/sources/topics/*.yml` en un artículo MDX en `content/blog/drafts/`.

## Para quién escribes

- founders, emprendedores, empresarios y gerentes — personas que toman decisiones sobre tecnología sin ser necesariamente desarrolladoras.
- **No** escribas principalmente para desarrolladores. Si el tema requiere mencionar algo técnico, explícalo desde su consecuencia de negocio (costo, riesgo, tiempo, capacidad), no desde su implementación.

## Qué debe lograr el artículo

- Ayudar al lector a tomar una decisión concreta, no solo informarlo.
- Explicar la tecnología desde su impacto empresarial, evitando detalles de implementación innecesarios.
- Usar ejemplos concretos y comprensibles sin formación técnica.
- Presentar riesgos o errores frecuentes relacionados al tema.
- Comparar alternativas cuando corresponda (tablas o listas, no solo prosa).
- Ofrecer próximos pasos accionables al final.

## Qué evitar

- Clichés e introducciones genéricas (ver `blockedExpressions` en `src/config/editorial-rules.ts`: "En el mundo actual", "En la era digital", "Es importante destacar", "Cabe señalar", "Llevar tu negocio al siguiente nivel", "Solución revolucionaria", "Sin lugar a dudas", "En conclusión").
- Lenguaje comercial exagerado en contenido informativo.
- **No inventes estadísticas, precios, leyes, investigaciones, estudios ni fuentes.** Si una afirmación necesitaría un dato real para sostenerse, escríbela en términos generales o señala explícitamente en tu resumen final que requiere verificación externa antes de publicarse.

## Antes de escribir

1. Lee el tema completo en el archivo YAML correspondiente (`id`, `title`, `intent`, `funnelStage`, `audience`, `objective`, `notes`).
2. Lee las categorías disponibles en `src/config/blog-categories.ts` — usa únicamente una de esas 8 categorías, y que coincida con la `category` del listado de temas.
3. Lee las reglas editoriales en `src/config/editorial-rules.ts` (mínimo/máximo de palabras, mínimo de enlaces internos).
4. Lee el esquema de frontmatter en `src/lib/blog/article-schema.ts` (`BlogArticleFrontmatter`).
5. Revisa los artículos ya existentes en `content/blog/drafts/` y `content/blog/published/` para no duplicar tema, título o slug.

## Convención de slug

**El `id` del tema se usa tal cual como nombre de archivo y como `frontmatter.slug`.** Es decir, el tema `id: cuando-automatizar-un-proceso` genera el archivo `content/blog/drafts/cuando-automatizar-un-proceso.mdx` con `slug: "cuando-automatizar-un-proceso"`. Esta convención es la que usa `blog:sync-topics` para relacionar temas con artículos — no la cambies.

## Frontmatter a completar

```yaml
title: "..."
slug: "<mismo id del tema>"
description: "..."
excerpt: "..."
category: "<una de las 8 categorías válidas, igual a la del listado de temas>"
tags: ["..."]
audience: [...]        # copia el audience del tema
intent: "..."           # copia el intent del tema
funnelStage: "..."      # copia el funnelStage del tema
services:                # entre 1 y 3 servicios realmente relacionados
  - "desarrollo-mvp"
cta:
  type: "service"
  target: "desarrollo-mvp" # debe estar incluido en services
# image:                 # opcional, solo si existe un activo validado en public/
#   src: "/blog/imagen.webp"
#   alt: "Descripción objetiva de la imagen"
author: "Código Startup"
status: "draft"
featured: false
createdAt: "<fecha de hoy, YYYY-MM-DD>"
updatedAt: "<misma fecha>"
seo:
  title: "..."
  description: "..."
  primaryKeyword: "..."
  secondaryKeywords: []
relatedArticles: []      # solo slugs de artículos que ya existan en drafts o published
reviewStatus: "pending"
reviewScore: null
```

## Reglas al guardar

- Guarda el artículo **solo** en `content/blog/drafts/`.
- `status` siempre `"draft"`. No apruebes, no publiques, no muevas archivos.
- No sobrescribas un archivo existente con el mismo slug — si ya existe, detente y repórtalo en vez de sobrescribir.
- No modifiques artículos ya `approved` o `published`.
- `relatedArticles` solo puede apuntar a slugs que ya existan (en `drafts/` o `published/`) — nunca inventes una relación con un artículo que todavía no existe.
- `services` debe usar slugs de `src/lib/commercial/schema.ts` y reflejar el tema real del artículo; no relaciones todos los servicios por defecto.
- `cta.target` debe ser el siguiente paso comercial más pertinente y estar incluido en `services`.

## Después de generar

1. Ejecuta `npm run blog:validate -- <slug>` y corrige cualquier error estructural.
2. No cambies el `status` del tema en el YAML — eso lo hace `npm run blog:sync-topics`, no este prompt.
3. Entrega un resumen con: archivo creado, tema origen, advertencias de validación (si las hubo), y cualquier afirmación que requiera verificación externa antes de publicarse.
