"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { FIGURAS } from "./espaciosData";

const RETICULA = "relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16";
const GRID = "grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6";
/**
 * Every plate button is `absolute inset-0` inside a `relative … overflow-hidden`
 * crop box, and an overflow container clips whatever a descendant paints outside
 * its border box. A `ring` + `ring-offset-2` lands 3px outside, so it was being
 * clipped away entirely: the five plates had NO visible focus indicator. This
 * indicator is drawn inside the box, so the crop cannot eat it. Two tones
 * because the backdrop is an unknown photograph: cream reads on the dark parts,
 * forest on the light ones, and one of the two always survives.
 */
const ANILLO_PLACA =
  "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_3px_#fcf6f0,inset_0_0_0_6px_#153124]";
const EPIGRAFE = "border-t border-[#5c4a2c]/20 pt-2.5";

function Epigrafe({ n, children }: { n: string; children: string }) {
  return (
    <>
      {/* #7d6731, not #8a7238: at 11px this is normal text needing 4.5:1, and
          #8a7238 only reaches 4.31:1 on cream. */}
      <span className="font-serif text-[11px] text-[#7d6731]">Fig. {n}</span>{" "}
      <span className="font-sans text-[10px] font-light leading-[1.6] tracking-[0.01em] text-[#5c4a2c]/80 md:text-[11px]">
        — {children}
      </span>
    </>
  );
}

/**
 * 03 · The photographic signature, read as book plates: image to the bleed,
 * caption at the foot aligned to the grid, one page deliberately off-rhythm.
 *
 * EVERY CROP HERE IS MEASURED, NOT CHOSEN BY EYE. Changing an aspect ratio
 * "because it looks better" brings back a compression artefact at full bleed.
 * The reasoning is written next to each figure.
 *
 * Client only so the plates can open the shared lightbox.
 */
