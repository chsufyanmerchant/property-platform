import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-deep shadow-sm hover:shadow-md",
  secondary: "bg-teal text-white hover:bg-teal-dark shadow-sm hover:shadow-md",
  outline: "border border-ink/15 text-ink bg-transparent hover:border-ink/30 hover:bg-ink/[0.03]",
  ghost: "text-ink bg-transparent hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/** Keys that belong to Button's own API and must never reach the DOM. */
const BASE_PROP_KEYS = ["variant", "size", "fullWidth", "className", "children"] as const;

/**
 * Strips Button-only props, leaving only attributes valid on the underlying
 * native element. Spreading `variant`/`size`/`fullWidth`/etc. onto a
 * `<button>` or `<a>` is what triggers React's "does not recognize the `x`
 * prop on a DOM element" warning — this is the single place that prevents it.
 */
function omitBaseProps<T extends BaseProps>(props: T): Omit<T, keyof BaseProps> {
  const rest = { ...props };
  for (const key of BASE_PROP_KEYS) {
    delete rest[key];
  }
  return rest;
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", fullWidth, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  if (props.href !== undefined) {
    const { href, ...rest } = omitBaseProps(props);
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const rest = omitBaseProps(props as ButtonAsButton);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
