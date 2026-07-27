import Galeria from "@/components/Galeria";
import Fachada from "@/components/Fachada";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería de Fotos — Lomas Altas",
  description: "Explora la galería de imágenes y renders del desarrollo Lomas Altas.",
};

export default function GaleriaPage() {
  return (
    <main className="flex-1 pt-24 md:pt-32 bg-cream">
      <Galeria />
      <Fachada />
    </main>
  );
}
