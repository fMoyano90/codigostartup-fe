/**
 * Registro único de eventos de analítica del sitio. Toda la instrumentación
 * usa estas constantes para evitar strings sueltos y mantener consistencia.
 */
export const ANALYTICS_EVENTS = {
  viewService: "view_service",
  clickServiceCta: "click_service_cta",
  startLeadForm: "start_lead_form",
  submitLeadForm: "submit_lead_form",
  clickWhatsapp: "click_whatsapp",
  viewProject: "view_project",
  readArticle: "read_article",
  clickArticleCta: "click_article_cta",
  scheduleMeeting: "schedule_meeting",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Contexto opcional de cada evento. Se usan claves snake_case (convención GA4).
 * Nunca incluir datos personales (nombre, correo, teléfono): ver `track.ts`.
 */
export type AnalyticsParams = {
  service?: string;
  project?: string;
  article?: string;
  category?: string;
  page?: string;
  cta_position?: string;
  form_type?: string;
  source?: string;
};
