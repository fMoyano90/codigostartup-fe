import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  buildLeadEmail,
  buildLeadWhatsAppUrl,
  LeadSpamError,
  parseLeadSubmission,
} from "@/lib/leads";

const now = Date.parse("2026-07-22T14:00:00.000Z");

function baseFormData(formType = "general") {
  const formData = new FormData();
  formData.set("submissionId", "cb0a63ec-a511-4f98-817f-9e50fe682ae3");
  formData.set("startedAt", String(now - 2_000));
  formData.set("website", "");
  formData.set("formType", formType);
  formData.set("name", "Felipe Moyano");
  formData.set("company", "Código Startup");
  formData.set("email", "felipe@example.com");
  formData.set("source", "contact-page");
  formData.set("sourcePath", "/contacto?utm_source=linkedin");
  formData.set("cta", "contact-general-form");
  formData.set("service", "");
  formData.set("project", "");
  formData.set("origin", "soluciones");
  formData.set("utmSource", "linkedin");
  formData.set("utmMedium", "social");
  formData.set("utmCampaign", "fase-11");
  formData.set("utmContent", "");
  formData.set("utmTerm", "");
  return formData;
}

function validGeneralFormData() {
  const formData = baseFormData();
  formData.set("whatsapp", "+56 9 6607 3259");
  formData.set("projectType", "software-a-medida");
  formData.set("currentStage", "definicion");
  formData.set("description", "Necesitamos centralizar un proceso operacional que hoy se administra manualmente.");
  formData.set("budget", "Por definir");
  return formData;
}

describe("lead capture model", () => {
  it("validates and normalizes a general lead with source and UTM tracking", () => {
    const lead = parseLeadSubmission(validGeneralFormData(), now);

    expect(lead.receivedAt).toBe("2026-07-22T14:00:00.000Z");
    expect(lead.utmSource).toBe("linkedin");
    expect(lead.details).toContainEqual({
      field: "projectType",
      label: "Tipo de proyecto",
      value: "software-a-medida",
    });
    expect(lead.details).toContainEqual({
      field: "description",
      label: "Descripción",
      value: "Necesitamos centralizar un proceso operacional que hoy se administra manualmente.",
    });
  });

  it("requires the service context to match a contextual form", () => {
    const formData = baseFormData("mvp");
    formData.set("service", "sitios-web");
    formData.set("problem", "Existe un problema claro que necesita una primera versión funcional.");
    formData.set("audience", "Equipos operacionales");
    formData.set("prototype", "no");
    formData.set("validationGoal", "Validar si el flujo principal resuelve la necesidad observada.");

    expect(() => parseLeadSubmission(formData, now)).toThrow(z.ZodError);
  });

  it("discards honeypot submissions and forms completed unrealistically fast", () => {
    const honeypot = validGeneralFormData();
    honeypot.set("website", "https://spam.example");
    expect(() => parseLeadSubmission(honeypot, now)).toThrow(LeadSpamError);

    const tooFast = validGeneralFormData();
    tooFast.set("startedAt", String(now - 100));
    expect(() => parseLeadSubmission(tooFast, now)).toThrow(LeadSpamError);
  });

  it("builds a plain-text email and contextual WhatsApp continuation", () => {
    const lead = parseLeadSubmission(validGeneralFormData(), now);
    const email = buildLeadEmail(lead);
    const whatsappUrl = buildLeadWhatsAppUrl(lead);

    expect(email.subject).toContain("Evaluación general");
    expect(email.text).toContain("TRAZABILIDAD");
    expect(email.text).toContain("UTM source: linkedin");
    expect(email.replyTo).toBe("felipe@example.com");
    expect(whatsappUrl).toMatch(/^https:\/\/wa\.me\/56966073259\?text=/);
    expect(decodeURIComponent(whatsappUrl)).toContain("Tipo de proyecto: software-a-medida");
  });
});
