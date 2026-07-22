import { getProjectBySlug } from "@/data/projects";
import {
  homeServiceGroupSchema,
  techLogoSchema,
  type HomeServiceGroup,
  type ProjectSlug,
} from "@/lib/commercial/schema";

export const techLogos = techLogoSchema.array().parse([
  { src: "/logos/github.png", alt: "GitHub" },
  { src: "/logos/react.png", alt: "React" },
  { src: "/logos/nextjs.png", alt: "Next.js" },
  { src: "/logos/typescript.png", alt: "TypeScript" },
  { src: "/logos/vercel.svg", alt: "Vercel" },
  { src: "/logos/NestJS.svg", alt: "NestJS" },
  { src: "/logos/docker.png", alt: "Docker" },
  { src: "/logos/supabase.png", alt: "Supabase" },
  { src: "/logos/figma.png", alt: "Figma" },
  { src: "/logos/claude-color.png", alt: "Claude AI" },
]);

const homeServiceGroupData: HomeServiceGroup[] = [
  {
    category: "Desarrollo",
    name: "Construimos",
    description: "Creamos soluciones digitales a tu medida, con código sólido, entregas semanales y un producto listo para crecer.",
    tags: ["Sitios web", "Landing page", "Tiendas Online", "Apps web", "Apps móviles", "Software a medida", "Prototipos"],
    cta: "Quiero construir →",
    serviceSlugs: ["sitios-web", "software-a-medida", "desarrollo-mvp", "aplicaciones-web", "aplicaciones-moviles"],
    capabilitySlugs: ["desarrollo", "arquitectura", "seguridad"],
  },
  {
    category: "Estrategia",
    name: "Optimizamos",
    description: "Revisamos lo que ya tienes, encontramos los cuellos de botella y te decimos qué mejorar antes de que cueste más caro.",
    tags: ["Auditoría", "Arquitectura", "Seguridad", "Asesorías/Consultorias Técnicas", "Mejora de procesos", "Roadmap"],
    cta: "Quiero mejorar lo que tengo →",
    serviceSlugs: ["automatizacion-de-procesos", "auditoria-y-evolucion"],
    capabilitySlugs: ["estrategia", "arquitectura", "seguridad", "analitica"],
  },
  {
    category: "Diseño y Marca",
    name: "Comunicamos",
    description: "Diseñamos marcas y productos, unimos identidad y estrategia para que tu mensaje sea profesional y conecte con tus usuarios.",
    tags: ["Experiencia de Usuario", "Identidad visual", "Animación digital", "Brochure y Graficas", "Marketing y publicidad digital"],
    cta: "Quiero comunicar mejor →",
    serviceSlugs: [],
    capabilitySlugs: ["estrategia", "ux-ui", "contenido", "seo", "analitica"],
  },
];

export const homeServiceGroups = homeServiceGroupSchema.array().parse(homeServiceGroupData);

export const homeProjectSlugs = ["subtech", "entrena", "nextdrill"] as const satisfies ReadonlyArray<ProjectSlug>;
export const homeClientProjects = homeProjectSlugs.map((slug) => {
  const project = getProjectBySlug(slug);
  if (project.kind !== "client" || !project.testimonial) {
    throw new Error(`El proyecto ${slug} no puede mostrarse como caso de cliente en la home`);
  }
  return { ...project, kind: project.kind, testimonial: project.testimonial };
});

const ownProduct = getProjectBySlug("nucleo-gestor");
if (ownProduct.kind !== "own-product" || !ownProduct.externalUrl || !ownProduct.homeCard) {
  throw new Error("Núcleo Gestor debe estar configurado como producto propio con su presentación de home");
}
export const homeOwnProduct = {
  ...ownProduct,
  kind: ownProduct.kind,
  externalUrl: ownProduct.externalUrl,
  homeCard: ownProduct.homeCard,
};
