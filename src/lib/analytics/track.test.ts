import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsParams } from "./events";
import { ANALYTICS_EVENTS } from "./events";
import { trackEvent } from "./track";

function setWindow(win: Record<string, unknown> | undefined) {
  (globalThis as unknown as { window?: unknown }).window = win;
}

afterEach(() => {
  setWindow(undefined);
});

describe("trackEvent", () => {
  it("is a no-op on the server (no window)", () => {
    expect(() => trackEvent(ANALYTICS_EVENTS.viewService, { service: "x" })).not.toThrow();
  });

  it("forwards the event to gtag with sanitized params and UTM context", () => {
    const gtag = vi.fn();
    setWindow({ location: { search: "?utm_source=linkedin&utm_medium=social" }, gtag });

    trackEvent(ANALYTICS_EVENTS.submitLeadForm, {
      form_type: "general",
      service: "sitios-web",
      source: "contact-page",
    });

    expect(gtag).toHaveBeenCalledTimes(1);
    const [command, event, payload] = gtag.mock.calls[0];
    expect(command).toBe("event");
    expect(event).toBe("submit_lead_form");
    expect(payload).toMatchObject({
      form_type: "general",
      service: "sitios-web",
      source: "contact-page",
      utm_source: "linkedin",
      utm_medium: "social",
    });
  });

  it("never forwards personal data even if passed by mistake", () => {
    const gtag = vi.fn();
    setWindow({ location: { search: "" }, gtag });

    // Simula un llamado con datos personales colados; `AnalyticsParams` no los
    // permite, pero probamos que el filtro los descarta igualmente en runtime.
    const leaked = { source: "footer", email: "persona@example.com", whatsapp: "+56900000000" };
    trackEvent(ANALYTICS_EVENTS.clickWhatsapp, leaked as AnalyticsParams);

    const payload = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect(payload.source).toBe("footer");
    expect(payload.email).toBeUndefined();
    expect(payload.whatsapp).toBeUndefined();
  });

  it("falls back to dataLayer when gtag is unavailable", () => {
    const dataLayer: Record<string, unknown>[] = [];
    setWindow({ location: { search: "" }, dataLayer });

    trackEvent(ANALYTICS_EVENTS.viewProject, { project: "subtech" });

    expect(dataLayer).toHaveLength(1);
    expect(dataLayer[0]).toMatchObject({ event: "view_project", project: "subtech" });
  });
});
