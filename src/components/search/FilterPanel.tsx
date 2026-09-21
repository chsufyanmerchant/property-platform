"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SelectField from "@/components/ui/SelectField";
import { DEFAULT_FILTERS } from "@/lib/searchParams";
import { cn } from "@/lib/utils";
import type { AreaUnit, ListingPurpose, PropertySearchFilters, PropertyType } from "@/types/property";

interface FilterPanelProps {
  /** Seeds the panel's fields — pass the current /properties filters to avoid resetting fields this panel doesn't own (location, sort). */
  initialFilters?: Partial<PropertySearchFilters>;
  /** Receives the full, merged filter state when the user applies. */
  onApply?: (filters: PropertySearchFilters) => void;
  className?: string;
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

const purposeOptions: { value: ListingPurpose | "any"; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

const areaUnitOptions: { value: AreaUnit; label: string }[] = [
  { value: "Marla", label: "Marla" },
  { value: "Kanal", label: "Kanal" },
  { value: "Sq. Ft.", label: "Sq. Ft." },
  { value: "Sq. Yd.", label: "Sq. Yd." },
];

const bedOptions = ["Studio", "1", "2", "3", "4", "5+"];
const bathOptions = ["1", "2", "3", "4", "5+"];

/** Converts a pill's label ("Studio" / "5+" / "3") to the numeric filter value. */
function bedroomsFromLabel(label: string | null): number | null {
  if (label === null) return null;
  if (label === "Studio") return 0;
  if (label === "5+") return 5;
  return Number(label);
}

function labelFromBedrooms(value: number | null): string | null {
  if (value === null) return null;
  if (value === 0) return "Studio";
  if (value >= 5) return "5+";
  return String(value);
}

function PillGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string | null;
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onToggle(option)}
          aria-pressed={selected === option}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            selected === option
              ? "border-ink bg-ink text-white"
              : "border-line text-ink-soft hover:border-ink/30 hover:text-ink"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line px-4 py-3 transition-colors hover:border-ink/20">
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="block text-xs text-ink-muted">{description}</span>
      </span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-line transition-colors peer-checked:bg-teal" />
        <span className="relative h-[1.125rem] w-[1.125rem] translate-x-1 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-6" />
      </span>
    </label>
  );
}

export default function FilterPanel({ initialFilters, onApply, className }: FilterPanelProps) {
  const seed = { ...DEFAULT_FILTERS, ...initialFilters };

  const [purpose, setPurpose] = useState<ListingPurpose | "any">(seed.purpose);
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>(
    seed.type !== "any" ? [seed.type] : []
  );
  const [minPrice, setMinPrice] = useState(seed.minPrice !== null ? String(seed.minPrice) : "");
  const [maxPrice, setMaxPrice] = useState(seed.maxPrice !== null ? String(seed.maxPrice) : "");
  const [minArea, setMinArea] = useState(seed.minArea !== null ? String(seed.minArea) : "");
  const [maxArea, setMaxArea] = useState(seed.maxArea !== null ? String(seed.maxArea) : "");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(seed.areaUnit);
  const [beds, setBeds] = useState<string | null>(labelFromBedrooms(seed.bedrooms));
  const [baths, setBaths] = useState<string | null>(labelFromBedrooms(seed.bathrooms));
  const [furnished, setFurnished] = useState(seed.furnished);
  const [parking, setParking] = useState(seed.parking);
  const [featured, setFeatured] = useState(seed.featured);

  const toggleType = (type: PropertyType) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [type]
    );
  };

  const handleReset = () => {
    setPurpose("any");
    setSelectedTypes([]);
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setAreaUnit("Marla");
    setBeds(null);
    setBaths(null);
    setFurnished(false);
    setParking(false);
    setFeatured(false);
  };

  const handleApply = () => {
    onApply?.({
      ...seed,
      purpose,
      type: selectedTypes[0] ?? "any",
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      minArea: minArea ? Number(minArea) : null,
      maxArea: maxArea ? Number(maxArea) : null,
      areaUnit,
      bedrooms: bedroomsFromLabel(beds),
      bathrooms: bedroomsFromLabel(baths),
      furnished,
      parking,
      featured,
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <section>
        <h3 className="mb-2.5 text-sm font-semibold text-ink">Purpose</h3>
        <PillGroup
          options={purposeOptions.map((o) => o.label)}
          selected={purposeOptions.find((o) => o.value === purpose)?.label ?? "Any"}
          onToggle={(label) => setPurpose(purposeOptions.find((o) => o.label === label)?.value ?? "any")}
        />
      </section>

      <section>
        <h3 className="mb-2.5 text-sm font-semibold text-ink">Property type</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {propertyTypes.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleType(value)}
              aria-pressed={selectedTypes.includes(value)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                selectedTypes.includes(value)
                  ? "border-teal bg-teal-light text-teal-dark"
                  : "border-line text-ink-soft hover:border-ink/30"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2.5 text-sm font-semibold text-ink">Price range (PKR)</h3>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            aria-label="Minimum price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            aria-label="Maximum price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </section>

      <section>
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">Area</h3>
          <SelectField
            aria-label="Area unit"
            className="w-32"
            value={areaUnit}
            onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
            options={areaUnitOptions}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            aria-label="Minimum area"
            value={minArea}
            onChange={(e) => setMinArea(e.target.value)}
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            aria-label="Maximum area"
            value={maxArea}
            onChange={(e) => setMaxArea(e.target.value)}
          />
        </div>
      </section>

      <section>
        <h3 className="mb-2.5 text-sm font-semibold text-ink">Bedrooms</h3>
        <PillGroup options={bedOptions} selected={beds} onToggle={(v) => setBeds(v === beds ? null : v)} />
      </section>

      <section>
        <h3 className="mb-2.5 text-sm font-semibold text-ink">Bathrooms</h3>
        <PillGroup options={bathOptions} selected={baths} onToggle={(v) => setBaths(v === baths ? null : v)} />
      </section>

      <section className="space-y-2.5">
        <h3 className="text-sm font-semibold text-ink">More options</h3>
        <ToggleRow
          label="Furnished"
          description="Move-in ready with furniture included"
          checked={furnished}
          onChange={setFurnished}
        />
        <ToggleRow
          label="Parking"
          description="Dedicated or covered parking available"
          checked={parking}
          onChange={setParking}
        />
        <ToggleRow
          label="Featured only"
          description="Handpicked listings verified by Basera"
          checked={featured}
          onChange={setFeatured}
        />
      </section>

      <div className="flex items-center justify-between border-t border-line pt-5">
        <Button type="button" variant="ghost" size="sm" onClick={handleReset}>
          Reset all
        </Button>
        <Button type="button" variant="secondary" onClick={handleApply}>
          Apply filters
        </Button>
      </div>
    </div>
  );
}