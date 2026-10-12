import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-md flex-col items-start justify-center gap-6 px-6">
      <Logo />
      <div>
        <h1 className="font-display text-3xl font-semibold text-primary-900">We can&apos;t find that page</h1>
        <p className="mt-2 text-ink-600">The link may be old or mistyped. Head back to the home page and try again.</p>
      </div>
      <div className="flex gap-3">
        <ButtonLink href="/">Go to home page</ButtonLink>
        <ButtonLink href="/login" variant="outline">Sign in</ButtonLink>
      </div>
      <Link href="/#contact" className="text-sm text-ink-600 underline underline-offset-4 hover:text-primary-700">
        Need help? Contact us
      </Link>
    </main>
  );
}
