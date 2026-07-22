# Plantilla — Generar un solo artículo a partir de un tema

Usa esta plantilla cuando quieras generar **un único artículo** puntual, en vez de un lote completo de temas `pending` (para eso, ver `docs/prompts/generate-blog-batch.md`).

Completa `[ID_DEL_TEMA]` y `[ARCHIVO]` antes de usarla.

---

Genera un artículo a partir del tema `[ID_DEL_TEMA]` del listado:

```text
content/sources/topics/[ARCHIVO].yml
```

Antes de escribir:

1. Lee `prompts/blog/generation.md`.
2. Lee `src/config/blog-categories.ts` (categorías válidas).
3. Lee `src/config/editorial-rules.ts` (reglas editoriales).
4. Lee `src/lib/blog/article-schema.ts` (esquema del frontmatter).
5. Revisa los artículos existentes en `content/blog/drafts/` y `content/blog/published/` para no duplicar tema, título o slug.

Genera un único archivo MDX para ese tema.

Guárdalo únicamente en `content/blog/drafts/`, usando el `id` del tema como nombre de archivo y como `frontmatter.slug`.

El artículo debe:

- estar dirigido a founders, emprendedores, empresarios o gerentes;
- ayudar a tomar una decisión, no solo informar;
- explicar la tecnología desde su impacto de negocio;
- usar ejemplos concretos y presentar riesgos;
- comparar alternativas cuando corresponda;
- ofrecer próximos pasos;
- permanecer con `status: draft` y `reviewStatus: pending`.

No:

- apruebes ni publiques el artículo;
- muevas archivos a `published`;
- inventes cifras, leyes, estudios, testimonios o casos reales;
- sobrescribas un artículo existente con el mismo slug;
- modifiques artículos `approved` o `published`.

Después de generar:

1. Ejecuta `npm run blog:validate -- [ID_DEL_TEMA]`.
2. Corrige únicamente errores estructurales o deterministas.
3. Ejecuta `npm run blog:sync-topics` para actualizar el estado del tema (`pending` → `generated`).
4. Muestra el `git diff`.
5. Entrega un resumen con: archivo creado, errores, advertencias, y cualquier afirmación que requiera verificación externa.
