import { services } from "@/lib/content";
import { ServiceCard } from "./service-card";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-16 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary-900 sm:text-4xl">Our Digital Services</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">Eight connected tools for running a madrasa day to day.</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.title}>
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
