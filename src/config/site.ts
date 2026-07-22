import { siteConfigSchema } from "@/lib/commercial/schema";

export const siteConfig = siteConfigSchema.parse({
  name: "Código Startup",
  baseUrl: "https://codigostartup.com",
  contact: {
    email: "hola@codigostartup.com",
    whatsappNumber: "56966073259",
    whatsappUrl: "https://wa.me/56966073259",
  },
});
