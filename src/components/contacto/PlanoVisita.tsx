import SafeReveal from "@/components/ui/SafeReveal";
import MapaSalaDeVentas from "@/components/contacto/MapaSalaDeVentas";
import { CONTACTO } from "@/lib/contacto";

/** Here the map is a hard window inside a colour plane, the opposite of the home's dissolve. */
export default function PlanoVisita() {
  return (
    <section
      id="como-llegar"
      className="relative grid w-full scroll-mt-28 grid-cols-1 bg-forest-deeper md:scroll-mt-32 lg:grid-cols-12"
    >
      {/* bg-cream-dark is the fallback: if basemaps.cartocdn.com fails the layout
          keeps its height and the address block below stays fully functional. */}
      <div className="relative h-full min-h-[380px] bg-cream-dark md:min-h-[520px] lg:col-span-7 lg:min-h-[640px]">
        {/* Deliberately not aria-hidden: MapLibre leaves a tabbable canvas and the
            attribution links inside, and hiding focusable nodes from the a11y tree is
            the classic aria-hidden-focus violation. The written address and the Google
            Maps link alongside remain the textual equivalent of this illustration. */}
        <div className="absolute inset-0">
          <MapaSalaDeVentas />
        </div>
      </div>

      <div className="relative bg-[#decd99] px-8 py-14 text-[#4a3e26] sm:px-12 lg:col-span-5 lg:px-14 lg:py-20">
        <div
          aria-hidden
          className="absolute left-0 top-0 h-20 w-20 bg-forest-deeper"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />

        <SafeReveal variant="fade-up" delay={100}>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4a3e26]/85">
            Cómo llegar
          </p>

          <h2 className="mt-5">
            <span className="block font-sans text-3xl font-light leading-[1.05] text-[#4a3e26] lg:text-[2.75rem]">
              Te esperamos
            </span>
            <span className="block font-serif text-3xl italic text-[#4a3e26] lg:text-[2.75rem]">
              en Lomas Verdes.
            </span>
          </h2>

          <address className="mt-7 not-italic">
            <p className="font-sans text-sm font-light leading-relaxed text-[#4a3e26] md:text-[15px]">
              {CONTACTO.dir1}
              <br />
              {CONTACTO.dir2}.
            </p>
          </address>

          <div aria-hidden className="my-8 h-px w-full bg-[#4a3e26]/20" />

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4a3e26]/85">
            Sala de ventas
          </p>

          <dl className="mt-4 grid grid-cols-[1fr_auto] items-baseline gap-x-6">
            {CONTACTO.horarios.map((franja) => (
              <div key={franja.d} className="contents">
                <dt className="mb-3 border-b border-[#4a3e26]/12 pb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a3e26]/85">
                  {franja.d}
                </dt>
                <dd className="mb-3 border-b border-[#4a3e26]/12 pb-3 text-right font-serif text-sm text-[#4a3e26] md:text-base">
                  {franja.h}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-sans text-xs font-light leading-relaxed text-[#4a3e26]/85">
            Pregunta por el acceso de visitantes cuando agendes: la sala de ventas está dentro del
            desarrollo. El recorrido toma unos 40 minutos.
          </p>

          <a
            href={CONTACTO.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-sm border border-[#4a3e26]/40 px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-[#4a3e26] hover:text-[#decd99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a3e26]"
          >
            Abrir en Google Maps
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </SafeReveal>
      </div>
    </section>
  );
}
