import { Construction } from "lucide-react";

export function ModulePlaceholder({ title, description, planned }: { title: string; description: string; planned: string[] }) {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-900">{title}</h1>
      <p className="mt-2 text-ink-600">{description}</p>

      <section aria-labelledby="planned-heading" className="mt-8 rounded-2xl border border-dashed border-primary-300 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent-100 text-accent-600">
            <Construction className="size-5" aria-hidden="true" />
          </span>
          <h2 id="planned-heading" className="font-display text-lg font-semibold text-primary-900">
            This module isn&apos;t built yet
          </h2>
        </div>
        <p className="mt-3 text-ink-600">No records to show. When this module is built, you will be able to:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-700">
          {planned.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
