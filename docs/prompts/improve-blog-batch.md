# Plantilla — Mejorar los artículos que fallaron la revisión

Busca todos los artículos en `content/blog/drafts/` con `reviewStatus: changes_required`.

## Para cada artículo

1. Lee el MDX completo.
2. Lee su reporte en `reports/blog/<slug>.json` (`blockingProblems`, `recommendations`, y el detalle por revisor).
3. Lee `src/config/editorial-rules.ts` y `src/config/review-rules.ts`.
4. Lee `prompts/blog/improvement.md`.
5. Corrige los problemas de severidad `blocking` e `important`. Mejora los `minor` solo si no requiere reescribir secciones enteras.
6. Preserva el objetivo, categoría, intención (`intent`) y audiencia (`audience`) del artículo.
7. No inventes estadísticas, leyes, investigaciones, precios ni casos reales.
8. No elimines información útil únicamente para reducir longitud.
9. No conviertas el artículo en contenido técnico para developers.
10. Modifica únicamente el borrador existente en `content/blog/drafts/`. No modifiques artículos `approved` o `published`.
11. Muestra el `git diff` del archivo modificado.
12. Vuelve a ejecutar, en este orden:
    - `npm run blog:validate -- <slug>`;
    - las 5 evaluaciones editoriales (sobrescribiendo `reports/blog/reviews/<slug>/`);
    - `npm run blog:review-report -- <slug>`.

No apruebes. No publiques.

## Al terminar el lote

Entrega un resumen con:

- artículos modificados;
- problemas resueltos vs. pendientes;
- puntaje anterior vs. puntaje nuevo (`totalScore`);
- artículos que requieren una decisión humana explícita (por ejemplo: un dato que solo una persona puede verificar, o un cambio de enfoque que no corresponde decidir automáticamente).
