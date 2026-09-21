import PropertyGrid from "@/components/property/PropertyGrid";
import type { Property } from "@/types/property";

interface SimilarPropertiesProps {
  properties: Property[];
}

export default function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section className="mt-12 border-t border-line pt-10">
      <h2 className="mb-5 text-xl font-bold tracking-tight text-ink">Similar properties</h2>
      <PropertyGrid properties={properties} />
    </section>
  );
}