# Sistema editorial automatizado para Código Startup

## Objetivo final

Implementar un blog estático orientado a founders, emprendedores, empresarios y gerentes.

El sistema debe cumplir estas condiciones:

* sin backend;
* sin base de datos;
* sin CMS;
* artículos almacenados como archivos MDX;
* contenidos versionados con Git;
* Codex o una IA externa genera directamente los archivos;
* los artículos nuevos quedan siempre en borrador;
* existen validaciones estructurales automáticas;
* existen revisiones editoriales especializadas;
* la IA puede mejorar borradores;
* la publicación requiere aprobación humana explícita;
* únicamente los artículos publicados aparecen en producción.

Flujo final esperado:

```text
Listado de temas
↓
Codex genera archivos MDX
↓
Los guarda en drafts
↓
Validación estructural
↓
Revisión editorial
↓
Corrección de borradores
↓
Nueva revisión
↓
Aprobación humana
↓
Publicación
↓
Commit y despliegue
```

---

# FASE 1 — Analizar el proyecto y definir la arquitectura

## Objetivo

Antes de modificar el repositorio, analizar su estructura y proponer una arquitectura compatible con el proyecto actual.

## Prompt 1

Analiza este repositorio para diseñar un sistema editorial y un blog estático basado exclusivamente en archivos MDX.

Todavía no implementes el blog completo ni agregues integración con proveedores de inteligencia artificial.

## Contexto del sistema

El blog estará orientado a:

* founders;
* emprendedores;
* empresarios;
* gerentes;
* personas que toman decisiones sobre tecnología sin ser necesariamente desarrolladores.

El contenido debe ayudar a:

* evaluar inversiones tecnológicas;
* crear productos digitales;
* automatizar procesos;
* seleccionar proveedores;
* comprender costos;
* detectar riesgos;
* tomar decisiones relacionadas con software e inteligencia artificial.

El sistema no tendrá:

* backend;
* base de datos;
* CMS;
* panel de administración;
* API para generar artículos.

Una IA con acceso al repositorio escribirá directamente los archivos MDX y ejecutará los comandos disponibles.

## Flujo editorial esperado

```text
topic list
→ draft MDX
→ structural validation
→ editorial review
→ improvement
→ human approval
→ publication
```

## Tareas

1. Analiza:

   * framework;
   * versión del framework;
   * sistema de rutas;
   * TypeScript;
   * configuración de estilos;
   * sistema de componentes;
   * configuración de SEO;
   * sitemap;
   * fuentes y tipografías;
   * scripts de package.json;
   * gestor de paquetes;
   * lint;
   * tests;
   * build;
   * estructura de carpetas;
   * dependencias ya instaladas relacionadas con Markdown o MDX.

2. Determina:

   * qué librería MDX conviene utilizar;
   * si ya existe una integración MDX;
   * cómo renderizar artículos estáticamente;
   * cómo generar rutas por slug;
   * cómo leer frontmatter;
   * cómo validar el contenido;
   * cómo generar metadatos;
   * cómo integrar los artículos al sitemap;
   * cómo manejar borradores sin exponerlos en producción.

3. Propón una estructura de carpetas similar a esta, adaptándola a las convenciones reales del proyecto:

```text
content/
  blog/
    drafts/
    published/
    rejected/
  sources/
    topics/
    references/

config/
  blog-categories.ts
  editorial-rules.ts

lib/
  blog/
    article-schema.ts
    article-loader.ts
    article-utils.ts
    category-utils.ts
    related-articles.ts

scripts/
  blog/
    validate.ts
    review.ts
    review-all.ts
    approve.ts
    publish.ts
    reject.ts

prompts/
  blog/
    generation.md
    audience-review.md
    business-value-review.md
    pedagogy-review.md
    writing-review.md
    seo-review.md
    improvement.md

reports/
  blog/
```

4. Propón el esquema del frontmatter.

5. Propón los estados editoriales.

Usa inicialmente:

```ts
type ArticleStatus =
  | 'draft'
  | 'approved'
  | 'published'
  | 'rejected'
```

6. Explica qué validaciones deberían ser deterministas y cuáles deberían depender de una revisión editorial asistida por IA.

7. No implementes todavía integraciones con APIs de IA.

8. No agregues dependencias sin justificar cada una.

## Entregable

Entrega:

* diagnóstico del proyecto;
* arquitectura recomendada;
* dependencias necesarias;
* archivos que se crearán;
* archivos existentes que deberán modificarse;
* decisiones técnicas;
* riesgos;
* orden propuesto de implementación.

No realices cambios importantes hasta terminar el análisis.

---

# FASE 2 — Implementar el blog MDX público

