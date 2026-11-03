
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, UserPlus } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { navLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }

    const elements = navLinks
      .filter((link) => link.href.startsWith("/#"))
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300",
        scrolled || open
          ? "border-line bg-paper/95"
          : "border-transparent bg-paper/80"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === "/" && active === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary-800"
                    : "text-ink-600 hover:bg-primary-50 hover:text-primary-800"
                )}
              >
                {link.label}

                {isActive && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Register Button + Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-900 sm:px-5"
          >
            <UserPlus className="size-4" />
            <span>Register</span>
          </Link>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl text-primary-800 transition-colors hover:bg-primary-50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((previous) => !previous)}
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3 sm:px-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === "/" && active === link.id;

                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary-800"
                          : "text-ink-700 hover:bg-primary-50 hover:text-primary-800"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
