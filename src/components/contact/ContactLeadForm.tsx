import { LeadForm, type LeadFormField } from "@/components/contact/LeadForm";
import { submitLead } from "@/app/actions/submit-lead";
import type { ServiceSlug } from "@/lib/commercial/schema";

const serviceOptions: Array<{ label: string; value: ServiceSlug | "otro" }> = [
  { label: "Sitio web", value: "sitios-web" },
  { label: "Software a medida", value: "software-a-medida" },
  { label: "Automatización de procesos", value: "automatizacion-de-procesos" },
  { label: "Desarrollo de MVP", value: "desarrollo-mvp" },
  { label: "Aplicación web", value: "aplicaciones-web" },
  { label: "Aplicación móvil", value: "aplicaciones-moviles" },
  { label: "Auditoría o evolución", value: "auditoria-y-evolucion" },
  { label: "Otro o por definir", value: "otro" },
];

type ContactLeadFormProps = {
  initialService?: ServiceSlug;
  project?: string;
  origin?: string;
};

export function ContactLeadForm({ initialService, project, origin }: ContactLeadFormProps) {
  const fields: LeadFormField[] = [
    { name: "name", label: "Nombre", type: "text", required: true, autoComplete: "name" },
    { name: "company", label: "Empresa", type: "text", autoComplete: "organization" },
    { name: "email", label: "Correo", type: "email", required: true, autoComplete: "email" },
    { name: "whatsapp", label: "WhatsApp", type: "tel", required: true, autoComplete: "tel", inputMode: "tel" },
    { name: "projectType", label: "Tipo de proyecto", type: "select", required: true, defaultValue: initialService, options: serviceOptions },
    {
      name: "currentStage",
      label: "Etapa actual",
      type: "select",
      required: true,
      options: [
        { label: "Idea o necesidad inicial", value: "idea" },
        { label: "Definiendo alcance", value: "definicion" },
        { label: "Diseño o prototipo", value: "prototipo" },
        { label: "Producto en construcción", value: "construccion" },
        { label: "Sistema existente", value: "existente" },
      ],
    },
    { name: "description", label: "¿Qué necesitas resolver?", type: "textarea", required: true, rows: 6 },
    { name: "budget", label: "Presupuesto aproximado", type: "text", placeholder: "Opcional. Puedes indicar un rango o escribir “por definir”." },
  ];

  return (
    <LeadForm
      action={submitLead}
      fields={fields}
      formType="general"
      idPrefix="contact-general"
      sectionId="formulario"
      source="contact-page"
      cta="contact-general-form"
      service={initialService}
      project={project}
      origin={origin}
      title="Cuéntanos el contexto antes de proponer una solución"
      description="La etapa, el problema y lo que ya existe nos permiten responder con una ruta inicial más útil."
      submitLabel="Enviar mi proyecto"
    />
  );
}
