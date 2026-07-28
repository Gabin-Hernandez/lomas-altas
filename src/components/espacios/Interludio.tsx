import SafeReveal from "@/components/ui/SafeReveal";

/**
 * The silence of the book. One hard fact that reframes everything above and
 * prepares the change of paper. Nothing else belongs here: no image, no button,
 * no watermark. Resisting the urge to fill it is the whole point.
 */
export default function Interludio() {
  return (
    <section className="bg-cream py-24 md:py-40">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <SafeReveal
            variant="fade-in"
            delay={100}
            className="col-span-4 md:col-span-8 md:col-start-3 md:text-center"
          >
            <span aria-hidden className="mb-10 block h-px w-16 bg-[#a8904f]/60 md:mx-auto" />
            <p className="font-serif text-[1.5rem] font-normal leading-[1.28] tracking-[-0.01em] text-[#153223] md:text-[2.1rem] lg:text-[2.5rem]">
              Cuatro departamentos por nivel. Dieciocho en toda la torre.{" "}
              <em className="italic text-[#8a7238]">
                La baja densidad no es un argumento de venta: está en la planta.
              </em>
            </p>
            <p className="mt-8 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]/80">
              Lomas Altas · 18 unidades · 5 niveles
            </p>
          </SafeReveal>
        </div>
      </div>
    </section>
  );
}
