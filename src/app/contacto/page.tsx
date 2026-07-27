import Contacto from "@/components/Contacto";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — Lomas Altas",
  description: "Agenda una cita y conoce el proyecto Lomas Altas en Lomas Verdes.",
};

export default function ContactoPage() {
  return (
    <main className="flex-1 pt-20 md:pt-28 bg-[#153223]">
      <Contacto />
    </main>
  );
}
