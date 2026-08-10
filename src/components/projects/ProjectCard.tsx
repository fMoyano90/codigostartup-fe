import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/commercial/schema";

export function ProjectCard({
  project,
  colorLogo = false,
  hideTitle = false,
}: {
  project: Project;
  colorLogo?: boolean;
  hideTitle?: boolean;
}) {
  return (
    <article className="project-card">
      <div className="project-card-topline">
        <span className="project-card-sector">{project.sector}</span>
        <span className="project-card-kind">
          {project.kind === "own-product" ? "Producto propio" : "Proyecto cliente"}
        </span>
      </div>
      <div className="project-card-logo-wrap">
        <Image
          src={project.logo}
          alt={`Logo ${project.name}`}
          width={180}
          height={72}
          className={`project-card-logo${colorLogo ? " project-card-logo--color" : ""}`}
        />
      </div>
      {!hideTitle && (
        <h3 className="project-card-title">
          <Link href={`/proyectos/${project.slug}`} prefetch={false}>{project.name}</Link>
        </h3>
      )}
      <p className="project-card-description">{project.description}</p>
      {project.testimonial?.photo && (
        <div className="project-card-reviewer">
          <span className="testimonial-avatar testimonial-avatar--sm">
            <Image src={project.testimonial.photo.src} alt={project.testimonial.photo.alt} fill sizes="40px" />
          </span>
          <span className="project-card-reviewer-name">{project.testimonial.author}</span>
        </div>
      )}
      <Link href={`/proyectos/${project.slug}`} prefetch={false} className="project-card-link">
        Ver proyecto <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
