"use client";

import type { ComponentProps } from "react";
import { useActionState, useEffect, useRef } from "react";
import { CalendarDays, MessagesSquare } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/config/site";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import {
  initialLeadActionState,
  type LeadActionState,
  type LeadFormType,
} from "@/lib/leads";

type FormOption = {
  label: string;
  value: string;
};

type BaseField = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: string;
  wide?: boolean;
};

export type LeadFormField =
  | (BaseField & {
      type: "textarea";
      rows?: number;
    })
  | (BaseField & {
      type: "select";
      options: FormOption[];
    })
  | (BaseField & {
      type: "text" | "email" | "tel" | "url" | "number" | "date";
      autoComplete?: string;
      inputMode?: ComponentProps<"input">["inputMode"];
    });

type LeadFormProps = {
  action: (state: LeadActionState, formData: FormData) => Promise<LeadActionState>;
  fields: LeadFormField[];
  formType: LeadFormType;
  idPrefix: string;
  source: string;
  cta: string;
  title: string;
  description: string;
  sectionId?: string;
  service?: string;
  project?: string;
  origin?: string;
  submitLabel?: string;
  submitHint?: string;
  variant?: "default" | "taller";
  eyebrow?: string;
};

function setHiddenValue(form: HTMLFormElement, name: string, value: string) {
  const field = form.elements.namedItem(name);
  if (field instanceof HTMLInputElement) field.value = value;
}

