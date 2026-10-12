import { ButtonLink } from "@/components/ui/button";
import { IslamicPattern } from "@/components/ui/islamic-pattern";

export function CtaSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-800 via-primary-700 to-secondary-700 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <IslamicPattern className="text-accent-300/[0.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Let&apos;s Build the Future of Islamic Education Together
          </h2>
          <p className="mt-4 text-lg text-primary-100">Join us in creating a smarter, more connected educational community.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/login" variant="gold" size="lg">Access Your Portal</ButtonLink>
            <ButtonLink href="/#contact" variant="outlineLight" size="lg">Contact Us</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
