"use client";

import type { ReactNode } from "react";
import { useVisor } from "./VisorProvider";

interface BotonVisorProps {
  laminaId: string;
  className: string;
  children: ReactNode;
}

/**
 * Explicit "open the viewer" button. Needed where the plate being clickable is not
 * discoverable enough and the cost of missing it is high — the level section diagram.
 */
export default function BotonVisor({ laminaId, className, children }: BotonVisorProps) {
  const { abrir } = useVisor();

  return (
    <button type="button" onClick={() => abrir(laminaId)} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
