"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import SelectField from "@/components/ui/SelectField";
import FilterPanel from "@/components/search/FilterPanel";
import { filtersToQueryString } from "@/lib/searchParams";
import { bedroomOptions, priceRangeOptions, propertyTypeOptions } from "@/lib/searchOptions";
import type { ListingPurpose } from "@/types/property";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<ListingPurpose>("buy");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    params.set("purpose", purpose);

    const location = String(data.get("location") ?? "").trim();
    if (location) params.set("location", location);

    const type = String(data.get("type") ?? "any");
    if (type !== "any") params.set("type", type);

    const priceRange = String(data.get("priceRange") ?? "any");
    if (priceRange !== "any") {
      const [min, max] = priceRange.split("-");
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }

    const bedrooms = String(data.get("bedrooms") ?? "any");
    if (bedrooms !== "any") params.set("bedrooms", bedrooms);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-3xl border border-line bg-surface p-4 shadow-card sm:p-5">
      {/* Buy / Rent toggle */}
      <div className="mb-4 inline-flex rounded-full bg-canvas p-1">
        {(["buy", "rent"] as ListingPurpose[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPurpose(option)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200",
              purpose === option ? "bg-ink text-white shadow-sm" : "text-ink-soft hover:text-ink"
            )}
            aria-pressed={purpose === option}
          >
            <Icon name={option === "buy" ? "home" : "key"} className="h-4 w-4" />
            {option === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1.3fr_1.1fr]">
          <Input
            label="Location"
            icon="pin"
            name="location"
            placeholder="City, area or society"
          />
          <SelectField label="Property type" name="type" defaultValue="any" options={propertyTypeOptions} />
          <SelectField
            label="Price range"
            name="priceRange"
            defaultValue="any"
            options={priceRangeOptions}
          />
          <SelectField label="Bedrooms" name="bedrooms" defaultValue="any" options={bedroomOptions} />
        </div>

        <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-ink-soft"
            onClick={() => setIsFilterOpen(true)}
          >
            <Icon name="sliders" className="h-4 w-4" />
            More filters
          </Button>
          <Button type="submit" variant="secondary" size="lg" fullWidth className="sm:w-auto sm:px-10">
            <Icon name="search" className="h-[1.125rem] w-[1.125rem]" />
            Search {purpose === "buy" ? "properties" : "rentals"}
          </Button>
        </div>
      </form>

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="More filters" size="lg">
        <FilterPanel
          initialFilters={{ purpose }}
          onApply={(filters) => {
            setIsFilterOpen(false);
            router.push(`/properties?${filtersToQueryString(filters)}`);
          }}
        />
      </Modal>
    </div>
  );
}