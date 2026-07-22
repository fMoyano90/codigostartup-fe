import { siteConfigSchema } from "@/lib/commercial/schema";

export const siteConfig = siteConfigSchema.parse({
  name: "Código Startup",
  baseUrl: "https://codigostartup.com",
  contact: {
    email: "hola@codigostartup.com",
    whatsappNumber: "56966073259",
    whatsappUrl: "https://wa.me/56966073259",
    bookingUrl: "https://reservas.codigostartup.com/r/agendar-reunion",
    bookingEmbedUrl: "https://reservas.codigostartup.com/r/agendar-reunion/embed",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/c%C3%B3digo-startup",
    instagram: "https://www.instagram.com/codigostartup.com_/",
  },
});