## Objetivo

Construir primero un blog funcional que lea exclusivamente artículos publicados.

No implementar todavía revisores con IA.

## Prompt 2

Implementa la base pública del blog MDX siguiendo la arquitectura aprobada en el análisis anterior.

## Restricciones

* No utilizar backend.
* No utilizar base de datos.
* No utilizar CMS.
* No integrar todavía APIs de IA.
* No publicar borradores.
* Reutilizar estilos y componentes existentes.
* Mantener la identidad visual de Código Startup.

Paleta de Código Startup:

```text
#FCC828
#420988
#894CE0
#F9D782
#0A0A0A
```

No utilices todos los colores con la misma intensidad. Prioriza legibilidad, espacio y una experiencia editorial profesional.

## Estructura de contenido

Implementa una estructura equivalente a:

```text
content/
  blog/
    drafts/
    published/
    rejected/
```

Únicamente los archivos contenidos en `published` deben aparecer en producción.

## Categorías

Crea un archivo centralizado de categorías con estas categorías iniciales:

```text
crear-productos-digitales
software-para-empresas
automatizacion-e-ia
costos-y-presupuestos
proveedores-tecnologicos
escalabilidad-y-crecimiento
seguridad-y-riesgos
casos-de-exito
```

Cada categoría debe incluir:

```ts
type BlogCategory = {
  slug: string
  name: string
  description: string
}
```

Los nombres visibles deben ser:

1. Crear productos digitales
2. Software para empresas
3. Automatización e inteligencia artificial
4. Costos y presupuestos
5. Proveedores tecnológicos
6. Escalabilidad y crecimiento
7. Seguridad y riesgos tecnológicos
8. Casos de éxito

## Esquema de frontmatter

Implementa un esquema equivalente a:

```ts
type BlogArticleFrontmatter = {
  title: string
  slug: string
  description: string
  excerpt: string

  category: string
  tags: string[]

  audience: Array<
    'founders' |
    'emprendedores' |
    'empresarios' |
    'gerentes'
  >

  intent: 'informational' | 'commercial' | 'transactional'
  funnelStage: 'awareness' | 'consideration' | 'decision'

  author: string
  status: 'draft' | 'approved' | 'published' | 'rejected'
  featured: boolean

  createdAt: string
  updatedAt: string
  approvedAt?: string | null
  publishedAt?: string | null

  seo: {
    title: string
    description: string
    primaryKeyword: string
    secondaryKeywords: string[]
    canonicalUrl?: string
  }

  relatedArticles: string[]

  reviewStatus?: 'pending' | 'passed' | 'changes_required'
  reviewScore?: number | null
}
```

Adáptalo a las librerías y convenciones del repositorio.

Valida:

* campos obligatorios;
* formatos de fecha;
* estados;
* categorías existentes;
* slug válido;
* arrays;
* valores enumerados.

## Rutas públicas

Implementa:

```text
/blog
/blog/[slug]
/blog/categoria/[slug]
```

Si el proyecto ya usa otra convención coherente, consérvala y documenta la decisión.

## Página principal del blog

Debe contener:

* título claro;
* descripción orientada a empresarios y founders;
* artículos destacados;
* artículos recientes;
* acceso a categorías;
* tarjetas reutilizables;
* filtro por categoría, cuando aporte valor;
* CTA comercial sutil.

Título sugerido:

```text
Tecnología para tomar mejores decisiones
```

Descripción sugerida:

```text
Guías y análisis para crear productos digitales, automatizar procesos y evaluar inversiones tecnológicas sin tomar decisiones a ciegas.
```

## Página de artículo

Debe incluir:

* título;
* descripción;
* categoría;
* autor;
* fecha de publicación;
* fecha de actualización;
* tiempo de lectura calculado automáticamente;
* breadcrumbs;
* contenido MDX;
* índice navegable, cuando corresponda;
* artículos relacionados;
* CTA contextual;
* buena experiencia móvil;
* ancho de lectura controlado;
* tablas responsivas;
* estilos para citas, listas, alertas y ejemplos.

## SEO

Implementa:

* metadata por artículo;
* canonical;
* Open Graph;
* Twitter Cards;
* `Article` structured data;
* `BreadcrumbList`;
* sitemap;
* un único `h1`;
* semántica correcta;
* fechas de publicación y actualización;
* URLs limpias;
* contenido renderizado desde servidor o durante build;
* no depender del cliente para mostrar el contenido principal.

## Borradores

Los borradores no deben:

* aparecer en listados;
* incluirse en sitemap;
* poder indexarse;
* generar rutas públicas en producción.

