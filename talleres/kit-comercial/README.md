# Kit Comercial · Talleres de IA Aplicada (SCRUM-614)

Kit comercial compartible para empresas y OTEC con los 9 talleres de IA Aplicada.
**Los precios y condiciones comerciales viven solo en `matriz-precios.md` (documento interno) y no se publican.**

## Contenido del kit

| Archivo | Tipo | ¿Público? |
|---------|------|-----------|
| `catalogo-kit.html` | Catálogo compartible (generado, `noindex`) | ✅ Sí, se comparte por URL o archivo |
| `propuesta-base.md` | Propuesta comercial base editable | ✅ Sí (sin precios) |
| `datos-talleres.ts` | Datos de los 9 talleres (fuente local temporal) | 🔒 Interno |
| `matriz-precios.md` | Matriz interna de precios y condiciones | 🔒 **NO PUBLICAR** |
| `fuente-aprobada/Taller_Videos_UGC_con_IA_Contenido_Detallado.docx` | Contenido aprobado UGC (SCRUM-619) archivado | 🔒 Interno |
| `kit.test.ts` | Tests del kit (vitest) | — |

## Los 9 talleres

1. **Videos UGC con IA para emprendedores** — 4 h · contenido **APROBADO** (SCRUM-619)
2. IA para Productividad Administrativa — 8 h · provisional (SCRUM-632)
3. Automatización de Procesos con IA — 8 h · provisional (SCRUM-633)
4. IA para Recursos Humanos — 8 h · provisional (SCRUM-634)
5. IA para Equipos Comerciales — 8 h · provisional (SCRUM-635)
6. IA para Marketing — 8 h · provisional (SCRUM-636)
7. IA para Líderes y Jefaturas — 8 h · provisional (SCRUM-637)
8. IA para Gestión de Proyectos — 8 h · provisional (SCRUM-638)
9. IA para Operaciones y Faenas — 8 h · provisional (SCRUM-639)

> Los talleres marcados "provisional" usan los resúmenes del home público + spec del ticket.
> Al aprobarse cada ficha (SCRUM-632→639), actualizar `datos-talleres.ts` y regenerar el HTML.
> Cuando exista `src/data/talleres.ts` (SCRUM-615), `datos-talleres.ts` debe **reemplazarse por un import** de esa fuente maestra.

## Generar el catálogo HTML

```bash
npm run talleres:kit
```

Genera `catalogo-kit.html` desde `datos-talleres.ts`. **No editar el HTML a mano** (es un activo secundario derivado).

## Compartir el catálogo

El HTML tiene `noindex, nofollow`, es responsive y no contiene precios ni datos internos.
Opciones para compartir:

- **Por archivo:** enviar `catalogo-kit.html` por WhatsApp/email.
- **Por URL (Netlify):** siguiendo el patrón de `talleres/florencia-de-curgez`:

```bash
mkdir -p /tmp/kit-talleres-deploy
cp talleres/kit-comercial/catalogo-kit.html /tmp/kit-talleres-deploy/index.html
cd /tmp/kit-talleres-deploy
netlify deploy --prod --dir . --site <SITE_ID_KIT>
```

> Importante: ejecutar desde una carpeta FUERA del repo (el CLI detecta el git root y correría el build de Next.js).

## Tests

```bash
npm test -- talleres/kit-comercial
```

Valida: 9 talleres, slugs únicos, horas (4 h UGC / 8 h resto), trazabilidad interna y que el HTML
generado **no contenga precios, monedas ni datos internos** (estado/fuente/SCRUM-x).

## Registro de validación comercial

Criterio de aceptación de SCRUM-614: la persona responsable de Comercial registra aprobación o comentarios.

| Campo | Registro |
|-------|----------|
| Estado | Pendiente de validación comercial |
| Responsable | Andrés (Comercial) |
| Validación contenido | UGC aprobado (SCRUM-619) · otros 8 pendientes de ficha |
| Precios | Sin definir (política pública: sin precio) |
| Fecha | 2026-08-26 |
| Observaciones | Matriz de precios creada sin valores, pendiente llenado por Comercial |

## Changelog

- **2026-08-26:** Creación del kit. `datos-talleres.ts` con UGC aprobado (fuente DOCX SCRUM-619) + 8 talleres provisionales; `matriz-precios.md` (sin valores); `propuesta-base.md`; generador `scripts/talleres/generar-kit.ts` + `catalogo-kit.html` (noindex, responsive, sin precios); tests vitest (11).