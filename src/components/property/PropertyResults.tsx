"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import PropertyGrid from "@/components/property/PropertyGrid";
import SortSelect from "@/components/search/SortSelect";
import type { Property } from "@/types/property";

interface PropertyResultsProps {
  properties: Property[];
  onHoverProperty?: (id: string | null) => void;
}

export default function PropertyResults({
  properties,
  onHoverProperty,
}: PropertyResultsProps) {
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavoritedIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">
            {properties.length}
          </span>{" "}
          {properties.length === 1 ? "property" : "properties"} found
        </p>

        <SortSelect />
      </div>

      <PropertyGrid
        properties={properties}
        favoritedIds={favoritedIds}
        onToggleFavorite={toggleFavorite}
      
        emptyMessage="No properties found"
        emptyAction={
          <Button href="/properties" variant="secondary" size="sm">
            Clear filters
          </Button>
        }
      />
    </div>
  );
}