En desarrollo, puedes implementar una preview sencilla si no agrega complejidad innecesaria.

Debe incluir `noindex`.

## Artículos de prueba

Crea manualmente dos artículos publicados para probar el sistema:

1. `que-validar-antes-de-desarrollar-una-aplicacion`
2. `cuando-dejar-de-usar-planillas`

Los artículos pueden ser breves, pero deben contener MDX válido y demostrar:

* títulos;
* párrafos;
* listas;
* subtítulos;
* enlaces internos;
* componentes MDX, si se implementan;
* metadatos;
* artículos relacionados.

## Validación final

Ejecuta:

* typecheck;
* lint;
* tests disponibles;
* build.

Corrige todos los errores relacionados con la implementación.

## Entregable

Informa:

* archivos creados;
* archivos modificados;
* dependencias agregadas;
* rutas disponibles;
* cómo crear manualmente un artículo;
* cómo agregar una categoría;
* cómo funciona el filtrado de publicados;
* resultado del lint, tests y build.

---

# FASE 3 — Implementar validaciones y flujo editorial

## Objetivo

Crear comandos locales para validar, aprobar, rechazar y publicar artículos.

Todavía no implementar revisiones subjetivas con IA.

## Prompt 3

Implementa el flujo editorial determinista del blog MDX.

No agregues todavía llamadas a APIs de inteligencia artificial.

## Flujo esperado

```text
draft
→ validation
→ human approval
→ publication
```

## Reglas editoriales centralizadas

Crea un archivo de configuración equivalente a:

```ts
export const editorialRules = {
  minimumWords: 900,
  maximumWords: 2500,
  minimumInternalLinks: 2,
  minimumReviewScore: 7,

  requiredFrontmatterFields: [
    'title',
    'slug',
    'description',
    'excerpt',
    'category',
    'audience',
    'intent',
    'funnelStage',
    'author',
    'status',
    'seo',
  ],

  blockedExpressions: [
    'En el mundo actual',
    'En la era digital',
    'Es importante destacar',
    'Llevar tu negocio al siguiente nivel',
    'Solución revolucionaria',
  ],
}
```

Las expresiones bloqueadas deben reportarse inicialmente como advertencias, no necesariamente como errores críticos.

## Comando de validación

Implementa:

```bash
npm run blog:validate
```

También debe permitir:

```bash
npm run blog:validate -- <slug>
```

Debe validar:

* frontmatter;
* esquema;
* categoría;
* slug;
* slugs duplicados;
* estado;
* fechas;
* palabras mínimas y máximas;
* existencia de título;
* descripción;
* SEO title;
* SEO description;
* encabezados;
* un solo `h1`, si el contenido lo utiliza;
* enlaces internos;
* artículos relacionados existentes;
* imágenes con texto alternativo;
* rutas duplicadas;
* expresiones bloqueadas;
* archivos MDX inválidos;
* que ningún artículo publicado tenga errores críticos.

Clasifica los resultados como:

```text
error
warning
info
```

El comando debe terminar con código de error cuando existan problemas bloqueantes.

## Reporte de validación

Genera un reporte legible en consola.

Opcionalmente crea:

```text
reports/blog/validation-summary.json
```

Ejemplo:

```json
{
  "processed": 12,
  "valid": 9,
  "warnings": 2,
  "invalid": 1
}
```

## Comando de aprobación

Implementa:

```bash
npm run blog:approve -- <slug>
```

Debe:

1. encontrar el artículo en `drafts`;
2. ejecutar validaciones;
3. comprobar que no existan errores críticos;
4. comprobar que exista un reporte editorial aprobado, cuando esa funcionalidad ya esté disponible;
5. solicitar una confirmación explícita si el entorno lo permite;
6. cambiar el estado a `approved`;
7. agregar `approvedAt`;
8. mantener el archivo fuera de producción;
9. no moverlo a `published`.

Agrega una opción explícita para entornos automatizados, por ejemplo:

```bash
npm run blog:approve -- <slug> --yes
```

No sobrescribas datos existentes sin validación.

## Comando de publicación

Implementa:

```bash
npm run blog:publish -- <slug>
```

Debe:

1. encontrar un artículo aprobado;
2. validar nuevamente el archivo;
3. comprobar enlaces internos;
4. comprobar artículos relacionados;
5. establecer `status: published`;
6. agregar `publishedAt`;
7. actualizar `updatedAt`;
8. mover el archivo a `content/blog/published`;
9. impedir sobrescrituras;
10. ejecutar typecheck, lint o build según la estrategia recomendada;
11. revertir o dejar el repositorio en un estado claro si el proceso falla.

Debe soportar:

```bash
npm run blog:publish -- <slug> --skip-build
```

