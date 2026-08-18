# CONTEXTO WEB — CÓDIGO STARTUP
## Documento técnico para IA: qué ha sido el código, qué es ahora y qué sale en la web

> **Versión:** 17 ago 2026 · **Repositorio:** `codigostartup-fe`
> **Propósito:** que una IA entienda la evolución del código, el estado técnico actual y el contenido visible en https://codigostartup.com sin necesidad de leer el repositorio completo.
> **Relación con otros documentos:** `CONTEXTO_CODIGO_STARTUP.md` = contexto de NEGOCIO (empresa, ventas, equipo). `ROADMAP-SITE-EVOLUTION.md` = plan de migración por fases con prompts. Este documento = contexto de CÓDIGO y WEB.
> **Regla transversal para la IA:** NUNCA inventar contenido, casos, testimonios, métricas ni resultados. Si falta información, declararlo como pendiente. Todo lo escrito aquí está verificado contra el repositorio (17 ago 2026).

---

## 1. REGLAS BÁSICAS PARA TRABAJAR CON IA EN ESTE PROYECTO

1. Antes de modificar código, inspeccionar la implementación actual.
2. Mantener identidad visual, paleta, tipografías, animaciones y estilo general (paleta: ink / parchment / volt / violet).
3. No hacer rediseños completos; reutilizar componentes existentes; no duplicar componentes ni contenido.
4. No inventar casos de éxito, testimonios, métricas, clientes ni resultados. Usar placeholders identificados cuando falte contenido real.
5. Mantener la web funcionando; ejecutar `npm run lint`, `npm run typecheck`, `npm run test` y `npm run build` antes de terminar.
6. El contenido (servicios, proyectos, capacidades) vive como datos estructurados en `src/data/`, NO hardcodeado en componentes.
7. Todo el trabajo y contenido en español (El fundador NO habla inglés).
8. Estilo de trabajo: instrucciones cortas + acción · entregar contenido listo para copiar/pegar · no usar jerga interna con clientes.

---

## 2. QUÉ HA SIDO EL CÓDIGO (HISTORIA Y EVOLUCIÓN)

### 2.1 Fase 0 — Landing inicial (2024-2025)
- Sitio simple de una sola página para la software factory, que se presentaba como "conjunto de servicios técnicos" (webs, apps, MVPs sueltos).
- Estética "espacial"/oscura con acentos de color y animaciones GSAP, que se mantiene como base de identidad.

### 2.2 Fase 1 — Migración a sitio comercial (plan en ROADMAP-SITE-EVOLUTION.md)
Evolución gradual, una fase por vez, sin destruir lo que funcionaba:

| Fase | Qué se hizo |
|---|---|
| 1 | Auditoría del proyecto (stack, rutas, componentes, riesgos) |
| 2 | Modelo de contenido tipado (`Service` con hero, problemas, soluciones, entregables, proceso, SEO, etc.) |
| 3 | Sistema de componentes reutilizables (ServiceHero, ServiceFAQ, ServiceCTA, ServiceLeadForm, Breadcrumbs, etc.) |
| 4 | Navegación y footer nuevos: Soluciones · Proyectos · Blog · Nosotros · Contacto · CTA "Evaluar proyecto". Marketing deja de ser servicio |
| 5 | Home reconstruida como página distribuidora (orienta, no vende todo) |
| 6 | Página índice /soluciones organizada por necesidad |
| 7 | Páginas de los 3 servicios principales: sitios-web, software-a-medida, desarrollo-mvp |
| 8 | Páginas de servicios secundarios: automatizacion-de-procesos, aplicaciones-web, aplicaciones-moviles, auditoria-y-evolucion |
| 9 | Proyectos convertidos en sistema de casos (SubTech, Entrena, NextDrill, Núcleo Gestor) |
| 10 | Páginas /nosotros y /proceso |
| 11 | Formularios específicos por servicio + formulario general + anti-spam + WhatsApp prellenado |
| 12 | Blog conectado con servicios (MDX, categorías, artículos relacionados, CTAs contextuales) |
| 13 | SEO técnico (metadatos, Open Graph, datos estructurados, sitemap, robots, 404) |
| 14 | Analítica centralizada (9 eventos en capa única, UTM automático, sin PII) |
| 15 | Auditoría final: 25 puntos de verificación, sin bloqueadores de producción |

