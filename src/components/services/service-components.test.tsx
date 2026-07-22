import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { capabilities } from "@/data/capabilities";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getArticleMetadataBySlug } from "@/lib/blog/article-loader";
import {
  ServiceArticles,
  ServiceFAQ,
  ServiceHero,
  ServiceLeadForm,
  ServiceProblemList,
  ServiceCapabilities,
  ServiceCaseStudies,
  ServiceCTA,
  ServiceDeliverables,
  ServiceProcess,
  ServiceSolutionTypes,
} from "./index";

const websiteService = services.find(({ slug }) => slug === "sitios-web");
if (!websiteService) throw new Error("Falta el servicio sitios-web para las pruebas");

describe("shared commercial components", () => {
  it("marks the current breadcrumb and hides separators from assistive technology", () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Sitios web" }]} />
    );

    expect(html).toContain('aria-current="page"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('href="/"');
  });

  it("renders a service hero with one h1 and contextual contact route", () => {
    const html = renderToStaticMarkup(<ServiceHero service={websiteService} />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain(websiteService.hero.title);
    expect(html).toContain('/contacto?servicio=sitios-web');
    expect(html).toContain('aria-label="Para quién es este servicio"');
  });

  it("does not render empty content sections", () => {
    expect(renderToStaticMarkup(<ServiceProblemList problems={[]} />)).toBe("");
    expect(renderToStaticMarkup(<ServiceFAQ faq={[]} />)).toBe("");
  });

  it("renders the reusable content sections from supplied data", () => {
    const html = renderToStaticMarkup(
      <>
        <ServiceSolutionTypes solutionTypes={websiteService.solutionTypes} />
        <ServiceDeliverables deliverables={websiteService.deliverables} />
        <ServiceCapabilities capabilities={capabilities.slice(0, 2)} />
        <ServiceProcess process={websiteService.process} />
      </>
    );

    expect(html).toContain(websiteService.solutionTypes[0].title);
    expect(html).toContain(websiteService.deliverables[0]);
    expect(html).toContain(capabilities[0].name);
    expect(html).toContain(websiteService.process[0].title);
  });

  it("uses native details and summary elements for keyboard-accessible FAQ", () => {
    const html = renderToStaticMarkup(
      <ServiceFAQ faq={[{ question: "¿Cómo comenzamos?", answer: "Con un diagnóstico." }]} />
    );

    expect(html).toContain("<details");
    expect(html).toContain("<summary>");
    expect(html).toContain("¿Cómo comenzamos?");
  });

  it("renders project links from the canonical project slug", () => {
    const html = renderToStaticMarkup(<ProjectCard project={projects[0]} />);

    expect(html).toContain(`/proyectos/${projects[0].slug}`);
    expect(html).toContain(`alt="Logo ${projects[0].name}"`);
  });

  it("renders a contextual CTA without prefetching a route from a future phase", () => {
    const html = renderToStaticMarkup(
      <ServiceCTA slug={websiteService.slug} cta={websiteService.cta} />
    );

    expect(html).toContain('/contacto?servicio=sitios-web');
    expect(html).toContain(websiteService.cta.label);
  });

  it("supports centered shared section headers", () => {
    const html = renderToStaticMarkup(
      <SectionHeader eyebrow="Contexto" title="Título" description="Descripción" align="center" />
    );

    expect(html).toContain("content-section-header--center");
    expect(html).toContain("Descripción");
  });

  it("connects labels and preserves service context in the lead form", () => {
    const html = renderToStaticMarkup(
      <ServiceLeadForm
        service={websiteService}
        action="/api/leads"
        idPrefix="website-primary"
        source="service-page"
        fields={[
          {
            name: "email",
            label: "Correo",
            type: "email",
            required: true,
            autoComplete: "email",
          },
          {
            name: "description",
            label: "Descripción",
            type: "textarea",
          },
        ]}
      />
    );

    expect(html).toContain('method="post"');
    expect(html).toContain('for="website-primary-lead-form-field-0"');
    expect(html).toContain('id="website-primary-lead-form-field-0"');
    expect(html).toContain('name="service" value="sitios-web"');
    expect(html).toContain('name="formType" value="sitios-web"');
    expect(html).toContain('name="source" value="service-page"');

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("rejects duplicate field names before rendering an ambiguous form", () => {
    expect(() => renderToStaticMarkup(
      <ServiceLeadForm
        service={websiteService}
        action="/api/leads"
        idPrefix="website-duplicate"
        source="service-page"
        fields={[
          { name: "email", label: "Correo", type: "email" },
          { name: "email", label: "Confirmar correo", type: "email" },
        ]}
      />
    )).toThrow("contiene nombres de campo duplicados");
  });

  it("rejects an id prefix that cannot produce safe HTML ids", () => {
    expect(() => renderToStaticMarkup(
      <ServiceLeadForm
        service={websiteService}
        action="/api/leads"
        idPrefix="website form"
        source="service-page"
        fields={[]}
      />
    )).toThrow("idPrefix debe comenzar con una letra");
  });

  it("renders related projects and articles only from supplied records", () => {
    const article = getArticleMetadataBySlug("como-definir-el-alcance-de-un-mvp");
    if (!article) throw new Error("Falta el artículo requerido para la prueba");

    const html = renderToStaticMarkup(
      <>
        <ServiceCaseStudies projects={[projects[0]]} />
        <ServiceArticles articles={[article]} />
      </>
    );

    expect(html).toContain(projects[0].name);
    expect(html).toContain(article.title);
    expect(html).toContain(`/blog/${article.fileSlug}`);
  });
});