Solo cuando se use explícitamente.

## Comando de rechazo

Implementa:

```bash
npm run blog:reject -- <slug>
```

Debe:

* mover el archivo a `rejected`;
* cambiar el estado a `rejected`;
* conservar el contenido;
* no eliminar información;
* registrar la fecha, cuando corresponda.

## Comando de listado

Implementa:

```bash
npm run blog:list
```

Debe mostrar:

* slug;
* título;
* categoría;
* estado;
* fecha;
* review score, cuando exista;
* errores de validación.

Debe permitir filtros:

```bash
npm run blog:list -- --status draft
npm run blog:list -- --category software-para-empresas
```

## Scripts de package.json

Agrega comandos claros:

```json
{
  "blog:validate": "...",
  "blog:list": "...",
  "blog:approve": "...",
  "blog:publish": "...",
  "blog:reject": "..."
}
```

Usa el gestor de paquetes actual del proyecto.

## Pruebas

Agrega pruebas para:

* parsing del frontmatter;
* validación de categorías;
* slugs duplicados;
* transiciones de estado;
* publicación sin aprobación;
* publicación con errores;
* movimiento de archivos;
* artículos relacionados inexistentes.

## Documentación

Crea documentación en:

```text
docs/blog-editorial-workflow.md
```

Debe explicar:

* estructura;
* estados;
* validación;
* aprobación;
* publicación;
* recuperación ante errores;
* ejemplos de comandos.

## Validación final

Ejecuta:

* typecheck;
* lint;
* tests;
* build.

Entrega un resumen de resultados.

---

# FASE 4 — Implementar revisiones editoriales asistidas por IA

## Objetivo

Crear un sistema de revisión editorial que pueda ser ejecutado por Codex o por una IA con acceso al repositorio.

No es obligatorio consumir una API desde los scripts.

Prioriza que los prompts y reportes estén estandarizados para que cualquier agente pueda usarlos.

## Prompt 4

Implementa el sistema de revisión editorial para artículos MDX.

La IA que trabaja en el repositorio será responsable de leer los prompts, analizar los artículos y escribir los reportes.

No es necesario integrar una API externa dentro del proyecto.

## Revisores requeridos

Implementa cinco revisores conceptuales:

```text
audience
business-value
pedagogy
writing
seo
```

Crea prompts separados en:

```text
prompts/blog/
  audience-review.md
  business-value-review.md
  pedagogy-review.md
  writing-review.md
  seo-review.md
  improvement.md
```

## Formato de resultado

Define un esquema validable:

```ts
type ReviewResult = {
  reviewer:
    | 'audience'
    | 'business-value'
    | 'pedagogy'
    | 'writing'
    | 'seo'

  score: number
  approved: boolean

  strengths: string[]
  problems: Array<{
    severity: 'blocking' | 'important' | 'minor'
    message: string
    location?: string
  }>

  recommendations: string[]
}
```

Reporte consolidado:

```ts
type ArticleReviewReport = {
  slug: string
  reviewedAt: string

  approved: boolean
  totalScore: number

  reviews: {
    audience: ReviewResult
    businessValue: ReviewResult
    pedagogy: ReviewResult
    writing: ReviewResult
    seo: ReviewResult
  }

  blockingProblems: string[]
  recommendations: string[]
}
```

Guarda cada reporte en:

```text
reports/blog/<slug>.json
```

## Criterios del revisor de audiencia

Debe determinar si el artículo:

* está dirigido a founders, emprendedores, empresarios o gerentes;
* evita parecer documentación para developers;
* explica la jerga;
* conecta tecnología con negocio;
* ayuda a tomar decisiones;
* presenta consecuencias concretas;
* utiliza ejemplos comprensibles.

Debe fallar cuando:

* la mayoría del contenido sea implementación técnica;
* el artículo use conceptos sin explicar;
* no exista conexión con una necesidad empresarial;
* el lector objetivo real sea un programador.

## Criterios del revisor de valor empresarial

Debe evaluar si el lector puede:

* tomar una decisión;
* evaluar una inversión;
* detectar un riesgo;
* comparar alternativas;
* entender un costo;
* evaluar un proveedor;
* priorizar una automatización;
* decidir un próximo paso.

Debe fallar si el artículo solo entrega definiciones generales.

## Criterios del revisor pedagógico

Debe evaluar:

* progresión lógica;
* claridad;
* ejemplos;
* comparaciones;
* definiciones previas;
* ausencia de saltos conceptuales;
* conclusiones;
* próximos pasos;
* coherencia entre título y contenido.

## Criterios del revisor de redacción

Debe evaluar:

