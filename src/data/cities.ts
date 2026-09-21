export interface CityInfo {
  name: string;
  province: string;
  /** One line of local colour used on the Popular Cities cards. */
  tagline: string;
}

/**
 * Basera's six launch cities. Listing counts are derived from the mock
 * property data at render time rather than duplicated here — see
 * `getListingCountForCity` in `data/properties.ts`.
 */
export const cities: CityInfo[] = [
  { name: "Islamabad", province: "Islamabad Capital Territory", tagline: "Sectors, sitting under the Margalla hills" },
  { name: "Lahore", province: "Punjab", tagline: "Canal-side societies to the old city walls" },
  { name: "Karachi", province: "Sindh", tagline: "Coastal blocks and the country's biggest market" },
  { name: "Rawalpindi", province: "Punjab", tagline: "Cantt calm beside Islamabad's pace" },
  { name: "Faisalabad", province: "Punjab", tagline: "Pakistan's industrial heartland" },
  { name: "Multan", province: "Punjab", tagline: "The city of saints, gardens and blue tilework" },
];
