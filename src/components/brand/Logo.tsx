import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Renders the wordmark in a light color for dark backgrounds (e.g. Footer). */
  inverted?: boolean;
}

/**
 * Basera's mark: a simple arch/gate silhouette (a doorway home) paired with
 * a diamond drawn from the Multani kashigari tile motif used across the
 * rest of the UI. Fully code-drawn so there's no external asset to manage.
 */
export default function Logo({ className, inverted = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 select-none", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={inverted ? "#E7F6F3" : "#0F2439"} />
        <path
          d="M9 22V15.5C9 12 12 9.5 16 9.5C20 9.5 23 12 23 15.5V22"
          stroke={inverted ? "#0F2439" : "#FFFFFF"}
          strokeWidth="2"
          fill="none"
        />
        <path d="M16 22V16.5L18.5 19V22" stroke={inverted ? "#0F2439" : "#C6902E"} strokeWidth="1.75" fill="none" strokeLinejoin="round" />
      </svg>
      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          inverted ? "text-white" : "text-ink"
        )}
      >
        Basera
      </span>
    </span>
  );
}
