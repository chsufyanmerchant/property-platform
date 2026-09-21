/**
 * Minimal classnames combinator. We intentionally avoid pulling in
 * `clsx`/`tailwind-merge` for this — a handful of components don't need it.
 */
export function cn(
  ...classes: Array<string | false | null | undefined | 0>
): string {
  return classes.filter(Boolean).join(" ");
}
