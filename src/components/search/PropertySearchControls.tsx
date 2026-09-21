"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SelectField from "@/components/ui/SelectField";
import Icon from "@/components/ui/Icon";

const propertyTypeOptions = [
  { value: "any", label: "Any type" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

const purposeOptions = [
  { value: "any", label: "Buy or Rent" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

const bedroomOptions = [
  { value: "", label: "Any beds" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5", label: "5+ Bedrooms" },
];

export default function PropertySearchControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const purpose = searchParams.get("purpose") ?? "any";
  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "any";
  const bedrooms = searchParams.get("bedrooms") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "any") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/properties?${params.toString()}`);
  }

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-3 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[140px_1fr_170px_160px_auto] lg:items-end">
        <SelectField
          label="Purpose"
          value={purpose}
          options={purposeOptions}
          onChange={(event) =>
            updateParam("purpose", event.target.value)
          }
        />

        <div className="relative">
          <label
            htmlFor="property-location"
            className="mb-1.5 block text-sm font-medium text-ink-soft"
          >
            Location
          </label>

          <div className="relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            />

            <input
              id="property-location"
              value={location}
              onChange={(event) => {
                const params = new URLSearchParams(
                  searchParams.toString()
                );

                const value = event.target.value;

                if (value) {
                  params.set("location", value);
                } else {
                  params.delete("location");
                }

                router.replace(`/properties?${params.toString()}`);
              }}
              placeholder="City or area"
              className="h-11 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        </div>

        <SelectField
          label="Property type"
          value={type}
          options={propertyTypeOptions}
          onChange={(event) =>
            updateParam("type", event.target.value)
          }
        />

        <SelectField
          label="Bedrooms"
          value={bedrooms}
          options={bedroomOptions}
          onChange={(event) =>
            updateParam("bedrooms", event.target.value)
          }
        />

        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <Icon name="search" className="h-4 w-4" />
          Search
        </button>
      </div>
    </div>
  );
}