Resultado de la Fase 15: **TypeScript limpio, lint OK, 178 tests pasando, build exitoso con 367 páginas generadas, 190 URLs en sitemap**.

### 2.3 Rediseño del hero y secciones de la home (ago 2026)
- Commit `5efabbc feat(home): rediseñar hero y secciones de la página principal`: nuevo hero con video de fondo, secciones reorientadas al nuevo posicionamiento comercial (automatización + IA + capacitación), +887 líneas CSS, nuevos assets (`video-hero.mp4`, `fondo-el-equipo.jpg`, `problemas-que-resolvemos.jpg`).
- Commit `ec81278 chore(assets): agregar video del hero`.
- La home ya no usa los viejos grupos "Construimos / Optimizamos / Comunicamos" (aún presentes como datos en `src/data/home.ts` pero NO renderizados en la página).

### 2.4 Trabajo en curso (sin commit, 17 ago 2026)
- **Centrado del contenido en mobile** para 3 secciones de la home (detalle en §5).
- Otros cambios locales: assets nuevos (imágenes de cards, logos), módulo de talleres (`talleres/`), modelo de negocio en `public/`, documento PDF de alineación estratégica.

---

## 3. QUÉ ES EL CÓDIGO AHORA (ESTADO TÉCNICO)

### 3.1 Stack
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4
- **Animación:** GSAP, Lenis, Three.js / OGL (fondos y efectos)
- **Iconos:** lucide-react
- **Contenido blog:** MDX + gray-matter + next-mdx-remote, remark-gfm, rehype-slug
- **Validación:** Zod
- **Formularios/leads:** envío vía Resend + honeypot anti-spam
- **Testing:** Vitest (+ tests de componentes con Testing Library en archivos `*.test.tsx`)
- **Scripts CLI (tsx):** pipeline editorial del blog (validar, aprobar, publicar, revisar, listar)

### 3.2 Scripts disponibles (package.json)
| Comando | Uso |
|---|---|
| `npm run dev` | Desarrollo |
| `npm run build` / `start` | Build y producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run test` | Vitest |
| `npm run blog:*` | Pipeline editorial del blog (validate / approve / publish / reject / list / topics / review-report / sync-topics) |

### 3.3 Arquitectura de carpetas
```
src/
├── app/                    # Rutas (Next.js App Router)
│   ├── page.tsx            # Home (todas las secciones comerciales)
│   ├── soluciones/         # Índice + páginas por servicio ([slug])
│   ├── proyectos/          # Índice + casos por proyecto ([slug])
│   ├── blog/               # Índice, artículos [slug], categorías, preview
│   ├── nosotros/ proceso/ contacto/
│   ├── globals.css         # TODO el CSS del sitio (~7.500 líneas)
│   └── layout.tsx          # Layout global
├── components/             # Componentes reutilizables
│   ├── services/           # Piezas de páginas de servicio
│   ├── blog/               # Artículos, categorías, CTA
│   ├── projects/           # ProjectCard, ProjectCaseStudy
│   ├── site/               # Header, Footer, navegación
│   └── SectionHeader.tsx, Breadcrumbs, Galaxy, LogoLoop, ScrollStack, etc.
├── data/                   # CONTENIDO estructurado (no hardcodeado)
│   ├── services.ts         # 8 servicios
│   ├── capabilities.ts     # 9 capacidades transversales
│   ├── projects.ts         # 4 proyectos/casos
│   ├── commercial.ts       # servicios/capacidades/siteConfig consolidados para la home
│   └── home.ts             # datos de home (logos, grupos antiguos, proyectos)
├── lib/                    # Lógica: SEO, blog, comercial, leads, analítica
├── config/                 # site.ts (contacto, redes), categorías blog, reglas
├── components/analytics, seo, contact
content/blog/               # Artículos en MDX
scripts/blog/               # CLI editorial
prompts/ y docs/            # Documentación y prompts de trabajo
```

### 3.4 Rutas del sitio
```
/                              Home comercial (12 secciones)
/soluciones                    Índice por necesidad
/soluciones/[slug]             8 servicios:
                               sitios-web · tiendas-online · software-a-medida ·
                               automatizacion-de-procesos · desarrollo-mvp ·
                               aplicaciones-web · aplicaciones-moviles · auditoria-y-evolucion
