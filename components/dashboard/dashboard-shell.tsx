"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ROLE_LABELS, type ModuleIconName } from "@/lib/roles";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/auth";
import { ModuleIcon } from "./module-icon";

interface NavItem {
  href: string;
  label: string;
  icon: ModuleIconName;
}

export function DashboardShell({
  user,
  nav,
  children,
}: {
  user: { name: string; role: Role };
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="min-h-svh lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:h-svh lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between px-5 lg:h-20">
          <Logo />
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-primary-50 hover:text-primary-800 lg:hidden"
          >
            {signingOut ? <Loader2 className="size-4 animate-spin motion-reduce:animate-none" /> : <LogOut className="size-4" />}
            Sign out
          </button>
        </div>

        <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href) ? "bg-primary-700 text-white" : "text-ink-700 hover:bg-primary-50 hover:text-primary-800",
              )}
            >
              <ModuleIcon name={item.icon} className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="hidden h-20 items-center justify-end gap-4 border-b border-line px-8 lg:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-ink-900">{user.name}</p>
            <p className="text-xs text-ink-500">{ROLE_LABELS[user.role]}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-800 disabled:opacity-60"
          >
            {signingOut ? <Loader2 className="size-4 animate-spin motion-reduce:animate-none" /> : <LogOut className="size-4" />}
            Sign out
          </button>
        </header>
        <main id="main" className="px-5 py-8 sm:px-8 lg:py-10">
          <p className="mb-6 text-sm text-ink-600 lg:hidden">
            {user.name}, {ROLE_LABELS[user.role]}
          </p>
          {children}
        </main>
      </div>
    </div>
  );
}
