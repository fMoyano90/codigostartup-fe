import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
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
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
