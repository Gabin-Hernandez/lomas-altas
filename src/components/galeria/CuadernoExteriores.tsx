import SafeReveal from "@/components/ui/SafeReveal";
import { cn } from "@/lib/utils";
import { CONTENEDOR, getLamina, laminasDe, numeroDePie } from "@/lib/galeria";
import CuadernoHeader from "./CuadernoHeader";
import LaminaFigure from "./LaminaFigure";

/**
 * Notebook 01. Deep-green slab plus a black full-bleed plate: the two RGBA cut-outs
 * (edif1, posfooter) get the night as a background, which is their natural habitat.
 */
export default function CuadernoExteriores() {
  const total = laminasDe("01").length;
  const lamina02 = getLamina("02");
  const lamina03 = getLamina("03");

  return (
    <section
      id="cuaderno-01"
      aria-labelledby="c01-h2"
      className="relative scroll-mt-[calc(var(--nav-h)+3.5rem)] bg-[#0f2419] pb-16 md:pb-24"
    >
      <SafeReveal variant="fade-up">
        <CuadernoHeader
          id="01"
          headingId="c01-h2"
          tone="dark"
          titulo="Exteriores"
          acento="el volumen y su contexto"
          parrafo="El edificio se lee desde tres distancias: el conjunto desde el aire, el volumen en la esquina y el alzado completo. Las jardineras corridas no son adorno de fachada: resuelven el antepecho, dan sombra a cada nivel y hacen que el edificio cambie con las estaciones."
          meta={[`${total} láminas`, "Render de proyecto"]}
        />
      </SafeReveal>

      {/* Plate 02 — cut-out volume */}
      <div className={cn("relative", CONTENEDOR)}>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/3 select-none font-serif text-[22vw] leading-none text-white/[0.04] lg:right-16 lg:text-[16vw]"
        >
          02
        </span>

        <SafeReveal variant="fade-up" delay={80}>
          <div className="mt-10 grid grid-cols-12 items-end gap-x-6 md:mt-16 lg:gap-x-8">
            <div className="order-2 col-span-12 pb-4 lg:order-1 lg:col-span-4">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c4a96a]">
                Lámina {lamina02.id}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-white md:text-3xl">{lamina02.titulo}</h3>
              <p className="mt-4 max-w-sm font-sans text-xs font-light leading-relaxed text-white/70 md:text-sm">
                {lamina02.epigrafe}
              </p>
              <span aria-hidden className="mt-6 block h-px w-10 bg-[#c4a96a]/50" />
            </div>

            <div className="relative order-1 col-span-12 flex justify-end lg:order-2 lg:col-span-7 lg:col-start-6">
              <LaminaFigure
                id="02"
                tone="dark"
                caption={false}
                frameClassName="relative w-full max-w-[620px] aspect-[669/703]"
                imgClassName="object-contain object-bottom drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 1024px) 90vw, 620px"
                className="w-full max-w-[620px]"
              >
                {/* The bottom 8% of the PNG is opaque asphalt; without this dissolve the
                    cut-out reads as a botched crop. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f2419] to-transparent"
                />
              </LaminaFigure>
            </div>
          </div>
        </SafeReveal>
      </div>

      {/* Plate 03 — full-bleed black plate */}
      <SafeReveal variant="fade-in" className="mt-14 md:mt-24">
        <LaminaFigure
          id="03"
          tone="dark"
          anillo={false}
          pildora={false}
          caption={false}
          /* Native ratio on md+, so the elevation is never cropped nor distorted; on a
             phone the same frame becomes a 46vh centred crop, because a 216 px tall
             elevation is unreadable. */
          frameClassName="h-[46vh] w-full bg-black md:h-auto md:aspect-[2000/1107]"
          imgClassName="object-cover object-center"
          sizes="100vw"
          zoomClassName=""
          ringClassName="focus-visible:ring-[#decd98] focus-visible:ring-offset-black"
          className="w-full bg-black"
          pie={
            <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 bg-gradient-to-t from-black via-black/70 to-transparent px-6 py-3 md:flex-row md:items-baseline md:justify-between md:gap-4 md:px-10 lg:px-16">
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/85 md:text-[11px]">
                {numeroDePie(lamina03)} · {lamina03.titulo}
              </span>
              <span className="max-w-md font-serif text-[11px] italic text-white/75 md:text-xs">
                {lamina03.epigrafe}
              </span>
            </figcaption>
          }
        >
          <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-px bg-[#c4a96a]/25" />
          <span aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-px bg-[#c4a96a]/20" />
          <span
            aria-hidden
            className="absolute right-8 top-1/2 z-10 hidden rotate-180 font-sans text-[10px] uppercase tracking-[0.25em] text-white/70 [writing-mode:vertical-rl] xl:block"
          >
            Alzado poniente
          </span>
        </LaminaFigure>
      </SafeReveal>
    </section>
  );
}