* ortografía;
* gramática;
* claridad;
* redundancia;
* longitud de párrafos;
* abuso de listas;
* frases vagas;
* tono artificial;
* clichés;
* introducciones genéricas;
* afirmaciones exageradas;
* lenguaje comercial excesivo;
* repeticiones propias de texto generado por IA.

Debe detectar expresiones como:

```text
En el mundo actual
En la era digital
Es importante destacar
Cabe señalar
Llevar tu negocio al siguiente nivel
Solución revolucionaria
Sin lugar a dudas
En conclusión
```

No todas deben ser errores bloqueantes, pero deben marcarse cuando empobrecen el texto.

## Criterios del revisor SEO

Debe evaluar:

* intención de búsqueda;
* título;
* slug;
* meta description;
* keyword principal;
* keywords secundarias;
* jerarquía de encabezados;
* preguntas frecuentes;
* enlaces internos;
* artículos relacionados;
* posibles duplicaciones;
* claridad del tema;
* ausencia de keyword stuffing.

El SEO no debe degradar la calidad editorial.

## Reglas de aprobación

Usa inicialmente:

```ts
export const reviewRules = {
  minimumScorePerRequiredReview: 7,

  requiredReviews: [
    'audience',
    'businessValue',
    'pedagogy',
    'writing',
  ],

  seoIsBlocking: false,
  blockingSeverityFailsArticle: true,
}
```

Un artículo se considera editorialmente aprobado cuando:

* todos los revisores obligatorios obtienen al menos 7;
* no existen problemas de severidad `blocking`;
* el esquema y estructura son válidos.

## Comando de consolidación

Implementa un comando:

```bash
npm run blog:review-report -- <slug>
```

Este comando no tiene que invocar una IA.

Debe:

1. leer los archivos de evaluación creados por el agente;
2. validar sus esquemas;
3. consolidarlos;
4. calcular el promedio;
5. determinar si el artículo está aprobado;
6. guardar el reporte final;
7. actualizar únicamente estos campos del frontmatter:

```yaml
reviewStatus: passed
reviewScore: 8.4
```

o:

```yaml
reviewStatus: changes_required
reviewScore: 6.3
```

No guardes todos los detalles dentro del MDX.

## Comando por lotes

Implementa:

```bash
npm run blog:review-summary
```

Debe mostrar:

* artículos revisados;
* aprobados;
* pendientes;
* con cambios requeridos;
* puntaje promedio;
* problemas más frecuentes;
* archivos sin reporte;
* reportes inválidos.

## Aprobación humana

Actualiza `blog:approve` para impedir la aprobación cuando:

* no exista reporte;
* el reporte no esté aprobado;
* existan errores estructurales;
* existan problemas bloqueantes.

Debe existir una opción explícita para forzar la aprobación:

```bash
npm run blog:approve -- <slug> --force --reason "Motivo"
```

La razón debe registrarse en un archivo de auditoría o reporte.

## Documentación

Actualiza la documentación con:

* formato de los reportes;
* responsabilidades de cada revisor;
* reglas de aprobación;
* cómo ejecutar la revisión con un agente;
* cómo consolidar resultados.

## Validación final

Ejecuta typecheck, lint, tests y build.

---

# FASE 5 — Preparar generación y procesamiento por lotes con Codex

## Objetivo

Permitir que Codex lea listados de temas, genere varios borradores y ejecute el pipeline sin publicar.

## Prompt 5

Implementa la estructura y documentación necesarias para generar artículos por lotes mediante una IA que trabaje directamente en el repositorio.

No integres una API de generación.

La IA escribirá directamente los archivos MDX.

## Listados de temas

Crea:

```text
content/sources/topics/
```

Utiliza archivos YAML para los listados, salvo que exista una razón técnica para otra alternativa.

Ejemplo:

```yaml
id: software-para-empresas-01
name: Software para empresas
category: software-para-empresas

topics:
  - id: planillas-insuficientes
    title: Señales de que las planillas ya no son suficientes
    status: pending
    intent: informational
    funnelStage: awareness
    audience:
      - empresarios
      - gerentes
    objective: Ayudar a detectar cuándo las planillas comienzan a generar riesgos.
    notes:
      - Incluir ejemplos de duplicación de datos.
      - Explicar riesgos de depender de una sola persona.

  - id: software-medida-vs-estandar
    title: Software a medida vs. software estándar
    status: pending
    intent: commercial
    funnelStage: consideration
    audience:
      - founders
      - empresarios
    objective: Ayudar a comparar ambas alternativas.
```

Estados de tema:

```ts
type TopicStatus =
  | 'pending'
  | 'generated'
  | 'reviewed'
  | 'published'
  | 'discarded'
```