/proyectos                     Índice (casos de clientes + productos propios)
/proyectos/[slug]              4 casos: subtech · entrena · nextdrill · nucleo-gestor
/blog                          Centro de Conocimiento
/blog/[slug] · /blog/categoria/[slug] · /blog/preview/[slug]
/nosotros · /proceso · /contacto
```

### 3.5 Dónde vive el contenido
| Contenido | Archivo |
|---|---|
| 8 servicios (nombre, hero, problemas, soluciones, FAQ, SEO…) | `src/data/services.ts` |
| 9 capacidades transversales | `src/data/capabilities.ts` |
| 4 proyectos / casos | `src/data/projects.ts` |
| Home: necesidades, talleres, problemas, cards de soluciones | `src/app/page.tsx` |
| Home: logo tech, grupos de servicios, proyectos destacados | `src/data/home.ts` |
| Artículos del blog | `content/blog/*.mdx` |

Los datos se validan con esquemas Zod (`src/lib/commercial/schema.ts`) y tienen tests asociados (`src/data/commercial-data.test.ts`, `src/lib/commercial/schema.test.ts`).

### 3.6 Estado de calidad (auditoría Fase 15, completada)
- Sin bloqueadores de producción. 25 puntos de verificación aprobados (enlaces, rutas, navegación móvil, formularios, WhatsApp prellenado, responsive, accesibilidad, teclado, rendimiento, alt text, SEO técnico, metadatos, datos estructurados, analítica, consola limpia).
- **178 tests pasando · build exitoso · 367 páginas · 190 URLs en sitemap.**

### 3.7 Identidad visual
- **Paleta:** `--ink` (fondos oscuros), `--parchment` (gris claro), `--volt` (amarillo #FDC828), `--violet` (#7C3AED).
- **Tipografías:** `--font-bebas` (titulares condensados), `--font-mono` (etiquetas/eyebrows/CTAs).
- **Estética:** superficies de vidrio con `backdrop-filter`, gradientes oscuros, líneas de acento decorativas (::before/::after), bordes redondeados 16-20px, hover con acento volt/violet según paridad.
- **Breakpoints usados en la home:** 980px (grids 2 columnas), 680px (mobile), 640px (sección proceso IDEA), 641-1100px (layouts intermedios).

---

## 4. LO QUE SALE EN LA WEB HOY (CONTENIDO VISIBLE)

### 4.1 Home — secciones en orden (src/app/page.tsx)

1. **Hero** — video de fondo (`/video-hero.mp4`). H1: "OPTIMIZAMOS EL TRABAJO MANUAL DE TU OPERACIÓN CON IA APLICADA." CTAs: [Ver talleres corporativos] → `#talleres` · [Agendar diagnóstico] → `/contacto`.

2. **¿Qué necesitas resolver?** (selector de necesidad, 4 cards):
   - *Capacitación & Talleres* → "Quiero capacitar a mi equipo" → #talleres
   - *Automatización e IA* → "Quiero automatizar un proceso" → automatizacion-de-procesos / contacto
   - *Software y productos* → "Necesito software a medida" → software-a-medida / desarrollo-mvp
   - *Sistemas existentes* → "Quiero revisar un sistema existente" → auditoria-y-evolucion

3. **Talleres corporativos** — "Talleres de IA Aplicada: capacitación práctica en procesos reales". 7 talleres in-company:
   - IA para Productividad Administrativa · Automatización de Procesos con IA · IA para Recursos Humanos · IA para Equipos Comerciales · IA para Marketing · IA para Líderes y Jefaturas · IA para Gestión de Proyectos
   - Todos incluyen el módulo de ciberseguridad ("qué información NO poner en una IA pública").
   - Banner: "Capacitaciones adaptadas a tu sector" (programas in-company a medida).

4. **Proyectos reales** — "Construido. Lanzado. Operando." Cases de clientes en tarjetas: **SubTech** (minería subterránea), **Entrena** (fitness), **NextDrill** (finanzas). Enlace: "Ver todos los proyectos →".

5. **Los bloqueos operativos** — "La realidad operativa": 8 problemas (planillas manuales, procesos por WhatsApp, reportes manuales, sistemas desconectados, herramientas genéricas, IA usada solo como redactor, dudas de privacidad, búsqueda en PDFs).

6. **Soluciones** — "Una ruta para cada etapa". 6 cards:
   - Talleres de IA Corporativos (Capacitación & Talleres)
   - Automatización de Procesos con IA (Automatización e IA)
   - Software a Medida (Ingeniería y software)
   - Desarrollo de MVP (Productos y plataformas)
   - Auditoría y Evolución (Sistemas existentes)
   - Agentes de IA y Bases de Conocimiento (automatización, RAG sobre la información de la empresa) → /contacto

7. **Capacidades transversales** — "Todo lo necesario para construir y lanzar". 9 cards: Estrategia · UX/UI · Desarrollo · Contenido · SEO · Analítica · Arquitectura · Seguridad · Lanzamiento y evolución.

8. **Metodología (proceso)** — "CÓMO TRABAJAMOS: EL MÉTODO IDEA." 4 etapas con letras de color:
   - **I** Identificar · **D** Diagnosticar · **E** Ejecutar · **A** Acompañar

9. **Nuestro blog** — "Información, conocimiento y opinión". Un espacio con artículos, análisis y criterio propio sobre automatización, IA y software (3 últimos publicados, `ArticleCard`).

10. **El equipo** — "El equipo técnico que ejecuta contigo" + 4 principios: Diagnóstico antes de proponer · Talleres 100% prácticos · Entregables claros y medibles · Seguridad de datos primero.

11. **Preguntas frecuentes** — "Antes de dar el siguiente paso" (acordeones `<details>`).

12. **CTA final** (fondo amarillo) — "LLEVAMOS LA EFICIENCIA OPERACIONAL A TU EMPRESA." → [Agendar reunión diagnóstica] (link a agenda de reservas).

### 4.2 /soluciones — "Una solución distinta para cada etapa de tu negocio"
Organizada por necesidad: atraer clientes (sitios web, tiendas online) · ordenar la operación (software a medida, automatización de procesos) · lanzar un producto (MVP, aplicaciones web, aplicaciones móviles) · mejorar un sistema existente (auditoría y evolución). Cada servicio tiene página propia con hero, problemas, tipos de solución, capacidades, proceso, FAQ, artículos relacionados y formulario específico.

### 4.3 /proyectos — casos de éxito + productos propios
- 3 casos de clientes con testimonio real: **SubTech** · **Entrena** · **NextDrill** (cada uno con su página de caso: contexto, problema, proceso, soluciones, galería con videos demo).
- **Núcleo Gestor** como **producto propio** (sección diferenciada en el índice + ficha con logo a color en /nosotros). Plataforma SaaS de cumplimiento DS44 para minería, offline + firma electrónica.
- Pendiente editorial: los casos fueron completados con contenido verificado (situación anterior, problema, proceso); si falta algún dato usa placeholders `[Pendiente: ...]`.

### 4.4 /blog — Centro de Conocimiento
Artículos MDX orientados a problemas de negocio (no a programadores): automatización de cotizaciones, reportes, procesamiento de documentos, cuándo usar IA. Categorías, artículos relacionados por servicio, CTAs contextuales, sistema de preview para drafts y pipeline de revisión editorial vía CLI.

### 4.5 /nosotros · /proceso · /contacto
- **/nosotros:** equipo, forma de trabajar, producto propio (Núcleo Gestor), galería fotográfica.
- **/proceso:** metodología y etapas de trabajo con el cliente.
- **/contacto:** formulario general (Nombre, Empresa, Correo, WhatsApp, Tipo de proyecto, Etapa, Descripción) + agenda de reunión.

