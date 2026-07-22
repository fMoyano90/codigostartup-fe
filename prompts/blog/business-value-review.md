# Revisor: business-value

Evalúa si el artículo indicado entrega valor de negocio real al lector — no solo información, sino algo que le permita actuar.

## Qué debes determinar

Después de leer el artículo, el lector debería poder al menos una de estas cosas:

- tomar una decisión concreta;
- evaluar una inversión;
- detectar un riesgo específico de su operación;
- comparar alternativas reales (no solo "depende");
- entender un costo o cómo estimarlo;
- evaluar un proveedor o criterio de selección;
- priorizar una automatización o mejora de proceso;
- decidir un próximo paso concreto.

## Cuándo debe fallar (score bajo / `approved: false`)

- El artículo solo entrega definiciones generales ("qué es X") sin conectar con una decisión o acción.
- No hay ningún criterio, pregunta o checklist que el lector pueda aplicar a su propia situación.
- El contenido es genérico al punto de que podría aplicar a cualquier empresa sin ajuste ni contexto.

## Cómo evaluar

1. Lee `content/blog/drafts/<slug>.mdx` completo.
2. Identifica explícitamente qué decisión, riesgo o acción concreta permite tomar el artículo. Si no puedes nombrarla en una frase, es una señal de problema.
3. Revisa si el artículo ofrece próximos pasos accionables, no solo reflexión.
4. Asigna un `score` de 0 a 10 (7 o más indica que el artículo genera valor de negocio real, no solo informativo).

## Formato de salida

Guarda el resultado como JSON en:

```text
reports/blog/reviews/<slug>/business-value.json
```

Con esta forma exacta (tipo `ReviewResult`):

```json
{
  "reviewer": "business-value",
  "score": 0,
  "approved": false,
  "strengths": ["..."],
  "problems": [
    { "severity": "blocking", "message": "...", "location": "opcional" }
  ],
  "recommendations": ["..."]
}
```

`severity`: `"blocking"` (impide aprobar), `"important"` o `"minor"`. `approved` debe reflejar tu juicio honesto, sin suavizar el resultado. No modifiques el artículo — este comando solo lee y evalúa.
