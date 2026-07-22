# Plantilla — Generar un lote de artículos desde un listado de temas

Copia y completa `[ARCHIVO]` y `[CANTIDAD]` antes de usar este prompt.

---

Lee el archivo de temas ubicado en:

```text
content/sources/topics/[ARCHIVO].yml
```

Selecciona únicamente los primeros `[CANTIDAD]` temas con `status: pending`.

## Antes de escribir

1. Lee `src/config/blog-categories.ts` (categorías válidas).
2. Lee `src/config/editorial-rules.ts` (reglas editoriales).
3. Lee `src/lib/blog/article-schema.ts` (esquema del frontmatter).
4. Lee `prompts/blog/generation.md` (prompt de generación).
5. Revisa los títulos, slugs y artículos existentes en `content/blog/drafts/` y `content/blog/published/`.
6. Recomendado: 3 a 5 artículos por lote (hasta 8 si el sistema ya es estable). Evita lotes de 20-30 artículos — degradan profundidad, consistencia y capacidad real de revisión.

## Generación

Genera un archivo MDX por tema, siguiendo `prompts/blog/generation.md`. Guárdalos únicamente en `content/blog/drafts/`. Recuerda: el `id` del tema es el nombre de archivo y el `slug`.

No apruebes ni publiques. No muevas archivos. No sobrescribas artículos existentes. No modifiques artículos `approved` o `published`. No inventes cifras, leyes, estudios, testimonios ni casos reales.

## Después de generar

1. Ejecuta `npm run blog:validate` y corrige únicamente errores estructurales o deterministas.
2. Vuelve a ejecutar la validación hasta que no haya errores.
3. Ejecuta `npm run blog:sync-topics` para actualizar el estado de los temas generados (`pending` → `generated`).
4. Muestra el `git diff`.
5. Entrega un resumen con:
   - artículos creados;
   - temas omitidos (y por qué);
   - errores;
   - advertencias;
   - afirmaciones que requieran verificación externa antes de publicarse.
