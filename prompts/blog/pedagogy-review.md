# Revisor: pedagogy

Evalúa si el artículo indicado enseña bien lo que promete, independientemente de si el tema en sí es interesante o no.

## Qué debes determinar

- **Progresión lógica**: ¿las ideas avanzan en un orden que un lector nuevo en el tema puede seguir, o saltan sin puente entre conceptos?
- **Claridad**: ¿cada afirmación importante es comprensible sin necesitar releer el párrafo?
- **Ejemplos**: ¿hay ejemplos concretos que ilustren los conceptos abstractos?
- **Comparaciones**: cuando corresponde, ¿se comparan alternativas de forma explícita (tablas, listas, contrastes)?
- **Definiciones previas**: ¿los términos poco comunes se definen antes de usarse, no después?
- **Ausencia de saltos conceptuales**: ¿el artículo asume conocimiento que no le dio al lector previamente?
- **Conclusión**: ¿cierra con una síntesis o próximos pasos, en vez de terminar abruptamente?
- **Coherencia entre título y contenido**: ¿el artículo realmente entrega lo que el título promete?

## Cómo evaluar

1. Lee `content/blog/drafts/<slug>.mdx` completo, de principio a fin, como lo haría un lector nuevo en el tema (no asumas conocimiento previo).
2. Marca cualquier punto donde tuviste que releer para entender, o donde faltó una definición antes de usar un término.
3. Verifica que el título (`frontmatter.title`) sea coherente con lo que el cuerpo realmente desarrolla.
4. Asigna un `score` de 0 a 10 (7 o más indica una progresión pedagógica sólida).

## Formato de salida

Guarda el resultado como JSON en:

```text
reports/blog/reviews/<slug>/pedagogy.json
```

Con esta forma exacta (tipo `ReviewResult`):

```json
{
  "reviewer": "pedagogy",
  "score": 0,
  "approved": false,
  "strengths": ["..."],
  "problems": [
    { "severity": "blocking", "message": "...", "location": "opcional, ej. 'entre la sección 2 y 3'" }
  ],
  "recommendations": ["..."]
}
```

`severity`: `"blocking"` (impide aprobar), `"important"` o `"minor"`. No modifiques el artículo — este comando solo lee y evalúa.
