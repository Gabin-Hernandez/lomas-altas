import Image from "next/image";
import SafeReveal from "@/components/ui/SafeReveal";
import { CONTACTO } from "@/lib/contacto";

/**
 * Last exit before the green footer. The privacy notice lives here because the
 * site-wide <Footer /> points both "Aviso de Privacidad" and "Legal" at /contacto.
 */
export default function CierreContacto() {
  return (
    <section className="relative overflow-hidden bg-[#decd99] text-[#4a3e26]">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-[#4a3e26]/15" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-10 px-6 py-16 md:py-24 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-8">
          <SafeReveal variant="fade-up" delay={100}>
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-[#4a3e26]/40" />
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#4a3e26]/85">
                O simplemente márcanos
              </p>
            </div>

            <p className="mt-6 font-serif text-xl italic text-[#4a3e26]/85 md:text-2xl">
              Si prefieres resolverlo en dos minutos:
            </p>
          </SafeReveal>

          {/* Outside the reveal on purpose: the number is a conversion channel and
              must never depend on an animation having fired. */}
          <a
            href={CONTACTO.telHref}
            className="group relative mt-4 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#4a3e26]"
          >
            <span className="block break-words font-serif text-[clamp(2.25rem,9vw,6rem)] font-light leading-[0.88] tracking-[-0.03em] tabular-nums text-[#4a3e26]">
              {CONTACTO.telFmt}
            </span>
            <span
              aria-hidden
              className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[#4a3e26] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </a>

          <p className="mt-8 max-w-[52ch] font-sans text-xs font-light leading-relaxed text-[#4a3e26]/85 md:text-sm">
            Lunes a viernes de 10:00 a 19:00. Fuera de horario deja tu mensaje y te devolvemos la
            llamada al día hábil siguiente.
          </p>

          <a
            href={CONTACTO.mailHref}
            className="mt-6 inline-block border-b border-[#4a3e26]/40 pb-0.5 font-sans text-xs uppercase tracking-[0.2em] text-[#4a3e26] transition-colors duration-300 hover:border-[#4a3e26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a3e26]"
          >
            {CONTACTO.mail}
          </a>
        </div>

        {/* The section's overflow-hidden crops the tower at the top edge, so it
            reads as continuing past the frame. Transparent PNG: no scrim, no shadow. */}
        <div className="relative h-40 lg:col-span-4 lg:h-full">
          <Image
            src="/images/Generales/Terralago Fachada lateral.jpg"
            alt=""
            aria-hidden
            width={669}
            height={703}
            quality={100}
            unoptimized
            loading="lazy"
            sizes="(max-width: 1024px) 150px, 300px"
            className="absolute -top-12 right-2 h-auto w-[150px] object-contain opacity-70 lg:-top-28 lg:right-8 lg:w-[300px] lg:opacity-100"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] border-t border-[#4a3e26]/20 px-6 pb-14 pt-8 lg:px-16">
        <details
          id="aviso-de-privacidad"
          className="group max-w-[70ch] scroll-mt-28 md:scroll-mt-32"
        >
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a3e26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a3e26]">
            Leer el aviso de privacidad
            <span aria-hidden className="text-lg transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="mt-5 flex flex-col gap-4 font-sans text-[11px] font-light leading-[1.8] text-[#4a3e26]/85">
            <p>
              Siermend es responsable del tratamiento de los datos personales que compartes en este
              sitio. Los utilizamos únicamente para contactarte, dar seguimiento a tu solicitud y
              enviarte información sobre Lomas Altas.
            </p>
            <p>
              No vendemos ni compartimos tus datos con terceros ajenos al desarrollo. Conservamos tu
              información sólo durante el tiempo necesario para atender tu solicitud.
            </p>
            <p>
              Puedes solicitar en cualquier momento el acceso, la rectificación, la cancelación o la
              oposición al uso de tus datos escribiendo a {CONTACTO.mail}.
            </p>
            {/* TODO: la LFPDPPP exige identificar al responsable con denominacion social
                y domicilio. No publicar sin la redaccion aprobada por el cliente. */}
            <p className="font-semibold text-[#4a3e26]">
              TEXTO PENDIENTE DE VALIDACIÓN LEGAL POR EL CLIENTE: la LFPDPPP exige identificar al
              responsable con denominación social y domicilio. No publicar sin la redacción
              aprobada.
            </p>
          </div>
        </details>

        <p className="mt-8 max-w-[70ch] font-sans text-[10px] font-light leading-relaxed text-[#4a3e26]/85">
          Imágenes y renders con fines ilustrativos. Superficies, acabados, precios y disponibilidad
          sujetos a cambio sin previo aviso.
        </p>
      </div>
    </section>
  );
}
