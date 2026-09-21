
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";
import TilePattern from "@/components/brand/TilePattern";
import { formatArea, formatPKR, formatPostedAgo } from "@/lib/format";
import { gradientForSeed } from "@/lib/placeholderArt";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  /** Show the favorite/heart toggle. Omit entirely to keep the card presentational (e.g. on the homepage). */
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const typeIcon: Record<Property["type"], IconName> = {
  house: "home",
  apartment: "building",
  plot: "landPlot",
  commercial: "store",
};

const typeLabel: Record<Property["type"], string> = {
  house: "House",
  apartment: "Apartment",
  plot: "Plot",
  commercial: "Commercial",
};

export default function PropertyCard({
  property,
  isFavorited,
  onToggleFavorite,
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);

  const hasRooms = property.bedrooms > 0 || property.bathrooms > 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/20 hover:shadow-card-hover">
      <Link
        href={`/properties/${property.id}`}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${property.title}`}
      />

      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-gradient-to-br",
          gradientForSeed(property.id)
        )}
      >
        {/* Always-present fallback artwork */}
        <TilePattern
          id={property.id}
          className="absolute inset-0 h-full w-full text-white/10"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            name={typeIcon[property.type]}
            className="h-14 w-14 text-white/55 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Real property image */}
        {!imageError && property.image && (
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="relative z-[1] object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        <div className="absolute left-3 top-3 z-20 flex gap-2">
          {property.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              <Icon name="star" className="h-3 w-3" />
              Featured
            </span>
          )}
        </div>

        <span className="absolute right-3 top-3 z-20 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm">
            {property.purpose === "buy" ? "For Sale" : "For Rent"}
          </span>

          {onToggleFavorite && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onToggleFavorite(property.id);
              }}
              aria-pressed={isFavorited}
              aria-label={
                isFavorited
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors",
                isFavorited
                  ? "bg-white text-red-500"
                  : "bg-white/90 text-ink hover:text-red-500"
              )}
            >
              <Icon
                name="heart"
                className="h-4 w-4"
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <p className="text-lg font-bold text-ink">
            {formatPKR(property.price, property.purpose)}
          </p>

          <span className="shrink-0 rounded-full bg-canvas px-2 py-0.5 text-xs font-medium text-ink-soft">
            {typeLabel[property.type]}
          </span>
        </div>

        <h3 className="mb-1 truncate text-sm font-semibold text-ink">
          {property.title}
        </h3>

        <p className="mb-3 flex items-center gap-1 text-xs text-ink-muted">
          <Icon name="pin" className="h-3.5 w-3.5 shrink-0" />

          <span className="truncate">
            {property.location.area}, {property.location.city}
          </span>
        </p>

        {hasRooms && (
          <div className="mb-3 flex items-center gap-4 text-xs text-ink-soft">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="bed" className="h-4 w-4 text-ink-muted" />
                {property.bedrooms} Bed
              </span>
            )}

            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="bath" className="h-4 w-4 text-ink-muted" />
                {property.bathrooms} Bath
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Icon name="ruler" className="h-4 w-4 text-ink-muted" />
              {formatArea(property.size, property.sizeUnit)}
            </span>
          </div>
        )}

        {!hasRooms && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-ink-soft">
            <Icon name="ruler" className="h-4 w-4 text-ink-muted" />
            {formatArea(property.size, property.sizeUnit)}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5 truncate">
            {property.isVerified && (
              <Icon
                name="shieldCheck"
                className="h-3.5 w-3.5 shrink-0 text-teal"
              />
            )}

            <span className="truncate">{property.agency}</span>
          </span>

          <span className="flex shrink-0 items-center gap-1">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {formatPostedAgo(property.postedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}