"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-md flex-col items-start justify-center gap-4 px-6">
      <h1 className="font-display text-3xl font-semibold text-primary-900">Something went wrong</h1>
      <p className="text-ink-600">The page didn&apos;t load. Try again. If it keeps happening, contact support.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
