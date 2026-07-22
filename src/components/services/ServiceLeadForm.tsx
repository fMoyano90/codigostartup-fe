import type { ComponentProps } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import type { Service } from "@/lib/commercial/schema";

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

type ServiceLeadFormProps = {
  service: Pick<Service, "slug" | "name" | "cta">;
  fields: LeadFormField[];
  action: NonNullable<ComponentProps<"form">["action"]>;
  idPrefix: string;
  source: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  statusMessage?: {
    tone: "success" | "error";
    text: string;
  };
};

export function ServiceLeadForm({
  service,
  fields,
  action,
  idPrefix,
  source,
  title = "Cuéntanos qué necesitas resolver",
  description = "Con esta información podemos evaluar mejor el siguiente paso y responderte con claridad.",
  submitLabel,
  statusMessage,
}: ServiceLeadFormProps) {
  const fieldNames = fields.map(({ name }) => name);
  if (new Set(fieldNames).size !== fieldNames.length) {
    throw new Error(`El formulario ${idPrefix} contiene nombres de campo duplicados`);
  }
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(idPrefix)) {
    throw new Error("idPrefix debe comenzar con una letra y usar solo letras, números, guiones o guiones bajos");
  }

  const formId = `${idPrefix}-lead-form`;
  const instructionsId = `${formId}-instructions`;
  const headingId = `${formId}-heading`;

  return (
    <section className="service-content-section service-lead-section" aria-labelledby={headingId}>
      <div className="service-page-container service-lead-layout">
        <SectionHeader
          eyebrow="Evaluar proyecto"
          title={title}
          description={description}
          headingId={headingId}
        />
        <form
          id={formId}
          className="service-lead-form"
          action={action}
          method={typeof action === "string" ? "post" : undefined}
          aria-describedby={instructionsId}
        >
          <p id={instructionsId} className="sr-only">Los campos marcados como obligatorios deben completarse.</p>
          <input type="hidden" name="service" value={service.slug} />
          <input type="hidden" name="formType" value={service.cta.formType} />
          <input type="hidden" name="source" value={source} />

          <div className="service-lead-fields">
            {fields.map((field, index) => {
              const fieldId = `${formId}-field-${index}`;
              const helpId = field.helpText ? `${formId}-help-${index}` : undefined;

              return (
                <div
                  key={field.name}
                  className={`service-form-field${field.type === "textarea" ? " service-form-field--wide" : ""}`}
                >
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
                      aria-describedby={helpId}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={fieldId}
                      name={field.name}
                      required={field.required}
                      defaultValue=""
                      aria-describedby={helpId}
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
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
                      aria-describedby={helpId}
                    />
                  )}

                  {field.helpText && <small id={helpId}>{field.helpText}</small>}
                </div>
              );
            })}
          </div>

          {statusMessage && (
            <p
              className={`service-form-status service-form-status--${statusMessage.tone}`}
              role={statusMessage.tone === "error" ? "alert" : "status"}
            >
              {statusMessage.text}
            </p>
          )}

          <button type="submit" className="btn-primary">
            {submitLabel ?? service.cta.label} <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
