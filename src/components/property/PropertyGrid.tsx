import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import type { Property } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  emptyMessage?: string;
  emptyAction?: ReactNode;
  favoritedIds?: Set<string>;
  onToggleFavorite?: (id: string) => void;
}

export default function PropertyGrid({
  properties,
  emptyMessage = "No properties match these filters yet.",
  emptyAction,
  favoritedIds,
  onToggleFavorite,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
        <Icon name="search" className="mb-3 h-8 w-8 text-ink-muted" />

        <p className="text-sm text-ink-soft">{emptyMessage}</p>

        {emptyAction && <div className="mt-4">{emptyAction}</div>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard
  key={property.id}
  property={property}
  isFavorited={favoritedIds?.has(property.id)}
  onToggleFavorite={onToggleFavorite}
/>
      ))}
    </div>
  );
}
