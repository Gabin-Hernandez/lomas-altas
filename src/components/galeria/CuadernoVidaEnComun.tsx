import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import { CONTENEDOR, getLamina, laminasDe, numeroDePie } from "@/lib/galeria";
import CuadernoHeader from "./CuadernoHeader";
import LaminaFigure from "./LaminaFigure";

/**
 * Notebook 02, printed entirely on forest green. The two files that arrive tinted green
 * from the factory (sec_log, slider2) stop reading as a white-balance error and start
 * reading as editorial criteria; the single colour photo sits on a cream mount, which
 * says without saying it that the green belongs to the paper.
 *
 * overflow-x-clip (not overflow-hidden): the closing triangle hangs below the slab.
 */
export default function CuadernoVidaEnComun() {
  const total = laminasDe("02").length;
  const lamina04 = getLamina("04");
  const lamina06 = getLamina("06");

  return (
    <section
      id="cuaderno-02"
      aria-labelledby="c02-h2"
      className="relative scroll-mt-[calc(var(--nav-h)+3.5rem)] overflow-x-clip bg-[#153124] pb-20 md:pb-28"
    >
      <SafeReveal variant="fade-up">
        <CuadernoHeader
          id="02"
          headingId="c02-h2"
          tone="dark"
          titulo="Vida en común"
          acento="planta baja y entorno"
          parrafo="Dieciocho familias comparten un vestíbulo, un gimnasio y un roof garden. Lo suficiente para que la torre funcione como comunidad, y no tanto como para inflar la cuota de mantenimiento. Presentamos estas tres tomas en el verde de la marca, como un mismo capítulo."
          meta={[`${total} láminas`, "Áreas comunes"]}
        />
      </SafeReveal>

      {/* Plate 04 — full-bleed duotone */}
      <SafeReveal variant="fade-in" className="mt-10 md:mt-16">
        <LaminaFigure
          id="04"
          tone="dark"
          anillo={false}
          pildora={false}
          caption={false}
          frameClassName="h-[48vh] w-full md:h-[64vh]"
          imgClassName="object-cover object-[50%_45%]"
          sizes="100vw"
          ringClassName="focus-visible:ring-[#decd98] focus-visible:ring-offset-[#153124]"
          pie={
            <figcaption className="absolute bottom-6 left-6 z-10 max-w-xs border-l-2 border-[#c4a96a] bg-[#153124]/80 p-5 backdrop-blur-sm md:bottom-10 md:left-10 md:p-6 lg:left-16">
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-white">
                {numeroDePie(lamina04)} · {lamina04.titulo}
              </span>
              <span className="mt-2 block font-serif text-xs italic text-white/70">
                {lamina04.epigrafe}
              </span>
            </figcaption>
          }
        >
          {/* No colour scrim: the file is already green. Only two edge dissolves that
              melt the band into the paper. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#153124] to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#153124] to-transparent"
          />
        </LaminaFigure>
      </SafeReveal>

      {/* Plate 05 — cream mount + typographic plate */}
      <div className={CONTENEDOR}>
        <div className="mt-14 grid grid-cols-12 gap-x-6 md:mt-20 lg:gap-x-8">
          <SafeReveal
            variant="fade-up"
            delay={80}
            className="col-span-12 lg:col-span-7 lg:col-start-2"
          >
            <div className="bg-cream-dark p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] md:p-5">
              <LaminaFigure
                id="05"
                tone="light"
                frameClassName="relative aspect-[5/4]"
                imgClassName="object-cover object-center scale-[1.06] origin-center"
                zoomClassName="[@media(hover:hover)]:group-hover:scale-[1.12]"
                sizes="(max-width: 1024px) 92vw, 58vw"
                ringClassName="focus-visible:ring-[#7a6636] focus-visible:ring-offset-[#f5ede3]"
              />
            </div>
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={160}
            className="col-span-12 mt-10 lg:col-span-3 lg:col-start-10 lg:mt-16"
          >
            <div className="relative h-full overflow-hidden bg-[#0f2419] p-8">
              <Image
                src="/images/footer.jpg"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 24vw"
                className="object-cover opacity-50 mix-blend-luminosity"
              />
              <Image
                src="/images/isotip3.svg"
                alt=""
                aria-hidden
                width={160}
                height={160}
                unoptimized
                className="pointer-events-none absolute -bottom-6 -right-6 w-40 opacity-[0.08]"
              />
              <div className="relative z-10">
                <p className="font-serif text-[3.5rem] font-light leading-none text-[#decd98] md:text-[4.5rem]">
                  18
                </p>
                <p className="mt-2 font-sans text-sm font-light text-white/75">
                  unidades comparten un solo acceso, un vestíbulo y un roof garden. Sin pasillos
                  infinitos.
                </p>
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#c4a96a]">
                  Escala boutique
                </p>
              </div>
            </div>
          </SafeReveal>
        </div>
      </div>

      {/* Plate 06 — rule band */}
      <SafeReveal variant="fade-in" className="mt-14 md:mt-20">
        <LaminaFigure
          id="06"
          tone="dark"
          cintillo={false}
          anillo={false}
          pildora={false}
          caption={false}
          /* The solid background IS the base layer: the PNG has partial alpha on its
             edges and without it the page colour bleeds through. */
          frameClassName="h-[180px] w-full bg-[#153124] md:h-[260px]"
          imgClassName="object-cover object-bottom"
          sizes="100vw"
          zoomClassName=""
          ringClassName="focus-visible:ring-[#decd98] focus-visible:ring-offset-[#153124]"
          pie={
            <figcaption className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:transform-none">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#c4a96a]">
                Lámina {lamina06.id}
              </span>
              <span className="mt-1 font-serif text-lg text-white md:text-xl">
                {lamina06.titulo}
              </span>
              <span className="mt-1.5 hidden font-serif text-[11px] italic text-white/65 sm:block">
                {lamina06.epigrafe}
              </span>
            </figcaption>
          }
        >
          {/* The file carries a transparent V notch at the top centre (x 45–55%, top
              12–15%). Painted in the panel colour it is invisible and it reinstates the
              brand's V motif. */}
          <span
            aria-hidden
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            className="absolute left-1/2 top-0 z-10 h-[22%] w-[12%] max-w-[210px] -translate-x-1/2 bg-[#153124]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-6 border border-transparent transition-colors duration-500 group-hover:border-[#c4a96a]/40"
          />
        </LaminaFigure>
      </SafeReveal>

      {/* Descending triangle biting into the cream slab below */}
      <span
        aria-hidden
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        className="absolute left-1/2 top-full z-20 h-10 w-24 -translate-x-1/2 bg-[#153124] md:h-16 md:w-36"
      />
    </section>
  );
}
