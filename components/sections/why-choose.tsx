
"use client";

import Image from "next/image";
import {
  Users,
  MousePointerClick,
  LayoutGrid,
  Clock3,
  Smartphone,
  FolderOpen,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Easy-to-use interface",
    description:
      "Clear screens that teachers and staff can learn in minutes.",
    icon: MousePointerClick,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Centralized educational management",
    description:
      "Classes, students and staff managed from one place.",
    icon: LayoutGrid,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Time-saving digital workflows",
    description:
      "Less paperwork for attendance, marks and records.",
    icon: Clock3,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Accessible across devices",
    description:
      "Works on phones, tablets and computers.",
    icon: Smartphone,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Organized academic information",
    description:
      "Records stay structured and easy to find.",
    icon: FolderOpen,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Scalable platform for educational institutions",
    description:
      "Grows from a single madrasa to many institutions.",
    icon: TrendingUp,
    color: "bg-teal-100 text-teal-600",
  },
];

export function WhyChooseSection() {
  return (
    <section
      id="benefits"
      className="relative isolate overflow-hidden bg-[#f8fbf8] px-5 py-20 md:px-8 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 -right-40 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/50 blur-3xl" />

      {/* Subtle geometric pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #0f766e 1px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">

        {/* Left content */}
        <div className="relative">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-teal-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              <Users size={19} />
            </div>

            <span className="text-sm font-semibold text-teal-800">
              Why Choose Us?
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#103d32] sm:text-5xl lg:text-[54px]">
            Why Choose
            <span className="mt-1 block text-teal-600">
              Muallim Web?
            </span>
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-8 text-gray-600 md:text-lg">
            Built to empower teachers, students, and administrators
            with smart tools and seamless access.
          </p>

          {/* Education illustration */}
          <div className="relative mt-12 h-[230px] w-full overflow-hidden rounded-3xl from-teal-50 via-white to-emerald-100 sm:h-[260px]">
            <Image
              src="/education-illustration.jpg"
              alt="Education illustration with graduation cap, books and pencils"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right feature cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex min-h-[155px] items-center gap-5 rounded-2xl border border-teal-100/80 bg-white/90 p-5 shadow-[0_5px_25px_rgba(15,118,110,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_12px_30px_rgba(15,118,110,0.12)] sm:p-6"
              >
                {/* Feature icon */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={29} strokeWidth={1.9} />
                </div>

                {/* Feature text */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-snug text-[#103d32] sm:text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white sm:flex">
                  <ArrowRight size={17} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="pointer-events-none absolute -bottom-20 left-0 -z-10 h-32 w-full rounded-[50%] bg-teal-100/40 blur-2xl" />
    </section>
  );
}
