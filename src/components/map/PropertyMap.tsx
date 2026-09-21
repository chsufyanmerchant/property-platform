"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  ErrorEvent,
} from "maplibre-gl";
import Link from "next/link";
import Image from "next/image";
import { formatPKR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyMapProps {
  properties: Property[];
  className?: string;
  compact?: boolean;
  highlightedId?: string | null;
}

function formatCompactPrice(
  price: number,
  purpose: Property["purpose"]
) {
  if (purpose === "rent") {
    if (price >= 100000) {
      return `PKR ${(price / 1000).toFixed(0)}K/mo`;
    }

    return `PKR ${price.toLocaleString("en-PK")}/mo`;
  }

  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(1)} Lac`;
  }

  return `PKR ${price.toLocaleString("en-PK")}`;
}

function getCoordinates(property: Property) {
  const location = property.location as Property["location"] & {
    latitude?: number;
    longitude?: number;
  };

  if (
    typeof location.latitude !== "number" ||
    typeof location.longitude !== "number"
  ) {
    return null;
  }

  if (
    !Number.isFinite(location.latitude) ||
    !Number.isFinite(location.longitude)
  ) {
    return null;
  }

  return {
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export default function PropertyMap({
  properties,
  className,
  compact = false,
  highlightedId = null,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<MapLibreMarker[]>([]);
  const initializedRef = useRef(false);
  const lastFlownRef = useRef<string | null>(null);

  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const [mapError, setMapError] =
    useState<string | null>(null);

  const mappableProperties = useMemo(
    () =>
      properties.filter(
        (property) => getCoordinates(property) !== null
      ),
    [properties]
  );

  useEffect(() => {
    if (
      !mapContainerRef.current ||
      initializedRef.current
    ) {
      return;
    }

    initializedRef.current = true;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: [73.0479, 33.6844],
      zoom: 5,
      attributionControl: {
        compact: true,
      },
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
      }),
      "bottom-right"
    );

    map.on("error", (event: ErrorEvent) => {
      console.error(
        "Basera MapLibre error:",
        event.error
      );

      const message =
        event.error?.message ||
        "The map encountered an error.";

      setMapError(message);
    });

    map.on("load", () => {
      if (mappableProperties.length === 0) {
        return;
      }

      const bounds =
        new maplibregl.LngLatBounds();

      mappableProperties.forEach((property) => {
        const coordinates =
          getCoordinates(property);

        if (!coordinates) {
          return;
        }

        bounds.extend([
          coordinates.longitude,
          coordinates.latitude,
        ]);
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: compact ? 40 : 80,
          maxZoom: compact ? 10 : 12,
          duration: 700,
        });
      }
    });

    return () => {
      markersRef.current.forEach((marker) =>
        marker.remove()
      );

      markersRef.current = [];

      map.remove();
      mapRef.current = null;
      initializedRef.current = false;
    };
  }, [compact, mappableProperties]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) =>
      marker.remove()
    );

    markersRef.current = [];

    mappableProperties.forEach((property) => {
      const coordinates =
        getCoordinates(property);

      if (!coordinates) {
        return;
      }

      const markerElement =
        document.createElement("button");

      markerElement.type = "button";

      markerElement.className =
        "basera-property-marker";

      markerElement.setAttribute(
        "aria-label",
        `View ${property.title}`
      );

      markerElement.textContent =
        formatCompactPrice(
          property.price,
          property.purpose
        );

      markerElement.addEventListener(
        "click",
        () => {
          setSelectedProperty(property);

          map.flyTo({
            center: [
              coordinates.longitude,
              coordinates.latitude,
            ],
            zoom: Math.max(
              map.getZoom(),
              13
            ),
            duration: 500,
          });
        }
      );

      const marker =
        new maplibregl.Marker({
          element: markerElement,
          anchor: "bottom",
        })
          .setLngLat([
            coordinates.longitude,
            coordinates.latitude,
          ])
          .addTo(map);

      markersRef.current.push(marker);
    });
  }, [mappableProperties]);

  // Highlight the marker when a property card
  // is hovered or focused.
  useEffect(() => {
    markersRef.current.forEach(
      (marker, index) => {
        const property =
          mappableProperties[index];

        if (!property) {
          return;
        }

        marker
          .getElement()
          .classList.toggle(
            "is-selected",
            property.id === highlightedId
          );
      }
    );
  }, [highlightedId, mappableProperties]);

  // Move the map toward the highlighted property.
  useEffect(() => {
    const map = mapRef.current;

    if (!map || !highlightedId) {
      return;
    }

    if (
      lastFlownRef.current === highlightedId
    ) {
      return;
    }

    const target =
      mappableProperties.find(
        (property) =>
          property.id === highlightedId
      );

    if (!target) {
      return;
    }

    const coordinates =
      getCoordinates(target);

    if (!coordinates) {
      return;
    }

    lastFlownRef.current = highlightedId;

    map.easeTo({
      center: [
        coordinates.longitude,
        coordinates.latitude,
      ],
      zoom: Math.max(
        map.getZoom(),
        11
      ),
      duration: 600,
    });
  }, [highlightedId, mappableProperties]);

  return (
    <div
      className={cn(
        "relative min-h-[320px] overflow-hidden rounded-2xl border border-line bg-canvas",
        className
      )}
    >
      <div
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Interactive property map"
      />

      <div className="pointer-events-none absolute left-3 top-3 z-10">
        <div className="rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
          {mappableProperties.length} properties on map
        </div>
      </div>

      {mapError && (
        <div className="absolute inset-x-3 top-14 z-20 rounded-xl border border-red-200 bg-white/95 p-3 shadow-md">
          <p className="text-xs font-semibold text-red-700">
            Map error
          </p>

          <p className="mt-1 text-xs text-ink-soft">
            {mapError}
          </p>
        </div>
      )}

      {properties.length === 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface/80">
          <p className="text-sm text-ink-soft">
            No properties to show on the map
          </p>
        </div>
      )}

      {properties.length > 0 &&
        mappableProperties.length === 0 && (
          <div className="pointer-events-none absolute left-3 right-3 top-14 z-20 rounded-xl bg-surface/95 px-4 py-3 text-center shadow-md">
            <p className="text-xs text-ink-soft">
              These listings do not have map coordinates yet.
            </p>
          </div>
        )}

      {selectedProperty && (
        <div className="absolute bottom-3 left-3 z-30 w-[min(340px,calc(100%-24px))] overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
          <div className="relative h-36 w-full">
            <Image
              src={selectedProperty.image}
              alt={selectedProperty.title}
              fill
              sizes="340px"
              className="object-cover"
            />

            <button
              type="button"
              onClick={() =>
                setSelectedProperty(null)
              }
              aria-label="Close property preview"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-lg text-white"
            >
              ×
            </button>
          </div>

          <div className="p-4">
            <p className="text-xs font-medium text-ink-soft">
              {selectedProperty.location.area},{" "}
              {selectedProperty.location.city}
            </p>

            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-ink">
              {selectedProperty.title}
            </h3>

            <p className="mt-2 text-base font-bold text-teal-dark">
              {formatPKR(
                selectedProperty.price,
                selectedProperty.purpose
              )}
            </p>

            <div className="mt-2 flex gap-3 text-xs text-ink-soft">
              {selectedProperty.bedrooms > 0 && (
                <span>
                  {selectedProperty.bedrooms} beds
                </span>
              )}

              {selectedProperty.bathrooms > 0 && (
                <span>
                  {selectedProperty.bathrooms} baths
                </span>
              )}

              <span>
                {selectedProperty.size}{" "}
                {selectedProperty.sizeUnit}
              </span>
            </div>

            <Link
              href={`/properties/${selectedProperty.id}`}
              className="mt-4 block rounded-xl bg-ink px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:opacity-90"
            >
              View Property
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}