import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const RAZONES = [
  {
    cifra: "18",
    unidad: "unidades en total",
    titulo: "Baja densidad real",
    texto:
      "Cinco niveles, dos penthouses y ningún pasillo interminable. Aquí vas a conocer a tus vecinos.",
  },
  {
    cifra: "105 m²",
    unidad: "por departamento",
    titulo: "Plantas sin metros muertos",
    texto:
      "Distribuciones amplias, terraza propia y luz natural en todas las áreas sociales.",
  },
  {
    cifra: "2",
    unidad: "cajones por unidad",
    titulo: "Estacionamiento resuelto",
    texto:
      "Tres sótanos techados, acceso controlado y roof garden para todos los residentes.",
  },
  {
    cifra: "5",
    unidad: "minutos a todo",
    titulo: "Lomas Verdes consolidado",
    texto:
      "Colegio Alemán, Carol Baur, Plaza Satélite y el acceso a Chamapa–Lechería a la mano.",
  },
];

/** The page's only symmetric gesture, so it rhymes with the home without copying it. */
export default function RazonesContacto() {
  return (
    <section
      aria-labelledby="razones-titulo"
      className="relative grid w-full grid-cols-1 bg-forest lg:grid-cols-12"
    >
      <div className="relative min-h-[360px] lg:col-span-5 lg:min-h-[640px]">
        <SafeReveal variant="fade-in" delay={100} className="absolute inset-0">
          <Image
            src="/images/lomas5.jpeg"
            alt="Baño principal con doble lavabo, mármol travertino y ducha a ras de piso"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 bg-forest/20" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-5 border border-gold-light/25"
          />
          <div className="absolute bottom-6 left-6 right-6">
            <span aria-hidden className="mb-2 block h-px w-6 bg-gold-light/70" />
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/70">
              Fig. 02 — Baño principal, mármol travertino y ducha a ras de piso.
            </p>
          </div>
        </SafeReveal>
      </div>

      <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:col-span-7 lg:px-16 lg:py-24">
        <SectionHeading tone="gold" as="h2" id="razones-titulo">
          Cuatro razones para venir a verlo
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-y-10 divide-y divide-white/10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:divide-y-0">
          {RAZONES.map((razon, i) => (
            <SafeReveal key={razon.titulo} variant="fade-up" delay={i * 100} duration={700}>
              {/* The reveal wrapper makes each cell an only child, so `first:` would
                  match every one of them - the top gap is driven by the index. */}
              <div className={`relative sm:pt-0 ${i === 0 ? "pt-0" : "pt-8"}`}>
                <p className="font-serif text-[3.25rem] font-light leading-none text-gold-light lg:text-[4.2rem]">
                  {razon.cifra}
                </p>
                <p className="mt-1 font-sans text-[13px] font-light tracking-wide text-white/70">
                  {razon.unidad}
                </p>
                <span aria-hidden className="my-4 block h-px w-8 bg-gold" />
                <h3 className="font-sans text-sm font-medium tracking-wide text-white lg:text-base">
                  {razon.titulo}
                </h3>
                <p className="mt-2 max-w-[38ch] font-sans text-xs font-light leading-relaxed text-white/70 lg:text-sm">
                  {razon.texto}
                </p>

                {/* Hairline between the two columns, drawn only by the left-hand cells. */}
                {i % 2 === 0 && (
                  <span
                    aria-hidden
                    className="absolute -right-5 bottom-2 top-2 hidden w-px bg-white/10 sm:block"
                  />
                )}
              </div>
            </SafeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
