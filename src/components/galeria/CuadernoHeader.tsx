import { cn } from "@/lib/utils";
import { CONTENEDOR, TONOS, type CuadernoId, type Tone } from "@/lib/galeria";

interface CuadernoHeaderProps {
  id: CuadernoId;
  /** id of the <h2>, referenced by the section's aria-labelledby. */
  headingId: string;
  titulo: string;
  acento: string;
  parrafo: string;
  /** Two data points separated by a vertical hairline. */
  meta: [string, string];
  tone: Tone;
}

/**
 * Asymmetric notebook title page. Deliberately NOT the centred SectionHeading of the
 * home page: the off-centre grid plus the ghost numeral is what gives /galeria its own
 * identity instead of reading as another slice of the home.
 */
export default function CuadernoHeader({
  id,
  headingId,
  titulo,
  acento,
  parrafo,
  meta,
  tone,
}: CuadernoHeaderProps) {
  const t = TONOS[tone];

  return (
    <header className={cn("relative pt-16 pb-8 md:pt-24 md:pb-12", CONTENEDOR)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-2 right-6 select-none font-serif text-[7rem] font-light leading-[0.72] md:right-10 lg:right-16 lg:text-[13rem]",
          t.ghost
        )}
      >
        {id}
      </span>

      <div className="grid grid-cols-12 items-end gap-x-6 lg:gap-x-8">
        <div className="col-span-12 md:col-span-6">
          <div className="flex items-center gap-4">
            <span aria-hidden className={cn("h-px w-10", t.rule)} />
            <span
              className={cn(
                "font-sans text-[10px] font-semibold uppercase tracking-[0.25em]",
                t.label
              )}
            >
              Cuaderno {id}
            </span>
          </div>

          <h2
            id={headingId}
            className={cn(
              "mt-5 font-sans text-[2rem] font-light leading-[1.02] tracking-[-0.015em] md:text-[2.75rem] lg:text-[3.25rem]",
              t.title
            )}
          >
            {titulo}
            <span className={cn("mt-1 block font-serif font-normal italic", t.accent)}>
              {acento}
            </span>
          </h2>
        </div>

        <div className="col-span-12 mt-6 md:col-span-5 md:col-start-8 md:mt-0">
          <p className={cn("max-w-md font-sans text-sm font-light leading-relaxed", t.body)}>
            {parrafo}
          </p>
          <div className="mt-5 flex items-center gap-5">
            <span
              className={cn(
                "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]",
                t.meta
              )}
            >
              {meta[0]}
            </span>
            <span aria-hidden className={cn("h-8 w-px", t.rule)} />
            <span
              className={cn(
                "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]",
                t.meta
              )}
            >
              {meta[1]}
            </span>
          </div>
        </div>
      </div>

      <span aria-hidden className={cn("mt-8 block h-px w-full md:mt-12", t.rule)} />
    </header>
  );
}
