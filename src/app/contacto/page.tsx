import type { Metadata } from "next";
import AccionesMovil from "@/components/contacto/AccionesMovil";
import CierreContacto from "@/components/contacto/CierreContacto";
import PlanoVisita from "@/components/contacto/PlanoVisita";
import PorticoContacto from "@/components/contacto/PorticoContacto";
import RazonesContacto from "@/components/contacto/RazonesContacto";
import SolicitudForm from "@/components/contacto/SolicitudForm";
import TresPuertas from "@/components/contacto/TresPuertas";

export const metadata: Metadata = {
  title: "Contacto — Lomas Altas | Siermend",
  description:
    "Agenda tu visita a Lomas Altas, torre residencial en Lomas Verdes, Naucalpan. Sala de ventas, teléfono 56 1070 6351, WhatsApp y solicitud de información en línea.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Lomas Altas",
    description:
      "Ven a conocer la torre antes de decidir. Sala de ventas en Lomas Verdes, Naucalpan: teléfono, WhatsApp y solicitud de información.",
    type: "website",
    url: "/contacto",
    images: [
      {
        url: "/images/Amenidades/Terralago Vista aérea.jpg",
        width: 4903,
        height: 3263,
        alt: "Vista aérea del conjunto Terralago con la torre Lomas Altas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto — Lomas Altas",
    description:
      "Agenda tu visita a la sala de ventas de Lomas Altas en Lomas Verdes, Naucalpan.",
    images: ["/images/Amenidades/Terralago Vista aérea.jpg"],
  },
};

export default function ContactoPage() {
  return (
    // No pt-*: the hero absorbs the fixed navbar itself. pb-16 keeps the floating
    // mobile bar from covering the legal block.
    <main className="flex-1 bg-forest-deeper pb-16 md:pb-0">
      <a
        href="#solicitud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-24 focus:z-50 focus:border focus:border-gold focus:bg-forest-deeper focus:px-5 focus:py-3 focus:font-sans focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-cream"
      >
        Saltar al formulario de solicitud
      </a>

      <PorticoContacto />
      <TresPuertas />
      <SolicitudForm />
      <RazonesContacto />
      <PlanoVisita />
      <CierreContacto />
      <AccionesMovil />
    </main>
  );
}
