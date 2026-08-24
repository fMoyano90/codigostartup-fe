# Generación de imágenes de portada para el blog (OpenAI Images Batch API)

Pipeline en Node.js + TypeScript que genera una portada horizontal (`1536x1024`,
`gpt-image-1-mini`, webp) para cada artículo del blog, la guarda en
`public/images/blog/{slug}.webp` y la asocia al artículo actualizando su
frontmatter (`image.src` + `image.alt`).

## Variables de entorno

Crear o editar `.env` (ya está en `.gitignore`):

```env
OPENAI_API_KEY=sk-...
```

La key nunca se imprime ni se registra. Si falta, los comandos que tocan la API
(`submit`, `status`, `download`) fallan con un mensaje claro.

## Flujo completo

```
analyze → prepare → (revisar JSONL) → submit → status → (esperar) → download
```

1. **analyze**: lista los artículos con su estado actual (sin llamar a OpenAI).
2. **prepare**: construye un prompt por artículo y genera el JSONL del batch +
   un manifiesto local. No envía nada.
3. **submit**: sube el JSONL y crea el batch (ventana 24 h).
4. **status**: consulta el estado del batch.
5. **download**: baja los resultados, guarda los `.webp` y actualiza el
   frontmatter de cada artículo (solo si la imagen se descargó OK).

## Comandos

```bash
# Ver qué artículos existen y su imagen actual
npm run blog-images:analyze
npm run blog-images:analyze -- --limit=5
npm run blog-images:analyze -- --category=automatizacion-e-ia
npm run blog-images:analyze -- --json

# Preparar una muestra de 12 artículos (1 por categoría) para validar estilo
npm run blog-images:sample

# Preparar todo (256 artículos) — omite los que ya tienen .webp
npm run blog-images:prepare

# Opciones de prepare
npm run blog-images:prepare -- --limit=20
npm run blog-images:prepare -- --category=seguridad-y-riesgos
npm run blog-images:prepare -- --slug=como-automatizar-whatsapp-para-una-pyme
npm run blog-images:prepare -- --force        # regenera aunque exista .webp
npm run blog-images:prepare -- --run=mi-run   # nombre del run (default: timestamp)

# Enviar el batch (SOLO cuando estés listo — cuesta dinero)
npm run blog-images:submit

# Consultar estado
npm run blog-images:status
npm run blog-images:status -- --batch=batch_abc123

# Descargar resultados y actualizar artículos
npm run blog-images:download
npm run blog-images:download -- --batch=batch_abc123
npm run blog-images:download -- --no-prune   # conserva la imagen anterior
npm run blog-images:download -- --force      # sobrescribe .webp existentes
```

## Muestra de validación de estilo

```bash
npm run blog-images:sample      # prepara 12 artículos variados
# Revisa el JSONL:
cat .blog-images/runs/run-*/input.jsonl
# Envía solo la muestra:
npm run blog-images:submit
npm run blog-images:status      # espera a que esté completed
npm run blog-images:download
# Revisa visualmente public/images/blog/*.webp de la muestra.
```

Si el estilo no convence, edita el bloque `STYLE_BLOCK` en
`scripts/blog-images/lib/prompts.ts` y repite.

## Reintentar errores / regenerar

- **Errores de una línea del batch**: `download` registra las líneas fallidas
  en `.blog-images/failures/{batch_id}.jsonl`. Para reintentar, prepara un run
  nuevo solo con esos slugs y envíalo:

  ```bash
  npm run blog-images:prepare -- --slug=slug-fallido --force
  npm run blog-images:submit
  ```

- **Regenerar un artículo puntual** (aunque ya tenga `.webp`):

  ```bash
  npm run blog-images:prepare -- --slug=mi-articulo --force
  npm run blog-images:submit
  npm run blog-images:status
  npm run blog-images:download
  ```

- **Procesar una categoría completa**:

  ```bash
  npm run blog-images:prepare -- --category=costos-y-presupuestos --force
  ```

## Arquivos temporales y .gitignore

- `.blog-images/` — run IDs, JSONL de entrada, manifiestos, batch info,
  resultados descargados y fallos. **Ignorado en git** (agregado a
  `.gitignore`).
- `public/images/blog/*.webp` — imágenes finales. **Se versionan** (no se
  ignoran).
- Los `.jpg` previos (Pixabay) se eliminan automáticamente al asociar la nueva
  portada (`download`), salvo con `--no-prune`.

## Notas de diseño (decisiones adaptadas al repositorio)

- El blog usa **MDX con frontmatter YAML** (`content/blog/published/*.mdx`) y el
  schema de artículos exige `image` como objeto `{ src, alt }` (ver
  `src/lib/blog/article-schema.ts`), no un string plano. Por eso se escribe:

  ```yaml
  image:
    src: /images/blog/mi-articulo.webp
    alt: Portada del artículo mi-articulo: ...
  ```

  En lugar del ejemplo `image: "..."` + `imageAlt: "..."` del enunciado.

- El campo `custom_id` del batch es el **slug** del artículo (único por
  definición), así el manifiesto no necesita IDs adicionales.
- `prepare` omite por defecto los artículos que ya tienen `public/images/blog/{slug}.webp`
  (es decir, generados por este pipeline). Los `.jpg` de la etapa anterior no
  bloquean la generación: el objetivo es reemplazarlos.
- El proyecto usa **npm** y **tsx** para scripts; los nuevos scripts siguen esa
  convención (`scripts/blog-images/`).
- `submit` es idempotente: si hay un batch activo para el mismo run, no crea
  otro. Para forzar un envío nuevo, borra `.blog-images/current-batch.json`
  (solo si el batch anterior terminó o falló).
- `download` cachea el archivo de resultados en `.blog-images/results/`, así
  re-ejecutarlo no vuelve a descargar de OpenAI.
