"use client";

import { motion } from "motion/react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";

const week = [
  { day: "Sat", value: 78 },
  { day: "Sun", value: 90 },
  { day: "Mon", value: 96 },
  { day: "Tue", value: 84 },
  { day: "Wed", value: 92 },
  { day: "Thu", value: 70 },
];

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ease = [0.22, 1, 0.36, 1] as const;

/** Decorative dashboard illustration. All figures are sample data, not real statistics. */
export function HeroPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
      <motion.div
        className="absolute -right-4 -top-10 hidden text-accent-500/50 sm:block"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="size-24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="22" y="22" width="56" height="56" />
          <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute -bottom-8 -right-2 hidden text-secondary-500/40 sm:block"
        animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="size-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <rect x="22" y="22" width="56" height="56" />
          <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
        className="relative rounded-3xl bg-primary-900 p-5 text-white shadow-2xl shadow-primary-900/25 ring-1 ring-white/10 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-base font-semibold">Class 6, morning session</p>
            <p className="mt-0.5 text-xs text-primary-200">Attendance and exams</p>
          </div>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-primary-200">Sample data</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
            <div className="relative size-24 shrink-0">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="9" className="text-white/10" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="text-accent-300"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - 0.92) }}
                  transition={{ duration: 1.4, delay: 0.9, ease }}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center font-display text-xl font-semibold">92%</span>
            </div>
            <p className="text-sm text-primary-100">Present today</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-primary-200">This week</p>
            <div className="mt-3 flex h-20 items-end gap-2">
              {week.map((bar, i) => (
                <div key={bar.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <motion.div
                    className="w-full rounded-t-md bg-secondary-400"
                    style={{ height: `${bar.value}%`, originY: 1 }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, delay: 1 + i * 0.07, ease }}
                  />
                  <span className="text-[10px] text-primary-200">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-3 space-y-2">
          <li className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Tajweed unit test</span>
              <span className="text-xs text-primary-200">28 of 32 marks entered</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-accent-300"
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.1, delay: 1.2, ease }}
              />
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm">
            <CalendarCheck className="size-4 text-accent-300" />
            <span className="font-medium">Fiqh term exam</span>
            <span className="ml-auto text-xs text-primary-200">Scheduled</span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { duration: 0.5, delay: 1.6 }, y: { duration: 6, delay: 1.6, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-primary-900 shadow-lg shadow-primary-900/15 ring-1 ring-line sm:-left-6"
      >
        <CheckCircle2 className="size-4 text-primary-500" />
        Attendance saved
      </motion.div>
    </div>
  );
}
