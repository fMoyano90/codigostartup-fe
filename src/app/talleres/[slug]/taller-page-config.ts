import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Film,
  Gauge,
  Megaphone,
  PenLine,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import type { TallerSlug } from "@/lib/commercial/schema";

export type TallerPilar = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type TallerRazon = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type TallerFichaConfig = {
  heroEyebrow: string;
  heroImage?: string;
  pilares: TallerPilar[];
  razones: TallerRazon[];
};

const pilaresGenericos: TallerPilar[] = [
  {
    icon: Workflow,
    title: "Procesos reales",
    desc: "Trabajamos sobre las tareas diarias del equipo: correo, planillas, reportes, cotizaciones, faenas. Nada de ejemplos genéricos.",
  },
  {
    icon: Presentation,
    title: "Manos a la obra",
    desc: "Cada sesión es práctica: ejercicios guiados, entregables verificables y resultados que se usan al día siguiente del taller.",
  },
  {
    icon: ShieldCheck,
    title: "Ciberseguridad primero",
    desc: "Incluye el módulo de qué información NO poner en una IA pública. La información confidencial se queda en tu empresa.",
  },
];

/**
 * Pilares y razones específicas por taller.
 * Solo los talleres con contenido aprobado (SCRUM-619) tienen razones propias;
 * el resto usa pilares genéricos reales y omite la sección de razones.
 */
export const tallerFichaConfig: Record<TallerSlug, TallerFichaConfig> = {
  "videos-ugc-con-ia": {
    heroEyebrow: "Prepárate para crear contenido que vende",
    heroImage: "/fondo-hero-taller-video-ugc.jpg",
    pilares: [
      {
        icon: PenLine,
        title: "Estrategia y guion",
        desc: "De la idea comercial al guion de 20 a 40 segundos: qué comunicar, para quién y con qué gancho.",
      },
      {
        icon: Clapperboard,
        title: "Producción con IA",
        desc: "Imágenes, clips y voz generados con herramientas simples: Gemini, Google Flow y Veo.",
      },
      {
        icon: Film,
        title: "Montaje y publicación",
        desc: "Edición en CapCut, subtítulos, música y exportación del video vertical listo para tus redes.",
      },
    ],
    razones: [
      {
        icon: Target,
        title: "Un solo proyecto transversal",
        desc: "Desde la idea comercial hasta el video terminado: todo el taller se construye sobre tu negocio, no sobre ejemplos.",
      },
      {
        icon: Sparkles,
        title: "Herramientas gratuitas y simples",
        desc: "Gemini, Google Flow/Veo y CapCut: sin stack técnico y sin costos altos para empezar.",
      },
      {
        icon: Gauge,
        title: "Cero experiencia previa",
        desc: "No necesitas saber de diseño, video ni IA. Partimos desde cero con ejercicios guiados en vivo.",
      },
      {
        icon: Megaphone,
        title: "Terminas con video publicado",
        desc: "Un video vertical de 20 a 40 segundos, exportado en MP4 y listo para publicar en tus redes sociales.",
      },
    ],
  },
  "ia-para-productividad-administrativa": {
    heroEyebrow: "Recupera horas de tu equipo en tareas repetitivas",
    heroImage: "/images/productividad-administrativa.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "automatizacion-de-procesos-con-ia": {
    heroEyebrow: "Descubre dónde pierde tiempo tu operación",
    heroImage: "/images/automatizacion-de-procesos-taller-ia.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "ia-para-recursos-humanos": {
    heroEyebrow: "Acelera las tareas del área de personas",
    heroImage: "/images/recursos-humanos-taller.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "ia-para-equipos-comerciales": {
    heroEyebrow: "Prepara mejores reuniones y propuestas",
    heroImage: "/images/recursos-humanos-taller.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "ia-para-marketing": {
    heroEyebrow: "Produce más contenido con tu propia voz",
    heroImage: "/images/marketing-taller-ia.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "ia-para-lideres-y-jefaturas": {
    heroEyebrow: "Decide con mejor información",
    heroImage: "/images/lideres-y-jefaturas.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "ia-para-gestion-de-proyectos": {
    heroEyebrow: "Planifica y da seguimiento con IA",
    heroImage: "/images/gestion-de-proyectos-taller.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
  "ia-para-operaciones-y-faenas": {
    heroEyebrow: "Reduce trabajo manual en terreno y oficina técnica",
    heroImage: "/images/operaciones-y-faenas.jpg",
    pilares: pilaresGenericos,
    razones: [],
  },
};

export const pilaresTallerGenerico = pilaresGenericos;