
"use client";

import Link from "next/link";
import {
  BookOpen,
  Users,
  Star,
  Building2,
  Trophy,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
const portals = [
  {
    name: "Teacher",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
    href: "/login",
  },
  {
    name: "District Portal",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
    href: "/login",
  },
  {
    name: "Mekhala Portal",
    icon: Building2,
    color: "bg-teal-100 text-teal-600",
    href: "/login",
  },
  {
    name: "State Portal",
    icon: Trophy,
    color: "bg-teal-100 text-teal-600",
    href: "/login",
  },
];

export default function PortalPage() {
  return (
    <main>
        <Navbar />
      <section
        id="portal"
        className="relative min-h-screen bg-white px-5 py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-5 py-2 text-sm font-medium text-teal-700">
              <Users size={16} />
              Access Portal
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-[54px]">
              Choose Your{" "}
              <span className="text-teal-600">Portal</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-6 text-gray-600 md:text-lg">
              Select your role to access personalized features and tools
              designed for your needs
            </p>
          </div>

          {/* Portal Cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portals.map((portal) => {
              const Icon = portal.icon;

              return (
                <div
                  key={portal.name}
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">

                    {/* Icon */}
                    <div
                      className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${portal.color}`}
                    >
                      <Icon size={21} strokeWidth={2} />
                    </div>

                    {/* Portal Name */}
                    <h3 className="mb-2 min-h-5 text-sm font-semibold text-gray-900">
                      {portal.name}
                    </h3>

                    {/* Login */}
                    <Link
                      href={portal.href}
                      className="flex h-8 w-full items-center justify-center border border-teal-500 text-xs font-semibold text-teal-600 transition-colors duration-200 hover:bg-teal-600 hover:text-white"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Chat Button */}
        <button
          type="button"
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110 hover:bg-green-600"
        >
          <MessageCircle size={21} />
        </button>
      </section>
    </main>
  );
}
