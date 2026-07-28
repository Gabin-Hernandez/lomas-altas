import SafeReveal from "@/components/ui/SafeReveal";
import { cn } from "@/lib/utils";
import { CONTENEDOR, getLamina, laminasDe, numeroDePie } from "@/lib/galeria";
import CuadernoHeader from "./CuadernoHeader";
import Epigrafe from "./Epigrafe";
import LaminaFigure from "./LaminaFigure";

const CIFRAS: ReadonlyArray<readonly [string, string]> = [
  ["105 m²", "Por departamento"],
  ["5", "Niveles habitables"],
  ["2", "Cajones por unidad"],
];

/** Notebook 03. The green night ends and the cream comes in: this is where the product sells. */
export default function CuadernoInteriores() {
  const total = laminasDe("03").length;
  const lamina07 = getLamina("07");

  return (
    <section
      id="cuaderno-03"
      aria-labelledby="c03-h2"
      className="relative scroll-mt-[calc(var(--nav-h)+3.5rem)] bg-cream pb-16 md:pb-24"
    >
      <SafeReveal variant="fade-up">
        <CuadernoHeader
          id="03"
          headingId="c03-h2"
          tone="light"
          titulo="Interiores"
          acento="ciento cinco metros cuadrados"
          parrafo="Un solo tramo social —cocina, comedor, estancia y terraza— y un ala privada de recámaras. Madera clara, travertino y cancelería corrediza de piso a techo; la luz entra por dos frentes en todas las tipologías."
          meta={[`${total} láminas`, "Departamento tipo"]}
        />
      </SafeReveal>

      {/* Plate 07 — full-bleed cinemascope strip */}
      <SafeReveal variant="fade-in">
        <LaminaFigure
          id="07"
          tone="light"
          anillo={false}
          caption={false}
          /* 80/29 = 2.759 in every breakpoint. Anything narrower than 2.71:1 brings back
             the grey and green bands baked into the bottom of the file. */
          frameClassName="relative w-full aspect-[80/29]"
          imgClassName="object-cover object-top"
          sizes="100vw"
          pie={
            <figcaption className={cn("mt-4", CONTENEDOR)}>
              <div className="grid grid-cols-12">
                <Epigrafe
                  as="div"
                  className="col-span-12 md:col-span-6 md:col-start-7"
                  numero={numeroDePie(lamina07)}
                  titulo={lamina07.titulo}
                  texto={lamina07.epigrafe}
                  tone="light"
                />
              </div>
            </figcaption>
          }
        />
      </SafeReveal>

      <div className={CONTENEDOR}>
        {/* Plates 08 and 09 — asymmetric grid with a deliberate vertical offset */}
        <div className="mt-14 grid grid-cols-12 items-start gap-3 md:mt-20 md:gap-4">
          <SafeReveal variant="fade-up" className="col-span-12 lg:col-span-5 lg:mt-24">
            <LaminaFigure
              id="08"
              tone="light"
              frameClassName="relative aspect-[5/4]"
              imgClassName="object-cover object-center scale-[1.04]"
              zoomClassName="[@media(hover:hover)]:group-hover:scale-[1.10]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-12 lg:col-span-6 lg:col-start-7"
          >
            <LaminaFigure
              id="09"
              tone="light"
              frameClassName="relative aspect-[3/2]"
              imgClassName="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </SafeReveal>
        </div>

        {/* The one page of silence in the whole notebook */}
        <SafeReveal variant="fade-up" delay={80}>
          <div className="mt-12 grid grid-cols-12 md:mt-16">
            <blockquote className="col-span-12 border-t border-[#153223]/15 pt-6 md:col-span-7 md:col-start-5">
              <p className="max-w-2xl font-serif text-xl font-normal italic leading-snug text-[#4a3e26] md:text-2xl lg:text-[1.75rem]">
                La terraza no es un remate: es la última habitación de la casa.
              </p>
              <footer className="mt-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#7a6636]">
                Criterio de proyecto
              </footer>
            </blockquote>
          </div>
        </SafeReveal>
      </div>

      {/* Plate 10 + figures, over a full-bleed sand band */}
      <div className="relative mt-14 md:mt-24">
        <span aria-hidden className="absolute inset-x-0 bottom-0 z-0 h-[55%] bg-cream-dark" />

        <div className={cn("relative z-10", CONTENEDOR)}>
          <div className="grid grid-cols-12 items-center gap-x-6 gap-y-8 py-12 md:py-16 lg:gap-x-14">
            <SafeReveal
              variant="fade-up"
              className="col-span-12 mx-auto max-w-[380px] lg:col-span-4 lg:mx-0 lg:max-w-none"
            >
              <LaminaFigure
                id="10"
                tone="light"
                frameClassName="relative aspect-[586/840]"
                imgClassName="object-cover object-center"
                /* The column is capped at max-w-[380px] below lg, so 80vw over-fetched
                   by ~2x on tablets for a 586px-wide source file. */
                sizes="(max-width: 1024px) 380px, 30vw"
              />
            </SafeReveal>

            <SafeReveal
              variant="fade-up"
              delay={80}
              className="col-span-12 lg:col-span-7 lg:col-start-6"
            >
              <p className="font-serif text-2xl leading-[1.15] text-[#153223] md:text-4xl lg:text-[2.6rem]">
                Travertino, madera clara y luz natural.
                <span className="block italic text-[#5c4a2c]">Materiales que envejecen bien.</span>
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-2">
                {CIFRAS.map(([cifra, etiqueta], indice) => (
                  <div key={etiqueta} className="relative pr-2 md:pr-4">
                    {/* Three columns of 105 m² at text-4xl overflow a 320px viewport. */}
                    <dt className="font-serif text-xl font-light leading-none text-[#5c4a2c] sm:text-3xl md:text-5xl">
                      {cifra}
                    </dt>
                    <dd className="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-[#5c4a2c] md:text-xs">
                      {etiqueta}
                    </dd>
                    {indice < CIFRAS.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#5c4a2c]/25 md:block"
                      />
                    )}
                  </div>
                ))}
              </dl>
            </SafeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
