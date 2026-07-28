import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import { CONTACTO } from "@/lib/contacto";

/** Mass against void: a seven-column green wall and a five-column aerial window. */
export default function PorticoContacto() {
  const canales = [
    { etiqueta: "TELÉFONO", valor: CONTACTO.telFmt, href: CONTACTO.telHref, externo: false },
    { etiqueta: "CORREO", valor: CONTACTO.mail, href: CONTACTO.mailHref, externo: false },
    { etiqueta: "WHATSAPP", valor: "Escríbenos ahora", href: CONTACTO.wa, externo: true },
  ];

  return (
    <section id="portico" className="relative overflow-hidden bg-forest-deeper text-white">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12">
        {/* Left: the green wall */}
        <div className="relative flex flex-col justify-center px-6 pt-28 pb-14 sm:px-10 md:pt-36 lg:col-span-7 lg:px-16 lg:py-24">
          <Image
            src="/images/isotip3.svg"
            alt=""
            aria-hidden
            width={440}
            height={440}
            className="pointer-events-none absolute -bottom-24 -left-24 hidden h-[380px] w-[380px] select-none opacity-[0.05] sm:block"
          />

          <div className="relative flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-gold" />
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-gold md:text-[11px]">
              Contacto · Sala de ventas
            </p>
          </div>

          <SafeReveal variant="fade-up" delay={100}>
            <h1 className="relative mt-7">
              <span className="block font-sans text-[2.5rem] font-light leading-[0.94] tracking-[-0.015em] text-white sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem]">
                Ven a conocer la torre
              </span>
              <span className="block font-serif text-[2.5rem] font-normal italic leading-[0.94] text-gold-light sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem]">
                antes de decidir.
              </span>
            </h1>

            <p className="relative mt-6 max-w-[46ch] font-sans text-sm font-light leading-relaxed text-white/75 md:text-base">
              Son dieciocho unidades y cada nivel se vive distinto. Agenda tu visita a la sala de
              ventas o escríbenos: te contestamos el mismo día hábil, sin insistencia y sin
              compromiso.
            </p>
          </SafeReveal>

          <div aria-hidden className="relative my-9 h-px w-full bg-white/12" />

          {/* Never wrapped in a reveal: these three are the conversion payload and
              must exist even if the JS never runs. */}
          <div className="relative grid grid-cols-1 divide-y divide-white/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {canales.map((canal) => (
              <a
                key={canal.etiqueta}
                href={canal.href}
                {...(canal.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group block py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  {canal.etiqueta}
                </span>
                <span className="mt-2 block font-serif text-lg leading-none text-white transition-colors duration-300 group-hover:text-gold-light md:text-xl">
                  {canal.valor}
                  {canal.externo && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                </span>
              </a>
            ))}
          </div>

          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gold/25 lg:block"
          />
        </div>

        {/* Right: the aerial window, bleeding to the screen edge */}
        <div className="relative min-h-[320px] sm:min-h-[420px] lg:col-span-5 lg:min-h-0">
          <SafeReveal variant="fade-in" delay={200} className="absolute inset-0">
            <Image
              src="/images/eyecatcher.jpg"
              alt="Vista aérea del conjunto Terralago con la torre Lomas Altas al atardecer"
              fill
              priority
              quality={78}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[64%_52%]"
            />
            <div aria-hidden className="absolute inset-0 bg-forest-deeper/25" />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-forest-deeper to-transparent lg:block"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-forest-deeper to-transparent lg:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-4 border border-gold-light/35"
            />
            <div
              aria-hidden
              className="absolute left-0 top-0 h-24 w-24 bg-forest-dark"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            >
              <Image
                src="/images/isotip3.svg"
                alt=""
                width={22}
                height={22}
                className="absolute left-3.5 top-3.5 opacity-80"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span aria-hidden className="mb-2 block h-px w-6 bg-gold-light/70" />
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/70">
                Fig. 01 — Conjunto Terralago, Lomas Verdes. Vista aérea del proyecto.
              </p>
            </div>
          </SafeReveal>
        </div>
      </div>
    </section>
  );
}
