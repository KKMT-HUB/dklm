
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";

const highlights = [
  "Simple and user-friendly digital platform",
  "Centralized academic information",
  "Better communication and collaboration",
  "Designed for modern educational institutions",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white px-5 py-20 md:px-8 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

        {/* LEFT IMAGE AREA */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative h-[400px] overflow-hidden rounded-[32px] bg-teal-50 sm:h-[500px]">
            <Image
              src="/about-muallim.jpg"
              alt="Teacher and students in a modern educational environment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating information card */}
          <div className="absolute -bottom-7 right-4 flex max-w-[270px] items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:-right-7">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <GraduationCap size={30} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">
                Smart Learning
              </p>
              <p className="text-sm text-slate-500">
                A connected education community
              </p>
            </div>
          </div>

          {/* Decorative circle */}
          <div className="absolute -left-5 -top-5 -z-10 h-28 w-28 rounded-full border-[12px] border-teal-100" />
        </motion.div>

        {/* RIGHT CONTENT AREA */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          {/* Section label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
            <BookOpen size={16} />
            ABOUT MUALLIM
          </div>

          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Transforming Education Through
            <span className="mt-2 block text-teal-700">
              Digital Innovation
            </span>
          </h2>

          <p className="mt-7 text-base leading-8 text-slate-600">
           Muallim Web is a digital platform designed to support and modernize Islamic educational institutions. Our goal is to simplify educational administration, improve communication, and provide reliable digital tools for teachers, students, and administrators.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Through smart digital solutions, Muallim helps educational
            communities manage information, improve collaboration and
            focus on what matters most — quality education.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  size={20}
                  className="mt-1 shrink-0 text-teal-600"
                />
                <span className="text-sm font-medium leading-6 text-slate-700">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom cards */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
              <Target className="mb-3 text-teal-700" size={27} />
              <h3 className="font-bold text-slate-900">Our Mission</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                To simplify educational activities through accessible, efficient, and innovative technology.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <Users className="mb-3 text-emerald-700" size={27} />
              <h3 className="font-bold text-slate-900">Our Vision</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
               To build a connected and digitally empowered Islamic education community.
              </p>
            </div>
          </div>

          {/* Button */}
          <Link
            href="/portal"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-teal-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800 hover:shadow-lg"
          >
            Discover Muallim
            <ArrowRight size={19} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
