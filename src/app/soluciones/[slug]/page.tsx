import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { submitLead } from "@/app/actions/submit-lead";
import {
  ServiceArticles,
  ServiceCapabilities,
  ServiceCaseStudies,
  ServiceDeliverables,
  ServiceEditorialSection,
  ServiceFAQ,
  ServiceHero,
  ServiceLeadForm,
  ServiceProblemList,
  ServiceProcess,
  ServiceSolutionTypes,
} from "@/components/services";
import { TrackView } from "@/components/analytics/TrackView";
import { JsonLd } from "@/components/seo/JsonLd";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { siteConfig } from "@/config/site";
import { capabilities } from "@/data/capabilities";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getArticlesForService } from "@/lib/blog/service-relations";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildServiceSchema,
} from "@/lib/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { servicePageConfig } from "./service-page-config";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map(({ slug }) => ({ slug }));
}

/** Los `seo.title` de servicios ya incluyen la marca; la plantilla del layout la vuelve a añadir. */
function stripBrand(title: string): string {
  return title.replace(new RegExp(`\\s*\\|\\s*${siteConfig.name}\\s*$`), "");
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return createPageMetadata({
    title: stripBrand(service.seo.title),
    description: service.seo.description,
    path: `/soluciones/${service.slug}`,
  });
}

export default async function ServiceRoutePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const pageConfig = servicePageConfig[service.slug];
  const serviceCapabilities = service.capabilities.flatMap((capabilitySlug) => {
    const capability = capabilities.find((item) => item.slug === capabilitySlug);
    return capability ? [capability] : [];
  });
  const relatedProjects = service.relatedProjects.flatMap((projectSlug) => {
    const project = projects.find((item) => item.slug === projectSlug);
    return project ? [project] : [];
  });
  const relatedArticles = getArticlesForService(service.slug);
  const evaluationSectionId = `${service.slug}-evaluacion`;
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Inicio", url: siteConfig.baseUrl },
    { name: "Soluciones", url: `${siteConfig.baseUrl}/soluciones` },
    { name: service.name, url: `${siteConfig.baseUrl}/soluciones/${service.slug}` },
  ]);

  return (
    <main className="service-detail-page">
      <TrackView event={ANALYTICS_EVENTS.viewService} params={{ service: service.slug }} />
      <JsonLd data={buildServiceSchema(service)} />
      {service.faq.length > 0 && <JsonLd data={buildFaqPageSchema(service.faq)} />}
      <JsonLd data={breadcrumb} />
      <ServiceHero service={service} ctaHref={`#${evaluationSectionId}`} />
      <ServiceProblemList problems={service.problems} />
      <ServiceSolutionTypes solutionTypes={service.solutionTypes} />
      {pageConfig.editorialSections.map((section) => (
        <ServiceEditorialSection key={section.title} {...section} />
      ))}
      <ServiceDeliverables deliverables={service.deliverables} />
      <ServiceCapabilities capabilities={serviceCapabilities} />
      <ServiceProcess process={service.process} />
      <ServiceCaseStudies projects={relatedProjects} />
      <ServiceFAQ faq={service.faq} />
      <ServiceArticles articles={relatedArticles} />
      <ServiceLeadForm
        service={service}
        fields={pageConfig.lead.fields}
        action={submitLead}
        idPrefix={service.slug}
        sectionId={evaluationSectionId}
        source="service-page"
        title={pageConfig.lead.title}
        description={pageConfig.lead.description}
        submitHint="Recibiremos esta información por correo. Luego podrás continuar por WhatsApp o reservar una reunión."
      />
    </main>
  );
}
