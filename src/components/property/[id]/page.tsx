import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyAgentCard from "@/components/property/PropertyAgentCard";
import SimilarProperties from "@/components/property/SimilarProperties";
import PropertyMapPlaceholder from "@/components/map/PropertyMapPlaceholder";
import { properties, getSimilarProperties } from "@/data/properties";
import { formatPKR } from "@/lib/format";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);

  if (!property) {
    return { title: "Property not found — Basera" };
  }

  return {
    title: `${property.title} in ${property.location.area}, ${property.location.city} — Basera`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);

  if (!property) {
    notFound();
  }

  const similar = getSimilarProperties(property);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1 pb-24 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <Icon name="chevronLeft" className="h-4 w-4" />
            Back to properties
          </Link>

          <nav aria-label="Breadcrumb" className="mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="transition-colors hover:text-ink">
              Properties
            </Link>
            <span>/</span>
            <span className="truncate text-ink-soft">{property.title}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <PropertyGallery property={property} />
              <PropertyDetails property={property} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <PropertyAgentCard property={property} />
              <div>
                <h2 className="mb-2.5 text-sm font-semibold text-ink-soft">Location</h2>
                <PropertyMapPlaceholder properties={[property]} className="h-56" />
              </div>
            </aside>
          </div>

          <SimilarProperties properties={similar} />
        </div>
      </main>

      {/* Sticky mobile contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-ink">{formatPKR(property.price, property.purpose)}</p>
          {property.phone ? (
            <Button href={`tel:${property.phone}`} variant="secondary" size="sm">
              <Icon name="phone" className="h-4 w-4" />
              Contact Agent
            </Button>
          ) : (
            <Button type="button" variant="secondary" size="sm">
              <Icon name="phone" className="h-4 w-4" />
              Contact Agent
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}