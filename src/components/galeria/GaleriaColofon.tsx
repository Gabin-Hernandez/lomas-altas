import Image from "next/image";
import Link from "next/link";
import SafeReveal from "@/components/ui/SafeReveal";
import { CONTENEDOR } from "@/lib/galeria";

const CONTACTO: ReadonlyArray<{ etiqueta: string; valor: string; href: string }> = [
  { etiqueta: "Teléfono", valor: "56 1070 6351", href: "tel:5610706351" },
  { etiqueta: "Correo", valor: "ventas@siermend.com", href: "mailto:ventas@siermend.com" },
];

/**
 * Closing plate. The slab is painted #1b3a2b — the measured background of footer.jpg —
 * so the texture melts in without a border, and the section blends into the global Footer.
 */
export default function GaleriaColofon() {
  return (
    <section
      aria-labelledby="colofon-h2"
      className="relative overflow-hidden bg-[#1b3a2b] py-20 md:py-28"
    >
      <Image
        src="/images/footer.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-center opacity-90"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#1b3a2b] via-[#1b3a2b]/85 to-[#1b3a2b]/30"
      />
      <Image
        src="/images/isotip3.svg"
        alt=""
        aria-hidden
        width={460}
        height={460}
        unoptimized
        className="pointer-events-none absolute -bottom-20 right-0 w-[300px] opacity-[0.07] md:w-[460px]"
      />

      <div className={`relative z-10 ${CONTENEDOR}`}>
        <div className="grid grid-cols-12 gap-y-10">
          <SafeReveal variant="fade-up" className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-[#c4a96a]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c4a96a]">
                Visitas con cita
              </span>
            </div>

            <h2
              id="colofon-h2"
              className="mt-6 font-sans text-3xl font-light leading-[1.03] tracking-tight text-white md:text-5xl"
            >
              ¿Quieres verlo
              <span className="block font-serif italic text-[#decd98]">en persona?</span>
            </h2>

            <p className="mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-white/75 md:text-base">
              Las imágenes ayudan; el recorrido convence. Agenda una visita con el equipo de
              Siermend: media hora, sin compromiso, y te llevas el plano de la unidad que te
              interese.
            </p>
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={80}
            className="col-span-12 lg:col-span-5 lg:col-start-8 lg:border-l lg:border-white/15 lg:pl-10"
          >
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center gap-3 border border-[#c4a96a] px-8 py-4 font-sans text-[11px] uppercase tracking-[0.22em] text-[#decd98] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c4a96a] hover:text-[#153124] hover:shadow-[0_12px_30px_-12px_rgba(196,169,106,0.65)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b3a2b] motion-reduce:transform-none sm:w-auto"
              >
                Agendar una visita
              </Link>
              <Link
                href="/espacios"
                className="inline-flex w-full items-center justify-center gap-3 border border-white/25 px-8 py-4 font-sans text-[11px] uppercase tracking-[0.22em] text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b3a2b] motion-reduce:transform-none sm:w-auto"
              >
                Ver espacios y distribuciones
              </Link>
            </div>

            <dl className="mt-9 divide-y divide-white/10 border-t border-white/10">
              {CONTACTO.map((dato) => (
                // min-h-11 + items-center: the phone and the mail link are standalone
                // targets, not links inside a sentence, so the 17px line box is not enough.
                <div key={dato.etiqueta} className="flex min-h-11 items-center gap-4">
                  <dt className="w-24 shrink-0 font-sans text-[10px] uppercase tracking-[0.22em] text-white/60">
                    {dato.etiqueta}
                  </dt>
                  <dd>
                    <a
                      href={dato.href}
                      className="inline-flex min-h-11 items-center font-sans text-sm font-light text-white/90 transition-colors hover:text-[#decd98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b3a2b]"
                    >
                      {dato.valor}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="flex min-h-11 items-center gap-4">
                <dt className="w-24 shrink-0 font-sans text-[10px] uppercase tracking-[0.22em] text-white/60">
                  Desarrolla
                </dt>
                <dd className="font-sans text-sm font-light text-white/90">Siermend</dd>
              </div>
            </dl>

            <Image
              src="/images/logoSiermend.svg"
              /* The row right above already reads "Desarrolla — Siermend"; announcing the
                 logo again would just repeat the word. */
              alt=""
              aria-hidden
              width={120}
              height={24}
              unoptimized
              className="mt-6 h-6 w-auto opacity-80"
            />
          </SafeReveal>

          <div className="col-span-12 mt-14 border-t border-white/10 pt-6">
            <p className="font-sans text-[10px] font-light leading-relaxed text-white/60">
              Imágenes: renders del proyecto ejecutivo. Acabados, mobiliario y vegetación son
              ilustrativos y pueden variar en obra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
