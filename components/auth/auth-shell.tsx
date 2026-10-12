import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IslamicPattern } from "@/components/ui/islamic-pattern";
import { Logo } from "@/components/ui/logo";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main id="main" className="grid min-h-svh lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary-900 p-12 text-white lg:flex">
        <IslamicPattern className="text-accent-300/[0.14] [mask-image:radial-gradient(ellipse_at_30%_70%,black,transparent_75%)]" />
        <Logo tone="light" className="relative" />
        <div className="relative max-w-sm">
          <p className="font-display text-3xl font-semibold leading-tight">Classes, students and records, in one place.</p>
          <p className="mt-4 text-primary-100/80">Sign in to continue where you left off.</p>
        </div>
        <p className="relative text-sm text-primary-200/70">&copy; {new Date().getFullYear()} Muallim Web</p>
      </aside>

      <section className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <Logo className="lg:hidden" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return to Home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-900">{title}</h1>
          <p className="mt-2 text-ink-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
