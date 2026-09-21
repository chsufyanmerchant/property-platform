import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import { getListingCountForType } from "@/data/properties";
import type { PropertyType } from "@/types/property";

const categories: { type: PropertyType; label: string; description: string; icon: IconName }[] = [
  { type: "house", label: "Houses", description: "Independent houses & villas", icon: "home" },
  { type: "apartment", label: "Apartments", description: "Flats & serviced units", icon: "building" },
  { type: "plot", label: "Plots", description: "Residential & agricultural land", icon: "landPlot" },
  { type: "commercial", label: "Commercial", description: "Shops, offices & showrooms", icon: "store" },
];

export default function PropertyCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-dark">Browse by category</span>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">What are you looking for?</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.type}
            href={`/properties?type=${category.type}`}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white transition-colors group-hover:bg-teal">
              <Icon name={category.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-semibold text-ink">{category.label}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{category.description}</p>
            </div>
            <span className="mt-1 text-xs font-medium text-teal-dark">
              {getListingCountForType(category.type)} listings
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}