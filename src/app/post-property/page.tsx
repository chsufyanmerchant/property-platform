"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyImageUpload from "@/components/property/PropertyImageUpload";
import { useState } from "react";
type FormData = {
  purpose: string;
  type: string;
  title: string;
  city: string;
  area: string;
  address: string;
  price: string;
  size: string;
  sizeUnit: string;
  bedrooms: string;
  bathrooms: string;
  furnished: boolean;
  parking: boolean;
  description: string;
  agency: string;
  phone: string;
};

export default function PostPropertyPage() {
const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const propertyData: FormData = {
      purpose: String(data.get("purpose") ?? ""),
      type: String(data.get("type") ?? ""),
      title: String(data.get("title") ?? ""),
      city: String(data.get("city") ?? ""),
      area: String(data.get("area") ?? ""),
      address: String(data.get("address") ?? ""),
      price: String(data.get("price") ?? ""),
      size: String(data.get("size") ?? ""),
      sizeUnit: String(data.get("sizeUnit") ?? ""),
      bedrooms: String(data.get("bedrooms") ?? ""),
      bathrooms: String(data.get("bathrooms") ?? ""),
      furnished: data.get("furnished") === "on",
      parking: data.get("parking") === "on",
      description: String(data.get("description") ?? ""),
      agency: String(data.get("agency") ?? ""),
      phone: String(data.get("phone") ?? ""),
    };

    console.log("Property submission:", propertyData);
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />

      <main className="flex-1">
         {submitted && (
  <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
    <div className="rounded-2xl border border-teal/20 bg-teal/5 px-4 py-3 text-sm font-medium text-teal-dark">
      Property submitted successfully.
    </div>
  </div>
)}
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/properties"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-teal"
            >
              ← Back to properties
            </Link>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">
              Post your property
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Add your property details and reach buyers and tenants across
              Pakistan.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic information */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">
                Basic information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="purpose"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Listing purpose
                  </label>

                  <select
                    id="purpose"
                    name="purpose"
                    defaultValue="buy"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-teal"
                  >
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Property type
                  </label>

                  <select
                    id="type"
                    name="type"
                    defaultValue="house"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-teal"
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Property title
                  </label>

                  <input
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. 5 Marla House in DHA Phase 6"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">Location</h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    required
                    placeholder="e.g. Lahore"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Area / Society
                  </label>

                  <input
                    id="area"
                    name="area"
                    required
                    placeholder="e.g. DHA Phase 6"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Full address
                  </label>

                  <input
                    id="address"
                    name="address"
                    required
                    placeholder="Street, block, house number..."
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>
              </div>
            </section>

            {/* Price and size */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">
                Price and size
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="price"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Price (PKR)
                  </label>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 25000000"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="size"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Area
                  </label>

                  <input
                    id="size"
                    name="size"
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 5"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sizeUnit"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Area unit
                  </label>

                  <select
                    id="sizeUnit"
                    name="sizeUnit"
                    defaultValue="Marla"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-teal"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq. Ft.">Sq. Ft.</option>
                    <option value="Sq. Yd.">Sq. Yd.</option>
                  </select>
                </div>
              </div>
            </section>
                        {/* Property photos */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">
                Property photos
              </h2>

              <p className="mt-1 text-sm text-ink-soft">
                Add clear photos to help buyers and tenants understand your
                property.
              </p>

              <PropertyImageUpload />
            </section>

            {/* Property facts */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">
                Property details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="bedrooms"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Bedrooms
                  </label>

                  <input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min="0"
                    placeholder="e.g. 4"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bathrooms"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Bathrooms
                  </label>

                  <input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min="0"
                    placeholder="e.g. 3"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-ink-soft">
                  <input
                    type="checkbox"
                    name="furnished"
                    className="h-4 w-4 rounded border-line accent-teal"
                  />
                  Furnished
                </label>

                <label className="flex items-center gap-3 text-sm text-ink-soft">
                  <input
                    type="checkbox"
                    name="parking"
                    className="h-4 w-4 rounded border-line accent-teal"
                  />
                  Parking available
                </label>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">
                Description
              </h2>

              <div className="mt-5">
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-ink-soft"
                >
                  Property description
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  placeholder="Describe the property, nearby facilities, condition, features, etc."
                  className="w-full resize-y rounded-xl border border-line bg-surface px-3 py-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                />
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold text-ink">
                Contact information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="agency"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Agency / Name
                  </label>

                  <input
                    id="agency"
                    name="agency"
                    required
                    placeholder="e.g. Basera Estate"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-ink-soft"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 03001234567"
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-teal"
                  />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/properties"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:bg-canvas"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-teal px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}