export default function PliegoInterior() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const figuras = [...FIGURAS];

  return (
    <section
      id="interior"
      className="scroll-mt-[calc(var(--nav-h)+4rem)] overflow-x-clip bg-cream pb-0 pt-20 md:pt-32"
    >
      <div className={RETICULA}>
        <div className={GRID}>
          <SafeReveal variant="fade-up" className="col-span-4 md:col-span-12">
            <CabeceraFolio
              folio="03"
              titulo="El interior"
              acento="luz, madera y piedra"
              tone="cream"
              bajada="Los mismos criterios de acabado en las 18 unidades: madera clara en áreas secas, piedra en zonas húmedas y cancelería que llega al techo."
            />
          </SafeReveal>
        </div>
      </div>

      {/* PLATE A — full bleed. */}
      <SafeReveal variant="fade-up" delay={120}>
        <figure className="relative left-1/2 mt-14 w-screen -translate-x-1/2 md:mt-20">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <button
              type="button"
              onClick={() => setLightbox(0)}
              aria-label="Ampliar: estancia y comedor"
              className={`absolute inset-0 ${ANILLO_PLACA}`}
            >
              <Image
                src="/images/3.png"
                alt={figuras[0].alt}
                fill
                sizes="100vw"
                loading="lazy"
                className="object-cover object-center"
              />
            </button>
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 w-[340px] md:w-[420px] h-[65px] md:h-[75px] bg-[#153124] pl-5 pt-3.5 md:pl-7"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            >
              <span className="font-serif text-sm tracking-[0.02em] text-white md:text-base whitespace-nowrap">
                Estancia y comedor
              </span>
            </div>
          </div>

          <figcaption className="mx-auto grid w-full max-w-[1440px] grid-cols-4 gap-x-5 px-6 md:grid-cols-12 md:gap-x-6 md:px-10 lg:px-16">
            <span className={`col-start-1 col-span-4 mt-4 block md:col-start-8 md:col-span-5 ${EPIGRAFE}`}>
              <Epigrafe n="03">
                Estancia y comedor abiertos a la terraza, sin muros intermedios. El muro de tabique
                acompaña toda la fachada y filtra la vista de la ciudad.
              </Epigrafe>
            </span>
          </figcaption>
        </figure>
      </SafeReveal>

      <div className={RETICULA}>
        {/* PLATE B — asymmetric pair. */}
        <div className={`${GRID} mt-20 md:mt-32`}>
          <SafeReveal variant="fade-up" className="col-span-4 md:col-span-5">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLightbox(1)}
                  aria-label="Ampliar: cocina integral"
                  className={`absolute inset-0 ${ANILLO_PLACA}`}
                >
                  <Image
                    src="/images/10.png"
                    alt={figuras[1].alt}
                    fill
                    sizes="(min-width:768px) 40vw, 92vw"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </button>
              </div>
              <figcaption className={`mt-4 ${EPIGRAFE}`}>
                <Epigrafe n="04">
                  Cocina integral con frentes de madera clara, electrodomésticos empotrados y
                  cubierta de granito.
                </Epigrafe>
              </figcaption>
            </figure>
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 mt-14 md:col-span-4 md:col-start-8 md:mt-0 lg:mt-24"
          >
            <figure>
              <div className="relative aspect-[1398/2036] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLightbox(2)}
                  aria-label="Ampliar: baño principal"
                  className={`absolute inset-0 ${ANILLO_PLACA}`}
                >
                  <Image
                    src="/images/9.png"
                    alt={figuras[2].alt}
                    fill
                    sizes="(min-width:768px) 32vw, 92vw"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </button>
              </div>
              <figcaption className={`mt-4 ${EPIGRAFE}`}>
                <Epigrafe n="05">
                  Baño principal: doble lavabo sobre mueble de madera, travertino en muros y
                  regadera a ras de piso.
                </Epigrafe>
              </figcaption>
            </figure>
          </SafeReveal>
        </div>

        {/* PLATE C — figure + photograph. */}
        <div className={`${GRID} mt-20 md:mt-32`}>
          <SafeReveal variant="fade-up" className="col-span-4 md:col-span-3">
            <p className="font-serif text-[3.5rem] font-light leading-[0.85] text-[#153223] md:text-[4.5rem]">
              105 m²
            </p>
            <p className="mt-4 max-w-[24ch] font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c4a2c]/80">
              Superficie habitable por departamento, sin contar terraza
            </p>
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 mt-10 md:col-span-8 md:col-start-5 md:mt-0"
          >
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLightbox(3)}
                  aria-label="Ampliar: sala"
                  className={`absolute inset-0 ${ANILLO_PLACA}`}
                >
                  <Image
                    src="/images/7.png"
                    alt={figuras[3].alt}
                    fill
                    sizes="(min-width:768px) 62vw, 92vw"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </button>
              </div>
              <figcaption className={`mt-4 ${EPIGRAFE}`}>
                <Epigrafe n="06">
                  Sala con cancelería corrediza de piso a techo hacia la terraza ajardinada.
                </Epigrafe>
              </figcaption>
            </figure>
          </SafeReveal>
        </div>

        {/* PLATE D — amenity, labelled as such. */}
        <div className={`${GRID} mt-16`}>
          <SafeReveal
            variant="fade-up"
            className="col-span-4 pb-20 md:col-span-6 md:col-start-7 md:pb-0"
          >
            <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d6731]">
              Amenidad
            </p>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLightbox(4)}
                  aria-label="Ampliar: gimnasio"
                  className={`absolute inset-0 ${ANILLO_PLACA}`}
                >
                  <Image
                    src="/images/Amenidades/Terralago Gym.jpg"
                    alt={figuras[4].alt}
                    fill
                    sizes="(min-width:768px) 48vw, 92vw"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </button>
              </div>
              <figcaption className={`mt-4 ${EPIGRAFE}`}>
                <Epigrafe n="07">Gimnasio del edificio, en planta baja, con ventanales al jardín.</Epigrafe>
              </figcaption>
            </figure>
          </SafeReveal>
        </div>
      </div>

      <Lightbox
        items={figuras}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </section>
  );
}
