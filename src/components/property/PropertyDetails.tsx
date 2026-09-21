"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";
import { formatArea, formatPKR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyDetailsProps {
  property: Property;
}

const typeLabel: Record<Property["type"], string> = {
  house: "House",
  apartment: "Apartment",
  plot: "Plot",
  commercial: "Commercial",
};

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const facts: { icon: IconName; label: string; value: string }[] = [];
  if (property.bedrooms > 0) {
    facts.push({ icon: "bed", label: "Bedrooms", value: String(property.bedrooms) });
  }
  if (property.bathrooms > 0) {
    facts.push({ icon: "bath", label: "Bathrooms", value: String(property.bathrooms) });
  }
  facts.push({ icon: "ruler", label: "Area", value: formatArea(property.size, property.sizeUnit) });
  facts.push({
    icon: property.type === "plot" ? "landPlot" : property.type === "commercial" ? "store" : "home",
    label: "Type",
    value: typeLabel[property.type],
  });

  return (
    <div className="mt-6">
      {/* Badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">
          {property.purpose === "buy" ? "For Sale" : "For Rent"}
        </span>
        <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-ink-soft">
          {typeLabel[property.type]}
        </span>
        {property.isFeatured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-light px-2.5 py-1 text-xs font-semibold text-gold-dark">
            <Icon name="star" className="h-3 w-3" />
            Featured
          </span>
        )}
        {property.isVerified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-light px-2.5 py-1 text-xs font-semibold text-teal-dark">
            <Icon name="shieldCheck" className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      {/* Title + favorite */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{property.title}</h1>
        <button
          type="button"
          onClick={() => setIsFavorited((current) => !current)}
          aria-pressed={isFavorited}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors",
            isFavorited ? "border-red-200 bg-red-50 text-red-500" : "border-line bg-surface text-ink hover:text-red-500"
          )}
        >
          <Icon name="heart" className="h-5 w-5" fill={isFavorited ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
        <Icon name="pin" className="h-4 w-4 shrink-0 text-ink-muted" />
        {property.location.area}, {property.location.city}
      </p>

      <p className="mt-4 text-3xl font-bold text-ink">{formatPKR(property.price, property.purpose)}</p>

      {/* Key facts */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-xl border border-line bg-surface p-3.5 text-center">
            <Icon name={fact.icon} className="mx-auto h-5 w-5 text-teal" />
            <p className="mt-2 text-sm font-semibold text-ink">{fact.value}</p>
            <p className="text-xs text-ink-muted">{fact.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-ink">Description</h2>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{property.description}</p>
      </section>

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-ink">Amenities</h2>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {property.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink-soft"
              >
                <Icon name="check" className="h-4 w-4 shrink-0 text-teal" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}