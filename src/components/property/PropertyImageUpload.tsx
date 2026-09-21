"use client";

import { useEffect, useState } from "react";

interface PreviewImage {
  id: string;
  url: string;
  name: string;
}

export default function PropertyImageUpload() {
  const [images, setImages] = useState<PreviewImage[]>([]);

  function handleFiles(files: FileList | null) {
    if (!files) return;

    const selectedFiles = Array.from(files).slice(0, 8 - images.length);

    const newImages = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((current) => [...current, ...newImages]);
  }

  function removeImage(id: string) {
    setImages((current) => {
      const image = current.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.url);
      }

      return current.filter((item) => item.id !== id);
    });
  }

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  return (
    <div className="mt-5">
      <label
        htmlFor="property-images"
        className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-canvas px-5 py-8 text-center transition-colors hover:border-teal hover:bg-surface"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-teal">
          <span className="text-2xl">📷</span>
        </span>

        <span className="mt-3 text-sm font-semibold text-ink">
          Upload property photos
        </span>

        <span className="mt-1 text-xs text-ink-muted">
          JPG, PNG or WEBP · Up to 8 photos
        </span>

        <input
          id="property-images"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-canvas"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={`Property photo ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-1 text-[11px] font-semibold text-white">
                  Cover
                </span>
              )}

              <button
                type="button"
                onClick={() => removeImage(image.id)}
                aria-label={`Remove ${image.name}`}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
            <span className="text-sm font-bold">×</span>
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-ink-muted">
        {images.length}/8 photos selected. The first photo will be used as the
        cover image.
      </p>
    </div>
  );
}