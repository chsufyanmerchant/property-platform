"use client";

import SelectField from "@/components/ui/SelectField";
import { sortOptions } from "@/lib/searchOptions";
import { usePropertyFilterUrl } from "@/lib/usePropertyFilterUrl";
import type { SortOption } from "@/types/property";

export default function SortSelect() {
  const { filters, updateFilters } = usePropertyFilterUrl();

  return (
    <SelectField
      aria-label="Sort by"
      className="w-full sm:w-56"
      value={filters.sort}
      onChange={(event) => updateFilters({ sort: event.target.value as SortOption })}
      options={sortOptions}
    />
  );
}