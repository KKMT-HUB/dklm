
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Muallim Web home"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg",
        className
      )}
    >
      
      <Image
        src="/logo.png"
        alt="Dekshina Kerala Lajnathul Muallimeen"
        width={48}
        height={48}
        priority
        className="size-10 object-contain"
      />

      {/* Website Name */}
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          tone === "dark" ? "text-primary-900" : "text-white"
        )}
      >
        Dekshina Kerala Lajnathul Muallimeen
      </span>
    </Link>
  );
}
