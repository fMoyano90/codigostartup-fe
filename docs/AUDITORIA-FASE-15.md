# Auditoría final (Fase 15)

Revisión posterior a la migración (Fases 1–14). Resultado global: **sin bloqueadores de
producción**. El sitio pasa todas las verificaciones automáticas y las revisiones manuales;
lo pendiente es contenido editorial que, por regla del proyecto, no se completa inventando.

## Resumen de verificaciones (25 puntos)

| # | Punto | Estado | Nota |
|---|---|---|---|
| 1 | Enlaces rotos | ✅ | Todos los `href` internos apuntan a rutas existentes; los dinámicos derivan de slugs válidos en datos. |
| 2 | Rutas | ✅ | 12 rutas de página + rutas de imagen OG; 367 páginas generadas. |
| 3 | Navegación móvil | ✅ | `aria-expanded`, `aria-controls`, `aria-label`, `aria-current` en `SiteHeaderClient`. |
| 4 | Formularios | ✅ | Validación Zod por `formType`, honeypot + tiempo mínimo, estados idle/success/error. |
| 5 | Mensajes de WhatsApp | ✅ | `buildLeadWhatsAppUrl` prellena nombre, tipo de evaluación y detalles. |
| 6 | Responsive | ✅ | Unidades relativas, `@media`, imágenes `next/image`. |
| 7 | Accesibilidad | ✅ | HTML semántico, un `<h1>` por página, FAQ con `<details>/<summary>`. |
| 8 | Contraste | ⚠️ | Paleta ink/parchment/ember/volt; revisión visual recomendada (no automatizable aquí). |
| 9 | Navegación por teclado | ✅ | Menú con `<button>`, FAQ nativa, `:focus-visible` en CSS. |
| 10 | Rendimiento | ✅ | `next/font`, `next/image`, prerender estático; sin dependencias nuevas innecesarias. |
| 11 | Imágenes | ✅ | Todas con `alt` (decorativas con `alt=""` + `aria-hidden`); MDX sin imágenes sin alt. |
| 12 | SEO técnico | ✅ | Fase 13: canonicals, title.template, robots directive, headings. |
| 13 | Metadatos | ✅ | Title/description por página; OG/Twitter; marca consistente ("Código Startup"). |
| 14 | Sitemap | ✅ | 190 URLs, canonical helper, filtra canonicals externos. |
| 15 | Robots | ✅ | `robots.txt` con disallow de `/api/`, `/admin/`, `/private/`, `/blog/preview/` + sitemap. |
| 16 | Datos estructurados | ✅ | Organization, WebSite, Service, FAQPage, BreadcrumbList, Article. |
| 17 | Analítica | ✅ | Fase 14: 9 eventos vía capa central, UTM automático, sin PII. |
| 18 | Errores de consola | ✅ | Solo `console.error` de servidor (submit-lead) y `console.debug` de analítica gated por `NODE_ENV`. |
| 19 | TypeScript | ✅ | `tsc --noEmit` limpio. |
| 20 | Lint | ✅ | Solo el warning preexistente de `<img>` en `LogoLoop.tsx`. |
| 21 | Build | ✅ | `next build` exitoso, 367 páginas. |
| 22 | Páginas sin contenido | ✅ | Todas las rutas renderizan contenido; 404 propia con enlaces. |
| 23 | Placeholders editoriales | ⚠️ | 4 proyectos en `editorialStatus: "draft"` con placeholders — **pendiente editorial, no técnico**. |
| 24 | Contenido duplicado | ✅ | Capacidades transversales se reutilizan como componente compartido, no como texto duplicado por página. |
| 25 | Consistencia entre CTAs | ✅ | Etiquetas por servicio siguen el patrón del roadmap (Cotizar/Evaluar/Detectar/Solicitar). |

## Bloqueadores para producción

Ninguno. TypeScript, lint, pruebas (178) y build pasan.

## Problemas importantes

Ninguno de naturaleza técnica. El único punto relevante es de contenido:

- **Casos de proyecto incompletos (editorial).** `src/data/projects.ts` marca `subtech`,
  `entrena`, `nextdrill` y `nucleo-gestor` como `editorialStatus: "draft"`. Sus páginas
  muestran placeholders (`EditorialPlaceholder`) para contexto, proceso, resultados y galería.
  Es el estado esperado desde la Fase 9; **requiere que una persona valide y aporte datos
  reales** (no se inventan). Al completarse, cambiar a `editorialStatus: "ready"` y vaciar
  `editorialNotes` (el schema lo exige).

## Mejoras recomendadas

- **Contraste (revisión visual).** Validar en Lighthouse/axe los textos secundarios
  (`--parch-dim` sobre `--ink`) para asegurar AA en cuerpos pequeños.
- **Publicación programada de artículos.** Hoy un artículo con `publishedAt` futuro no
  aparece hasta el próximo build (sin ISR). Si se planea calendarizar contenido, agregar
  `revalidate` o un rebuild programado.
- **Verificación de Search Console.** Añadir `metadata.verification` cuando exista el token,
  para habilitar el panel de indexación.

## Mejoras opcionales

- **Eliminar `public/og-image.svg`.** Quedó sin referencias tras la Fase 13 (las imágenes OG
  se generan con `next/og`). Se puede borrar; es inofensivo dejarlo.
- **`twitter.site`/`creator`.** Requiere un handle de X; hoy no existe. La tarjeta de Twitter
  funciona igual con `og:image` como respaldo.
- **Perfiles sociales adicionales** (`Organization.sameAs`): actualmente LinkedIn e Instagram;
  agregar otros si se abren.

## Correcciones automáticas aplicadas en esta fase

Ninguna: no se detectaron problemas técnicos claros que corregir. El sitio ya estaba en estado
consistente tras las Fases 13–14. Los pendientes restantes son decisiones de contenido o de
negocio y se dejan documentados arriba.
