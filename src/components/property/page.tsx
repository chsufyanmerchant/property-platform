import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertySearchControls from "@/components/search/PropertySearchControls";
import PropertyResults from "@/components/property/PropertyResults";
import PropertyMapPlaceholder from "@/components/map/PropertyMapPlaceholder";
import { properties } from "@/data/properties";
import { filterProperties, parseFilters, sortProperties } from "@/lib/searchParams";

export const metadata: Metadata = {
  title: "Search Properties — Basera",
  description:
    "Browse verified houses, apartments, plots and commercial properties for sale and rent across Pakistan.",
};

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const rawParams = await searchParams;
  const filters = parseFilters(rawParams);
  const filtered = filterProperties(properties, filters);
  const results = sortProperties(filtered, filters.sort);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <div className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <PropertySearchControls />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
            <div>
              {/* Compact map preview — mobile only, kept short so it doesn't dominate the screen */}
              <PropertyMapPlaceholder
                properties={results}
                compact
                className="mb-5 h-40 lg:hidden"
              />
              <PropertyResults properties={results} />
            </div>

            {/* Full map sidebar — desktop only */}
            <aside className="hidden lg:block">
              <PropertyMapPlaceholder
                properties={results}
                className="sticky top-24 h-[calc(100vh-8rem)]"
              />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}