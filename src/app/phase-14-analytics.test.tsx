import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TrackView } from "@/components/analytics/TrackView";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import ServiceRoutePage from "./soluciones/[slug]/page";

describe("phase 14 — analytics instrumentation", () => {
  it("exposes the nine minimum events from the roadmap", () => {
    expect(Object.values(ANALYTICS_EVENTS).sort()).toEqual(
      [
        "click_article_cta",
        "click_service_cta",
        "click_whatsapp",
        "read_article",
        "schedule_meeting",
        "start_lead_form",
        "submit_lead_form",
        "view_project",
        "view_service",
      ].sort(),
    );
  });

  it("renders a TrackView as an invisible mount hook", () => {
    const html = renderToStaticMarkup(
      <TrackView event={ANALYTICS_EVENTS.viewService} params={{ service: "sitios-web" }} />,
    );
    expect(html).toBe("");
  });

  it("renders an external TrackedLink as a plain anchor that still navigates", () => {
    const html = renderToStaticMarkup(
      <TrackedLink
        href="https://wa.me/56966073259"
        external
        event={ANALYTICS_EVENTS.clickWhatsapp}
        params={{ source: "footer" }}
      >
        WhatsApp
      </TrackedLink>,
    );
    expect(html).toContain('href="https://wa.me/56966073259"');
    expect(html).toContain("WhatsApp");
  });

  it("instruments the service page hero CTA and view tracking", async () => {
    const page = await ServiceRoutePage({ params: Promise.resolve({ slug: "sitios-web" }) });
    const html = renderToStaticMarkup(page);
    // Hero CTA is now a tracked link to the evaluation section.
    expect(html).toContain('href="#sitios-web-evaluacion"');
    expect(html).toContain("Cotizar mi sitio web");
  });
});
