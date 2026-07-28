import Image from "next/image";
import Link from "next/link";
import SafeReveal from "@/components/ui/SafeReveal";
import { cn } from "@/lib/utils";
import { CONTENEDOR, getLamina, laminasDe } from "@/lib/galeria";
import BotonVisor from "./BotonVisor";
import CuadernoHeader from "./CuadernoHeader";
import LaminaFigure from "./LaminaFigure";

const FICHA_PLANTA: ReadonlyArray<readonly [string, string]> = [
  ["Superficie", "105 m²"],
  ["Estacionamiento", "2 cajones"],
  ["Terraza", "Corrida al frente"],
  ["Recámara principal", "Con vestidor y baño"],
];

/** Swatches measured off the diagram itself, never picked by eye. Counts add up to 18. */
const LEYENDA: ReadonlyArray<{ etiqueta: string; muestra: string; unidades: string }> = [
  { etiqueta: "Modelo A", muestra: "bg-[#c4c3af]", unidades: "8 U" },
  { etiqueta: "Penthouse", muestra: "bg-[#c4a9a9]", unidades: "2 U" },
  { etiqueta: "Modelo B", muestra: "bg-[#cdb890]", unidades: "4 U" },
  { etiqueta: "Modelo C", muestra: "bg-[#acb3be]", unidades: "4 U" },
];

/**
 * Notebook 04. The change of register is announced with a change of paper: sand for the
 * plan, paper white for the section. Both slabs are painted with the measured background
 * of their own file, so the drawings dissolve into the page instead of being framed.
 */