### 4.6 Navegación principal
`Soluciones | Proyectos | Blog | Nosotros | Contacto` + botón CTA **"Evaluar proyecto"**. Footer con redes (LinkedIn, Instagram) y links del sitio.

### 4.7 Datos de contacto del sitio (`src/config/site.ts`)
- Email: hola@codigostartup.com · WhatsApp: +56 9 6607 3259 (mensaje prellenado) · Agenda: https://reservas.codigostartup.com/r/agendar-reunion · LinkedIn · Instagram @codigostartup.com_

---

## 5. CAMBIOS RECIENTES EN CURSO (sin commit — 17 ago 2026)

### Centrado de contenido en mobile (solo versión móvil, desktop intacto)
Ajustes hechos en `src/app/globals.css` dentro de media queries (no modifican desktop):

1. **Cards de soluciones "Una ruta para cada etapa"** — dentro de `@media (max-width: 680px)`:
   - `.home-solutions-grid .service-card` → `text-align: center`
   - `.home-solutions-grid .service-card .service-link` → `align-self: center` (para sobreescribir el `align-self: flex-start` base)

2. **Cards de capacidades transversales** — mismo media query 680px:
   - `.home-capabilities-section .home-capability-card` → `text-align: center`
   - `.home-capabilities-section .home-capability-head` → `justify-content: center` (icono + título centrados)

