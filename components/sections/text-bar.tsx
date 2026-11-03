
"use client";

const messages = [
  "✦ Knowledge is Light",
  "✦ Learn • Grow • Succeed",
  "✦ Empowering Islamic Education",
  "✦ The Best Among You Are Those Who Learn and Teach",
];

export function TextBar() {
  return (
    <div className="w-full overflow-hidden bg-emerald-900 py-3 text-white">
      <div className="flex w-max animate-[scroll_20s_linear_infinite]">
        {[...messages, ...messages, ...messages].map((message, index) => (
          <span
            key={index}
            className="shrink-0 px-8 text-sm font-semibold tracking-wide md:text-base"
          >
            {message}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