export default function CuadernoPlanos() {
  const total = laminasDe("04").length;
  const lamina11 = getLamina("11");

  return (
    <section
      id="cuaderno-04"
      aria-labelledby="c04-h2"
      className="relative scroll-mt-[calc(var(--nav-h)+3.5rem)]"
    >
      {/* 04.1 — sand slab, the exact background of render.jpg */}
      <div className="bg-[#dbcb98] pb-16 md:pb-24">
        <SafeReveal variant="fade-up">
          <CuadernoHeader
            id="04"
            headingId="c04-h2"
            tone="sand"
            titulo="Planos y estructura"
            acento="cómo está hecho por dentro"
            parrafo="Dos láminas técnicas: la planta tipo del Modelo A y el corte esquemático del edificio, del jardín en el nivel −4 al roof garden."
            meta={[`${total} láminas`, "Documento técnico"]}
          />
        </SafeReveal>

        <div className={CONTENEDOR}>
          <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-10">
            <SafeReveal variant="fade-up" className="col-span-12 lg:col-span-4">
              <h3 className="font-serif text-xl text-[#153223] md:text-2xl">{lamina11.titulo}</h3>

              <dl className="mt-6 divide-y divide-[#4a3e26]/20 border-t border-[#4a3e26]/20">
                {FICHA_PLANTA.map(([dt, dd]) => (
                  <div key={dt} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a3e26]">
                      {dt}
                    </dt>
                    <dd className="font-sans text-sm font-light text-[#153223]">{dd}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/espacios"
                className="mt-8 inline-flex min-h-11 items-center border border-[#4a3e26]/40 px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-[#4a3e26] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#153124] hover:bg-[#153124] hover:text-[#decd98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4a3e26] focus-visible:ring-offset-2 focus-visible:ring-offset-[#dbcb98] motion-reduce:transform-none"
              >
                Ver todas las distribuciones →
              </Link>
            </SafeReveal>

            <SafeReveal
              variant="fade-up"
              delay={80}
              className="col-span-12 lg:col-span-7 lg:col-start-6"
            >
              <div className="flex justify-center">
                {/* No shadow, no border, no box: the file carries its own drop shadow and
                    its background is the slab colour, so it floats on its own. */}
                <LaminaFigure
                  id="11"
                  tone="sand"
                  cintillo={false}
                  anillo={false}
                  frameClassName="relative w-full max-w-[520px] aspect-[907/1143]"
                  imgClassName="object-contain"
                  /* Below lg the drawing fills the container minus its 24px gutters, which
                     is nearer 92vw than 80vw; above 600px it is capped by max-w-[520px]. */
                  sizes="(max-width: 600px) 92vw, 520px"
                  className="w-full max-w-[520px]"
                />
              </div>
            </SafeReveal>
          </div>
        </div>
      </div>

      {/* 04.2 — paper-white slab, the exact background of estructura.jpg */}
      <div className="relative bg-[#fcfcfc] py-16 md:py-24">
        <Image
          src="/images/isotip3.svg"
          alt=""
          aria-hidden
          width={256}
          height={256}
          unoptimized
          className="pointer-events-none absolute right-8 top-24 hidden w-64 opacity-[0.05] lg:block"
        />

        <div className={cn("relative", CONTENEDOR)}>
          <div className="flex items-center gap-6">
            <span aria-hidden className="h-px flex-1 bg-[#153223]/15" />
            <h3 className="whitespace-nowrap font-serif text-xl text-[#153223] md:text-2xl">
              Distribución por plantas
            </h3>
            <span aria-hidden className="h-px flex-1 bg-[#153223]/15" />
          </div>

          <div className="mt-10 grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-12">
            {/* The reprinted legend is the only part of this diagram a screen reader can pass on */}
            <SafeReveal
              variant="fade-up"
              className="order-2 col-span-12 lg:order-1 lg:col-span-4"
            >
              <div className="border-l border-[#153223]/15 pl-5">
                <p className="font-serif text-4xl font-light leading-none text-[#153223] md:text-5xl">
                  18 unidades
                </p>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.22em] text-[#7a6636]">
                  5 niveles
                </p>
              </div>

              <dl className="mt-6 divide-y divide-[#153223]/12 border-t border-[#153223]/12">
                {LEYENDA.map((fila) => (
                  <div key={fila.etiqueta} className="flex items-center gap-3 py-2.5">
                    <span aria-hidden className={cn("h-3.5 w-6 shrink-0", fila.muestra)} />
                    <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c4a2c]">
                      {fila.etiqueta}
                    </dt>
                    <dd className="ml-auto font-sans text-sm font-light tabular-nums text-[#153223]">
                      {fila.unidades}
                    </dd>
                  </div>
                ))}
              </dl>
            </SafeReveal>

            <SafeReveal
              variant="fade-up"
              delay={80}
              className="order-1 col-span-12 lg:order-2 lg:col-span-8"
            >
              {/* 6/5 + object-right shows the right 67.5% of the file: the baked-in legend
                  disappears and the drawing gains a third more width on screen. */}
              <LaminaFigure
                id="12"
                tone="light"
                cintillo={false}
                frameClassName="relative w-full aspect-[6/5]"
                imgClassName="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 64vw"
                ringClassName="focus-visible:ring-[#7a6636] focus-visible:ring-offset-[#fcfcfc]"
              />

              <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-[#5c4a2c] sm:hidden">
                Toca para ampliar y desplazar el diagrama
              </p>

              <BotonVisor
                laminaId="12"
                // hover:text-white on #c4a96a was 2.3:1. Forest ink on the gold fill is 6.2:1
                // and keeps the button legible in its hover state.
                className="mt-6 inline-flex min-h-11 items-center border border-[#a8904f] px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-[#5c4a2c] transition-colors duration-300 hover:bg-[#c4a96a] hover:text-[#153124] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7a6636] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfc]"
              >
                Ver el diagrama completo
              </BotonVisor>
            </SafeReveal>

            <div className="col-span-12 order-3 mt-8 flex flex-col gap-4 border-t border-[#153223]/12 pt-5 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-[11px] font-light text-[#153223]/70">
                Planos y renders de carácter ilustrativo. Medidas, acabados y mobiliario pueden
                variar respecto al proyecto ejecutivo.
              </p>
              {/* Same trick as the sticky bar: the gold rule stays on the words, the
                  tap target is 44px tall. */}
              <Link
                href="/espacios"
                className="inline-flex min-h-11 shrink-0 items-center self-start font-sans text-[11px] uppercase tracking-[0.2em] text-[#153223] transition-colors hover:text-[#7a6636] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7a6636] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfc] md:self-auto"
              >
                <span className="border-b border-[#c4a96a] pb-1">
                  Ver espacios y distribuciones →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
