/**
 * Shared helper behind Basera's code-drawn placeholder art (no stock
 * photography anywhere in the app — see PropertyCard and PropertyGallery).
 * A small set of on-brand duotone gradients, picked deterministically from
 * a seed string so the same property always renders the same art.
 */
const artGradients = [
  "from-teal to-ink",
  "from-ink to-teal-dark",
  "from-gold-dark to-ink",
  "from-teal-dark to-ink-deep",
  "from-ink to-gold-dark",
];

export function gradientForSeed(seed: string): string {
  const sum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return artGradients[sum % artGradients.length];
}