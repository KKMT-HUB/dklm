
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    title: "Empowering Education Through Technology",
    description:
      "A smarter digital platform designed to connect teachers, students and educational institutions.",
    image: "/hero-1.jpeg",
    label: "Welcome to Muallim",
  },
  {
    title: "A Better Way to Manage Education",
    description:
      "Simplify academic activities with organized information and seamless digital workflows.",
    image: "/hero-2.jpeg",
    label: "Smart Education",
  },
  {
    title: "Building a Brighter Learning Future",
    description:
      "Bringing educational communities together through innovation and collaboration.",
    image: "/hero-3.jpeg",
    label: "Our Vision",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setActive((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setActive((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[active];

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-slate-950">

      {/* FULL SCREEN BACKGROUND IMAGE */}
      
<AnimatePresence mode="sync">
  <motion.div
    key={active}
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
    className="absolute inset-0"
  >
    <Image
      src={slide.image}
      alt={slide.title}
      fill
      priority={active === 0}
      sizes="100vw"
      className="
        object-cover
        object-center
        sm:object-center
      "
    />
  </motion.div>
</AnimatePresence>

      {/* DARK OVERLAY FOR TEXT READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />

      {/* OPTIONAL BOTTOM OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

      {/* LEFT TEXT CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-10 lg:px-14">

        <div className="max-w-2xl">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                clipPath: "inset(0 100% 0 0)",
              }}
              animate={{
                opacity: 1,
                clipPath: "inset(0 0% 0 0)",
              }}
              exit={{
                opacity: 0,
                x: -30,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* LABEL */}
              <span className="mb-7 inline-flex rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md">
                {slide.label}
              </span>

              {/* HEADING */}
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                {slide.description}
              </p>

              {/* BUTTON */}
              <a
                href="/portal"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-teal-600 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-teal-700"
              >
                Explore More
                <ArrowRight size={20} />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* SLIDER CONTROLS */}
          <div className="mt-14 flex items-center gap-5">

            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition hover:bg-white hover:text-teal-800"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    active === index
                      ? "w-10 bg-white"
                      : "w-2 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition hover:bg-white hover:text-teal-800"
            >
              <ChevronRight size={22} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
