
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    return pathname === base;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT - LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex flex-col leading-none"
        >
          <span className="text-xl font-bold tracking-tight text-forest sm:text-2xl">
            MAHINDRA
          </span>

          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-mediumgreen sm:text-[10px]">
            Integrated Farm
          </span>
        </Link>

        {/* CENTER - DESKTOP MENU */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active
                    ? "text-forest"
                    : "text-gray-600 hover:text-forest"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT - PHONE */}
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="hidden text-sm font-semibold text-forest md:block"
        >
          {SITE.phone}
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-forest hover:bg-gray-100 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col">

              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-gray-100 px-2 py-3 text-sm font-medium",
                      active
                        ? "text-forest"
                        : "text-gray-600 hover:text-forest"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* MOBILE PHONE */}
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="px-2 py-3 text-sm font-semibold text-forest"
              >
                {SITE.phone}
              </a>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
