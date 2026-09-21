import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import PopularCities from "@/components/home/PopularCities";
import PropertyCategories from "@/components/home/PropertyCategories";
import FeaturedProperties from "@/components/home/FeaturedProperties";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PopularCities />
        <FeaturedProperties />
        <PropertyCategories />
      </main>
      <Footer />
    </div>
  );
}
