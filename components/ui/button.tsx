import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-primary-700 text-white shadow-sm shadow-primary-900/20 hover:bg-primary-800",
  gold: "bg-accent-400 text-primary-950 hover:bg-accent-300",
  outline: "border border-primary-700/30 text-primary-800 hover:bg-primary-50",
  outlineLight: "border border-white/35 text-white hover:bg-white/10",
  ghost: "text-primary-800 hover:bg-primary-50",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string }) {
  return cn(base, variants[variant], sizes[size], className);
}

type StyleProps = { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className, ...props }: React.ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}

export function Button({ variant, size, className, type = "button", ...props }: React.ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
