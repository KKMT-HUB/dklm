
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Moon,
  Sun,
  Bell,
  Clock,
  ChevronRight,
  Loader2,
} from "lucide-react";

const districts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const prayerList = [
  { name: "Fajr", key: "Fajr", icon: Moon },
  { name: "Dhuhr", key: "Dhuhr", icon: Sun },
  { name: "Asr", key: "Asr", icon: Sun },
  { name: "Maghrib", key: "Maghrib", icon: Sun },
  { name: "Isha", key: "Isha", icon: Moon },
];

type PrayerTimings = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
};

type PrayerApiData = {
  timings: PrayerTimings;
  date: {
    readable: string;
    gregorian: {
      date: string;
      weekday: {
        en: string;
      };
    };
    hijri: {
      date: string;
      month: {
        en: string;
      };
      year: string;
    };
  };
};

function getIndiaDate() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date());

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const year = parts.find((p) => p.type === "year")?.value;

  return `${day}-${month}-${year}`;
}

function getTomorrowDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);

  const tomorrow = new Date(Date.UTC(year, month - 1, day + 1));

  const nextDay = String(tomorrow.getUTCDate()).padStart(2, "0");
  const nextMonth = String(tomorrow.getUTCMonth() + 1).padStart(2, "0");
  const nextYear = tomorrow.getUTCFullYear();

  return `${nextDay}-${nextMonth}-${nextYear}`;
}

function getPrayerTimestamp(date: string, time: string) {
  const [day, month, year] = date.split("-");
  const cleanTime = time.split(" ")[0];

  return new Date(
    `${year}-${month}-${day}T${cleanTime}:00+05:30`
  ).getTime();
}

