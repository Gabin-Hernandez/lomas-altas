import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The chapter header of /espacios: a serif folio with a hairline tick on the
 * left, then the two-line title (sans light + serif italic) and the deck.
 *
 * ui/SectionHeading is NOT used here on purpose. That component centres the
 * title between two rules, which is the signature of the HOME page; reusing it
 * is precisely what makes this route read like a clipping of the home. The
 * identity of this page is the left-aligned folio, so this follows the same
 * TONE-map pattern as SectionHeading without inheriting its layout.
 */

type Tone = "cream" | "sand" | "blanco" | "verde";

/**
 * Two golds, not one, and the split is a contrast rule rather than a taste:
 *   · #8a7238 is 4.31:1 on cream and 4.50:1 on #fcfcfc — only legal on type at
 *     24px or more (the folio at 2rem and the serif accent at 1.75rem+).
 *   · Anything under 24px needs 4.5:1, which #8a7238 misses on cream. That is
 *     what #7d6731 (5.08:1 on cream, 5.31:1 on #fcfcfc) is for, and it is the
 *     gold every 10-13px label on this page uses.
 * #a8904f is not ink at all here: 2.89:1 on cream fails even the large-text
 * threshold, so it survives only as 1px rules and ticks.
 */
const TONE = {
  /** cream paper #fcf6f0 */
  cream: {
    folio: "text-[#8a7238]",
    tick: "bg-[#a8904f]/60",
    titulo: "text-[#153223]",
    acento: "text-[#8a7238]",
    bajada: "text-[#5c4a2c]/85",
  },
  /** sand paper #dbcb98 — gold is unreadable here, so the folio goes brown */
  sand: {
    folio: "text-[#4a3e26]",
    tick: "bg-[#4a3e26]/45",
    titulo: "text-[#153124]",
    acento: "text-[#4a3e26]",
    bajada: "text-[#4a3e26]",
  },
  /** near-white paper #fcfcfc */
  blanco: {
    folio: "text-[#8a7238]",
    tick: "bg-[#a8904f]/60",
    titulo: "text-[#153223]",
    acento: "text-[#8a7238]",
    bajada: "text-[#5c4a2c]/85",
  },
  /** forest paper #153124 */
  verde: {
    folio: "text-[#decd98]",
    tick: "bg-[#decd98]/45",
    titulo: "text-white",
    acento: "text-[#decd98]",
    bajada: "text-white/75",
  },
} satisfies Record<Tone, Record<string, string>>;

interface CabeceraFolioProps {
  folio: string;
  titulo: string;
  acento: string;
  bajada: ReactNode;
  tone?: Tone;
  className?: string;
  bajadaClassName?: string;
}

export default function CabeceraFolio({
  folio,
  titulo,
  acento,
  bajada,
  tone = "cream",
  className,
  bajadaClassName,
}: CabeceraFolioProps) {
  const t = TONE[tone];

  return (
    <div className={cn("flex gap-5 md:gap-8", className)}>
      <div className="w-12 shrink-0">
        <span className={cn("block font-serif text-[2rem] font-light leading-none", t.folio)}>
          {folio}
        </span>
        <span aria-hidden className={cn("mt-3 block h-px w-8", t.tick)} />
      </div>

      <div className="min-w-0 flex-1">
        <h2
          className={cn(
            "font-sans text-[1.75rem] font-light leading-[1.05] tracking-[-0.01em] md:text-[2.4rem] lg:text-[3rem]",
            t.titulo
          )}
        >
          <span className="block">{titulo}</span>
          <span className={cn("block font-serif font-normal italic", t.acento)}>{acento}</span>
        </h2>

        <p
          className={cn(
            "mt-6 max-w-[52ch] font-sans text-sm font-light leading-[1.7] md:text-[15px]",
            t.bajada,
            bajadaClassName
          )}
        >
          {bajada}
        </p>
      </div>
    </div>
  );
}
