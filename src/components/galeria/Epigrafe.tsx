import { cn } from "@/lib/utils";
import { TONOS, type Tone } from "@/lib/galeria";

interface EpigrafeProps {
  /** Plate number as printed, e.g. "01.2". */
  numero: string;
  titulo: string;
  texto: string;
  tone: Tone;
  /** `div` for the two captions that live outside their <figure>. */
  as?: "figcaption" | "div";
  className?: string;
}

/** Plate footer: tabular number, rule, title and the epigraph in serif italics. */
export default function Epigrafe({
  numero,
  titulo,
  texto,
  tone,
  as = "figcaption",
  className,
}: EpigrafeProps) {
  const t = TONOS[tone];
  const Tag = as;

  return (
    <Tag className={cn("mt-3 border-t pt-2.5", t.border, className)}>
      <span className="flex items-baseline gap-4">
        <span className={cn("shrink-0 font-sans text-[11px] tabular-nums tracking-[0.12em]", t.num)}>
          {numero}
        </span>
        <span className={cn("font-sans text-[10px] uppercase tracking-[0.2em]", t.title)}>
          {titulo}
        </span>
        <span
          className={cn(
            "ml-auto hidden max-w-md text-right font-serif text-[11px] italic leading-relaxed md:block",
            t.body
          )}
        >
          {texto}
        </span>
      </span>
      <span className={cn("mt-2 block font-serif text-[11px] italic leading-relaxed md:hidden", t.body)}>
        {texto}
      </span>
    </Tag>
  );
}
