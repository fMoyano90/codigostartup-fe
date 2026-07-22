import type { AnalyticsEvent, AnalyticsParams } from "./events";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Campos que nunca deben enviarse a la analítica aunque lleguen por error. */
const PII_KEYS = new Set(["email", "name", "nombre", "whatsapp", "phone", "telefono"]);

function readUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

function sanitize(params: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (PII_KEYS.has(key)) continue;
    out[key] = value;
  }
  return out;
}

/**
 * Punto único de registro de eventos. Envía a GA4 vía `gtag` (con respaldo en
 * `dataLayer`), adjunta los parámetros UTM de la URL actual y descarta datos
 * personales. Es no-op en el servidor. En desarrollo deja traza en consola.
 */
export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const payload = { ...sanitize(params), ...readUtmParams() };

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  } else {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${event}`, payload);
  }
}
