import type { Metadata } from "next";
import BarraCuadernos from "@/components/galeria/BarraCuadernos";
import CuadernoExteriores from "@/components/galeria/CuadernoExteriores";
import CuadernoInteriores from "@/components/galeria/CuadernoInteriores";
import CuadernoPlanos from "@/components/galeria/CuadernoPlanos";
import CuadernoVidaEnComun from "@/components/galeria/CuadernoVidaEnComun";
import GaleriaColofon from "@/components/galeria/GaleriaColofon";
import GaleriaPortada from "@/components/galeria/GaleriaPortada";
import GaleriaSumario from "@/components/galeria/GaleriaSumario";
import VisorProvider from "@/components/galeria/VisorProvider";

// metadataBase, icons, twitter and keywords already live in src/app/layout.tsx.
export const metadata: Metadata = {
  title: "Galería — Lomas Altas",
  description:
    "Doce láminas del proyecto: exteriores, áreas comunes, interiores de 105 m² y los planos de una torre de 18 unidades en Lomas Verdes, Naucalpan.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galería — Lomas Altas",
    description:
      "Doce láminas del proyecto: exteriores, áreas comunes, interiores y planos de una torre de 18 unidades dentro de Terralago, Lomas Verdes.",
    type: "article",
    images: [
      {
        url: "/images/eyecatcher.jpg",
        width: 2000,
        height: 1322,
        alt: "Vista aérea del conjunto Lomas Altas dentro de Terralago",
      },
    ],
  },
};

/**
 * /galeria — "Cuaderno de obra".
 *
 * Server Component. Only three islands ship JavaScript: the viewer provider, the plate
 * buttons and the sticky notebook bar. Full-bleed sections are direct children of <main>
 * so no -left-[50vw] / w-screen trick is needed, and the cover absorbs the fixed navbar
 * with pt-[var(--nav-h)] instead of a padding on <main>.
 */
export default function GaleriaPage() {
  return (
    <main className="relative flex-1 bg-cream">
      <VisorProvider>
        {/* First focusable element on the page: a skip link placed after the cover and the
            index would only be reachable once the keyboard user has already tabbed through
            everything it was meant to skip. */}
        <a
          href="#cuaderno-01"
          /* `sr-only` is already position:absolute, so the focus state only has to undo the
             1px clip box. `not-sr-only` is deliberately avoided: it resets position to
             static and would tie with `focus:absolute` on specificity. */
          className="sr-only focus:left-6 focus:top-[calc(var(--nav-h)+0.5rem)] focus:z-50 focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:[clip:auto] focus:border focus:border-[#c4a96a] focus:bg-[#153124] focus:px-5 focus:py-3 focus:font-sans focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-[#decd98] focus:outline-none"
        >
          Ir al contenido de la galería
        </a>

        <GaleriaPortada />
        <GaleriaSumario />

        {/* The sticky bar unpins exactly here, so it never covers the closing CTA. */}
        <div className="relative">
          <BarraCuadernos />
          <CuadernoExteriores />
          <CuadernoVidaEnComun />
          <CuadernoInteriores />
          <CuadernoPlanos />
        </div>

        <GaleriaColofon />
      </VisorProvider>
    </main>
  );
}
