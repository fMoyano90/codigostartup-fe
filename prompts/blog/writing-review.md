# Revisor: writing

Evalúa la calidad de redacción del artículo indicado, con especial atención a señales de texto genérico o generado sin edición humana.

## Qué debes determinar

- Ortografía y gramática.
- Claridad: frases que se entienden en una lectura, sin ambigüedad.
- Redundancia: ideas repetidas innecesariamente con distintas palabras.
- Longitud de párrafos: párrafos demasiado largos o demasiado fragmentados.
- Abuso de listas: contenido que debería ser prosa pero se convirtió en una lista para parecer más fácil de escribir.
- Frases vagas que no dicen nada concreto.
- Tono artificial o excesivamente entusiasta.
- Clichés y frases hechas.
- Introducciones genéricas que no aportan (ver expresiones bloqueadas abajo).
- Afirmaciones exageradas sin respaldo ("el mejor", "el único", "siempre", "nunca" sin matiz).
- Lenguaje comercial excesivo fuera de lugar en contenido informativo.
- Repeticiones estructurales típicas de texto generado por IA sin edición (mismo patrón de frase repetido varias veces, párrafos con estructura idéntica).

## Expresiones a detectar explícitamente

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

Estas expresiones ya se marcan automáticamente como advertencia en `npm run blog:validate` (ver `src/config/editorial-rules.ts`). Como revisor de redacción, tu trabajo es ir más allá: detectar variantes no cubiertas por esa lista y evaluar el impacto real en la calidad del texto, no solo señalar coincidencias literales.

## No todo es bloqueante

No todas las expresiones desaconsejadas ni todos los problemas de estilo deben marcarse como `blocking`. Márcalas cuando empobrecen claramente el texto; usa `important` o `minor` para el resto.

## Cómo evaluar

1. Lee `content/blog/drafts/<slug>.mdx` completo.
2. Lee las reglas editoriales en `src/config/editorial-rules.ts` para no duplicar lo que ya valida `blog:validate` (conteo de palabras, expresiones bloqueadas exactas) — enfócate en calidad de prosa, no en reglas ya automatizadas.
3. Asigna un `score` de 0 a 10 (7 o más indica una redacción publicable sin mayores correcciones).

## Formato de salida

Guarda el resultado como JSON en:

```text
reports/blog/reviews/<slug>/writing.json
```

Con esta forma exacta (tipo `ReviewResult`):

```json
{
  "reviewer": "writing",
  "score": 0,
  "approved": false,
  "strengths": ["..."],
  "problems": [
    { "severity": "important", "message": "...", "location": "opcional, ej. 'párrafo 4'" }
  ],
  "recommendations": ["..."]
}
```

No modifiques el artículo — este comando solo lee y evalúa. Las correcciones de redacción se aplican después, con `prompts/blog/improvement.md`.
