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
  eyebrow?: string;
};

export function TallerLeadForm({
  taller,
  fields,
  action,
  idPrefix,
  sectionId,
  title = "¿En qué te ayudamos?",
  description = "Cuéntanos tu consulta o lo que necesitas, sobre este taller o cualquier otro tema: te respondemos con la información que necesitas.",
  eyebrow = "Conversemos",
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
      submitLabel="Enviar"
      variant="taller"
      eyebrow={eyebrow}
    />
  );
}

export type { LeadFormField };