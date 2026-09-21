import type { SVGProps } from "react";

/**
 * A small, self-contained set of line icons. Kept as one component instead
 * of pulling in an icon library — the set we need is short and this keeps
 * the dependency list untouched.
 */
export type IconName =
  | "search"
  | "pin"
  | "bed"
  | "bath"
  | "ruler"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "menu"
  | "check"
  | "star"
  | "home"
  | "building"
  | "landPlot"
  | "store"
  | "sliders"
  | "arrowRight"
  | "phone"
  | "mail"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "shieldCheck"
  | "clock"
  | "key"
  | "heart"
  | "plus"
  | "minus";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.25" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18v2M21 18v2" />
      <path d="M3 12V8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M13 10h6a2 2 0 0 1 2 2v0" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16a1 1 0 0 1 1 1v1a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-1a1 1 0 0 1 1-1Z" />
      <path d="M6 12V6a2 2 0 0 1 3.2-1.6" />
      <path d="M8 21v1M17 21v1" />
    </>
  ),
  ruler: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="1.5" />
      <path d="M7 7v3M11 7v3M15 7v3M19 7v3" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  close: (
    <>
      <path d="M6 6l12 12M18 6 6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
  star: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L12 17l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" />
  ),
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  landPlot: (
    <>
      <path d="M4 20 9 5l4 6 3-4 4 13Z" />
      <path d="M4 20h16" />
    </>
  ),
  store: (
    <>
      <path d="M4 9V5h16v4" />
      <path d="M3 9l1.5-4h15L21 9" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M20 18h0" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 9 9 0 0 0 2.8.45 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A16.8 16.8 0 0 1 2.8 4.4 1.2 1.2 0 0 1 4 3.2h3.1a1.2 1.2 0 0 1 1.2 1.2 9 9 0 0 0 .45 2.8 1.2 1.2 0 0 1-.3 1.2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  facebook: (
    <path d="M14 9h2.5V6H14c-1.9 0-3.5 1.6-3.5 3.5V12H8v3h2.5v6h3v-6H16l.5-3h-3V9.7c0-.4.3-.7.5-.7Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5v6M8 7.9v.1M12 16.5v-3.7c0-1.2.9-2.2 2.1-2.2 1.2 0 1.9 1 1.9 2.2v3.7" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3.5 5 6v6c0 4.4 3 7.7 7 8.5 4-.8 7-4.1 7-8.5V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="3.5" />
      <path d="m10.5 12.5 8-8M15.5 7.5l2 2M18 5l2 2" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.9 4.5 5.3 4c2-.3 3.9.6 5 2.2a5.6 5.6 0 0 1 5-2.2c3.4.5 4.9 4 3.3 7.2-2.5 4.7-10 9.3-10 9.3Z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
};

export default function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}