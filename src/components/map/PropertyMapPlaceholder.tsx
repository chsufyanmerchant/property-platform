"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { formatPKR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyMapPlaceholderProps {
  properties: Property[];
  className?: string;
  /** Compact mode drops the zoom controls and shows fewer markers — used for the mobile strip. */
  compact?: boolean;
}

/** Deterministic pseudo-random position (as a percentage) so markers don't jump between renders. */
function positionForId(id: string, seed: number): number {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ((sum * seed) % 70) + 12; // clamp to a 12%-82% band so pins don't clip the edges
}

/**
 * A code-drawn stand-in for a real map — street-grid styling, a handful of
 * price markers and zoom controls, built to the same interface a real
 * provider (e.g. Mapbox/Google Maps) could later drop into. Swapping the
 * provider later should only mean changing what's inside this component,
 * not how it's called.
 */
export default function PropertyMapPlaceholder({
  properties,
  className,
  compact = false,
}: PropertyMapPlaceholderProps) {
  const [zoom, setZoom] = useState(14);
  const markers = properties.slice(0, compact ? 4 : 8);
  const gridSize = 12 + (zoom - 10) * 3;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-teal-light",
        className
      )}
    >
      {/* Street-grid backdrop */}
      <div
        className="absolute inset-0 transition-[background-size] duration-300"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,36,57,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,36,57,0.08) 1px, transparent 1px)",
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      {/* A few soft "blocks" for visual depth */}
      <div className="absolute left-[8%] top-[15%] h-16 w-24 rounded-md bg-white/40" />
      <div className="absolute right-[12%] top-[35%] h-20 w-20 rounded-md bg-white/30" />
      <div className="absolute bottom-[12%] left-[25%] h-14 w-28 rounded-md bg-white/30" />

      {/* "Map view" label */}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
        <Icon name="pin" className="h-3.5 w-3.5 text-teal-dark" />
        Map view
      </span>

      {/* Price markers */}
      {markers.map((property, index) => (
        <span
          key={property.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white shadow-md transition-transform duration-200 hover:scale-110"
          style={{
            left: `${positionForId(property.id, index + 3)}%`,
            top: `${positionForId(property.id, index + 7)}%`,
          }}
        >
          {formatPKR(property.price, property.purpose)}
        </span>
      ))}

      {!compact && (
        <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(18, z + 1))}
            aria-label="Zoom in"
            className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-canvas"
          >
            <Icon name="plus" className="h-4 w-4" />
          </button>
          <div className="h-px bg-line" />
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(10, z - 1))}
            aria-label="Zoom out"
            className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-canvas"
          >
            <Icon name="minus" className="h-4 w-4" />
          </button>
        </div>
      )}

      {properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/70">
          <p className="text-sm text-ink-soft">No properties to show on the map</p>
        </div>
      )}
    </div>
  );
}