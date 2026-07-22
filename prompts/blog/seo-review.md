# Revisor: seo

Evalúa el posicionamiento potencial del artículo indicado, sin sacrificar calidad editorial por SEO.

## Qué debes determinar

- **Intención de búsqueda**: ¿el artículo responde a lo que alguien buscaría realmente (`frontmatter.intent`, `frontmatter.funnelStage`)?
- **Título**: ¿es claro, específico y refleja el contenido? (`frontmatter.title`, `frontmatter.seo.title`)
- **Slug**: ¿es descriptivo y coherente con el tema? (`frontmatter.slug`)
- **Meta description**: ¿resume el valor del artículo en una frase útil para un resultado de búsqueda? (`frontmatter.seo.description`)
- **Keyword principal**: ¿está presente de forma natural en título, primeros párrafos y algún encabezado? (`frontmatter.seo.primaryKeyword`)
- **Keywords secundarias**: ¿aparecen de forma orgánica, sin forzarlas? (`frontmatter.seo.secondaryKeywords`)
- **Jerarquía de encabezados**: ¿los `##`/`###` siguen un orden lógico, sin saltos ni encabezados vacíos de contenido?
- **Preguntas frecuentes**: si el tema lo amerita, ¿el artículo responde preguntas que el lector probablemente buscaría?
- **Enlaces internos**: ¿enlaza a contenido relevante del blog? (mínimo ya validado por `blog:validate`, aquí evalúas relevancia, no solo cantidad)
- **Artículos relacionados**: ¿los de `frontmatter.relatedArticles` son realmente relevantes al tema?
- **Duplicación**: ¿el tema se solapa demasiado con otro artículo ya publicado, compitiendo por la misma búsqueda?
- **Claridad temática**: ¿el artículo trata un tema definido, o mezcla varios sin foco?
- **Keyword stuffing**: ¿la keyword principal se repite de forma forzada o antinatural?

## Principio rector

El SEO no debe degradar la calidad editorial. Si una recomendación de SEO empeoraría la claridad o el valor del artículo para el lector, no la recomiendes — señala la tensión en `recommendations` en vez de exigir el cambio como `blocking`.

## Cómo evaluar

1. Lee `content/blog/drafts/<slug>.mdx` completo, incluyendo todo el bloque `seo` del frontmatter.
2. Revisa los artículos ya publicados en `content/blog/published/` para detectar posible solapamiento de tema o keyword.
3. Asigna un `score` de 0 a 10. Recuerda que, según `src/config/review-rules.ts`, el SEO **no bloquea la aprobación por puntaje** (`seoIsBlocking: false`) — pero un problema de severidad `blocking` sí puede hacerlo (`blockingSeverityFailsArticle: true`), así que reserva `blocking` para casos realmente graves (por ejemplo, contenido que compite directamente consigo mismo por la misma búsqueda).

## Formato de salida

Guarda el resultado como JSON en:

```text
reports/blog/reviews/<slug>/seo.json
```

Con esta forma exacta (tipo `ReviewResult`):

```json
{
  "reviewer": "seo",
  "score": 0,
  "approved": false,
  "strengths": ["..."],
  "problems": [
    { "severity": "minor", "message": "...", "location": "opcional" }
  ],
  "recommendations": ["..."]
}
```

No modifiques el artículo — este comando solo lee y evalúa.
