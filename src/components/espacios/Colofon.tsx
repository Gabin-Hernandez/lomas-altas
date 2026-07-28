import Image from "next/image";
import Link from "next/link";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { CONTACTO } from "./espaciosData";

const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7d6731] focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

/**
 * 06 · The booklet closes the way a book does: colophon, one image, two
 * actions. No form — that lives in /contacto, and duplicating the home's
 * contact block is exactly the mistake this page exists to correct.
 *
 * The extra bottom padding under md leaves room for the fixed mobile bar.
 */
export default function Colofon() {
  return (
    <section
      id="visita"
      className="scroll-mt-[calc(var(--nav-h)+4rem)] border-t border-[#5c4a2c]/20 bg-cream py-20 pb-32 md:py-28 md:pb-28"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <SafeReveal variant="fade-up" className="col-span-4 md:col-span-12 lg:col-span-5">
            <CabeceraFolio
              folio="06"
              titulo="¿Cuál de las cuatro"
              acento="es la tuya?"
              tone="cream"
              bajadaClassName="max-w-[40ch]"
              bajada="Te mostramos la torre, la planta que te interesa y los avances de obra. Agenda el día y la hora que te acomode."
            />

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contacto"
                // A transform on :hover is not a transition, so the global
                // prefers-reduced-motion rule never reaches it. In Tailwind v4
                // -translate-y-0.5 writes the `translate` property, which
                // `transform-none` does not reset — `translate-none` is what
                // actually holds the button still.
                //
                // #7d6731, not #8a7238: this is the page's primary CTA at 10px,
                // and it needed 4.5:1 in BOTH states — #8a7238 gave 4.31:1 as
                // ink on cream and 4.31:1 again as cream on the hover fill.
                // #7d6731 is 5.08:1 either way round.
                className={`rounded-sm border border-[#7d6731] bg-transparent px-9 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d6731] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7d6731] hover:text-cream hover:shadow-[0_0_20px_rgba(196,169,106,0.25)] active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:hover:translate-none ${ANILLO}`}
              >
                Agendar visita
              </Link>
              <Link
                href="/galeria"
                className={`border-b border-[#5c4a2c]/30 px-1 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]/85 transition-colors hover:border-[#153223] hover:text-[#153223] ${ANILLO}`}
              >
                Ver galería
              </Link>
            </div>

            <dl className="mt-12 border-t border-[#5c4a2c]/20">
              <div className="flex flex-wrap justify-between gap-x-6 border-b border-[#5c4a2c]/15 py-3">
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Teléfono
                </dt>
                <dd className="font-sans text-[13px] font-light text-[#153223] md:text-sm">
                  <a
                    href={CONTACTO.telHref}
                    className={`tabular-nums transition-colors hover:text-[#7d6731] ${ANILLO}`}
                  >
                    {CONTACTO.tel}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-6 border-b border-[#5c4a2c]/15 py-3">
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Correo
                </dt>
                <dd className="font-sans text-[13px] font-light text-[#153223] md:text-sm">
                  <a
                    href={`mailto:${CONTACTO.mail}`}
                    className={`transition-colors hover:text-[#7d6731] ${ANILLO}`}
                  >
                    {CONTACTO.mail}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-6 border-b border-[#5c4a2c]/15 py-3">
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Dirección
                </dt>
                <dd className="max-w-[36ch] font-sans text-[13px] font-light text-[#153223] md:text-sm">
                  {CONTACTO.direccion}
                </dd>
              </div>
            </dl>
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 mt-14 md:col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-0"
          >
            <figure>
              {/* Second and last appearance of eyecatcher.jpg, on purpose: same
                  shot, different crop and distance, closing the circle of the
                  booklet. object-[center_58%] centres the tower, not the sky. */}
              <div className="relative aspect-[3/2] overflow-hidden border border-[#5c4a2c]/15">
                <Image
                  src="/images/eyecatcher.jpg"
                  alt="Vista del conjunto Terralago con la torre Lomas Altas al centro, desde el poniente"
                  fill
                  sizes="(min-width:1024px) 48vw, 92vw"
                  quality={80}
                  loading="lazy"
                  className="object-cover object-[center_58%]"
                />
              </div>
              <figcaption className="mt-4 border-t border-[#5c4a2c]/20 pt-2.5">
                <span className="font-serif text-[11px] text-[#7d6731]">Fig. 09</span>{" "}
                <span className="font-sans text-[10px] font-light leading-[1.6] text-[#5c4a2c]/80 md:text-[11px]">
                  — Conjunto Terralago. Lomas Altas al centro, desde el poniente.
                </span>
              </figcaption>
            </figure>
          </SafeReveal>

          <p className="col-span-4 mt-16 max-w-[70ch] border-t border-[#5c4a2c]/20 pt-4 font-sans text-[10px] font-light leading-[1.6] text-[#5c4a2c]/80 md:col-span-12">
            Planos, renders e imágenes de carácter ilustrativo. El proyecto ejecutivo puede
            presentar variaciones en superficies, distribución, acabados y mobiliario. Precios y
            disponibilidad sujetos a cambio sin previo aviso.
          </p>
        </div>
      </div>
    </section>
  );
}
