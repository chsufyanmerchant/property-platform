/**
 * Core domain types for Basera property listings.
 * Kept intentionally small for the frontend foundation — extend here as
 * real data (Supabase) replaces the mock dataset in a later step.
 */

/** Whether a listing is for sale or for rent. */
export type ListingPurpose = "buy" | "rent";

/** Broad category of the listing. */
export type PropertyType = "house" | "apartment" | "plot" | "commercial";

/** Land/area units as commonly used in the Pakistani property market. */
export type AreaUnit = "Marla" | "Kanal" | "Sq. Ft." | "Sq. Yd.";

export interface PropertyLocation {
  city: string;
  /** Neighbourhood, sector or phase, e.g. "DHA Phase 6" or "F-10 Markaz". */
  area: string;
  address: string;

  /**
   * Approximate map coordinates for the listing.
   * These should not be treated as the exact property location.
   */
  latitude?: number;
  longitude?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
    /** Cover photo, shown on PropertyCard. Should also be the first entry in `images`. */
  image: string;
  /** All gallery photos for the detail page, cover image first. */
  images: string[];
  purpose: ListingPurpose;
  type: PropertyType;
  /** Total sale price in PKR, or monthly rent in PKR when purpose is "rent". */
  price: number;
  location: PropertyLocation;
  /** 0 for property types where bedrooms don't apply (e.g. plots). */
  bedrooms: number;
  /** 0 for property types where bathrooms don't apply (e.g. plots). */
  bathrooms: number;
  size: number;
  sizeUnit: AreaUnit;
  isFeatured: boolean;
  isVerified: boolean;
  /** Whether the listing is move-in furnished. Undefined for types where it doesn't apply (e.g. plots). */
  furnished?: boolean;
  agency: string;
  /** Individual agent/contact name, when the listing has one on file. */
  agentName?: string;
  /** Contact phone number, when the listing has one on file. Used for tel:/wa.me links only when present. */
  phone?: string;
  /** ISO date string. */
  postedAt: string;
  description: string;
  amenities: string[];
}

/** Sort options for the /properties results list. */
export type SortOption = "newest" | "price-asc" | "price-desc";

/**
 * The full search/filter state for the /properties listings page. Mirrored
 * into the URL query string so results are shareable and linkable — see
 * `lib/searchParams.ts` for parsing/serializing helpers.
 */
export interface PropertySearchFilters {
  purpose: ListingPurpose | "any";
  /** Free-text match against city, area and address. */
  location: string;
  type: PropertyType | "any";
  minPrice: number | null;
  maxPrice: number | null;
  /** 5 means "5+". */
  bedrooms: number | null;
  /** 5 means "5+". */
  bathrooms: number | null;
  minArea: number | null;
  maxArea: number | null;
  /** Unit that minArea/maxArea are expressed in. */
  areaUnit: AreaUnit;
  furnished: boolean;
  parking: boolean;
  featured: boolean;
  sort: SortOption;
}