3. **Sección Metodología (Método IDEA)** — dentro de `@media (max-width: 640px)`:
   - `.process-header` → `align-items: center; text-align: center` (título de la sección centrado)
   - `.process-desc-text` → `max-width: none`
   - `.process-step-header` → de columna a fila centrada: `flex-direction: row; justify-content: center` (la letra de color I/D/E/A queda a la IZQUIERDA del título, no arriba)
   - `.process-n` → tamaño aumentado de ~2rem a **3.5rem** (incluye override `.home .process-step .process-n` para ganar especificidad sobre el estilo home)
   - `.process-step` → `text-align: center` (todo el contenido de cada card centrado)

**Regla importante para futuros cambios:** los breakpoints history están en `globals.css`. Verificar brechas: home usa 980/680, la sección proceso usa 640. No asumir que un cambio en 680px afecta la sección proceso.

---

## 6. HISTORIAL GIT RELEVANTE (resumen)

```
ec81278 chore(assets): agregar video del hero
5efabbc feat(home): rediseñar hero y secciones de la página principal
c414dd6, ee3a9fa: separar cards de necesidades (gap + bordes)
1fa6a2c fix(blog): sintaxis MDX en Callout tags (compatibilidad build)
10a35ba feat(blog): nuevas categorías al Centro de Conocimiento
601c933, f2ce6f2, 7a6fd80: videos demo en casos de proyectos
0cb0ddb, 30ea2eb: contenido verificado de casos (problema, situación anterior, proceso)
bd6ebc6 feat(nosotros): 18 fotos nuevas en galería del equipo
f09f325 fix(nav): posición y alineación del menú móvil
f731039, b21adcd, 95d3673: formularios (selects, honeypot oculto, espaciados)
c2dbf74 refactor(ui): quitar cursor personalizado (cursor nativo)
374c3a5 feat(site): evolución comercial completa (fases 10-15)
b5cb0d3 feat(blog): sistema de blog MDX + infraestructura
fe564bb, cf6d3cd, 697aa3d: landing de propuesta comercial (fase previa a la migración)
```

---

## 7. OTROS DOCUMENTOS DE REFERENCIA

| Documento | Contenido |
|---|---|
| `CONTEXTO_CODIGO_STARTUP.md` | Contexto completo de NEGOCIO: empresa, equipo, servicios y precios, método IDEA, método comercial, productos, plan 90 días |
| `ROADMAP-SITE-EVOLUTION.md` | Plan de migración por fases (1-15) con prompts listos para IA |
| `docs/AUDITORIA-FASE-15.md` | Informe de auditoría final (25 puntos de verificación) |
| `docs/ANALYTICS.md` | Sistema de eventos de analítica |
| `docs/blog-architecture.md`, `docs/blog-operations.md` | Arquitectura y operación del blog |
| `public/modelo-negocio-12-agosto-2026.md` | Modelo de negocio al día |

---

*Fin del documento. Para datos de negocio (precios, clientes, estrategia comercial) consultar `CONTEXTO_CODIGO_STARTUP.md`. Para profundizar en implementación, leer los archivos citados en las secciones 3 y 4 del repositorio.*