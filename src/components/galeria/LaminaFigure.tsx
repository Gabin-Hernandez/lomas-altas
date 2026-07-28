"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getLamina, numeroDePie, TONOS, type Tone } from "@/lib/galeria";
import Epigrafe from "./Epigrafe";
import { useVisor } from "./VisorProvider";

interface LaminaFigureProps {
  /** Plate id, "01"–"12". */
  id: string;
  /** Aspect/height of the frame. The sanitising crops assume specific ratios. */
  frameClassName: string;
  /** Defaults to the sanitising crop stored with the plate. */
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  tone: Tone;
  /** Caption tone, when the plate sits on a slab of a different colour (paspartú). */
  captionTone?: Tone;
  cintillo?: boolean;
  anillo?: boolean;
  pildora?: boolean;
  caption?: boolean;
  /** Replaces the standard caption: a <figcaption> printed over the plate. */
  pie?: ReactNode;
  /** Overrides the focus ring when the plate sits on a slab of its own colour. */
  ringClassName?: string;
  /** Hover zoom. Plates already scaled to trim dirty edges get a larger value. */
  zoomClassName?: string;
  className?: string;
  /** Overlays painted inside the frame (edge dissolves, notch patches). */
  children?: ReactNode;
}

export default function LaminaFigure({
  id,
  frameClassName,
  imgClassName,
  sizes,
  priority = false,
  tone,
  captionTone,
  cintillo = true,
  anillo = true,
  pildora = true,
  caption = true,
  pie,
  ringClassName,
  zoomClassName = "[@media(hover:hover)]:group-hover:scale-[1.03]",
  className,
  children,
}: LaminaFigureProps) {
  const lamina = getLamina(id);
  const t = TONOS[tone];
  const { abrir } = useVisor();

  return (
    <figure className={cn("group relative", className)}>
      <button
        type="button"
        onClick={() => abrir(lamina.id)}
        aria-haspopup="dialog"
        aria-label={`Ampliar lámina ${lamina.id}: ${lamina.titulo}`}
        className={cn(
          "relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2",
          ringClassName ?? t.ring,
          frameClassName
        )}
      >
        {/* No `quality` prop anywhere on this page on purpose: next.config.ts leaves
            images.qualities at its default [75], and the optimizer answers 400 to any
            other value. Raising it means adding the list to next.config.ts first. */}
        <Image
          src={lamina.src}
          alt={lamina.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "transition-transform duration-[900ms] ease-out motion-reduce:transform-none",
            imgClassName ?? lamina.crop?.imgClass ?? "object-cover",
            zoomClassName
          )}
        />

        {children}

        {cintillo && (
          <span
            aria-hidden
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            className="absolute left-0 top-0 z-10 h-[46px] w-[128px] bg-[#153124] pl-4 pt-2 font-serif text-[11px] tracking-[0.12em] text-[#decd98] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-1 motion-reduce:transform-none md:h-[52px] md:w-[150px]"
          >
            Lám. {lamina.id}
          </span>
        )}

        {anillo && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 border border-transparent transition-colors duration-500 group-hover:border-[#c4a96a]/50"
          />
        )}

        {pildora && (
          <span
            aria-hidden
            className="absolute bottom-4 right-4 z-10 bg-[#153124]/85 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#decd98] backdrop-blur-sm transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            ＋ Ampliar
          </span>
        )}
      </button>

      {caption ? (
        <Epigrafe
          numero={numeroDePie(lamina)}
          titulo={lamina.titulo}
          texto={lamina.epigrafe}
          tone={captionTone ?? tone}
        />
      ) : (
        pie
      )}
    </figure>
  );
}
