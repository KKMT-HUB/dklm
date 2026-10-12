import { useId } from "react";
import { cn } from "@/lib/utils";

/** A single eight-pointed star (two overlapping squares). Inherits color from `currentColor`. */
export function Octagram({ className, strokeWidth = 4 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="22" y="22" width="56" height="56" />
      <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="7" />
    </svg>
  );
}

/** A tiling lattice of eight-pointed stars, drawn as an absolutely positioned decorative layer. */
export function IslamicPattern({ className, size = 96 }: { className?: string; size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden="true" focusable="false" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" viewBox="0 0 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <rect x="25" y="25" width="50" height="50" vectorEffect="non-scaling-stroke" />
            <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" vectorEffect="non-scaling-stroke" />
            <circle cx="50" cy="50" r="8" vectorEffect="non-scaling-stroke" />
            <path d="M50 0V14.6M50 85.4V100M0 50H14.6M85.4 50H100M25 25L8 8M75 25L92 8M25 75L8 92M75 75L92 92" vectorEffect="non-scaling-stroke" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
