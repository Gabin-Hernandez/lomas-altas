import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Lomas Altas — El hogar donde todo crece",
    description:
      "Torre residencial dentro de Terralago. Departamentos amplios con amenidades funcionales en Lomas Verdes.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lomas Altas — Torre residencial dentro de Terralago",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lomas Altas — El hogar donde todo crece",
    description:
      "Torre residencial dentro de Terralago. Departamentos amplios con amenidades funcionales en Lomas Verdes.",
    images: ["/twitter-image.jpg"],
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
