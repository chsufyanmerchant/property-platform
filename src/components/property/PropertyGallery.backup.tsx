"use client";

import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyGalleryProps {
  property: Property;
}

const PROPERTY_IMAGES = [
  "/images/properties/property-01.jpg",
  "/images/properties/property-02.jpg",
  "/images/properties/property-03.jpg",
  "/images/properties/property-04.jpg",
  "/images/properties/property-05.jpg",
  "/images/properties/property-06.jpg",
  "/images/properties/property-07.webp",
  "/images/properties/property-08.webp",
  "/images/properties/property-09.jpg",
  "/images/properties/property-10.jpg",
  "/images/properties/property-11.jpg",
  "/images/properties/property-12.jpg",
];

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = PROPERTY_IMAGES;

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
    setImageError(false);
  };

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-slate-100 sm:aspect-[16/9]">
        {!imageError ? (
          <Image
            src={images[activeIndex]}
            alt={`${property.title} - image ${activeIndex + 1}`}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100">
            <div className="text-center">
              <Icon
                name="home"
                className="mx-auto mb-2 h-12 w-12 text-slate-400"
              />
              <p className="text-sm text-slate-500">
                Property image unavailable
              </p>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {property.isFeatured && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            <Icon name="star" className="h-3.5 w-3.5" />
            Featured
          </span>
        )}

        {/* Previous */}
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-white"
        >
          <Icon name="chevronLeft" className="h-5 w-5" />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-white"
        >
          <Icon name="chevronRight" className="h-5 w-5" />
        </button>

        {/* Counter */}
        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-ink-deep/75 px-3 py-1.5 text-xs font-medium text-white">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeIndex}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-xl border-2 bg-slate-100 transition-all",
              index === activeIndex
                ? "border-teal ring-2 ring-teal/20"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={src}
              alt={`${property.title} thumbnail ${index + 1}`}
              fill
              sizes="150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