## Esquema de topics

Implementa validación para los archivos de temas.

Debe detectar:

* ID duplicado;
* título vacío;
* categoría inexistente;
* estado inválido;
* audiencia inválida;
* intención inválida;
* temas ya generados que no tengan artículo;
* slugs existentes.

## Prompt editorial de generación

Crea:

```text
prompts/blog/generation.md
```

Debe indicarle al agente:

* escribir para founders, emprendedores, empresarios y gerentes;
* no escribir principalmente para desarrolladores;
* ayudar a tomar una decisión;
* explicar la tecnología desde su impacto empresarial;
* evitar detalles de implementación innecesarios;
* usar ejemplos;
* presentar riesgos;
* comparar alternativas;
* ofrecer próximos pasos;
* evitar clichés;
* evitar lenguaje comercial exagerado;
* no inventar estadísticas, precios, leyes, investigaciones ni fuentes;
* señalar cuando un dato requiere verificación externa;
* usar únicamente categorías válidas;
* guardar el artículo como `draft`;
* no aprobar;
* no publicar;
* no mover archivos;
* no sobrescribir artículos existentes.

## Plantilla del prompt para generar lotes

Crea un documento reutilizable en:

```text
docs/prompts/generate-blog-batch.md
```

Con la siguiente instrucción:

```text
Lee el archivo de temas indicado.

Selecciona únicamente los primeros N temas con status pending.

Antes de escribir:

1. Lee las categorías.
2. Lee las reglas editoriales.
3. Lee el esquema del frontmatter.
4. Lee el prompt de generación.
5. Revisa títulos, slugs y artículos existentes.
6. Revisa los artículos publicados para evitar duplicaciones.

Genera un archivo MDX por tema.

Guárdalos únicamente en content/blog/drafts.

No apruebes ni publiques.

Después de generar:

1. Ejecuta la validación estructural.
2. Corrige errores deterministas.
3. Actualiza el status de cada tema a generated.
4. No cambies el status si el artículo no pudo generarse correctamente.
5. Entrega un resumen de:
   - archivos creados;
   - temas omitidos;
   - errores;
   - advertencias;
   - artículos que necesitan verificación de datos.
```

## Plantilla para revisión por lotes

Crea:

```text
docs/prompts/review-blog-batch.md
```

Debe indicarle al agente:

1. buscar artículos draft sin reporte;
2. ejecutar validación estructural;
3. omitir archivos con errores críticos;
4. leer todos los prompts de revisión;
5. producir un resultado por revisor;
6. guardar reportes JSON;
7. ejecutar el consolidado;
8. no modificar los artículos;
9. no aprobar;
10. no publicar.

## Plantilla para mejora por lotes

Crea:

```text
docs/prompts/improve-blog-batch.md
```

Debe indicarle al agente:

1. buscar artículos con `changes_required`;
2. leer el artículo;
3. leer su reporte;
4. leer las reglas editoriales;
5. modificar únicamente el borrador;
6. resolver problemas bloqueantes e importantes;
7. preservar ideas y afirmaciones correctas;
8. no agregar datos inventados;
9. no cambiar la categoría sin justificación;
10. mostrar cambios mediante Git diff;
11. ejecutar nuevamente validación y revisión;
12. no aprobar ni publicar.

## Herramienta de estado

Implementa:

```bash
npm run blog:topics
```

Debe mostrar:

* listado;
* categoría;
* total de temas;
* pendientes;
* generados;
* revisados;
* publicados;
* inconsistencias.

Debe permitir:

```bash
npm run blog:topics -- --file software-para-empresas.yml
npm run blog:topics -- --status pending
```

## Comando de sincronización

Implementa:

```bash
npm run blog:sync-topics
```

Debe sincronizar el estado de los temas con los artículos existentes.

Ejemplos:

```text
pending + draft existente → generated
generated + artículo publicado → published
generated sin artículo → warning
published sin artículo publicado → error
```

No debe publicar ni mover archivos.

## Seguridad editorial

Asegura que ningún comando por lotes:

* apruebe automáticamente;
* publique automáticamente;
* mueva artículos a `published`;
* borre contenido;
* sobrescriba artículos sin una opción explícita.

## Documentación final

Crea una guía de operación:

```text
docs/blog-operations.md
```

Debe explicar:

* crear un listado;
* generar cinco artículos;
* validar;
* revisar;
* mejorar;
* revisar cambios;
* aprobar;
* publicar;
* recuperar un artículo rechazado;
* solucionar errores comunes.

Ejecuta typecheck, lint, tests y build.

---

