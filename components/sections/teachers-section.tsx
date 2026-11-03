
"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { IslamicPattern } from "@/components/ui/islamic-pattern";

const teachers = [
  {
    name: "Usthad Ahmed Faizi",
    subject: "Islamic Studies",
    image: "/images/teachers/teacher-1.jpg",
    phone: "+919876543210",
  },
  {
    name: "Usthad Muhammed Ali",
    subject: "Quran & Tafseer",
    image: "/images/teachers/teacher-2.jpg",
    phone: "+919876543211",
  },
  {
    name: "Usthad Shafeeq",
    subject: "Arabic Language",
    image: "/images/teachers/teacher-3.jpg",
    phone: "+919876543212",
  },
  {
    name: "Usthad Rafiq",
    subject: "Diniyath",
    image: "/images/teachers/teacher-4.jpg",
    phone: "+919876543213",
  },
];

export function TeachersSection() {
  return (
    <section
      id="teachers"
      className="relative isolate w-full overflow-hidden bg-[#fbfaf2] py-16 sm:py-20"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-32 top-20 size-96 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute -right-32 top-20 size-96 rounded-full bg-emerald-100/50 blur-3xl" />
        <IslamicPattern className="text-emerald-900/[0.08]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl font-bold text-emerald-900 sm:text-6xl">
            Our Teachers
          </h2>
          <p className="mt-3 text-base font-medium text-gray-600 sm:text-xl">
            Learn from experienced and dedicated teachers
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-600" />
        </div>

        {/* Teacher Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <article
              key={teacher.name}
              className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-3 shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-emerald-100">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col items-center pb-3 pt-4">
                <h3 className="text-center font-display text-lg font-bold text-emerald-900 sm:text-xl">
                  {teacher.name}
                </h3>

                <div className="mt-2 h-0.5 w-12 bg-emerald-300" />

                <p className="mt-2 text-center text-sm font-medium text-gray-600 sm:text-base">
                  {teacher.subject}
                </p>

                <a
                  href={`tel:${teacher.phone}`}
                  aria-label={`Call ${teacher.name}`}
                  className="mt-4 flex size-10 items-center justify-center rounded-full bg-emerald-900 text-white hover:bg-emerald-600"
                >
                  <Phone className="size-5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-12 w-full">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 25 C250 65 400 90 700 65 C1000 35 1200 0 1440 30 V100 H0Z"
            fill="#80b69a"
          />
          <path
            d="M0 55 C300 75 500 100 800 75 C1100 50 1250 20 1440 40 V100 H0Z"
            fill="#075437"
          />
        </svg>
      </div>
    </section>
  );
}
