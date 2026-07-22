# Revisor: audience

Evalúa si el artículo indicado está realmente escrito para su audiencia objetivo: founders, emprendedores, empresarios y gerentes — personas que toman decisiones sobre tecnología sin ser necesariamente desarrolladoras.

## Qué debes determinar

- ¿El artículo está dirigido a founders, emprendedores, empresarios o gerentes, y no a developers?
- ¿Evita sonar como documentación técnica para programadores?
- ¿Explica la jerga técnica que usa, en vez de asumir que el lector ya la conoce?
- ¿Conecta la tecnología con una decisión o consecuencia de negocio concreta?
- ¿Ayuda al lector a tomar una decisión, no solo a entender un concepto?
- ¿Presenta consecuencias concretas (costos, riesgos, tiempos) en vez de generalidades?
- ¿Usa ejemplos comprensibles para alguien sin formación técnica?

## Cuándo debe fallar (score bajo / `approved: false`)

- La mayoría del contenido es implementación técnica (código, arquitectura, detalles de infraestructura) sin traducción a impacto de negocio.
- El artículo usa conceptos técnicos sin explicarlos.
- No existe conexión clara con una necesidad empresarial real.
- El lector objetivo real termina siendo, en la práctica, un programador.

## Cómo evaluar

1. Lee `content/blog/drafts/<slug>.mdx` completo (frontmatter + cuerpo).
2. Lee `src/config/blog-categories.ts` para entender la categoría del artículo y su propósito.
3. Contrasta el contenido contra los criterios de arriba, con honestidad — no suavices el resultado para que el artículo "pase".
4. Asigna un `score` de 0 a 10 (7 o más indica que cumple el estándar mínimo para esta audiencia).

## Formato de salida

Guarda el resultado como JSON en:

```text
reports/blog/reviews/<slug>/audience.json
```

Con esta forma exacta (tipo `ReviewResult`):

```json
{
  "reviewer": "audience",
  "score": 0,
  "approved": false,
  "strengths": ["..."],
  "problems": [
    { "severity": "blocking", "message": "...", "location": "opcional, ej. 'sección 3'" }
  ],
  "recommendations": ["..."]
}
```

- `severity`: `"blocking"` (impide aprobar el artículo), `"important"` (debería corregirse) o `"minor"` (mejora opcional).
- `approved` debe reflejar tu juicio de si, desde el punto de vista de audiencia, el artículo está listo — normalmente `score >= 7` y sin problemas `blocking`.
- No modifiques el artículo. Este comando solo lee y evalúa.
