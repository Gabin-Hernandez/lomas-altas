import Image from "next/image";
import { getLamina, numeroDePie } from "@/lib/galeria";
import Epigrafe from "./Epigrafe";
import LaminaFigure from "./LaminaFigure";

/** Technical sheet printed under the H1. The last three rows fold into a <details> on phones. */
const FICHA: ReadonlyArray<readonly [string, string]> = [
  ["Ubicación", "Lomas Verdes, Naucalpan, Estado de México"],
  ["Conjunto", "Terralago"],
  ["Programa", "16 departamentos y 2 penthouses"],
  ["Niveles", "5 habitables sobre planta baja"],
  ["Superficie", "105 m² por departamento"],
  ["Estacionamiento", "2 cajones por unidad"],
  ["Desarrolla", "Siermend"],
];

function FilaFicha({ dt, dd, className = "" }: { dt: string; dd: string; className?: string }) {
  return (
    <div className={`flex items-baseline gap-4 py-2.5 ${className}`}>
      <dt className="w-28 shrink-0 font-sans text-[10px] uppercase tracking-[0.2em] text-[#c4a96a]">
        {dt}
      </dt>
      <dd className="font-sans text-xs font-light text-white/75">{dd}</dd>
    </div>
  );
}

export default function GaleriaPortada() {
  const lamina = getLamina("01");

  return (
    <section className="relative bg-[#0f2419] pt-[var(--nav-h)]">
      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-stretch lg:min-h-[74vh] lg:grid-cols-12">
        {/* Text plane */}
        {/* overflow-hidden keeps the watermark's negative offset from widening the page */}
        <div className="relative col-span-12 flex flex-col justify-end overflow-hidden bg-[#0f2419] px-6 py-12 md:px-10 lg:col-span-5 lg:py-20 lg:pl-16 lg:pr-14">
          <Image
            src="/images/isotip3.svg"
            alt=""
            aria-hidden
            width={380}
            height={380}
            unoptimized
            className="pointer-events-none absolute bottom-0 -left-16 hidden w-[380px] opacity-[0.05] lg:block"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-[#c4a96a]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c4a96a]">
                Galería · Cuaderno de obra
              </span>
            </div>

            <h1 className="animate-fade-in-up mt-6 font-sans text-[3rem] font-light leading-[0.9] tracking-[-0.02em] text-white sm:text-[4.25rem] lg:text-[5.5rem]">
              El proyecto
              <span className="mt-1 block font-serif font-normal italic text-[#decd98]">
                en doce láminas
              </span>
            </h1>

            <p className="animate-fade-in-up animation-delay-200 mt-7 max-w-sm font-sans text-sm font-light leading-relaxed text-white/75">
              Lomas Altas ocupa cinco niveles sobre el borde arbolado de Terralago, en Lomas
              Verdes. Estas páginas reúnen el material del proyecto en el orden en que se entiende
              un edificio: primero por fuera, después lo que se comparte, luego puertas adentro y
              al final los dibujos que lo explican.
            </p>

            <dl className="mt-10 max-w-sm divide-y divide-white/10 border-t border-white/10">
              {FICHA.slice(0, 4).map(([dt, dd]) => (
                <FilaFicha key={dt} dt={dt} dd={dd} />
              ))}
              {FICHA.slice(4).map(([dt, dd]) => (
                <FilaFicha key={dt} dt={dt} dd={dd} className="hidden lg:flex" />
              ))}
            </dl>

            {/* Seven rows before the first image is too much on a phone. */}
            <details className="mt-3 max-w-sm lg:hidden">
              {/* inline-flex + min-h-11: a bare <summary> is a ~15px tall tap target. */}
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center font-sans text-[10px] uppercase tracking-[0.2em] text-[#c4a96a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2419]">
                Ficha completa
              </summary>
              <dl className="mt-2 divide-y divide-white/10 border-t border-white/10">
                {FICHA.slice(4).map(([dt, dd]) => (
                  <FilaFicha key={dt} dt={dt} dd={dd} />
                ))}
              </dl>
            </details>

            <div className="mt-10 flex items-center gap-3">
              <span aria-hidden className="animate-cue-pulse h-px w-10 bg-[#c4a96a]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/55">
                Sumario
              </span>
            </div>
          </div>
        </div>

        {/* Plate 01 */}
        <div className="relative col-span-12 min-h-[46vh] lg:col-span-7 lg:min-h-full">
          <LaminaFigure
            id="01"
            tone="dark"
            priority
            caption={false}
            anillo={false}
            frameClassName="h-[46vh] min-h-[280px] lg:h-full lg:min-h-[74vh]"
            imgClassName="object-cover object-[50%_45%]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="lg:h-full"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f2419]/75 via-[#0f2419]/10 to-transparent lg:from-[#0f2419]/45"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 border border-[#c4a96a]/30 md:inset-6"
          />
        </div>

        <span
          aria-hidden
          className="absolute inset-y-0 left-[41.6667%] hidden w-px bg-[#c4a96a]/25 lg:block"
        />
      </div>

      {/* Plate 01 caption, printed outside the frame */}
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-8 md:px-10 lg:px-16">
        <Epigrafe
          as="div"
          numero={numeroDePie(lamina)}
          titulo={lamina.titulo}
          texto={lamina.epigrafe}
          tone="dark"
        />
      </div>
    </section>
  );
}
