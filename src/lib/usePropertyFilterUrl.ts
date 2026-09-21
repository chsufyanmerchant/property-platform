"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { filtersToQueryString, parseFilters } from "@/lib/searchParams";
import type { PropertySearchFilters } from "@/types/property";

/**
 * Reads the current /properties filter state from the URL and returns a
 * setter that merges a partial update into it and navigates. Keeping this
 * in one hook means the search bar, filter panel and sort select can each
 * change their own slice of the URL without clobbering the others.
 */
export function usePropertyFilterUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFilters(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  const updateFilters = useCallback(
    (update: Partial<PropertySearchFilters>) => {
      const merged = { ...filters, ...update };
      const queryString = filtersToQueryString(merged);
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [filters, pathname, router]
  );

  return { filters, updateFilters };
}