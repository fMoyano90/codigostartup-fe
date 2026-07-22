# Guía de operación del blog

Flujo de trabajo completo, de punta a punta, para generar y publicar contenido del blog con un agente de IA trabajando directamente en el repositorio. Para el detalle de cada comando ver `docs/blog-editorial-workflow.md`; este documento es la secuencia operativa.

```text
Listado de temas
  ↓
Codex/agente genera archivos MDX (drafts)
  ↓
Validación estructural (blog:validate)
  ↓
Revisión editorial (5 revisores → blog:review-report)
  ↓
Corrección de borradores (si reviewStatus: changes_required)
  ↓
Nueva revisión
  ↓
Aprobación humana (blog:approve)
  ↓
Publicación (blog:publish)
  ↓
Commit y despliegue
```

## 1. Crear o ampliar un listado de temas

```text
content/sources/topics/<categoria>.yml
```

Sigue el esquema de `src/lib/blog/topic-schema.ts` (`TopicList`/`Topic`) — ver `content/sources/topics/software-para-empresas.yml` como ejemplo real. El `id` de cada tema se vuelve el nombre de archivo y el `slug` del artículo generado — no lo cambies después de generar.

## 2. Generar artículos

- **Un lote (3 a 5 temas `pending`)**: usa `docs/prompts/generate-blog-batch.md`, completando el archivo de temas y la cantidad.
- **Un solo artículo puntual**: usa `docs/prompts/generate-blog-single.md`, completando el `id` del tema y el archivo.

En ambos casos el agente:

- lee categorías, reglas editoriales y el esquema de frontmatter;
- genera un `.mdx` por tema en `content/blog/drafts/`;
- no aprueba ni publica.

## 3. Validar estructura

```bash
npm run blog:validate
```

Corrige cualquier error antes de seguir. Luego:

```bash
npm run blog:sync-topics
```

para que los temas recién generados pasen de `pending` a `generated`.

## 4. Revisar editorialmente

Usa la plantilla `docs/prompts/review-blog-batch.md`. El agente evalúa cada borrador con los 5 revisores y consolida con `npm run blog:review-report -- <slug>`. Revisa el estado general con:

```bash
npm run blog:review-summary
```

## 5. Mejorar los que fallaron

Usa la plantilla `docs/prompts/improve-blog-batch.md` para los artículos con `reviewStatus: changes_required`. El agente corrige, vuelve a validar y vuelve a consolidar la revisión.

## 6. Revisar el diff

```bash
git diff
```

Revisa manualmente los cambios antes de aprobar nada.

## 7. Aprobar artículos específicos

```bash
npm run blog:approve -- <slug> --yes
```

`blog:approve` exige que no haya errores de validación y que el reporte de revisión (si existe) esté aprobado. El artículo queda `approved` pero sigue en `content/blog/drafts/`.

## 8. Publicar artículos específicos

```bash
npm run blog:publish -- <slug>
```

Mueve el archivo a `content/blog/published/`, corre `typecheck && lint && build`, y revierte automáticamente si el build falla.

## 9. Verificar el proyecto

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

(`blog:publish` ya corre estos tres primeros salvo que se use `--skip-build`; ejecutarlos de nuevo aquí es solo para confirmar el estado del repo completo, no solo del artículo publicado.)

## 10. Commit y push

Solo después de revisar los cambios y confirmar que el build pasa. No hagas commit ni push automáticamente — eso requiere instrucción explícita.

## Recuperar un artículo rechazado

1. Mueve manualmente el archivo de `content/blog/rejected/` a `content/blog/drafts/`.
2. Cambia `status` a `draft` en el frontmatter.
3. Continúa el flujo normal desde el paso 3 (validar).

## Solucionar errores comunes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| `blog:validate` falla por palabras | Artículo por debajo de `editorialRules.minimumWords` (900) | Ampliar el contenido con valor real, no relleno |
| `blog:validate` falla por enlaces internos | Menos de `editorialRules.minimumInternalLinks` (2) | Agregar enlaces a `/blog/<slug>` o `/blog/categoria/<slug>` relevantes |
| `blog:approve` rechaza sin errores visibles | El reporte en `reports/blog/<slug>.json` existe y `approved: false`, o el archivo está corrupto | Revisar `reports/blog/<slug>.json`; corregir el artículo y re-consolidar, o usar `--force --reason "..."` si es una excepción justificada |
| `blog:publish` revierte el artículo | El build falló después de mover el archivo | El artículo vuelve solo a `drafts/` en estado `approved`; corrige el error de build y vuelve a ejecutar `blog:publish` |
| `blog:review-report` se niega a consolidar | Falta algún archivo en `reports/blog/reviews/<slug>/` o no cumple el esquema `ReviewResult` | Genera o corrige el archivo faltante con el prompt del revisor correspondiente |
| `blog:sync-topics` reporta un error | Un tema dice `published` pero no hay artículo en `content/blog/published/` con ese slug | Verifica si el artículo se movió, se renombró, o si el estado del tema quedó desactualizado |
| `blog:sync-topics` reporta un warning | Un tema dice `generated` pero no existe ningún artículo con ese slug (en ningún directorio) | El borrador probablemente no se generó o se eliminó — vuelve a generarlo o corrige el estado manualmente |

## Tamaño recomendado de los lotes

```text
Inicialmente:      3 a 5 artículos por lote
Sistema estable:    5 a 8 artículos por lote
Evitar:             20-30 artículos en una sola ejecución
```

Lotes grandes degradan profundidad, consistencia, calidad de ejemplos, control de enlaces internos y capacidad real de revisión.

## Checklist antes de generación masiva

```text
✓ Los drafts no aparecen en producción
✓ La publicación exige aprobación
✓ Los errores bloquean la publicación
✓ Los reportes de revisión son válidos
✓ El sitemap contiene solo artículos publicados
✓ El build funciona
✓ Los cambios se pueden revisar fácilmente con Git
```
