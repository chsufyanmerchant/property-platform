import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyAgentCard from "@/components/property/PropertyAgentCard";
import SimilarProperties from "@/components/property/SimilarProperties";

import { properties } from "@/data/properties";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;

  const property = properties.find(
    (item) => item.id === id || item.slug === id
  );

  if (!property) {
    return {
      title: "Property Not Found — Basera",
    };
  }

  return {
    title: `${property.title} — Basera`,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;

  const property = properties.find(
    (item) => item.id === id || item.slug === id
  );

  if (!property) {
    notFound();
  }

  const similarProperties = properties
    .filter(
      (item) =>
        item.id !== property.id &&
        (item.type === property.type ||
          item.location.city === property.location.city)
    )
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5">
           <Link
  href="/properties"
  className="inline-flex items-center text-sm font-medium text-ink-soft transition-colors hover:text-teal"
>
  ← Back to properties
</Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <PropertyGallery property={property} />
              <PropertyDetails property={property} />
            </div>

            <aside className="lg:pt-0">
              <div className="lg:sticky lg:top-24">
                <PropertyAgentCard property={property} />
              </div>
            </aside>
          </div>

          <SimilarProperties properties={similarProperties} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