# PROMPT OPERATIVO — Generar un lote de artículos

Utiliza este prompt cada vez que quieras que Codex genere contenido:

Lee el listado de temas ubicado en:

`content/sources/topics/[ARCHIVO].yml`

Genera los primeros `[CANTIDAD]` temas cuyo estado sea `pending`.

Antes de escribir:

1. Lee `prompts/blog/generation.md`.
2. Lee las categorías disponibles.
3. Lee las reglas editoriales.
4. Lee el esquema del frontmatter.
5. Revisa los artículos en drafts y published.
6. Evita duplicar temas, intenciones o títulos.
7. Respeta la categoría y el objetivo de cada tema.

Genera un archivo MDX por tema.

Guarda todos los archivos únicamente en:

`content/blog/drafts`

Cada artículo debe:

* estar dirigido a founders, emprendedores, empresarios o gerentes;
* aportar valor práctico;
* ayudar a tomar una decisión;
* explicar términos técnicos desde su consecuencia empresarial;
* utilizar ejemplos claros;
* presentar riesgos o errores frecuentes;
* incluir próximos pasos;
* utilizar una categoría existente;
* tener frontmatter válido;
* incluir SEO title y SEO description;
* proponer enlaces internos únicamente hacia artículos existentes o generados en este mismo lote;
* permanecer con `status: draft`;
* permanecer con `reviewStatus: pending`.

No:

* apruebes artículos;
* publiques artículos;
* muevas archivos a published;
* inventes cifras, leyes, estudios, testimonios o casos reales;
* sobrescribas archivos existentes;
* modifiques artículos publicados.

Después de generar:

1. Ejecuta `npm run blog:validate`.
2. Corrige únicamente errores estructurales o deterministas.
3. Vuelve a ejecutar la validación.
4. Actualiza el estado de los temas generados.
5. Muestra el Git diff.
6. Entrega un resumen con:

   * artículos creados;
   * temas omitidos;
   * errores;
   * advertencias;
   * afirmaciones que requieran verificación externa.

---

# PROMPT OPERATIVO — Revisar todos los borradores pendientes

Revisa todos los artículos ubicados en:

`content/blog/drafts`

Procesa solamente aquellos que:

* tengan `reviewStatus: pending`;
* no tengan un reporte editorial válido;
* no presenten errores estructurales críticos.

Para cada artículo:

1. Ejecuta la validación estructural.
2. Lee:

   * `prompts/blog/audience-review.md`;
   * `prompts/blog/business-value-review.md`;
   * `prompts/blog/pedagogy-review.md`;
   * `prompts/blog/writing-review.md`;
   * `prompts/blog/seo-review.md`.
3. Evalúa el artículo de manera independiente con cada criterio.
4. No suavices resultados para aprobar más contenido.
5. Guarda los resultados con el esquema definido.
6. Genera el reporte consolidado.
7. Ejecuta `npm run blog:review-report -- <slug>`.
8. No modifiques el contenido del artículo.
9. No apruebes.
10. No publiques.

Al terminar:

1. Ejecuta `npm run blog:review-summary`.
2. Entrega un resumen con:

   * cantidad revisada;
   * cantidad aprobada editorialmente;
   * cantidad con cambios requeridos;
   * errores estructurales;
   * problemas bloqueantes;
   * problemas más frecuentes;
   * puntaje promedio;
   * artículos que necesitan verificación humana especial.

---

# PROMPT OPERATIVO — Mejorar los artículos que fallaron

Busca todos los artículos en `content/blog/drafts` que tengan:

```yaml
reviewStatus: changes_required
```

Para cada artículo:

1. Lee el MDX.
2. Lee su reporte en `reports/blog`.
3. Lee las reglas editoriales.
4. Lee `prompts/blog/improvement.md`.
5. Corrige los problemas bloqueantes e importantes.
6. Mejora los problemas menores cuando no altere innecesariamente el texto.
7. Conserva el objetivo, categoría, intención y audiencia.
8. No inventes estadísticas, leyes, investigaciones, precios ni casos reales.
9. No elimines información útil únicamente para reducir longitud.
10. No conviertas el artículo en contenido técnico para developers.
11. Modifica el borrador existente.
12. No modifiques artículos approved o published.
13. Muestra claramente el Git diff.
14. Ejecuta nuevamente:

    * validación estructural;
    * revisiones editoriales;
    * consolidación del reporte.
15. No apruebes.
16. No publiques.

Entrega un resumen con:

* artículos modificados;
* problemas resueltos;
* problemas pendientes;
* puntajes anteriores;
* puntajes nuevos;
* artículos que requieren decisión humana.

---

# PROMPT OPERATIVO — Preparar artículos para aprobación humana

