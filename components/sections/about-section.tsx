import { Reveal } from "@/components/ui/reveal";
import { Octagram } from "@/components/ui/islamic-pattern";
import { aboutCards } from "@/lib/content";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 bg-paper-2/60 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary-900 sm:text-4xl">About Muallim Web</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
            Muallim Web is a digital platform designed to support and modernize Islamic educational institutions. Our goal is to
            simplify educational administration, improve communication, and provide reliable digital tools for teachers, students,
            and administrators.
          </p>
        </div>

        <ul className="space-y-4">
          {aboutCards.map(({ title, description, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08}>
                <article className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm shadow-primary-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary-900/10 sm:p-7">
                  <Octagram
                    strokeWidth={2}
                    className="pointer-events-none absolute -right-8 -top-8 size-32 text-accent-400/30 transition-transform duration-700 group-hover:rotate-45"
                  />
                  <div className="relative flex gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-700 text-accent-200">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-primary-900">{title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink-600">{description}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
