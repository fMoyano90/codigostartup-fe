# Analítica y medición (Fase 14)

La medición se apoya en **Google Analytics 4** (gtag), ya cargado en `src/app/layout.tsx`
(`G-PTKLBEZVER`). Toda la instrumentación pasa por una capa central para evitar llamadas
dispersas.

## Arquitectura

- `src/lib/analytics/events.ts` — registro único de nombres de evento (`ANALYTICS_EVENTS`)
  y el tipo de parámetros (`AnalyticsParams`, claves snake_case).
- `src/lib/analytics/track.ts` — `trackEvent(event, params)`: envía a `gtag` (con respaldo
  en `dataLayer`), **adjunta los UTM de la URL actual**, **descarta datos personales**
  (nombre, correo, teléfono, WhatsApp) y es no-op en el servidor.
- `src/components/analytics/TrackView.tsx` — dispara un evento de vista una sola vez al
  montar; se usa en páginas servidor sin volverlas cliente.
- `src/components/analytics/TrackedLink.tsx` — enlace que registra el evento en el click y
  luego navega (interno con `next/link`, externo con `<a>`).

## Eventos y dónde se disparan

| Evento | Se dispara en | Contexto principal |
|---|---|---|
| `view_service` | Página de servicio (`/soluciones/[slug]`) | `service` |
| `click_service_cta` | CTA del hero de servicio (`ServiceHero`) | `service`, `cta_position: hero` |
| `start_lead_form` | Primer foco en cualquier formulario de lead (`LeadForm`) | `form_type`, `service`, `source` |
| `submit_lead_form` | Envío exitoso del formulario (`LeadForm`) | `form_type`, `service`, `source` |
| `click_whatsapp` | Enlaces a WhatsApp (footer, contacto, éxito del formulario) | `source` |
| `view_project` | Página de proyecto (`/proyectos/[slug]`) | `project` |
| `read_article` | Página de artículo (`/blog/[slug]`) | `article`, `category` |
| `click_article_cta` | CTA contextual al final del artículo | `article`, `service`, `cta_position` |
| `schedule_meeting` | Enlaces para agendar reunión (calendario, formulario) | `source`, `cta_position` |

Todos los eventos incluyen automáticamente `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content` y `utm_term` cuando están presentes en la URL.

> El `<iframe>` del calendario (`reservas.codigostartup.com`) es de otro origen y no puede
> instrumentarse desde aquí; se mide el click en "Abrir calendario" y en los CTAs de agenda.

## Cómo verificar

### Local (desarrollo)

`trackEvent` deja traza en consola cuando `NODE_ENV !== "production"`:

```
[analytics] view_service { service: "sitios-web" }
[analytics] submit_lead_form { form_type: "general", service: "sitios-web", source: "contact-page" }
```

1. `npm run dev` y abre la consola del navegador.
2. Navega por servicios/proyectos/artículos y usa los formularios: cada acción imprime
   `[analytics] <evento>` con su contexto.
3. Para probar UTM: visita `http://localhost:3000/soluciones/sitios-web?utm_source=test&utm_medium=qa`
   y confirma que aparecen en el payload.

### Producción (GA4 DebugView)

En producción no hay traza de consola; usa **GA4 → Administrar → DebugView**:

1. Instala la extensión *Google Analytics Debugger* (o añade `?debug_mode=1`).
2. Abre el sitio y ejecuta las acciones a validar.
3. En GA4 → *DebugView* verás los eventos en tiempo real con sus parámetros.
4. En *Informes → En tiempo real* puedes confirmar el conteo agregado.

### Pruebas automatizadas

- `src/lib/analytics/track.test.ts` — sanitización de PII, UTM y respaldo en `dataLayer`.
- `src/app/phase-14-analytics.test.tsx` — inventario de eventos e instrumentación de la página de servicio.

## Notas de privacidad

- Nunca se envían nombre, correo, teléfono ni WhatsApp a GA4 (se filtran en `track.ts`).
- Solo se envían identificadores no sensibles: slug de servicio/proyecto/artículo, tipo de
  formulario, origen del CTA y parámetros UTM.
