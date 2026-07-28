"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};

  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return typeof window.matchMedia === "function" && window.matchMedia(QUERY).matches;
}

/** Server render and hydration agree on "motion is fine"; the store corrects it. */
const getServerSnapshot = () => false;

/**
 * The OS "reduce motion" preference, kept in sync with changes.
 *
 * globals.css already flattens transitions and animations under that media
 * query, but an infinite animation whose only job is to attract the eye should
 * not run at all rather than run once. Anything gated on movement — the pulsing
 * ring on the active plan marker — reads this.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
