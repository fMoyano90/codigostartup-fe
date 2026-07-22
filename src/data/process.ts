import { processStepSchema, type ProcessStep } from "@/lib/commercial/schema";

const processData: ProcessStep[] = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Escuchamos, preguntamos y entendemos dónde está el problema real antes de proponer cualquier solución.",
  },
  {
    n: "02",
    title: "Ruta clara",
    desc: "Alcance definido, tiempos reales y precio claro. Sin cotizaciones que dicen todo y no comprometen nada.",
  },
  {
    n: "03",
    title: "Construcción",
    desc: "Avances semanales, código real y decisiones explicadas. Siempre sabes qué se construyó, qué viene y por qué.",
  },
  {
    n: "04",
    title: "Iteración",
    desc: "Medimos, ajustamos y entregamos un producto que funciona en producción — con documentación y traspaso completo.",
  },
];

export const processSteps = processStepSchema.array().parse(processData);
