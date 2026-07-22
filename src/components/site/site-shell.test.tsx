import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { services } from "@/data/services";
import { SiteFooter } from "./SiteFooter";
import { SiteHeaderClient } from "./SiteHeaderClient";
import { buildSolutionNavGroups } from "./site-navigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/soluciones/software-a-medida",
}));

describe("global site shell", () => {
  it("renders accessible desktop and mobile navigation controls", () => {
    const html = renderToStaticMarkup(
      <SiteHeaderClient solutionGroups={buildSolutionNavGroups(services)} />
    );

    expect(html).toContain('aria-label="Navegación principal"');
    expect(html).toContain('aria-label="Navegación móvil"');
    expect(html).toContain('aria-controls="solutions-menu"');
    expect(html).toContain('aria-controls="mobile-navigation"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("site-nav-link--button is-active");
    expect(html).toContain('aria-current="page"');
  });

  it("includes every service route in both navigation variants", () => {
    const html = renderToStaticMarkup(
      <SiteHeaderClient solutionGroups={buildSolutionNavGroups(services)} />
    );

    for (const service of services) {
      expect(html.split(`/soluciones/${service.slug}`)).toHaveLength(3);
    }
  });

  it("renders the complete footer architecture and contact routes", () => {
    const html = renderToStaticMarkup(<SiteFooter />);

    expect(html).toContain('href="/proyectos"');
    expect(html).toContain('href="/blog"');
    expect(html).toContain('href="/nosotros"');
    expect(html).toContain('href="/proceso"');
    expect(html).toContain('href="/contacto"');
    expect(html).toContain("hola@codigostartup.com");
    expect(html).toContain("LinkedIn");
    expect(html).toContain("Instagram");
  });
});
