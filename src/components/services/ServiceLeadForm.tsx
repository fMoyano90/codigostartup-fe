import { LeadForm, type LeadFormField } from "@/components/contact/LeadForm";
import type { Service } from "@/lib/commercial/schema";
import type { LeadActionState } from "@/lib/leads";

type ServiceLeadFormProps = {
  service: Pick<Service, "slug" | "name" | "cta">;
  fields: LeadFormField[];
  action: (state: LeadActionState, formData: FormData) => Promise<LeadActionState>;
  idPrefix: string;
  sectionId?: string;
  source: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  submitHint?: string;
};

export function ServiceLeadForm({
  service,
  fields,
  action,
  idPrefix,
  sectionId,
  source,
  title = "Cuéntanos qué necesitas resolver",
  description = "Con esta información podemos evaluar mejor el siguiente paso y responderte con claridad.",
  submitLabel,
  submitHint,
}: ServiceLeadFormProps) {
  return (
    <LeadForm
      action={action}
      fields={fields}
      formType={service.cta.formType}
      idPrefix={idPrefix}
      sectionId={sectionId}
      source={source}
      cta={`service-form-${service.slug}`}
      service={service.slug}
      title={title}
      description={description}
      submitLabel={submitLabel ?? service.cta.label}
      submitHint={submitHint}
    />
  );
}

export type { LeadFormField };
