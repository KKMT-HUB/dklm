import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-900 sm:text-4xl">{title}</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink-600">{children}</div>
      </main>
      <Footer />
    </>
  );
}
