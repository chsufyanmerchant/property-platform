import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { cities } from "@/data/cities";
import { getListingCountForCity } from "@/data/properties";

export default function PopularCities() {
  return (
    <section id="cities" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-dark">Popular cities</span>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Search by city</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cities.map((city) => (
          <Link
            key={city.name}
            href={`/properties?location=${encodeURIComponent(city.name)}`}
            className="group flex flex-col items-start rounded-2xl border border-line bg-surface p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-card"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-light text-teal-dark transition-colors group-hover:bg-teal group-hover:text-white">
              <Icon name="pin" className="h-5 w-5" />
            </span>
            <span className="mt-3 text-sm font-semibold text-ink">{city.name}</span>
            <span className="mt-0.5 text-xs text-ink-muted">
              {getListingCountForCity(city.name)} listings
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}