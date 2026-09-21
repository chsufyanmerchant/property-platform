import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function PropertyNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-light text-teal-dark">
            <Icon name="search" className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-ink">Property not found</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            This listing may have been removed, or the link you followed might be incorrect.
          </p>
          <Button href="/properties" variant="secondary" className="mt-6">
            Back to properties
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}