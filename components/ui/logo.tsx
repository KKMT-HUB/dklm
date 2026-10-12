import Link from "next/link";
import { cn } from "@/lib/utils";
import { Octagram } from "./islamic-pattern";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label="Muallim Web home" className={cn("inline-flex items-center gap-2.5 rounded-lg", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl",
          tone === "dark" ? "bg-primary-700 text-accent-300" : "bg-white/10 text-accent-300 ring-1 ring-white/15",
        )}
      >
        <Octagram className="size-6" strokeWidth={6} />
      </span>
      <span className={cn("font-display text-lg font-semibold tracking-tight", tone === "dark" ? "text-primary-900" : "text-white")}>
        Muallim Web
      </span>
    </Link>
  );
}
