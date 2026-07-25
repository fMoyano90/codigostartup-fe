import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import ProjectsIndexPage from "./page";
import ProjectRoutePage from "./[slug]/page";

async function renderProject(slug: string) {
  const page = await ProjectRoutePage({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(page);
}

describe("phase 9 project cases", () => {
  it("keeps a complete typed case-study structure for every project", () => {
    for (const project of projects) {
      expect(project.caseStudy).toHaveProperty("context");
      expect(project.caseStudy).toHaveProperty("problem");
      expect(project.caseStudy).toHaveProperty("previousState");
      expect(project.caseStudy).toHaveProperty("objective");
      expect(project.caseStudy).toHaveProperty("solution");
      expect(project.caseStudy).toHaveProperty("features");
      expect(project.caseStudy).toHaveProperty("process");
      expect(project.caseStudy).toHaveProperty("result");
      expect(project.caseStudy).toHaveProperty("gallery");
      expect(project.caseStudy).toHaveProperty("relatedArticles");
    }
  });

  it("separates client work from the own product on the index", () => {
    const html = renderToStaticMarkup(<ProjectsIndexPage />);

    expect(html).toContain("Proyectos de clientes");
    expect(html).toContain("Laboratorio propio");
    expect(html.match(/Proyecto cliente/g)).toHaveLength(3);
    expect(html.match(/Producto propio/g)).toHaveLength(1);

    for (const project of projects) expect(html).toContain(`/proyectos/${project.slug}`);
  });

  it("renders every case section for every project", async () => {
    for (const project of projects) {
      const html = await renderProject(project.slug);

      expect(html.match(/<h1/g)).toHaveLength(1);
      expect(html).toContain("Contexto");
      expect(html).toContain("Problema");
      expect(html).toContain("Situación anterior");
      expect(html).toContain("Objetivo");
      expect(html).toContain("Solución");
      expect(html).toContain("Funcionalidades");
      expect(html).toContain("Cómo se construyó");
      expect(html).toContain("Qué se puede verificar");
      expect(html).toContain("Galería");
      expect(html).toContain("Servicios relacionados");
      expect(html).toContain(`/contacto?proyecto=${project.slug}`);
      expect(html).not.toContain("Página en evolución");
    }
  });

  it("shows no pending-editorial placeholder now that every case is complete", async () => {
    for (const project of projects) {
      const html = await renderProject(project.slug);
      expect(html).not.toContain("Pendiente editorial");
    }
  });

  it("uses only the project media explicitly registered in canonical data", async () => {
    const subtech = await renderProject("subtech");
    const entrena = await renderProject("entrena");
    const nextdrill = await renderProject("nextdrill");
    const nucleo = await renderProject("nucleo-gestor");

    expect(subtech).toContain("/subtech-demo.mp4");
    expect(entrena).toContain("%2Fapp-mobile-entrena-cel.png");
    expect(nextdrill).toContain("%2Fmacbookpro-nexdrill.png");
    expect(nucleo).toContain("/nucleo-gestor-demo.mp4");

    for (const project of projects) {
      for (const image of project.caseStudy.gallery) {
        expect(existsSync(join(process.cwd(), "public", image.src.replace(/^\//, "")))).toBe(true);
      }
      if (project.caseStudy.demoVideo) {
        expect(existsSync(join(process.cwd(), "public", project.caseStudy.demoVideo.src.replace(/^\//, "")))).toBe(true);
      }
    }
  });

  it("renders testimonials when present and skips the placeholder for a client-less own product", async () => {
    const entrena = await renderProject("entrena");
    const nextdrill = await renderProject("nextdrill");
    const nucleo = await renderProject("nucleo-gestor");

    expect(entrena).toContain("Jaime Valero, Coach &amp; Founder");
    expect(nextdrill).toContain("Roberto Silva, Gerente General");
    expect(nucleo).not.toContain("Validar un testimonio o definir editorialmente si no corresponde");
  });
});
