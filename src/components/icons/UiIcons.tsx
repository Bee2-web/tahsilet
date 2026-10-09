/* Small UI glyphs copied from the reference page's inline SVGs. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true, focusable: false } as const;

/** Announcement banner arrow. */
export function BannerArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" {...base} {...props}>
      <path
        d="M6.66667 13.333L5.49167 12.158L10.1416 7.49968L-2.54983e-07 7.49968L-3.27835e-07 5.83301L10.1416 5.83301L5.48333 1.18301L6.66667 -0.000292116L13.3333 6.66634L6.66667 13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Dropdown chevron. */
export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 7" {...base} {...props}>
      <path
        d="M1.09282e-06 0.724092L6.25023 6.97432L12.5005 0.724095L11.7764 4.44323e-06L6.25023 5.52614L0.724091 1.55712e-06L1.09282e-06 0.724092Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...base} {...props}>
      <path d="M8 0L9.41 1.41L3.83 7H16V9H3.83L9.41 14.59L8 16L0 8L8 0Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...base} {...props}>
      <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
    </svg>
  );
}
