import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import ContactPage from "./page";

async function renderContact(searchParams: Record<string, string> = {}) {
  const page = await ContactPage({ searchParams: Promise.resolve(searchParams) });
  return renderToStaticMarkup(page);
}

describe("phase 11 contact capture", () => {
  it("renders the complete general form with tracking and anti-spam fields", async () => {
    const html = await renderContact({
      servicio: "desarrollo-mvp",
      origen: "soluciones",
      utm_source: "linkedin",
    });

    for (const field of ["name", "company", "email", "whatsapp", "projectType", "currentStage", "description", "budget"]) {
      expect(html).toContain(`name="${field}"`);
    }
    expect(html).toContain('name="service" value="desarrollo-mvp"');
    expect(html).toContain('name="origin" value="soluciones"');
    expect(html).toContain('name="website"');
    expect(html).toContain('name="submissionId"');
    expect(html).toContain('name="startedAt"');
    expect(html).not.toContain("RESEND_API_KEY");
  });

  it("embeds the reservation calendar and keeps an external fallback", async () => {
    const html = await renderContact();

    expect(html).toContain(`src="${siteConfig.contact.bookingEmbedUrl}"`);
    expect(html.match(new RegExp(siteConfig.contact.bookingUrl, "g"))?.length).toBeGreaterThanOrEqual(2);
    expect(html).toContain("Calendario para agendar una reunión con Código Startup");
    expect(html).toContain('loading="lazy"');
  });

  it("ignores invalid service and project query context", async () => {
    const html = await renderContact({ servicio: "invalid", proyecto: "invalid" });

    expect(html).toContain('name="service" value=""');
    expect(html).toContain('name="project" value=""');
  });
});
