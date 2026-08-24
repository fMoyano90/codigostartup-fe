# Taller · Videos con IA para tus Redes Sociales — Florencia

> Documento privado. **No publicar en el sitio ni compartir fuera del equipo.**
> La propuesta se envía por WhatsApp como archivo HTML.

## Cliente

- **Nombre:** María Florencia Decurgez
- **LinkedIn:** https://www.linkedin.com/in/florenciadecurgez/
- **País:** Chile
- **Rol actual:** Account Executive LATAM en Snowflake + Directora de Ventas y Marketing en Wingenroth Consulting (BI / Qlik Cloud / Gobierno de Datos).
- **Trayectoria:** IBM (Data & AI Sales Specialist), SoftwareOne, Automation Anywhere. RRPP (Diploma de Honor) + postgrado en Dirección Comercial y Marketing (UADE).
- **Interés:** aprender a crear videos con IA para publicar en redes sociales (foco: LinkedIn) — contenido B2B, datos/IA/BI.

## Servicio vendido

Taller práctico de **4 horas** por Google Meet: de la idea al video terminado y listo para publicar en tus redes sociales.

| Bloque | Tema | Duración |
|--------|------|----------|
| 01 | Estrategia y guion (audiencia, dolor, 12 ángulos, guion + storyboard) | 70 min |
| 02 | Producción con IA (frames, clips en Google Flow, audio con ElevenLabs) | 80 min |
| 03 | Montaje en CapCut (ensamble, ritmo, subtítulos, música, SFX, CTA) | 75 min |
| 04 | Cierre y sprint final (checklist, exportación vertical, sistema repetible) | 15 min |

**Incluye:** grabación de la sesión, espacio de trabajo en Gemini preparado con el paso a paso, plantilla de storyboard, checklist de montaje y 7 días de acompañamiento por WhatsApp.

## Acuerdos comerciales

- **Precio:** $50.000 CLP.
- **Con boleta o factura:** $50.000 + IVA, transferencia a la cuenta de **Código Startup**.
- **Sin IVA (informal):** $50.000, transferencia a la cuenta de **Andrés**.
- **Fecha del taller:** en mutuo acuerdo, acomodándose a los tiempos de ambas partes.
- **Formato:** videollamada Google Meet; se entrega la grabación o la clienta puede grabar.

## Decisiones tomadas (registro)

- **No mencionar "Gems" en el documento comercial.** Se habla de "espacio de trabajo en Gemini" (la clienta tiene cuenta pagada de Gemini).
- **Google Flow:** herramienta de Google para generar video. Nombre confirmado.
- **Audio:** ElevenLabs (provisional, a confirmar por el equipo).
- **CapCut:** edición/montaje final (gratuito).
- La presentación de la clase (`presentacion.html`) se creará más adelante.

## Archivos

- `propuesta.html` — propuesta comercial enviada por WhatsApp (nombre sugerido al enviar: `Propuesta-Taller-Videos-IA-Redes-Sociales.html`).
- `presentacion.html` — pendiente (material de la clase).

## Despliegue (Netlify)

- **URL pública:** https://taller-flo-ia.netlify.app
- **Site ID:** `c60876f4-3d87-488f-906e-a3b5188db2fb`
- **Cómo redeployar** (importante: ejecutar desde una carpeta FUERA del repo, porque el CLI detecta el git root y correría el build de Next.js):
  ```bash
  mkdir -p /tmp/taller-flo-deploy
  cp talleres/florencia-de-curgez/propuesta.html /tmp/taller-flo-deploy/index.html
  cp talleres/florencia-de-curgez/video-hero.mp4 /tmp/taller-flo-deploy/
  cd /tmp/taller-flo-deploy
  netlify deploy --prod --dir . --site c60876f4-3d87-488f-906e-a3b5188db2fb
  ```
- La página tiene `noindex` (no aparece en buscadores) y no contiene datos internos.

## Pendientes / próximo pasos

- [ ] Confirmar herramienta de audio (ElevenLabs o alternativas).
- [ ] Coordinar fecha y horario con la clienta.
- [ ] Crear `presentacion.html` para la clase.
- [ ] (Futuro, backend/Felipe) Usuario y contraseña para clientes de talleres.

## Changelog

- **2026-08-13:** Creación de la propuesta comercial (`propuesta.html`) y contexto del taller. Precio y condiciones cerrados con el equipo.
- **2026-08-13:** Deploy en Netlify → https://taller-flo-ia.netlify.app (rebranding a "tus redes sociales / para tu marca", navbar con anclas, logo blanco en footer, video de fondo con difuminado lateral).
