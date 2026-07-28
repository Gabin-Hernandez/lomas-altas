import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The house section header: a title flanked by 1px rules, optionally preceded by
 * a numeral and a tracked micro-label, and followed by a serif-italic accent line.
 * Every page-level heading on the site goes through this so the rhythm stays identical.
 */

type Tone = "dark" | "light" | "sand" | "gold";

const TONE = {
  /** dark ink on cream */
  dark: {
    rule: "bg-forest/20",
    eyebrow: "text-forest/50",
    index: "text-forest/25",
    title: "text-forest",
    accent: "text-gold-dark",
  },
  /** light ink on forest */
  light: {
    rule: "bg-white/20",
    eyebrow: "text-gold",
    index: "text-white/25",
    title: "text-white",
    accent: "text-gold-light",
  },
  /** gold ink on forest - 8.9:1, the treatment the home gives its green sections */
  gold: {
    rule: "bg-gold-light/25",
    eyebrow: "text-gold",
    index: "text-gold-light/40",
    title: "text-gold-light",
    accent: "text-white",
  },
  /** brown ink on sand */
  sand: {
    rule: "bg-[#5c4a2c]/25",
    eyebrow: "text-[#5c4a2c]/60",
    index: "text-[#5c4a2c]/30",
    title: "text-[#5c4a2c]",
    accent: "text-[#4a3e26]",
  },
} satisfies Record<Tone, Record<string, string>>;

interface SectionHeadingProps {
  children: ReactNode;
  /** Serif-italic second line, the brand's signature counterpoint to the sans title. */
  accent?: ReactNode;
  /** Tracked uppercase micro-label above the title. */
  eyebrow?: string;
  /** Editorial numeral, e.g. "01". Rendered next to the eyebrow. */
  index?: string;
  tone?: Tone;
  align?: "center" | "left";
  /** The flanking hairlines. Off for headings that sit inside a narrow column. */
  rules?: boolean;
  /** Title element — h1 on page headers, h2 on sections. */
  as?: "h1" | "h2" | "h3";
  /** Set on the title itself, so a section can point at it with aria-labelledby. */
  id?: string;
  className?: string;
}

export default function SectionHeading({
  children,
  accent,
  eyebrow,
  index,
  tone = "dark",
  align = "center",
  rules = true,
  as: Title = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const t = TONE[tone];
  const centered = align === "center";

  return (
    <div className={cn("w-full", centered ? "text-center" : "text-left", className)}>
      {(eyebrow || index) && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            centered ? "justify-center" : "justify-start"
          )}
        >
          {index && (
            <span className={cn("font-serif text-sm leading-none", t.index)}>{index}</span>
          )}
          {eyebrow && (
            <span
              className={cn(
                "font-sans text-[10px] font-semibold uppercase tracking-[0.25em]",
                t.eyebrow
              )}
            >
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <div className={cn("flex items-center gap-5 sm:gap-8", centered ? "w-full" : "w-full")}>
        {rules && centered && <span aria-hidden className={cn("flex-1 h-px", t.rule)} />}
        <Title
          id={id}
          className={cn(
            "font-serif font-normal leading-[1.15]",
            "text-[1.75rem] sm:text-3xl lg:text-[2.5rem]",
            centered ? "text-center" : "text-left",
            // Long titles must be allowed to wrap on phones; only short ones stay on one line.
            "text-balance",
            t.title
          )}
        >
          {children}
        </Title>
        {rules && <span aria-hidden className={cn("flex-1 h-px", t.rule)} />}
      </div>

      {accent && (
        <p
          className={cn(
            "font-serif italic font-normal mt-2",
            "text-xl sm:text-2xl lg:text-[1.75rem] leading-snug",
            t.accent
          )}
        >
          {accent}
        </p>
      )}
    </div>
  );
}
