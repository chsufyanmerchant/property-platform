/** Shared <select> option lists for the search/filter UI — kept in one place so SearchBar and PropertySearchControls don't drift apart. */

export const propertyTypeOptions = [
  { value: "any", label: "Any type" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

export const priceRangeOptions = [
  { value: "any", label: "Any price" },
  { value: "0-5000000", label: "Under 50 Lakh" },
  { value: "5000000-10000000", label: "50 Lakh – 1 Crore" },
  { value: "10000000-30000000", label: "1 – 3 Crore" },
  { value: "30000000-50000000", label: "3 – 5 Crore" },
  { value: "50000000-", label: "5 Crore+" },
];

export const bedroomOptions = [
  { value: "any", label: "Any beds" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5", label: "5+ Bedrooms" },
];

export const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];