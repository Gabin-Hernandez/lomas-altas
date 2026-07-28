import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import SafeReveal from "@/components/ui/SafeReveal";
import { CONTACTO } from "@/lib/contacto";

const PUERTAS = [
  {
    numeral: "01",
    kicker: "LLAMAR",
    valor: CONTACTO.telFmt,
    nota: "Lunes a viernes de 10:00 a 19:00, directo con el equipo de ventas.",
    href: CONTACTO.telHref,
    externo: false,
    Icono: Phone,
    plano: "bg-[#decd99] text-[#4a3e26] hover:bg-[#d4c491] active:bg-[#d4c491]",
    numeralColor: "",
    foco: "focus-visible:outline-gold-dark",
    retraso: 0,
  },
  {
    numeral: "02",
    kicker: "ESCRIBIR",
    valor: CONTACTO.mail,
    nota: "Para pedir plantas, niveles disponibles y lista de precios.",
    href: CONTACTO.mailHref,
    externo: false,
    Icono: Mail,
    plano: "bg-cream text-[#5c4a2c] hover:bg-cream-dark active:bg-cream-dark",
    numeralColor: "",
    foco: "focus-visible:outline-gold-dark",
    retraso: 80,
  },
  {
    numeral: "03",
    kicker: "WHATSAPP",
    valor: "Abrir conversación",
    nota: "Normalmente respondemos el mismo día hábil.",
    href: CONTACTO.wa,
    externo: true,
    Icono: MessageCircle,
    plano: "bg-forest text-white hover:bg-forest-dark active:bg-forest-dark",
    numeralColor: "text-gold-light",
    foco: "focus-visible:outline-gold-light",
    retraso: 160,
  },
];

/** Three colour planes that touch, each one entirely clickable. */
export default function TresPuertas() {
  return (
    <section aria-labelledby="puertas-titulo" className="relative grid grid-cols-1 md:grid-cols-3">
      <h2 id="puertas-titulo" className="sr-only">
        Formas de contactarnos
      </h2>

      {/* The brand arrow biting down from the hero, deliberately off the centre axis.
          pointer-events-none is mandatory: it sits over the first block's tap area. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[18%] top-0 z-20 h-8 w-16 bg-forest-deeper md:left-[22%] md:h-12 md:w-24"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      />

      {PUERTAS.map(({ Icono, ...puerta }, i) => (
        <SafeReveal
          key={puerta.numeral}
          variant="fade-up"
          delay={puerta.retraso}
          className="flex"
        >
          <a
            href={puerta.href}
            {...(puerta.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            // The reveal wrapper makes every block an only child, so `last:` would
            // match all three - the seam borders are driven by the index instead.
            className={`group relative flex w-full min-h-[150px] flex-col justify-between overflow-hidden px-8 py-10 transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] md:min-h-[210px] lg:px-10 lg:py-12 ${
              i < PUERTAS.length - 1
                ? "border-b border-forest/12 md:border-b-0 md:border-r"
                : ""
            } ${puerta.plano} ${puerta.foco}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute right-5 top-2 select-none font-serif text-[3.5rem] font-light leading-none opacity-[0.12] transition-opacity duration-500 group-hover:opacity-20 sm:text-[4.5rem] lg:text-[6rem] ${puerta.numeralColor}`}
            >
              {puerta.numeral}
            </span>

            <div className="relative flex items-center gap-3">
              <Icono aria-hidden className="size-[18px] stroke-[1.5]" />
              {/* opacity-90, no 70: sobre los planos claros (#decd99 y crema) el 70%
                  del cafe se queda en 3.4:1, por debajo del 4.5:1 de AA. */}
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] opacity-90">
                {puerta.kicker}
              </span>
            </div>

            <div className="relative mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-serif text-xl leading-tight lg:text-2xl">
                  {puerta.valor}
                  {puerta.externo && (
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  )}
                </p>
                <p className="mt-2 font-sans text-xs font-light leading-relaxed opacity-90">
                  {puerta.nota}
                </p>
              </div>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </div>
          </a>
        </SafeReveal>
      ))}
    </section>
  );
}