export function LeadForm({
  action,
  fields,
  formType,
  idPrefix,
  source,
  cta,
  title,
  description,
  sectionId,
  service = "",
  project = "",
  origin = "",
  submitLabel = "Enviar evaluación",
  submitHint,
  variant = "default",
  eyebrow = "Evaluar proyecto",
}: LeadFormProps) {
  const fieldNames = fields.map(({ name }) => name);
  if (new Set(fieldNames).size !== fieldNames.length) {
    throw new Error(`El formulario ${idPrefix} contiene nombres de campo duplicados`);
  }
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(idPrefix)) {
    throw new Error("idPrefix debe comenzar con una letra y usar solo letras, números, guiones o guiones bajos");
  }
  const [state, formAction, isPending] = useActionState(action, initialLeadActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  const eventContext = { form_type: formType, service, source } as const;

  const handleFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.startLeadForm, { ...eventContext, cta_position: cta });
  };

  useEffect(() => {
    if (state.status === "success" && !submittedRef.current) {
      submittedRef.current = true;
      trackEvent(ANALYTICS_EVENTS.submitLeadForm, { form_type: formType, service, source, cta_position: cta });
    }
  }, [state.status, formType, service, source, cta]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    setHiddenValue(form, "submissionId", window.crypto.randomUUID());
    setHiddenValue(form, "startedAt", Date.now().toString());
    setHiddenValue(form, "sourcePath", `${window.location.pathname}${window.location.search}`);
    setHiddenValue(form, "utmSource", params.get("utm_source") ?? "");
    setHiddenValue(form, "utmMedium", params.get("utm_medium") ?? "");
    setHiddenValue(form, "utmCampaign", params.get("utm_campaign") ?? "");
    setHiddenValue(form, "utmContent", params.get("utm_content") ?? "");
    setHiddenValue(form, "utmTerm", params.get("utm_term") ?? "");
  }, []);

  const formId = `${idPrefix}-lead-form`;
  const instructionsId = `${formId}-instructions`;
  const headingId = `${formId}-heading`;
  const whatsappUrl = state.whatsappUrl ?? siteConfig.contact.whatsappUrl;

  return (
    <section id={sectionId} className="service-content-section service-lead-section" aria-labelledby={headingId}>
      <div className="service-page-container service-lead-layout">
        <div className="service-lead-copy">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} headingId={headingId} />
        </div>
        <form ref={formRef} id={formId} className="service-lead-form" action={formAction} aria-describedby={instructionsId} onFocus={handleFormStart}>
          <p id={instructionsId} className="sr-only">Los campos marcados como obligatorios deben completarse.</p>
          <input type="hidden" name="submissionId" value="" readOnly />
          <input type="hidden" name="startedAt" value="" readOnly />
          <input type="hidden" name="sourcePath" value="" readOnly />
          <input type="hidden" name="formType" value={formType} />
          <input type="hidden" name="source" value={source} />
          <input type="hidden" name="cta" value={cta} />
          <input type="hidden" name="service" value={service} />
          <input type="hidden" name="project" value={project} />
          <input type="hidden" name="origin" value={origin} />
          <input type="hidden" name="utmSource" value="" readOnly />
          <input type="hidden" name="utmMedium" value="" readOnly />
          <input type="hidden" name="utmCampaign" value="" readOnly />
          <input type="hidden" name="utmContent" value="" readOnly />
          <input type="hidden" name="utmTerm" value="" readOnly />
          <div className="lead-honeypot" aria-hidden="true" style={{ display: "none" }}>
            <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {state.status !== "success" && (
            <div className="service-lead-fields">
              {fields.map((field, index) => {
                const fieldId = `${formId}-field-${index}`;
                const helpId = field.helpText ? `${formId}-help-${index}` : undefined;

                const isWide = field.type === "textarea" || field.wide;

                return (
                  <div key={field.name} className={`service-form-field${isWide ? " service-form-field--wide" : ""}`}>
                    <label htmlFor={fieldId}>
                      {field.label}
                      {field.required && <span aria-hidden="true"> *</span>}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        id={fieldId}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={field.rows ?? 5}
                        maxLength={1200}
                        defaultValue={field.defaultValue}
                        aria-describedby={helpId}
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={fieldId}
                        name={field.name}
                        required={field.required}
                        defaultValue={field.defaultValue ?? ""}
                        aria-describedby={helpId}
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    ) : (
                      <input
                        id={fieldId}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        inputMode={field.inputMode}
                        maxLength={field.type === "email" ? 254 : field.type === "url" ? 500 : 120}
                        defaultValue={field.defaultValue}
                        aria-describedby={helpId}
                      />
                    )}

                    {field.helpText && <small id={helpId}>{field.helpText}</small>}
                  </div>
                );
              })}
            </div>
          )}

          {state.status !== "idle" && (
            <p className={`service-form-status service-form-status--${state.status}`} role={state.status === "error" ? "alert" : "status"}>
              {state.message}
            </p>
          )}

          {state.status === "success" ? (
            <div className="lead-success-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                onClick={() => trackEvent(ANALYTICS_EVENTS.clickWhatsapp, { ...eventContext, cta_position: "lead-success" })}
              >
                Continuar por WhatsApp
              </a>
              <a
                href={siteConfig.contact.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="lead-booking-link"
                onClick={() => trackEvent(ANALYTICS_EVENTS.scheduleMeeting, { ...eventContext, cta_position: "lead-success" })}
              >
                Agendar una reunión <span aria-hidden="true">↗</span>
              </a>
            </div>
          ) : variant === "taller" ? (
            <>
              <div className="lead-submit-actions lead-submit-actions--split">
                <button type="submit" className="btn-primary" disabled={isPending}>
                  {isPending ? "Enviando…" : submitLabel}
                </button>
              </div>
              {submitHint && <p className="service-form-submit-hint">{submitHint}</p>}
            </>
          ) : (
            <>
              <div className="lead-submit-actions">
                <button type="submit" className="btn-primary" disabled={isPending}>
                  {isPending ? "Enviando…" : submitLabel}
                </button>
                <a
                  href={siteConfig.contact.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="lead-booking-link"
                  onClick={() => trackEvent(ANALYTICS_EVENTS.scheduleMeeting, { ...eventContext, cta_position: "lead-form" })}
                >
                  Prefiero agendar una reunión <span aria-hidden="true">↗</span>
                </a>
              </div>
              {submitHint && <p className="service-form-submit-hint">{submitHint}</p>}
            </>
          )}
        </form>
        {variant === "taller" && state.status !== "success" && (
          <div className="lead-quick-actions lead-quick-actions--above">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="talleres-cta talleres-cta--violet"
              onClick={() => trackEvent(ANALYTICS_EVENTS.clickWhatsapp, { ...eventContext, cta_position: "lead-form" })}
            >
              <MessagesSquare size={16} />
              Hablar por WhatsApp
            </a>
            <a
              href={siteConfig.contact.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="talleres-cta"
              onClick={() => trackEvent(ANALYTICS_EVENTS.scheduleMeeting, { ...eventContext, cta_position: "lead-form" })}
            >
              <CalendarDays size={16} />
              Agendar reunión
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
