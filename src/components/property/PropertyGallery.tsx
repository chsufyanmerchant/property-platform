"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyGalleryProps {
  property: Property;
}

/**
 * Real-image gallery for the property detail page.
 *
 * Icons are inline SVG rather than the shared <Icon> component so this file
 * has no dependency on the IconName union — it compiles regardless of which
 * icons Icon.tsx happens to export.
 */
export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const images = property.images?.length ? property.images : [property.image];

  const [activeIndex, setActiveIndex] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());

  const total = images.length;
  const hasMultiple = total > 1;

  const goTo = (index: number) => setActiveIndex(((index % total) + total) % total);
  const markFailed = (index: number) =>
    setFailedIndexes((current) => new Set(current).add(index));

  const arrowClasses =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal";

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-canvas sm:aspect-[16/9]">
        {failedIndexes.has(activeIndex) ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m5 16 4-4 3 3 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-xs">Image unavailable</p>
          </div>
        ) : (
          <Image
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`${property.title} in ${property.location.area}, ${property.location.city} — photo ${activeIndex + 1} of ${total}`}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            onError={() => markFailed(activeIndex)}
          />
        )}

        {property.isFeatured && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L12 17l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" />
            </svg>
            Featured
          </span>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
              className={cn(arrowClasses, "left-3")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
              className={cn(arrowClasses, "right-3")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>

            <span
              aria-live="polite"
              className="absolute bottom-3 right-3 z-10 rounded-full bg-ink-deep/70 px-2.5 py-1 text-xs font-medium text-white"
            >
              {activeIndex + 1} / {total}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show image ${index + 1} of ${total}`}
              aria-current={index === activeIndex}
              className={cn(
                "relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-canvas transition-opacity sm:w-auto",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                index === activeIndex ? "border-teal" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              {failedIndexes.has(index) ? (
                <span className="flex h-full w-full items-center justify-center text-ink-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m5 16 4-4 3 3 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              ) : (
                <Image
                  src={src}
                  alt={`${property.title} — thumbnail ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                  onError={() => markFailed(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
