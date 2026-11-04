import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-darkgreen text-cream">
      <div className="container-page py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex rounded-xl bg-white px-4 py-2.5" aria-label={SITE.name}>
              <Image src="/logo-full.png" alt={SITE.name} width={1545} height={460} className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              Committed to natural farming practices, offering fresh produce, livestock and
              plantation products for a healthier tomorrow.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 transition-colors hover:text-lightgreen">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white">Get In Touch</h3>
            <ul className="mt-4 space-y-4 text-sm text-cream/70">
              <li>
                <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-3 transition-colors hover:text-lightgreen">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lightgreen" />
                  <span className="tabular-nums">{SITE.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 break-all transition-colors hover:text-lightgreen">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lightgreen" />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lightgreen" />
                <span className="leading-relaxed">{SITE.address.join(" ")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 pb-20 text-xs text-cream/60 sm:flex-row sm:pb-5 sm:pr-20">
          <p>© {year} Mahindra Integrated Farm. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors hover:text-lightgreen">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
