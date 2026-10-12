"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { IslamicPattern } from "@/components/ui/islamic-pattern";
import { HeroPreview } from "./hero-preview";

const ease = [0.22, 1, 0.36, 1] as const;

const stack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function HeroSection() {
  return (
    // reducedMotion="user" turns off transform animations for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <section id="home" className="relative isolate scroll-mt-16 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="animate-drift-a absolute -left-32 -top-32 size-[34rem] rounded-full bg-secondary-200/40 blur-3xl" />
          <div className="animate-drift-b absolute -right-24 top-1/3 size-[30rem] rounded-full bg-accent-200/40 blur-3xl" />
          <IslamicPattern className="text-primary-700/[0.08] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-12 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24">
          <motion.div variants={stack} initial="hidden" animate="show">
            <motion.h1
              variants={rise}
              className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-primary-900 sm:text-5xl lg:text-[3.6rem]"
            >
              Empowering Islamic Education Through Technology
            </motion.h1>
            <motion.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              Muallim Web brings teachers, students, and educational institutions together through a smarter, simpler, and more
              connected digital learning experience.
            </motion.p>
            <motion.div variants={stack} className="mt-9 flex flex-wrap gap-3">
              <motion.div variants={rise}>
                <ButtonLink href="/login" size="lg">Get Started</ButtonLink>
              </motion.div>
              <motion.div variants={rise}>
                <ButtonLink href="/#services" size="lg" variant="outline">Explore Our Services</ButtonLink>
              </motion.div>
            </motion.div>
          </motion.div>

          <HeroPreview />
        </div>

        <a
          href="#about"
          aria-label="Scroll to About Muallim Web"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium text-ink-500 transition-colors hover:text-primary-700 lg:flex"
        >
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="size-4" aria-hidden="true" />
          </motion.span>
        </a>
      </section>
    </MotionConfig>
  );
}
