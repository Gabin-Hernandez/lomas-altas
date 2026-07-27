import Espacios from "@/components/Espacios";
import Estructura from "@/components/Estructura";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espacios y Distribuciones — Lomas Altas",
  description: "Conoce los modelos de departamentos, penthouses y distribuciones por plantas de Lomas Altas.",
};

export default function EspaciosPage() {
  return (
    <main className="flex-1 pt-24 md:pt-32 bg-cream">
      <Espacios />
      <Estructura />
    </main>
  );
}
