"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl font-semibold text-primary-900">This page didn&apos;t load</h1>
      <p className="mt-2 text-ink-600">Something went wrong while loading your data. Try again. If it keeps happening, contact your administrator.</p>
      <Button className="mt-5" onClick={reset}>Try again</Button>
    </div>
  );
}
