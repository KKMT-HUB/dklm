import type { ContentItem } from "@/lib/content";

export function ServiceCard({ title, description, icon: Icon }: ContentItem) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-xl hover:shadow-primary-900/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span className="grid size-12 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-primary-700 group-hover:text-accent-200">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-primary-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
    </article>
  );
}
