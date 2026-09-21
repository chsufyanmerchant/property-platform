"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyMapViewProps {
  properties: Property[];
  className?: string;
  highlightedId?: string | null;
}

const PropertyMap = dynamic(
  () => import("@/components/map/PropertyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl border border-line bg-canvas" />
    ),
  }
);

export default function PropertyMapView({
  properties,
  className,
  highlightedId = null,
}: PropertyMapViewProps) {
  return (
    <div className={cn(className)}>
      <PropertyMap
        properties={properties}
        highlightedId={highlightedId}
        className="h-full w-full"
      />
    </div>
  );
}
