import { z } from "zod";

export const serviceSlugValues = [
  "sitios-web",
  "tiendas-online",
  "software-a-medida",
  "automatizacion-de-procesos",
  "desarrollo-mvp",
  "aplicaciones-web",
  "aplicaciones-moviles",
  "auditoria-y-evolucion",
] as const;

export const capabilitySlugValues = [
  "estrategia",
  "ux-ui",
  "desarrollo",
  "contenido",
  "seo",
  "analitica",
  "arquitectura",
  "seguridad",
  "lanzamiento-y-evolucion",
] as const;

export const projectSlugValues = [
  "subtech",
  "entrena",
  "nextdrill",
  "nucleo-gestor",
] as const;

export const tallerSlugValues = [
  "videos-ugc-con-ia",
  "ia-para-productividad-administrativa",
  "automatizacion-de-procesos-con-ia",
  "ia-para-recursos-humanos",
  "ia-para-equipos-comerciales",
  "ia-para-marketing",
  "ia-para-lideres-y-jefaturas",
  "ia-para-gestion-de-proyectos",
  "ia-para-operaciones-y-faenas",
] as const;

export const serviceSlugSchema = z.enum(serviceSlugValues);
export const capabilitySlugSchema = z.enum(capabilitySlugValues);
export const projectSlugSchema = z.enum(projectSlugValues);
export const tallerSlugSchema = z.enum(tallerSlugValues);

const editorialStatusSchema = z.enum(["draft", "ready"]);

const contentBlockSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
});

const heroSchema = z.strictObject({
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
});

const faqSchema = z.strictObject({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const ctaSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
  label: z.string().min(1),
  formType: z.enum([
    "general",
    "sitios-web",
    "tiendas-online",
    "software-a-medida",
    "automatizacion",
    "mvp",
    "aplicaciones-web",
    "aplicaciones-moviles",
    "auditoria",
  ]),
});

const seoSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const serviceSchema = z.strictObject({
  slug: serviceSlugSchema,
  name: z.string().min(1),
  need: z.enum([
    "presencia-digital",
    "operacion",
    "productos-digitales",
    "sistemas-existentes",
  ]),
  shortDescription: z.string().min(1),
  hero: heroSchema,
  audience: z.array(z.string().min(1)),
  problems: z.array(z.string().min(1)),
  solutionTypes: z.array(contentBlockSchema),
  deliverables: z.array(z.string().min(1)),
  capabilities: z.array(capabilitySlugSchema),
  process: z.array(contentBlockSchema),
  relatedProjects: z.array(projectSlugSchema),
  faq: z.array(faqSchema),
  cta: ctaSchema,
  seo: seoSchema,
  editorialStatus: editorialStatusSchema,
  editorialNotes: z.array(z.string().min(1)),
}).superRefine((service, ctx) => {
  if (service.editorialStatus === "draft") {
    if (service.editorialNotes.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["editorialNotes"],
        message: "Un servicio en borrador debe explicar qué contenido está pendiente",
      });
    }
    return;
  }

  const requiredSections = [
    "audience",
    "problems",
    "solutionTypes",
    "deliverables",
    "capabilities",
    "process",
    "faq",
  ] as const;

  for (const section of requiredSections) {
    if (service[section].length === 0) {
      ctx.addIssue({
        code: "custom",
        path: [section],
        message: `La sección ${section} es obligatoria para publicar el servicio`,
      });
    }
  }

  if (service.editorialNotes.length > 0) {
    ctx.addIssue({
      code: "custom",
      path: ["editorialNotes"],
      message: "Un servicio listo no puede conservar pendientes editoriales",
    });
  }
});

export const capabilitySchema = z.strictObject({
  slug: capabilitySlugSchema,
  name: z.string().min(1),
  description: z.string().min(1),
});

const metricSchema = z.strictObject({
  val: z.string().min(1),
  label: z.string().min(1),
});

const testimonialSchema = z.strictObject({
  quote: z.string().min(1),
  author: z.string().min(1),
  photo: z.strictObject({ src: z.string().min(1), alt: z.string().min(1) }).optional(),
});

const projectGalleryItemSchema = z.strictObject({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1).optional(),
});

const projectCaseStudySchema = z.strictObject({
  context: z.string().min(1).nullable(),
  problem: z.string().min(1).nullable(),
  previousState: z.string().min(1).nullable(),
  objective: z.string().min(1).nullable(),
  solution: z.string().min(1).nullable(),
  features: z.array(z.string().min(1)),
  process: z.array(contentBlockSchema),
  result: z.string().min(1).nullable(),
  demoVideo: z.strictObject({
    src: z.string().min(1),
    poster: z.string().min(1).optional(),
    caption: z.string().min(1).optional(),
  }).optional(),
  gallery: z.array(projectGalleryItemSchema),
  relatedArticles: z.array(z.string().min(1)),
});

