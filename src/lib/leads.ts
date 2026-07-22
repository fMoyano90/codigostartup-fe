import { z } from "zod";
import { siteConfig } from "@/config/site";
import {
  projectSlugSchema,
  serviceSlugSchema,
  type ServiceSlug,
} from "@/lib/commercial/schema";

export const leadFormTypeValues = [
  "general",
  "sitios-web",
  "software-a-medida",
  "automatizacion",
  "mvp",
  "aplicaciones-web",
  "aplicaciones-moviles",
  "auditoria",
] as const;

export type LeadFormType = (typeof leadFormTypeValues)[number];

export type LeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
  whatsappUrl?: string;
};

export const initialLeadActionState: LeadActionState = {
  status: "idle",
  message: "",
};

const formTypeSchema = z.enum(leadFormTypeValues);
const cleanTextSchema = z.string().trim().max(1200);
const optionalTextSchema = cleanTextSchema.optional().default("");
const optionalUrlSchema = z.union([z.literal(""), z.string().trim().url().max(500)]).optional().default("");

const trackingSchema = z.object({
  source: z.enum(["contact-page", "service-page"]),
  sourcePath: z.string().trim().max(300).optional().default(""),
  cta: z.string().trim().min(1).max(100),
  origin: z.string().trim().max(100).optional().default(""),
  service: z.union([z.literal(""), serviceSlugSchema]).optional().default(""),
  project: z.union([z.literal(""), projectSlugSchema]).optional().default(""),
  utmSource: z.string().trim().max(200).optional().default(""),
  utmMedium: z.string().trim().max(200).optional().default(""),
  utmCampaign: z.string().trim().max(200).optional().default(""),
  utmContent: z.string().trim().max(200).optional().default(""),
  utmTerm: z.string().trim().max(200).optional().default(""),
});

const baseLeadSchema = trackingSchema.extend({
  submissionId: z.string().uuid(),
  startedAt: z.coerce.number().int().positive(),
  website: z.string().max(200),
  formType: formTypeSchema,
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(254),
});

const fieldSchemas = {
  whatsapp: z.string().trim().min(7).max(30).regex(/^[+()\d\s-]+$/),
  projectType: z.union([serviceSlugSchema, z.literal("otro")]),
  currentStage: z.enum(["idea", "definicion", "prototipo", "construccion", "existente"]),
  description: z.string().trim().min(20).max(1200),
  budget: optionalTextSchema,
  currentWebsite: optionalUrlSchema,
  websiteGoal: z.string().trim().min(10).max(1200),
  servicesToShow: optionalTextSchema,
  contentManagement: z.union([z.literal(""), z.enum(["si", "no", "por-definir"])]),
  process: z.string().trim().min(10).max(1200),
  currentMethod: z.string().trim().min(10).max(1200),
  participants: z.union([z.literal(""), z.enum(["1-5", "6-20", "21+", "por-definir"])]),
  systems: optionalTextSchema,
  repetitiveTasks: z.string().trim().min(10).max(1200),
  tools: z.string().trim().min(2).max(1200),
  frequency: z.union([z.literal(""), z.enum(["varias-al-dia", "diaria", "semanal", "mensual", "otra"])]),
  desiredResult: optionalTextSchema,
  problem: z.string().trim().min(10).max(1200),
  audience: z.string().trim().min(5).max(1200),
  prototype: z.union([z.literal(""), z.enum(["si", "no", "en-desarrollo"])]),
  validationGoal: z.string().trim().min(10).max(1200),
  appProblem: z.string().trim().min(10).max(1200),
  appUsers: z.string().trim().min(5).max(1200),
  appStage: z.union([z.literal(""), z.enum(["idea", "prototipo", "existente", "por-definir"])]),
  coreFunctions: optionalTextSchema,
  mobileUsers: z.string().trim().min(5).max(1200),
  useContext: z.string().trim().min(10).max(1200),
  connectivity: z.union([z.literal(""), z.enum(["estable", "intermitente", "offline-parcial", "por-definir"])]),
  mobileFunctions: optionalTextSchema,
  systemProblem: z.string().trim().min(10).max(1200),
  technologies: optionalTextSchema,
  codeAccess: z.union([z.literal(""), z.enum(["si", "no", "por-definir"])]),
  documentation: z.union([z.literal(""), z.enum(["si", "parcial", "no", "por-definir"])]),
} as const;

const fieldsByFormType = {
  general: ["whatsapp", "projectType", "currentStage", "description", "budget"],
  "sitios-web": ["currentWebsite", "websiteGoal", "servicesToShow", "contentManagement"],
  "software-a-medida": ["process", "currentMethod", "participants", "systems"],
  automatizacion: ["repetitiveTasks", "tools", "frequency", "desiredResult"],
  mvp: ["problem", "audience", "prototype", "validationGoal"],
  "aplicaciones-web": ["appProblem", "appUsers", "appStage", "coreFunctions"],
  "aplicaciones-moviles": ["mobileUsers", "useContext", "connectivity", "mobileFunctions"],
  auditoria: ["systemProblem", "technologies", "codeAccess", "documentation"],
} as const satisfies Record<LeadFormType, ReadonlyArray<keyof typeof fieldSchemas>>;

const serviceByFormType: Partial<Record<LeadFormType, ServiceSlug>> = {
  "sitios-web": "sitios-web",
  "software-a-medida": "software-a-medida",
  automatizacion: "automatizacion-de-procesos",
  mvp: "desarrollo-mvp",
  "aplicaciones-web": "aplicaciones-web",
  "aplicaciones-moviles": "aplicaciones-moviles",
  auditoria: "auditoria-y-evolucion",
};

