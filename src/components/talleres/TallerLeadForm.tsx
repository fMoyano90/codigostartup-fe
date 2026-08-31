import { LeadForm, type LeadFormField } from "@/components/contact/LeadForm";
import type { Taller } from "@/lib/commercial/schema";
import type { LeadActionState } from "@/lib/leads";

type TallerLeadFormProps = {
  taller: Pick<Taller, "slug" | "titulo">;
  fields: LeadFormField[];
  action: (state: LeadActionState, formData: FormData) => Promise<LeadActionState>;
  idPrefix: string;
  sectionId?: string;
  title?: string;
  description?: string;
};

export function TallerLeadForm({
  taller,
  fields,
  action,
  idPrefix,
  sectionId,
  title = "Solicita información de este taller",
  description = "Cuéntanos quién participaría y qué quieren lograr: te respondemos con una propuesta a tu medida.",
}: TallerLeadFormProps) {
  return (
    <LeadForm
      action={action}
      fields={fields}
      formType="talleres"
      idPrefix={idPrefix}
      sectionId={sectionId}
      source="taller-page"
      cta={`taller-form-${taller.slug}`}
      service={taller.slug}
      title={title}
      description={description}
      submitLabel="Solicitar información del taller"
    />
  );
}

export type { LeadFormField };