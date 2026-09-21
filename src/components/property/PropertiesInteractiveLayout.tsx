"use client";

import { useState } from "react";
import PropertyMapView from "@/components/map/PropertyMapView";
import PropertyResults from "@/components/property/PropertyResults";
import type { Property } from "@/types/property";

interface PropertiesInteractiveLayoutProps {
  properties: Property[];
}

export default function PropertiesInteractiveLayout({
  properties,
}: PropertiesInteractiveLayoutProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
      {/* Properties list + mobile map */}
      <div>
        {/* Mobile map */}
        <PropertyMapView
          properties={properties}
          highlightedId={hoveredId}
          className="mb-5 h-64 lg:hidden"
        />

        {/* Property results */}
        <PropertyResults
          properties={properties}
          onHoverProperty={setHoveredId}
        />
      </div>

      {/* Desktop map */}
      <aside className="hidden lg:block">
        <PropertyMapView
          properties={properties}
          highlightedId={hoveredId}
          className="sticky top-24 h-[calc(100vh-8rem)]"
        />
      </aside>
    </div>
  );
}
