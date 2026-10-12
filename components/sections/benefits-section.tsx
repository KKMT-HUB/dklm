import { Reveal } from "@/components/ui/reveal";
import { IslamicPattern } from "@/components/ui/islamic-pattern";
import { benefits } from "@/lib/content";

export function BenefitsSection() {
  return (
    <section id="why-us" className="relative scroll-mt-16 overflow-hidden bg-paper-2/60 py-24 sm:py-28">
      <IslamicPattern className="text-primary-700/[0.05] [mask-image:linear-gradient(to_left,black,transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary-900 sm:text-4xl">Why Choose Muallim Web?</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">
            Built so teachers spend their time teaching, and administrators always know where things stand.
          </p>
        </div>

        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {benefits.map(({ title, description, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={(i % 2) * 0.08}>
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-accent-400/60 bg-white text-primary-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-primary-900">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
