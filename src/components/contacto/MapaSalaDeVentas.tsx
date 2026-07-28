"use client";

import dynamic from "next/dynamic";

/** Matches the container's cream fallback, so a slow basemap never flashes a hole. */
function PlaceholderCrema() {
  return <div aria-hidden className="h-full w-full bg-cream-dark" />;
}

// next/dynamic with ssr:false cannot be called from a Server Component in Next 16,
// so this thin client wrapper exists purely to keep MapLibre out of the initial bundle.
const MapaCanvas = dynamic(() => import("./MapaCanvas"), {
  ssr: false,
  loading: () => <PlaceholderCrema />,
});

export default function MapaSalaDeVentas() {
  return <MapaCanvas />;
}
