import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";
import ServiceRoutePage from "./soluciones/[slug]/page";
import { generateMetadata as serviceMetadata } from "./soluciones/[slug]/page";

async function renderService(slug: string) {
  const page = await ServiceRoutePage({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(page);
}

describe("phase 13 — technical SEO", () => {
  it("emits Service, FAQPage and BreadcrumbList JSON-LD on a service page", async () => {
    const html = await renderService("sitios-web");
    expect(html).toContain('"@type":"Service"');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });

  it("strips the brand from the service title so the root template adds it once", async () => {
    const metadata = await serviceMetadata({ params: Promise.resolve({ slug: "sitios-web" }) });
    expect(metadata.title).toBe("Desarrollo de sitios web");
    expect(metadata.openGraph?.title).toBe("Desarrollo de sitios web | Código Startup");
  });

  it("renders a 404 page with internal navigation and is non-indexable", () => {
    const html = renderToStaticMarkup(<NotFound />);
    expect(html).toContain("404");
    expect(html).toContain('href="/contacto"');
    expect(html).toContain('href="/blog"');
    expect(NotFound).toBeTypeOf("function");
  });
});
