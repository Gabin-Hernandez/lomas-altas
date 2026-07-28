import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import { cn } from "@/lib/utils";
import { CONTENEDOR, CUADERNOS, laminasDe } from "@/lib/galeria";

/**
 * Editorial index instead of a filter menu: the serious buyer jumps straight to
 * "Planos y estructura", and everyone else sees at a glance how much material there is.
 */
export default function GaleriaSumario() {
  return (
    <section id="sumario" aria-labelledby="sumario-h2" className="bg-cream py-16 md:py-24">
      <div className={CONTENEDOR}>
        <div className="mb-10 flex items-center gap-6">
          <span aria-hidden className="h-px flex-1 bg-[#153223]/15" />
          <h2
            id="sumario-h2"
            className="whitespace-nowrap font-serif text-2xl text-[#153223] md:text-3xl"
          >
            Sumario
          </h2>
          <span aria-hidden className="h-px flex-1 bg-[#153223]/15" />
        </div>

        <SafeReveal variant="fade-up">
          <div>
            {CUADERNOS.map((cuaderno) => {
              const laminas = laminasDe(cuaderno.id);
              return (
                <a
                  key={cuaderno.id}
                  href={`#cuaderno-${cuaderno.id}`}
                  className="group grid grid-cols-12 items-center gap-x-4 gap-y-3 border-t border-[#153223]/15 py-6 transition-colors duration-500 last:border-b hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7a6636] focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:py-8"
                >
                  {/* /25 read 1.6:1 on cream. /55 is the lightest tint that still clears the
                      3:1 required of large text, and the numeral is 30px minimum. */}
                  <span className="col-span-2 font-serif text-3xl leading-none text-[#153223]/55 transition-colors duration-500 group-hover:text-[#94793e] md:col-span-1 md:text-5xl">
                    {cuaderno.id}
                  </span>

                  <span className="col-span-10 block md:col-span-5">
                    <span className="block font-serif text-xl text-[#153223] md:text-2xl">
                      {cuaderno.titulo}
                    </span>
                    <span className="mt-1 block font-sans text-[11px] font-light text-[#5c4a2c] md:text-xs">
                      {cuaderno.descriptor}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="col-span-12 flex gap-2 overflow-hidden opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:col-span-4"
                  >
                    {laminas.map((lamina) => (
                      <span
                        key={lamina.id}
                        className={cn(
                          // Four 64px thumbs would not fit a 320px viewport: they shrink first.
                          "relative h-10 w-14 shrink-0 overflow-hidden sm:h-12 sm:w-16 md:h-14 md:w-20",
                          lamina.miniatura.fondo
                        )}
                      >
                        <Image
                          src={lamina.src}
                          alt=""
                          aria-hidden
                          fill
                          sizes="80px"
                          className={lamina.miniatura.imgClass}
                        />
                      </span>
                    ))}
                  </span>

                  <span className="col-span-12 text-right font-sans text-[10px] uppercase tabular-nums tracking-[0.2em] text-[#7a6636] md:col-span-2">
                    {laminas.length} láminas
                  </span>
                </a>
              );
            })}
          </div>
        </SafeReveal>

        <div className="mt-10 flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-[#153223]/15" />
          <p className="font-sans text-[10px] font-light italic text-[#5c4a2c]">
            Doce láminas. Renders del proyecto ejecutivo; acabados, mobiliario y vegetación son
            ilustrativos.
          </p>
        </div>
      </div>
    </section>
  );
}
