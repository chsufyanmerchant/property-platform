"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import SelectField from "@/components/ui/SelectField";
import FilterPanel from "@/components/search/FilterPanel";
import { bedroomOptions, propertyTypeOptions } from "@/lib/searchOptions";
import { usePropertyFilterUrl } from "@/lib/usePropertyFilterUrl";
import { cn } from "@/lib/utils";
import type { ListingPurpose } from "@/types/property";

/**
 * The /properties page's search + filters toolbar. Deliberately distinct
 * from the homepage's SearchBar (min/max price inputs instead of a price
 * band, no hero styling) since it drives real filtering — but shares its
 * option lists and the FilterPanel/SelectField building blocks.
 */
export default function PropertySearchControls() {
  const { filters, updateFilters } = usePropertyFilterUrl();
  const [purpose, setPurpose] = useState<ListingPurpose>(filters.purpose === "rent" ? "rent" : "buy");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const location = String(data.get("location") ?? "").trim();
    const type = String(data.get("type") ?? "any");
    const minPrice = String(data.get("minPrice") ?? "").trim();
    const maxPrice = String(data.get("maxPrice") ?? "").trim();
    const bedrooms = String(data.get("bedrooms") ?? "any");

    updateFilters({
      purpose,
      location,
      type: type === "any" ? "any" : (type as typeof filters.type),
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      bedrooms: bedrooms === "any" ? null : Number(bedrooms),
    });
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-3 shadow-card sm:p-4">
      <div className="mb-3 inline-flex rounded-full bg-canvas p-1">
        {(["buy", "rent"] as ListingPurpose[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPurpose(option)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200",
              purpose === option ? "bg-ink text-white shadow-sm" : "text-ink-soft hover:text-ink"
            )}
            aria-pressed={purpose === option}
          >
            <Icon name={option === "buy" ? "home" : "key"} className="h-3.5 w-3.5" />
            {option === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_0.8fr_0.8fr_0.9fr]">
          <Input
            label="Location"
            icon="pin"
            name="location"
            placeholder="City, area or society"
            defaultValue={filters.location}
          />
          <SelectField label="Property type" name="type" defaultValue={filters.type} options={propertyTypeOptions} />
          <Input
            label="Min price (PKR)"
            type="number"
            inputMode="numeric"
            name="minPrice"
            placeholder="Min"
            defaultValue={filters.minPrice ?? ""}
          />
          <Input
            label="Max price (PKR)"
            type="number"
            inputMode="numeric"
            name="maxPrice"
            placeholder="Max"
            defaultValue={filters.maxPrice ?? ""}
          />
          <SelectField
            label="Bedrooms"
            name="bedrooms"
            defaultValue={filters.bedrooms !== null ? String(filters.bedrooms) : "any"}
            options={bedroomOptions}
          />
        </div>

        <div className="mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
          >
            <Icon name="sliders" className="h-4 w-4" />
            Filters
          </Button>
          <Button type="submit" variant="secondary" size="md" fullWidth className="sm:w-auto sm:px-8">
            <Icon name="search" className="h-4 w-4" />
            Search
          </Button>
        </div>
      </form>

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filters" size="lg">
        <FilterPanel
          initialFilters={filters}
          onApply={(applied) => {
            setIsFilterOpen(false);
            setPurpose(applied.purpose === "rent" ? "rent" : "buy");
            updateFilters(applied);
          }}
        />
      </Modal>
    </div>
  );
}