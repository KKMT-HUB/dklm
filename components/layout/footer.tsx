import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navLinks } from "@/lib/navigation";
import { footerServiceLinks } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="scroll-mt-16 bg-primary-950 text-primary-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-200/80">{siteConfig.description}</p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-display text-base font-semibold text-white">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="text-primary-200/80 transition-colors hover:text-accent-300">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="text-primary-200/80 transition-colors hover:text-accent-300">
                Login
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="font-display text-base font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerServiceLinks.map((name) => (
              <li key={name}>
                <Link href="/#services" className="text-primary-200/80 transition-colors hover:text-accent-300">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-200/80">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent-300">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
              <span>{siteConfig.contact.phone}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
              <span>{siteConfig.contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-primary-200/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="hover:text-accent-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-accent-300">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