Busca artículos en `content/blog/drafts` que cumplan:

```yaml
reviewStatus: passed
```

Para cada uno:

1. Ejecuta validación estructural.
2. Comprueba que el reporte sea válido.
3. Comprueba que no existan problemas bloqueantes.
4. Comprueba los enlaces internos.
5. Comprueba artículos relacionados.
6. Comprueba título, descripción y SEO.
7. Comprueba que no existan afirmaciones evidentes sin respaldo.
8. No cambies el estado.
9. No apruebes.
10. No publiques.

Genera una lista para revisión humana con:

* título;
* slug;
* categoría;
* intención;
* audiencia;
* puntaje;
* número de palabras;
* enlaces internos;
* problemas menores pendientes;
* posibles afirmaciones que requieran verificación;
* recomendación: aprobar o revisar manualmente.

---

# PROMPT OPERATIVO — Aprobar artículos seleccionados

Aprueba únicamente los siguientes artículos:

```text
[LISTA DE SLUGS]
```

Para cada artículo:

1. Ejecuta las validaciones.
2. Comprueba que `reviewStatus` sea `passed`.
3. Comprueba que el reporte editorial esté aprobado.
4. Comprueba que no existan errores críticos.
5. Ejecuta:

```bash
npm run blog:approve -- <slug> --yes
```

No publiques todavía.

Entrega un resumen con:

* artículos aprobados;
* artículos omitidos;
* motivo de cada omisión;
* archivos modificados.

---

# PROMPT OPERATIVO — Publicar artículos seleccionados

Publica únicamente los siguientes artículos previamente aprobados:

```text
[LISTA DE SLUGS]
```

Antes de publicar:

1. Comprueba que el estado sea `approved`.
2. Ejecuta la validación final.
3. Comprueba enlaces internos.
4. Comprueba artículos relacionados.
5. Comprueba fechas.
6. Comprueba metadatos SEO.
7. Comprueba que no exista otro artículo con el mismo slug.

Después ejecuta:

```bash
npm run blog:publish -- <slug>
```

Al terminar:

1. Ejecuta typecheck.
2. Ejecuta lint.
3. Ejecuta tests.
4. Ejecuta build.
5. Revisa el Git diff.
6. No hagas commit ni push sin una instrucción explícita.

Entrega:

* artículos publicados;
* archivos movidos;
* fechas asignadas;
* resultado de typecheck;
* resultado de lint;
* resultado de tests;
* resultado del build;
* errores o advertencias pendientes.

---

# Flujo habitual de trabajo

## 1. Crear o ampliar un listado

```text
content/sources/topics/software-para-empresas.yml
```

## 2. Generar entre 3 y 7 artículos

Usa el prompt operativo de generación.

## 3. Validar estructura

```bash
npm run blog:validate
```

## 4. Revisar editorialmente

Usa el prompt operativo de revisión.

## 5. Mejorar los que fallaron

Usa el prompt operativo de mejora.

## 6. Revisar el diff

```bash
git diff
```

## 7. Preparar aprobación

Usa el prompt operativo de preparación.

## 8. Aprobar artículos específicos

```bash
npm run blog:approve -- <slug> --yes
```

## 9. Publicar artículos específicos

```bash
npm run blog:publish -- <slug>
```

## 10. Verificar proyecto

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Usa los nombres reales disponibles en el proyecto.

## 11. Commit y push

Realízalos únicamente después de revisar los cambios.

---

# Tamaño recomendado de los lotes

Utiliza inicialmente:

```text
3 a 5 artículos por lote
```

Cuando el sistema ya sea estable:

```text
5 a 8 artículos por lote
```

Evita generar 20 o 30 artículos en una sola ejecución porque disminuye:

* profundidad;
* consistencia;
* calidad de ejemplos;
* control de enlaces internos;
* capacidad de revisión;
* precisión de los reportes.

---

# Primera secuencia recomendada

Ejecuta primero:

```text
Prompt 1 — análisis
Prompt 2 — blog MDX
Prompt 3 — flujo editorial
```

Después crea manualmente tres borradores y prueba:

```text
validate
approve
publish
```

Cuando eso funcione correctamente, ejecuta:

```text
Prompt 4 — revisores editoriales
Prompt 5 — procesamiento por lotes
```

No avances a generación masiva hasta confirmar que:

```text
✓ Los drafts no aparecen en producción
✓ La publicación exige aprobación
✓ Los errores bloquean la publicación
✓ Los reportes son válidos
✓ El sitemap contiene solo artículos publicados
✓ El build funciona
✓ Los cambios se pueden revisar fácilmente con Git
```
