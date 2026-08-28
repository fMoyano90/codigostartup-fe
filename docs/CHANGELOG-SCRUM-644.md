# CHANGELOG — SCRUM-644

Pulir diseño de la sección de talleres en `/talleres` y del home.

Ticket: [SCRUM-644](https://climadigital.atlassian.net/browse/SCRUM-644) · Rama: `andres-aerr/SCRUM-644`
Registro flexible por iteraciones: cada cambio de diseño se anota con fecha, archivos, motivo y criterio de aceptación que cubre.

---

## Iteración 1 — 2026-08-28 · Imagen de fondo en card "Talleres de IA Corporativos"

**Cambio:** La primera card de la sección "Una ruta para cada etapa" del home (Talleres de IA Corporativos) ahora usa una imagen de fondo que cubre toda la card, con overlay oscuro para mantener el contraste del texto.

**Archivos:**
- `public/images/talleres-corporativos.jpg` — nuevo asset (1000×561, 355 KB).
- `src/app/page.tsx` — campo `image` en `talleresCard` + clase condicional `service-card--image` en el render de la grilla.
- `src/app/globals.css` — bloque `.service-card--image` (background-image + overlay + cover) y hover que re-aplica la imagen con overlay levemente más oscuro (el hover base de `.service-card` reemplaza el background y borraría la imagen).

**Motivo:** Dar presencia visual a la card de talleres dentro de la grilla de soluciones del home, manteniendo la identidad del sistema (borde, barra superior volt, hover con translateY).

**Criterios de aceptación cubiertos:**
- Home: cards con jerarquía consistente (parcial — verificación visual pendiente).
- Sin desbordes a 360 px y 1440 px (pendiente de verificar en iteración).

**Estado:** implementado, pendiente verificación visual 360/1440 + QA.