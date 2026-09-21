interface TilePatternProps {
  className?: string;
  id: string;
}

/**
 * A tileable line-art motif adapted from Multani kashigari (blue-pottery)
 * lattice work. Used sparingly as a low-opacity texture — in the Hero
 * background and on PropertyCard placeholder art — as the design's one
 * signature decorative element. Color follows `currentColor`, so control
 * it with a text-* utility on the wrapper.
 */
export default function TilePattern({ className, id }: TilePatternProps) {
  const patternId = `kashi-tile-${id}`;

  return (
    <svg className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={patternId} width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M24 2 L34 12 L24 22 L14 12 Z M24 26 L34 36 L24 46 L14 36 Z M0 12 L10 12 M38 12 L48 12 M0 36 L10 36 M38 36 L48 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="24" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="36" r="2.4" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