function formatTime(time: string) {
  const [hourString, minuteString] = time.split(" ")[0].split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${String(displayHour).padStart(2, "0")}:${minuteString} ${suffix}`;
}

export function PrayerSection() {
  const [district, setDistrict] = useState("Thiruvananthapuram");
  const [todayData, setTodayData] = useState<PrayerApiData | null>(null);
  const [tomorrowData, setTomorrowData] = useState<PrayerApiData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Fetch prayer times whenever district changes
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPrayerTimes() {
      setLoading(true);
      setError("");
      setTodayData(null);
      setTomorrowData(null);

      try {
        const today = getIndiaDate();
        const tomorrow = getTomorrowDate(today);

        const createUrl = (date: string) => {
          const params = new URLSearchParams({
            city: district,
            country: "India",
            state: "Kerala",
            method: "1",
            school: "0",
            timezonestring: "Asia/Kolkata",
          });

          return `https://api.aladhan.com/v1/timingsByCity/${date}?${params.toString()}`;
        };

        const [todayResponse, tomorrowResponse] = await Promise.all([
          fetch(createUrl(today), { signal: controller.signal }),
          fetch(createUrl(tomorrow), { signal: controller.signal }),
        ]);

        if (!todayResponse.ok || !tomorrowResponse.ok) {
          throw new Error("Unable to fetch prayer times.");
        }

        const todayJson = await todayResponse.json();
        const tomorrowJson = await tomorrowResponse.json();

        if (
          todayJson.code !== 200 ||
          tomorrowJson.code !== 200 ||
          !todayJson.data?.timings ||
          !tomorrowJson.data?.timings
        ) {
          throw new Error("Prayer timings are currently unavailable.");
        }

        setTodayData(todayJson.data);
        setTomorrowData(tomorrowJson.data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        console.error("Prayer API error:", err);
        setError("Unable to load prayer times. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPrayerTimes();

    return () => controller.abort();
  }, [district]);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate next prayer
  const todayDate = todayData?.date.gregorian.date;

  const upcomingPrayer = todayData && tomorrowData && todayDate
    ? prayerList
        .map((prayer, index) => ({
          ...prayer,
          index,
          time: todayData.timings[prayer.key],
          timestamp: getPrayerTimestamp(
            todayDate,
            todayData.timings[prayer.key]
          ),
        }))
        .find((prayer) => prayer.timestamp > currentTime) ??
      {
        ...prayerList[0],
        index: 0,
        time: tomorrowData.timings.Fajr,
        timestamp: getPrayerTimestamp(
          tomorrowData.date.gregorian.date,
          tomorrowData.timings.Fajr
        ),
      }
    : null;

  const remainingSeconds = upcomingPrayer
    ? Math.max(
        0,
        Math.floor((upcomingPrayer.timestamp - currentTime) / 1000)
      )
    : 0;

  const hours = String(
    Math.floor(remainingSeconds / 3600)
  ).padStart(2, "0");

  const minutes = String(
    Math.floor((remainingSeconds % 3600) / 60)
  ).padStart(2, "0");

  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#f8f5e8] pb-12">

      {/* Scenic Background */}
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,250,225,0.05), rgba(5,55,35,0.18)), url('/images/prayer-hero-bg.jpg')",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-transparent via-transparent to-[#f8f5e8]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-12">

        {/* Heading */}
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl font-bold leading-tight text-[#06452d] sm:text-7xl lg:text-8xl">
            Prayer <span className="text-[#c49a3a]">Times</span>
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-12 bg-[#c49a3a] sm:w-20" />
            <p className="font-display text-base italic text-[#153c2b] sm:text-xl">
              Stay connected with your daily prayers
            </p>
            <span className="h-px w-12 bg-[#c49a3a] sm:w-20" />
          </div>

          {/* District Dropdown */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-[#173c2d]">
              <MapPin className="size-5" />
              <span className="font-semibold">Select District:</span>
            </div>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="min-w-[230px] cursor-pointer rounded-xl border border-[#c9b778] bg-[#fffdf2] px-5 py-3 font-semibold text-[#06452d] shadow-sm outline-none transition focus:border-[#075437] focus:ring-2 focus:ring-[#075437]/20"
            >
              {districts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {loading && (
              <Loader2 className="size-5 animate-spin text-[#075437]" />
            )}
          </div>

          {/* Date and Hijri Date */}
          {todayData && (
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-[#173c2d]">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-5" />
                <span>
                  {todayData.date.gregorian.weekday.en},{" "}
                  {todayData.date.readable}
                </span>
              </div>

              <span className="hidden h-5 w-px bg-[#a88b4c] sm:block" />

              <div className="flex items-center gap-2">
                <Moon className="size-5" />
                <span>
                  {todayData.date.hijri.date}{" "}
                  {todayData.date.hijri.month.en}{" "}
                  {todayData.date.hijri.year} AH
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/80 py-16 text-[#06452d] shadow-md">
            <Loader2 className="size-9 animate-spin" />
            <p className="font-semibold">Loading prayer times for {district}...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => setDistrict((previous) => previous)}
              className="mt-3 rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white"
            >
              Please change district and try again
            </button>
          </div>
        )}

        {/* Prayer Content */}
        {!loading && !error && todayData && tomorrowData && upcomingPrayer && (
          <>
            {/* Next Prayer Banner */}
            <div className="relative z-10 mx-auto mt-16 max-w-5xl overflow-hidden rounded-[28px] border-2 border-[#d5b65d] bg-[#fffdf2] shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">

                {/* Next Prayer */}
                <div className="flex items-center gap-5 bg-[#03452d] px-6 py-7 text-white sm:px-10">
                  <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-[#d8b94e] bg-[#075b3a] sm:size-28">
                    <Moon className="size-12 text-[#f4ce59] sm:size-16" />
                  </div>

                  <div>
                    <p className="font-display text-xl sm:text-2xl">
                      Next Prayer
                    </p>
                    <h2 className="font-display text-4xl font-bold sm:text-6xl">
                      {upcomingPrayer.name}
                    </h2>
                  </div>

                  <div className="ml-auto hidden h-20 w-px bg-[#d6bd75] sm:block" />

                  <p className="hidden whitespace-nowrap font-display text-3xl font-bold text-[#f5d56e] lg:block">
                    {formatTime(upcomingPrayer.time)}
                  </p>
                </div>

                {/* Countdown */}
                <div className="flex flex-col items-center justify-center px-4 py-6 text-[#06452d] sm:px-8">
                  <div className="flex items-center gap-2">
                    <Clock className="size-6" />
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      Time Remaining
                    </h3>
                  </div>

                  <div className="mt-2 flex items-center gap-3 font-display text-4xl font-bold tracking-wider sm:text-5xl">
                    <span>{hours}</span>
                    <span>:</span>
                    <span>{minutes}</span>
                    <span>:</span>
                    <span>{seconds}</span>
                  </div>

                  <div className="flex w-full justify-center gap-7 text-xs font-medium sm:gap-10">
                    <span>Hours</span>
                    <span>Minutes</span>
                    <span>Seconds</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Time Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {prayerList.map((prayer, index) => {
                const Icon = prayer.icon;
                const active = upcomingPrayer.index === index;

                return (
                  <div
                    key={prayer.name}
                    className={`overflow-hidden rounded-3xl border p-5 text-center shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition duration-300 hover:-translate-y-1 ${
                      active
                        ? "border-2 border-[#c9a33e] bg-[#fffdf2] shadow-[0_8px_22px_rgba(194,155,49,0.25)]"
                        : "border-white/70 bg-[#fffdf2]/90"
                    }`}
                  >
                    <Icon
                      className={`mx-auto size-9 ${
                        active ? "text-[#075437]" : "text-[#17613f]"
                      }`}
                    />

                    <h3 className="mt-2 font-display text-xl font-bold text-[#06452d] sm:text-2xl">
                      {prayer.name}
                    </h3>

                    <p className="mt-1 font-display text-xl font-bold text-[#06452d] sm:text-2xl">
                      {formatTime(todayData.timings[prayer.key])}
                    </p>

                    {active && (
                      <div className="-mx-5 -mb-5 mt-4 bg-[#03452d] py-2 text-sm font-medium text-white">
                        Next Prayer
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setNotification(!notification)}
                aria-pressed={notification}
                className="flex items-center gap-4 rounded-full border border-[#e8e2d0] bg-white px-6 py-3 shadow-md transition hover:shadow-lg"
              >
                <Bell className="size-5 text-[#06452d]" />
                <span className="text-sm font-semibold text-[#173c2d]">
                  Adhan Notification
                </span>

                <span
                  className={`relative h-6 w-11 rounded-full transition ${
                    notification ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 size-4 rounded-full bg-white transition-all ${
                      notification ? "left-6" : "left-1"
                    }`}
                  />
                </span>
              </button>

              <span className="hidden h-8 w-px bg-[#b8a878] sm:block" />

              <div className="flex items-center gap-3 rounded-full border border-[#e8e2d0] bg-white px-6 py-3 text-sm font-semibold text-[#173c2d] shadow-md">
                <CalendarDays className="size-5 text-[#06452d]" />
                Daily prayer times for {district}
                <ChevronRight className="size-5" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
