"use client";

import Image from "next/image";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";
import { CONTACTO } from "@/lib/contacto";

/**
 * Only Map, MapMarker and MarkerContent are used on purpose: MapControls,
 * MarkerPopup and MarkerTooltip are styled with shadcn tokens this project never
 * defines in @theme, so they would render invisible.
 */
export default function MapaCanvas() {
  const [longitud, latitud] = CONTACTO.coords;

  return (
    <Map
      center={CONTACTO.coords}
      zoom={15.2}
      theme="dark"
      scrollZoom={false}
      dragRotate={false}
      className="h-full w-full"
    >
      <MapMarker longitude={longitud} latitude={latitud}>
        <MarkerContent>
          <div className="relative flex size-12 items-center justify-center rounded-full border border-gold/20 bg-white shadow-lg">
            <div
              aria-hidden
              className="absolute size-14 animate-ping rounded-full border border-forest/30 bg-forest/10 motion-reduce:hidden"
            />
            <Image
              src="/images/isotip3.svg"
              alt=""
              aria-hidden
              width={30}
              height={30}
              className="h-auto w-[70%]"
            />
          </div>
        </MarkerContent>
      </MapMarker>
    </Map>
  );
}
