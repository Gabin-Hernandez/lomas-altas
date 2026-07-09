import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lomas Altas — El hogar donde todo crece",
  description:
    "Departamentos amplios, amenidades funcionales y una ubicación estratégica en Lomas Verdes. Torre residencial dentro de Terralago.",
  keywords: [
    "Lomas Altas",
    "Terralago",
    "Lomas Verdes",
    "departamentos",
    "penthouses",
    "torre residencial",
  ],
  openGraph: {
    title: "Lomas Altas — El hogar donde todo crece",
    description:
      "Torre residencial dentro de Terralago. Departamentos amplios con amenidades funcionales en Lomas Verdes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
