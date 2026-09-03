"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Leaf, Search } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu whenever the route changes (incl. hash navigation)
  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    return pathname === base;
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full bg-white/95 px-4 py-2.5 backdrop-blur transition-all duration-300 sm:px-6 sm:py-3",
          scrolled ? "shadow-float" : "shadow-soft"
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white shadow-sm sm:h-11 sm:w-11">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-forest sm:text-lg">
              MAHINDRA
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mediumgreen sm:text-[11px]">
              Integrated Farm
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 xl:px-3.5",
                    active
                      ? "text-forest"
                      : "text-ink/70 hover:text-forest"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-mediumgreen" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop search + theme toggle + phone CTA */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/search"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-forest ring-1 ring-mediumgreen/20 transition-colors hover:bg-lightgreen hover:ring-mediumgreen/40"
          >
            <Search className="h-5 w-5" />
          </Link>
          <ThemeToggle className="h-9 w-9 ring-1 ring-mediumgreen/20 hover:ring-mediumgreen/40" />
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-darkgreen hover:shadow-md md:flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2.2} />
            <span className="tabular-nums tracking-wide">{SITE.phone}</span>
          </a>
        </div>

        {/* Mobile search + theme toggle + hamburger */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <Link
            href="/search"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-forest ring-1 ring-mediumgreen/20 transition-colors hover:bg-lightgreen"
          >
            <Search className="h-5 w-5" />
          </Link>
          <ThemeToggle className="h-9 w-9 ring-1 ring-mediumgreen/20 hover:ring-mediumgreen/40" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-lightgreen"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-auto w-full max-w-7xl overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mt-2 rounded-3xl bg-white p-4 shadow-float">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-lightgreen text-forest"
                        : "text-ink/80 hover:bg-cream hover:text-forest"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-darkgreen"
          >
            <Phone className="h-4 w-4" strokeWidth={2.2} />
            <span className="tabular-nums">{SITE.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
