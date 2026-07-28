import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import { FICHA } from "./espaciosData";

const MICRO =
  "font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]/80";

/**
 * Cover of the booklet: kickers, the two-line title, the technical sheet, the
 * first of three dimension-line motifs, and the full-bleed establishing shot.
 *
 * Server Component — the cover has no interaction of its own.
 */
export default function Portada() {
  return (
    <section className="relative overflow-x-clip bg-cream pt-[calc(var(--nav-h)+2.5rem)] pb-0 md:pt-[calc(var(--nav-h)+4.5rem)]">
      {/* Watermark. The file ships filled in #decd98, which is already the tone
          wanted over cream — do not recolour it. */}
      <Image
        src="/images/isotip3.svg"
        width={560}
        height={678}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-16 hidden h-auto w-[420px] select-none opacity-[0.06] md:block lg:w-[560px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <div className="col-span-4 mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-12 md:mb-16">
            <span className={MICRO}>Lomas Altas · Terralago</span>
            <span aria-hidden className="h-px w-10 bg-[#a8904f]/60 md:w-16" />
            <span className={MICRO}>Espacios y distribuciones</span>
            <span className={`${MICRO} ml-auto hidden sm:block`}>Lomas Verdes, Naucalpan</span>
          </div>

          <SafeReveal variant="fade-up" className="col-span-4 md:col-span-12 lg:col-span-7">
            <h1 className="max-w-[16ch] font-sans text-[2.5rem] font-light leading-[0.98] tracking-[-0.02em] text-[#153223] sm:text-[3.25rem] lg:text-[4.5rem]">
              <span className="block">Cuatro maneras</span>
              {/* #8a7238 and not #a8904f: at this size #a8904f would pass as large
                  text, but keeping one readable gold avoids an exception that
                  someone later copies onto a 10px label. */}
              <span className="block font-serif font-normal italic text-[#8a7238]">
                de habitar 105 m²
              </span>
            </h1>
            <p className="mt-7 max-w-[46ch] font-sans text-[15px] font-light leading-[1.65] text-[#5c4a2c]/85 md:text-[17px]">
              Dieciocho unidades en cinco niveles. Una misma planta de 105 m² colocada en cuatro
              posiciones distintas dentro de la torre: lo que cambia no es la superficie, sino la
              orientación, el exterior y la vista. Aquí está la planta, los acabados y el nivel en
              el que vive cada tipología.
            </p>
          </SafeReveal>

          <div className="col-span-4 mt-12 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:mt-2">
            <dl>
              {FICHA.map((fila, i) => (
                <div
                  key={fila.dt}
                  className={`flex items-baseline justify-between gap-6 border-b border-[#5c4a2c]/15 py-3 md:py-2.5 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <dt className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                    {fila.dt}
                  </dt>
                  <dd className="text-right font-sans text-[13px] font-light text-[#153223] md:text-sm">
                    {fila.dd}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Dimension line, 1 of 3 in the whole page. */}
          <div className="col-span-4 mt-14 flex items-center gap-4 md:col-span-12 md:mt-20">
            <span aria-hidden className="h-2.5 w-px bg-[#a8904f]/60" />
            <span aria-hidden className="h-px flex-1 bg-[#a8904f]/60" />
            {/* No shrink-0: at 320px the tracked label is wider than the column
                and would push the page into horizontal scroll. Let it wrap.
                #7d6731 and not #8a7238: at 10px this is normal text and needs
                4.5:1 — #8a7238 gives 4.31:1 on cream, #7d6731 gives 5.08:1. */}
            <span className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d6731]">
              105 m² · 2 cajones · 18 unidades · 5 niveles
            </span>
            <span aria-hidden className="h-px flex-1 bg-[#a8904f]/60" />
            <span aria-hidden className="h-2.5 w-px bg-[#a8904f]/60" />
          </div>
        </div>
      </div>

      <SafeReveal variant="fade-up" delay={120}>
        <figure className="relative left-1/2 mt-10 w-screen -translate-x-1/2 md:mt-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[21/8]">
            {/* object-[52%_42%] is measured: the tower with the hanging planters
                sits at x 33–70% / y 15–67% of the file, so this keeps it centred
                even in the 21/8 crop. Only priority image of the page. */}
            <Image
              src="/images/eyecatcher.jpg"
              alt="Vista aérea del conjunto Terralago al atardecer, con la torre Lomas Altas al centro"
              fill
              sizes="100vw"
              quality={80}
              priority
              className="object-cover object-[52%_42%]"
            />
            <div
              aria-hidden
              className="absolute left-0 top-0 z-10 h-[56px] w-[300px] bg-[#153124] pl-5 pt-3.5 md:h-[70px] md:w-[380px] md:pl-7"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            >
              <span className="font-serif text-sm tracking-[0.02em] text-white md:text-base">
                El conjunto
              </span>
            </div>
          </div>

          {/* The caption returns to the master grid. It stays a DIRECT child of
              <figure> — a figcaption nested inside wrappers is not associated
              with its figure. */}
          <figcaption className="mx-auto grid w-full max-w-[1440px] grid-cols-4 gap-x-5 px-6 md:grid-cols-12 md:gap-x-6 md:px-10 lg:px-16">
            <span className="col-start-1 col-span-4 mt-4 block border-t border-[#5c4a2c]/20 pt-2.5 md:col-start-8 md:col-span-5">
              <span className="font-serif text-[11px] text-[#7d6731]">Fig. 01</span>{" "}
              <span className="font-sans text-[10px] font-light leading-[1.6] text-[#5c4a2c]/80 md:text-[11px]">
                — Conjunto Terralago. La torre Lomas Altas al centro, vista desde el poniente.
                Imagen ilustrativa.
              </span>
            </span>
          </figcaption>
        </figure>
      </SafeReveal>
    </section>
  );
}
