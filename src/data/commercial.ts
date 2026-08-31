import { siteConfig } from "@/config/site";
import { capabilities } from "@/data/capabilities";
import { homeClientProjects, homeOwnProduct, homeServiceGroups, techLogos } from "@/data/home";
import { processSteps } from "@/data/process";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import type { ServiceSlug } from "@/lib/commercial/schema";

export const hiddenServiceSlugs: ReadonlyArray<ServiceSlug> = [
  "sitios-web",
  "tiendas-online",
];

function assertReferences() {
  const serviceSlugs = new Set(services.map(({ slug }) => slug));
  const capabilitySlugs = new Set(capabilities.map(({ slug }) => slug));
  const projectSlugs = new Set(projects.map(({ slug }) => slug));

  for (const service of services) {
    for (const capabilitySlug of service.capabilities) {
      if (!capabilitySlugs.has(capabilitySlug)) {
        throw new Error(`El servicio ${service.slug} referencia la capacidad inexistente ${capabilitySlug}`);
      }
    }
    for (const projectSlug of service.relatedProjects) {
      const project = projects.find(({ slug }) => slug === projectSlug);
      if (!projectSlugs.has(projectSlug) || !project) {
        throw new Error(`El servicio ${service.slug} referencia el proyecto inexistente ${projectSlug}`);
      }
      if (!project.relatedServices.includes(service.slug)) {
        throw new Error(`La relación entre ${service.slug} y ${projectSlug} no es recíproca`);
      }
    }
  }

  for (const project of projects) {
    for (const serviceSlug of project.relatedServices) {
      if (!serviceSlugs.has(serviceSlug)) {
        throw new Error(`El proyecto ${project.slug} referencia el servicio inexistente ${serviceSlug}`);
      }
      const service = services.find(({ slug }) => slug === serviceSlug);
      if (!service?.relatedProjects.includes(project.slug)) {
        throw new Error(`La relación entre ${project.slug} y ${serviceSlug} no es recíproca`);
      }
    }
  }

  for (const group of homeServiceGroups) {
    for (const serviceSlug of group.serviceSlugs) {
      if (!serviceSlugs.has(serviceSlug)) {
        throw new Error(`El grupo ${group.name} referencia el servicio inexistente ${serviceSlug}`);
      }
    }
    for (const capabilitySlug of group.capabilitySlugs) {
      if (!capabilitySlugs.has(capabilitySlug)) {
        throw new Error(`El grupo ${group.name} referencia la capacidad inexistente ${capabilitySlug}`);
      }
    }
  }
}

assertReferences();

export {
  capabilities,
  homeClientProjects,
  homeOwnProduct,
  homeServiceGroups,
  processSteps,
  projects,
  services,
  siteConfig,
  techLogos,
};
