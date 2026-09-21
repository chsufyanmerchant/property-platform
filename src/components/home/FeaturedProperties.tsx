import PropertyGrid from "@/components/property/PropertyGrid";
import { getFeaturedProperties } from "@/data/properties";

export default function FeaturedProperties() {
  const featured = getFeaturedProperties();

  return (
    <section id="featured" className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-2 sm:mb-10 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-dark">
              Featured properties
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Handpicked listings this week
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            A mix of verified houses, apartments and plots across our launch
            cities — updated as new listings come in.
          </p>
        </div>

        <PropertyGrid properties={featured} />
      </div>
    </section>
  );
}
