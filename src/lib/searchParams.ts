import type { AreaUnit, Property, PropertySearchFilters, PropertyType, SortOption } from "@/types/property";

/** Every field defaults to "no filter applied". */
export const DEFAULT_FILTERS: PropertySearchFilters = {
  purpose: "any",
  location: "",
  type: "any",
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  minArea: null,
  maxArea: null,
  areaUnit: "Marla",
  furnished: false,
  parking: false,
  featured: false,
  sort: "newest",
};

const PROPERTY_TYPES: PropertyType[] = ["house", "apartment", "plot", "commercial"];
const AREA_UNITS: AreaUnit[] = ["Marla", "Kanal", "Sq. Ft.", "Sq. Yd."];
const SORT_OPTIONS: SortOption[] = ["newest", "price-asc", "price-desc"];

/** Pakistani property-market area conversions, used so min/max area compares fairly across units. */
function toSquareFeet(size: number, unit: AreaUnit): number {
  switch (unit) {
    case "Sq. Ft.":
      return size;
    case "Sq. Yd.":
      return size * 9;
    case "Marla":
      return size * 272.25;
    case "Kanal":
      return size * 5445;
  }
}

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(params: RawSearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function parseNumber(params: RawSearchParams, key: string): number | null {
  const raw = firstValue(params, key);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseBoolean(params: RawSearchParams, key: string): boolean {
  const raw = firstValue(params, key);
  return raw === "1" || raw === "true";
}

/** Reads a Next.js `searchParams` object (server or client) into typed filters. */
export function parseFilters(params: RawSearchParams): PropertySearchFilters {
  const purpose = firstValue(params, "purpose");
  const type = firstValue(params, "type");
  const areaUnit = firstValue(params, "areaUnit");
  const sort = firstValue(params, "sort");

  return {
    purpose: purpose === "buy" || purpose === "rent" ? purpose : "any",
    location: firstValue(params, "location")?.trim() ?? "",
    type: type && PROPERTY_TYPES.includes(type as PropertyType) ? (type as PropertyType) : "any",
    minPrice: parseNumber(params, "minPrice"),
    maxPrice: parseNumber(params, "maxPrice"),
    bedrooms: parseNumber(params, "bedrooms"),
    bathrooms: parseNumber(params, "bathrooms"),
    minArea: parseNumber(params, "minArea"),
    maxArea: parseNumber(params, "maxArea"),
    areaUnit: areaUnit && AREA_UNITS.includes(areaUnit as AreaUnit) ? (areaUnit as AreaUnit) : "Marla",
    furnished: parseBoolean(params, "furnished"),
    parking: parseBoolean(params, "parking"),
    featured: parseBoolean(params, "featured"),
    sort: sort && SORT_OPTIONS.includes(sort as SortOption) ? (sort as SortOption) : "newest",
  };
}

/** Serializes filters back into a query string, omitting anything at its default value. */
export function filtersToQueryString(filters: Partial<PropertySearchFilters>): string {
  const params = new URLSearchParams();

  if (filters.purpose && filters.purpose !== "any") params.set("purpose", filters.purpose);
  if (filters.location) params.set("location", filters.location);
  if (filters.type && filters.type !== "any") params.set("type", filters.type);
  if (filters.minPrice !== null && filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== null && filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  if (filters.bedrooms !== null && filters.bedrooms !== undefined) params.set("bedrooms", String(filters.bedrooms));
  if (filters.bathrooms !== null && filters.bathrooms !== undefined) params.set("bathrooms", String(filters.bathrooms));
  if (filters.minArea !== null && filters.minArea !== undefined) params.set("minArea", String(filters.minArea));
  if (filters.maxArea !== null && filters.maxArea !== undefined) params.set("maxArea", String(filters.maxArea));
  if (filters.areaUnit && filters.areaUnit !== "Marla") params.set("areaUnit", filters.areaUnit);
  if (filters.furnished) params.set("furnished", "1");
  if (filters.parking) params.set("parking", "1");
  if (filters.featured) params.set("featured", "1");
  if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);

  return params.toString();
}

/** Applies every active filter to the mock dataset. Pure — no side effects. */
export function filterProperties(properties: Property[], filters: PropertySearchFilters): Property[] {
  return properties.filter((property) => {
    if (filters.purpose !== "any" && property.purpose !== filters.purpose) return false;
    if (filters.type !== "any" && property.type !== filters.type) return false;

    if (filters.location) {
      const haystack =
        `${property.location.city} ${property.location.area} ${property.location.address}`.toLowerCase();
      if (!haystack.includes(filters.location.toLowerCase())) return false;
    }

    if (filters.minPrice !== null && property.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && property.price > filters.maxPrice) return false;

    if (filters.bedrooms !== null) {
      if (filters.bedrooms === 0) {
        if (!(property.bedrooms === 0 && property.type === "apartment")) return false;
      } else if (filters.bedrooms >= 5) {
        if (property.bedrooms < 5) return false;
      } else if (property.bedrooms !== filters.bedrooms) {
        return false;
      }
    }

    if (filters.bathrooms !== null) {
      if (filters.bathrooms >= 5) {
        if (property.bathrooms < 5) return false;
      } else if (property.bathrooms !== filters.bathrooms) {
        return false;
      }
    }

    if (filters.minArea !== null || filters.maxArea !== null) {
      const propertySqFt = toSquareFeet(property.size, property.sizeUnit);
      if (filters.minArea !== null && propertySqFt < toSquareFeet(filters.minArea, filters.areaUnit)) return false;
      if (filters.maxArea !== null && propertySqFt > toSquareFeet(filters.maxArea, filters.areaUnit)) return false;
    }

    if (filters.furnished && property.furnished !== true) return false;
    if (filters.parking && !property.amenities.some((a) => a.toLowerCase().includes("parking"))) return false;
    if (filters.featured && !property.isFeatured) return false;

    return true;
  });
}

/** Sorts a property list. Pure — returns a new array, never mutates the input. */
export function sortProperties(properties: Property[], sort: SortOption): Property[] {
  const sorted = [...properties];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }
}