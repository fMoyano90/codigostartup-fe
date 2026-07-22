"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import {
  buildLeadEmail,
  buildLeadWhatsAppUrl,
  LeadSpamError,
  parseLeadSubmission,
  type LeadActionState,
} from "@/lib/leads";

const successMessage = "Recibimos tu información. Puedes continuar por WhatsApp o reservar una reunión.";

function getRequestPath(referer: string | null) {
  if (!referer) return "";
  try {
    const url = new URL(referer);
    const expectedHost = new URL(siteConfig.baseUrl).host;
    if (url.host !== expectedHost && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") return "";
    return `${url.pathname}${url.search}`.slice(0, 300);
  } catch {
    return "";
  }
}

export async function submitLead(
  _previousState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  try {
    const parsedLead = parseLeadSubmission(formData);
    const requestHeaders = await headers();
    const lead = {
      ...parsedLead,
      sourcePath: getRequestPath(requestHeaders.get("referer")) || parsedLead.sourcePath,
    };
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("No se configuró RESEND_API_KEY para recibir leads");
      return { status: "error", message: "No pudimos enviar tu solicitud. Inténtalo nuevamente o contáctanos por WhatsApp." };
    }

    const resend = new Resend(apiKey);
    const email = buildLeadEmail(lead);
    const { error } = await resend.emails.send({
      from: process.env.LEADS_FROM_EMAIL ?? "Código Startup <leads@codigostartup.com>",
      to: [process.env.LEADS_TO_EMAIL ?? siteConfig.contact.email],
      subject: email.subject,
      text: email.text,
      replyTo: email.replyTo,
    }, {
      idempotencyKey: `lead/${lead.submissionId}`,
    });

    if (error) {
      console.error("Resend rechazó un lead", error);
      return { status: "error", message: "No pudimos enviar tu solicitud. Inténtalo nuevamente o contáctanos por WhatsApp." };
    }

    return {
      status: "success",
      message: successMessage,
      whatsappUrl: buildLeadWhatsAppUrl(lead),
    };
  } catch (error) {
    if (error instanceof LeadSpamError) {
      return { status: "success", message: successMessage };
    }
    if (error instanceof z.ZodError) {
      return { status: "error", message: "Revisa los campos obligatorios e inténtalo nuevamente." };
    }

    console.error("Error inesperado al recibir un lead", error);
    return { status: "error", message: "No pudimos enviar tu solicitud. Inténtalo nuevamente o contáctanos por WhatsApp." };
  }
}
