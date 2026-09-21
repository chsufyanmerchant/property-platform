import Logo from "@/components/brand/Logo";
import Icon from "@/components/ui/Icon";
import { cities } from "@/data/cities";

const exploreLinks = [
  { label: "Buy a property", href: "#search" },
  { label: "Rent a property", href: "#search" },
  { label: "Popular cities", href: "#cities" },
  { label: "Featured listings", href: "#featured" },
];

const companyLinks = [
  { label: "About Basera", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Post a property", href: "#" },
];

const socialLinks = [
  { label: "Facebook", icon: "facebook" as const, href: "#" },
  { label: "Instagram", icon: "instagram" as const, href: "#" },
  { label: "LinkedIn", icon: "linkedin" as const, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-deep text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Basera lists verified houses, apartments, plots and commercial
              spaces for sale and rent across Pakistan&apos;s major cities.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Icon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Explore</h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Popular cities</h3>
            <ul className="space-y-2.5">
              {cities.map((city) => (
                <li key={city.name}>
                  <a href="#cities" className="text-sm text-white/55 transition-colors hover:text-white">
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Basera. All rights reserved.</p>
          <p>Built for Pakistan&apos;s property market.</p>
        </div>
      </div>
    </footer>
  );
}
