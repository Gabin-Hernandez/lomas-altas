import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { ACABADOS } from "./espaciosData";

/**
 * 04 · The paper turns forest green to mark the contractual part of the
 * booklet: the reader registers the change of register before reading a word.
 *
 * The V-notch is the brand's motif, flattened to 6vw instead of 8.72vw — at the
 * original depth it eats the header on wide screens. It is the only notch on
 * the page, and pt-[max(6rem,9vw)] guarantees the title never falls inside it.
 */
export default function AcabadosSerie() {
  return (
    // No overflow-hidden on the section: it would turn it into a scrollport and
    // silently kill the lg:sticky header. The clip-path already clips the
    // watermark that hangs past the edges.
    <section
      id="acabados"
      className="relative scroll-mt-[calc(var(--nav-h)+4rem)] bg-[#153124] pb-24 pt-[max(6rem,9vw)] md:pb-40"
      style={{ clipPath: "polygon(0 0, 44.12% 0, 50% 6vw, 55.88% 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* Inverted to white here: the file's native #decd98 over forest would
          read as a dirty yellow ghost. */}
      <Image
        src="/images/isotip3.svg"
        width={600}
        height={726}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -left-[6%] hidden w-[600px] select-none opacity-[0.05] brightness-0 invert md:block"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 items-start gap-x-5 md:grid-cols-12 md:gap-x-6">
          <div className="col-span-4 md:col-span-12 lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:col-span-4 lg:self-start">
            <CabeceraFolio
              folio="04"
              titulo="Acabados"
              acento="de serie"
              tone="verde"
              bajadaClassName="max-w-[38ch]"
              bajada="Lo que ya viene incluido en tu departamento. Sin paquetes, sin niveles de equipamiento, sin letra chica."
            />
          </div>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 mt-14 md:col-span-12 lg:col-span-7 lg:col-start-6 lg:mt-0"
          >
            <ol className="md:columns-2 md:gap-x-12">
              {ACABADOS.map((a) => (
                // break-inside-avoid is mandatory or items split across columns.
                <li key={a.n} className="break-inside-avoid border-t border-white/15 pb-7 pt-3">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-[13px] font-light tabular-nums text-[#decd98]/85">
                      {a.n}
                    </span>
                    <span className="font-sans text-sm font-normal tracking-[0.01em] text-white md:text-[15px]">
                      {a.nombre}
                    </span>
                  </div>
                  <p className="mt-1.5 pl-8 font-sans text-[12px] font-light leading-[1.7] text-white/70 md:text-[13px]">
                    {a.detalle}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-2 border-t border-white/15 pt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-white/60">
              Los acabados de penthouse se especifican por unidad. Consulta disponibilidad.
            </p>
          </SafeReveal>
        </div>
      </div>
    </section>
  );
}
