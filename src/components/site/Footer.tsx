import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE, FOOTER_ACTIVITIES } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-darkgreen text-cream">
      {/* Decorative top edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-mediumgreen via-forest to-mediumgreen" />

      {/* Faint farm silhouette decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(60% 100% at 10% 100%, #DFF0C8 0%, transparent 60%), radial-gradient(60% 100% at 90% 100%, #DFF0C8 0%, transparent 60%)",
        }}
      />

      <div className="relative container-page py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label={SITE.name}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lightgreen text-forest">
                <Leaf className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white">MAHINDRA</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lightgreen">
                  Integrated Farm
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Mahindra Integrated Farm is committed to natural farming practices,
              offering fresh produce, livestock, and plantation products for a
              healthier tomorrow.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-lightgreen">
              {SITE.tagline}
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
                { Icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
                { Icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
                { Icon: MessageCircle, href: SITE.social.whatsapp, label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-lightgreen hover:text-forest"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-lightgreen">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/75 transition-colors hover:text-lightgreen"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-lightgreen">
              Our Activities
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {FOOTER_ACTIVITIES.map((act) => (
                <li key={act}>
                  <Link
                    href="/farming-activities"
                    className="text-sm text-cream/75 transition-colors hover:text-lightgreen"
                  >
                    {act}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-lightgreen">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-cream/80">
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
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream/60">
            © {year} Mahindra Integrated Farm. All Rights Reserved.
          </p>
          <p className="text-xs text-cream/60">
            Designed with <span className="text-lightgreen">♥</span> for a Greener Tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
