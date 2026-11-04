"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE, type NavItem } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMore, setMobileMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    return pathname === base || pathname.startsWith(`${base}/`);
  };
  const isGroupActive = (item: NavItem) =>
    item.children ? item.children.some((c) => isActive(c.href)) : isActive(item.href);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click / Escape key
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <nav
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Mahindra Integrated Farm - Home">
          <Image
            src="/logo-full.png"
            alt="Mahindra Integrated Farm"
            width={1545}
            height={460}
            priority
            className="h-11 w-auto sm:h-12 xl:h-14"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li key={link.label}>
                <div
                  ref={moreRef}
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setMoreOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={moreOpen}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      isGroupActive(link) ? "text-forest" : "text-gray-600 hover:text-forest"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", moreOpen && "rotate-180")} />
                  </button>
                  {moreOpen && (
                    <div className="absolute right-0 top-full z-50 pt-2">
                      <ul className="w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive(child.href)
                                  ? "bg-lightgreen/40 text-forest"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-forest"
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.href) ? "text-forest" : "text-gray-600 hover:text-forest"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-mediumgreen" />
                  )}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* RIGHT - PHONE + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-mediumgreen"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-forest hover:bg-gray-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-gray-100 bg-white lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.label} className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => setMobileMore((v) => !v)}
                    aria-expanded={mobileMore}
                    className={cn(
                      "flex w-full items-center justify-between px-2 py-3 text-sm font-medium",
                      isGroupActive(link) ? "text-forest" : "text-gray-600"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", mobileMore && "rotate-180")} />
                  </button>
                  {mobileMore && (
                    <ul className="pb-2 pl-4">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "block px-2 py-2.5 text-sm",
                              isActive(child.href) ? "font-semibold text-forest" : "text-gray-600"
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block border-b border-gray-100 px-2 py-3 text-sm font-medium",
                      isActive(link.href) ? "text-forest" : "text-gray-600 hover:text-forest"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}

            <li className="mt-4 flex flex-col gap-3">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-mediumgreen"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
