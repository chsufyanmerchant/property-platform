"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const navLinks = [
  { label: "Buy", href: "/properties?purpose=buy" },
  { label: "Rent", href: "/properties?purpose=rent" },
  { label: "Popular Cities", href: "#cities" },
  { label: "Featured", href: "#featured" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <a href="#top" aria-label="Basera home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="#" variant="outline" size="sm">
            Post a property
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <Icon name={isMenuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {isMenuOpen && (
        <nav
          className="border-t border-line bg-surface px-4 py-4 md:hidden"
          aria-label="Primary mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="#" variant="outline" size="sm" fullWidth className="mt-3">
            Post a property
          </Button>
        </nav>
      )}
    </header>
  );
}