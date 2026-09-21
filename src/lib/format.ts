import type { AreaUnit, ListingPurpose } from "@/types/property";

const CRORE = 1_00_00_000;
const LAKH = 1_00_000;

/** Trims trailing ".0" style zeros, keeping at most 2 decimal places. */
function trimDecimal(value: number): string {
  return (Math.round(value * 100) / 100).toString();
}

/**
 * Formats a PKR amount the way Pakistani property listings usually do,
 * e.g. 32500000 -> "PKR 3.25 Crore", 850000 -> "PKR 8.5 Lakh".
 */
export function formatPKR(amount: number, purpose: ListingPurpose = "buy"): string {
  let formatted: string;

  if (amount >= CRORE) {
    formatted = `PKR ${trimDecimal(amount / CRORE)} Crore`;
  } else if (amount >= LAKH) {
    formatted = `PKR ${trimDecimal(amount / LAKH)} Lakh`;
  } else {
    formatted = `PKR ${amount.toLocaleString("en-PK")}`;
  }

  return purpose === "rent" ? `${formatted} / month` : formatted;
}

export function formatArea(size: number, unit: AreaUnit): string {
  const value = trimDecimal(size);
  if (unit === "Sq. Ft." || unit === "Sq. Yd.") return `${value} ${unit}`;
  return `${value} ${unit}${size === 1 ? "" : "s"}`;
}

/** Lightweight "posted x ago" label — no date library needed. */
export function formatPostedAgo(isoDate: string): string {
  const posted = new Date(isoDate).getTime();
  const diffMs = Date.now() - posted;
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "Posted today";
  if (diffDays === 1) return "Posted yesterday";
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} week${diffDays >= 14 ? "s" : ""} ago`;
  return `Posted ${Math.floor(diffDays / 30)} month${diffDays >= 60 ? "s" : ""} ago`;
}
