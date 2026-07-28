import type { Metadata } from "next";
import AcabadosSerie from "@/components/espacios/AcabadosSerie";
import BarraVisita from "@/components/espacios/BarraVisita";
import Colofon from "@/components/espacios/Colofon";
import CorteNiveles from "@/components/espacios/CorteNiveles";
import IndiceEspacios from "@/components/espacios/IndiceEspacios";
import Interludio from "@/components/espacios/Interludio";
import PlantaTipo from "@/components/espacios/PlantaTipo";
import PliegoInterior from "@/components/espacios/PliegoInterior";
import Portada from "@/components/espacios/Portada";
import Tipologias from "@/components/espacios/Tipologias";

export const metadata: Metadata = {
  title: "Espacios y distribuciones — Lomas Altas",
  description:
    "Cuatro tipologías de 105 m² en una torre de 18 unidades y 5 niveles en Lomas Verdes, Naucalpan. Planta tipo interactiva, acabados de serie y el corte del edificio nivel por nivel.",
  alternates: { canonical: "/espacios" },
  openGraph: {
    title: "Espacios y distribuciones — Lomas Altas",
    description:
      "Una misma planta de 105 m² en cuatro posiciones dentro de la torre. Recorre la distribución, los acabados y el corte por niveles.",
    url: "/espacios",
    type: "website",
    images: [
      {
        url: "/images/eyecatcher.jpg",
        width: 2000,
        height: 1322,
        alt: "Vista aérea del conjunto Terralago con la torre Lomas Altas al centro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacios y distribuciones — Lomas Altas",
    description:
      "Cuatro tipologías de 105 m², planta tipo interactiva y el corte del edificio nivel por nivel.",
    images: ["/images/eyecatcher.jpg"],
  },
};

/**
 * /espacios — a builder's booklet: six numbered chapters read over strata of
 * paper (cream, sand, near-white, forest).
 *
 * No pt-24 here: every section owns its offset through var(--nav-h).
 * NEVER put overflow-hidden on this <main> — it would break the sticky index
 * and the sticky columns underneath. Use overflow-x-clip if a bleed needs
 * containing. The pb-20 under md is the cushion for the fixed mobile bar.
 */
export default function EspaciosPage() {
  return (
    <main className="flex-1 bg-cream pb-20 md:pb-0">
      <Portada />
      <IndiceEspacios />
      <Tipologias />
      <PlantaTipo />
      <PliegoInterior />
      <Interludio />
      <AcabadosSerie />
      <CorteNiveles />
      <Colofon />
      <BarraVisita />
    </main>
  );
}