export const projectSchema = z.strictObject({
  slug: projectSlugSchema,
  kind: z.enum(["client", "own-product"]),
  sector: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  hook: z.string().min(1),
  logo: z.string().min(1),
  externalUrl: z.string().url().nullable(),
  homeCard: z.strictObject({
    description: z.string().min(1),
    ctaLabel: z.string().min(1),
  }).nullable(),
  metrics: z.array(metricSchema),
  testimonial: testimonialSchema.nullable(),
  relatedServices: z.array(serviceSlugSchema),
  caseStudy: projectCaseStudySchema,
  editorialStatus: editorialStatusSchema,
  editorialNotes: z.array(z.string().min(1)),
});

export const processStepSchema = z.strictObject({
  n: z.string().regex(/^\d{2}$/),
  title: z.string().min(1),
  desc: z.string().min(1),
});

const tallerModuloSchema = z.strictObject({
  titulo: z.string().min(1),
  minutos: z.number().int().positive(),
  contenido: z.array(z.string().min(1)).optional(),
});

export const tallerSchema = z.strictObject({
  slug: tallerSlugSchema,
  categoria: z.string().min(1),
  titulo: z.string().min(1),
  duracionHoras: z.number().int().positive(),
  resumen: z.string().min(1),
  descripcion: z.string().min(1),
  publico: z.string().min(1),
  requisitos: z.string().min(1),
  nivel: z.string().min(1),
  modalidades: z.array(z.string().min(1)).min(1),
  modulos: z.array(tallerModuloSchema),
  objetivoGeneral: z.string().min(1),
  resultados: z.array(z.string().min(1)),
  metodologia: z.string().min(1),
  evaluacion: z.string().min(1),
  entregable: z.string().min(1),
  ciberseguridad: z.boolean(),
  herramientas: z.array(z.string().min(1)).optional(),
  seo: z.strictObject({ title: z.string().min(1), description: z.string().min(1) }),
  estado: z.enum(["aprobado", "borrador"]),
  pendiente: z.array(z.string().min(1)),
}).superRefine((taller, ctx) => {
  const minutos = taller.modulos.reduce((acc, modulo) => acc + modulo.minutos, 0);

  if (taller.estado === "aprobado") {
    if (taller.modulos.length === 0 || minutos !== taller.duracionHoras * 60) {
      ctx.addIssue({
        code: "custom",
        path: ["modulos"],
        message: "Los módulos de un taller aprobado deben sumar exactamente su duración",
      });
    }
    if (taller.pendiente.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["pendiente"],
        message: "Un taller aprobado no puede conservar pendientes editoriales",
      });
    }
    return;
  }

  if (taller.pendiente.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["pendiente"],
      message: "Un taller en borrador debe explicar qué contenido está pendiente",
    });
  }
});

export const homeServiceGroupSchema = z.strictObject({
  category: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  cta: z.string().min(1),
  serviceSlugs: z.array(serviceSlugSchema),
  capabilitySlugs: z.array(capabilitySlugSchema),
});

export const techLogoSchema = z.strictObject({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const siteConfigSchema = z.strictObject({
  name: z.string().min(1),
  baseUrl: z.string().url(),
  contact: z.strictObject({
    email: z.string().email(),
    whatsappNumber: z.string().regex(/^\d+$/),
    whatsappUrl: z.string().url(),
    bookingUrl: z.string().url(),
    bookingEmbedUrl: z.string().url(),
  }),
  /** Perfiles sociales reales para Organization.sameAs. Omitir los que no existan. */
  social: z
    .strictObject({
      linkedin: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .default({}),
});

export type ServiceSlug = z.infer<typeof serviceSlugSchema>;
export type CapabilitySlug = z.infer<typeof capabilitySlugSchema>;
export type ProjectSlug = z.infer<typeof projectSlugSchema>;
export type TallerSlug = z.infer<typeof tallerSlugSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Capability = z.infer<typeof capabilitySchema>;
export type Project = z.infer<typeof projectSchema>;
export type Taller = z.infer<typeof tallerSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type HomeServiceGroup = z.infer<typeof homeServiceGroupSchema>;

export function assertUniqueSlugs(items: ReadonlyArray<{ slug: string }>, label: string) {
  const slugs = items.map((item) => item.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error(`Hay slugs duplicados en ${label}`);
  }
}
