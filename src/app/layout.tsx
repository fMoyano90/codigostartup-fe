import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: "Codigo Startup | Productos digitales que perduran",
  description:
    "Desarrollo, estrategia y diseño para startups y empresas que necesitan ejecutar con claridad. Tu equipo técnico completo, sin contratar de planta.",
  keywords: [
    "Codigo Startup",
    "desarrollo web",
    "desarrollo de software",
    "Nucleo Gestor",
    "consultoria digital",
    "diseno UX UI",
  ],
  authors: [{ name: "Codigo Startup" }],
  icons: {
    icon: "/isotipo.svg",
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  openGraph: {
    title: "Codigo Startup | Productos digitales que perduran",
    description:
      "Desarrollo, estrategia y diseño para startups y empresas que necesitan ejecutar con claridad. Tu equipo técnico completo, sin contratar de planta.",
    url: siteConfig.baseUrl,
    siteName: "Codigo Startup",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codigo Startup | Productos digitales que perduran",
    description:
      "Desarrollo, estrategia y diseño para startups y empresas que necesitan ejecutar con claridad.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PTKLBEZVER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PTKLBEZVER');
          `}
        </Script>
      </head>
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