export const leadFieldLabels: Record<string, string> = {
  name: "Nombre",
  company: "Empresa",
  email: "Correo",
  whatsapp: "WhatsApp",
  projectType: "Tipo de proyecto",
  currentStage: "Etapa actual",
  description: "Descripción",
  budget: "Presupuesto aproximado",
  currentWebsite: "Sitio actual",
  websiteGoal: "Objetivo del sitio",
  servicesToShow: "Servicios o productos a mostrar",
  contentManagement: "Administración de contenido",
  process: "Proceso a digitalizar",
  currentMethod: "Cómo se realiza hoy",
  participants: "Personas que participan",
  systems: "Sistemas que necesita conectar",
  repetitiveTasks: "Tareas repetitivas",
  tools: "Herramientas involucradas",
  frequency: "Frecuencia",
  desiredResult: "Resultado esperado",
  problem: "Problema que resuelve",
  audience: "Quién lo utilizará",
  prototype: "Estado del prototipo",
  validationGoal: "Qué necesita validar",
  appProblem: "Problema de la aplicación",
  appUsers: "Usuarios de la aplicación",
  appStage: "Etapa actual",
  coreFunctions: "Funciones principales",
  mobileUsers: "Usuarios de la aplicación móvil",
  useContext: "Contexto de uso",
  connectivity: "Conectividad",
  mobileFunctions: "Funciones móviles principales",
  systemProblem: "Problema del sistema",
  technologies: "Tecnologías",
  codeAccess: "Acceso al código",
  documentation: "Documentación disponible",
};

export type ParsedLead = z.infer<typeof baseLeadSchema> & {
  details: Array<{ field: string; label: string; value: string }>;
  receivedAt: string;
};

function formDataValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

export function parseLeadSubmission(formData: FormData, now = Date.now()): ParsedLead {
  const rawBase = Object.fromEntries([
    "submissionId",
    "startedAt",
    "website",
    "formType",
    "name",
    "company",
    "email",
    "source",
    "sourcePath",
    "cta",
    "origin",
    "service",
    "project",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
    "utmTerm",
  ].map((name) => [name, formDataValue(formData, name)]));
  const base = baseLeadSchema.parse(rawBase);

  if (base.website || now - base.startedAt < 800) {
    throw new LeadSpamError();
  }

  const expectedService = serviceByFormType[base.formType];
  if (expectedService && base.service !== expectedService) {
    throw new z.ZodError([{
      code: "custom",
      path: ["service"],
      message: "El servicio no corresponde al tipo de formulario",
    }]);
  }

  const details = fieldsByFormType[base.formType].map((field) => {
    const value = fieldSchemas[field].parse(formDataValue(formData, field));
    return { field, label: leadFieldLabels[field], value };
  }).filter(({ value }) => value.length > 0);

  return {
    ...base,
    details,
    receivedAt: new Date(now).toISOString(),
  };
}

export class LeadSpamError extends Error {
  constructor() {
    super("Lead descartado por protección anti-spam");
    this.name = "LeadSpamError";
  }
}

const formTypeNames: Record<LeadFormType, string> = {
  general: "Evaluación general",
  "sitios-web": "Sitios web",
  "software-a-medida": "Software a medida",
  automatizacion: "Automatización de procesos",
  mvp: "Desarrollo de MVP",
  "aplicaciones-web": "Aplicaciones web",
  "aplicaciones-moviles": "Aplicaciones móviles",
  auditoria: "Auditoría y evolución",
};

export function buildLeadEmail(lead: ParsedLead) {
  const context = [
    ["Fecha", lead.receivedAt],
    ["Formulario", formTypeNames[lead.formType]],
    ["Página", lead.sourcePath || "No registrada"],
    ["Origen", lead.source],
    ["CTA", lead.cta],
    ["Servicio", lead.service || "General"],
    ["Proyecto", lead.project || "No indicado"],
    ["Origen contextual", lead.origin || "No indicado"],
    ["UTM source", lead.utmSource || "No indicada"],
    ["UTM medium", lead.utmMedium || "No indicada"],
    ["UTM campaign", lead.utmCampaign || "No indicada"],
    ["UTM content", lead.utmContent || "No indicada"],
    ["UTM term", lead.utmTerm || "No indicada"],
  ];
  const contact = [
    ["Nombre", lead.name],
    ["Empresa", lead.company || "No indicada"],
    ["Correo", lead.email],
  ];
  const lines = [
    "NUEVO LEAD - CÓDIGO STARTUP",
    "",
    "CONTACTO",
    ...contact.map(([label, value]) => `${label}: ${value}`),
    "",
    "PROYECTO",
    ...lead.details.map(({ label, value }) => `${label}: ${value}`),
    "",
    "TRAZABILIDAD",
    ...context.map(([label, value]) => `${label}: ${value}`),
  ];

  return {
    subject: `Nuevo lead · ${formTypeNames[lead.formType]} · ${lead.name}`,
    text: lines.join("\n"),
    replyTo: lead.email,
  };
}

export function buildLeadWhatsAppUrl(lead: ParsedLead) {
  const message = [
    "Hola, ya envié una solicitud a Código Startup.",
    `Nombre: ${lead.name}`,
    `Evaluación: ${formTypeNames[lead.formType]}`,
    ...lead.details.map(({ label, value }) => `${label}: ${value}`),
  ].join("\n");

  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
