"use client";

import { useEffect, useRef } from "react";
import type { AnalyticsEvent, AnalyticsParams } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

/**
 * Registra un evento de vista una sola vez al montar. Se coloca en páginas
 * servidor (servicio, proyecto, artículo) para medir impresiones sin volver
 * cliente toda la página.
 */
export function TrackView({ event, params }: { event: AnalyticsEvent; params?: AnalyticsParams }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent(event, params);
  }, [event, params]);

  return null;
}
