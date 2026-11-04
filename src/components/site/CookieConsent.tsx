"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "mif-cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * Custom event name used by the footer "Cookie preferences" button to ask
 * this banner to re-open without a page reload.
 */
export const COOKIE_REOPEN_EVENT = "mif:reopen-cookie-consent";

/**
 * Returns whether consent has already been recorded. Used as a lazy initial
 * state so we don't need to setState synchronously inside an effect.
 */
function readHasConsent(): boolean {
  if (typeof window === "undefined") return true; // SSR: assume consent, don't show
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return true; // localStorage unavailable: don't show the banner
  }
}

export function CookieConsent() {
  // Lazy initial: if consent already recorded (or SSR/localStorage unavailable),
  // `remaining` starts false and the banner never shows.
  const [remaining, setRemaining] = useState<boolean>(() => !readHasConsent());
  const [show, setShow] = useState(false);

  // Reveal the banner shortly after mount if consent is still pending.
  useEffect(() => {
    if (!remaining) return;
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, [remaining]);

  // Listen for the footer "Cookie preferences" button to re-open the banner.
  useEffect(() => {
    const onReopen = () => {
      setShow(true);
      setRemaining(true);
    };
    window.addEventListener(COOKIE_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(COOKIE_REOPEN_EVENT, onReopen);
  }, []);

  const decide = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
    setRemaining(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className={cn(
        "fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-2xl bg-white p-3 shadow-lift sm:rounded-3xl ring-1 ring-black/10 sm:inset-x-4 sm:bottom-4 sm:p-5",
        "animate-[fadeInUp_0.4s_ease-out]"
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="hidden h-10 w-10 shrink-0 sm:flex items-center justify-center rounded-full bg-lightgreen text-forest sm:h-11 sm:w-11">
          <Cookie className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-forest">
            We use cookies to improve your experience
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink/60">
            <span className="hidden sm:inline">We use essential cookies to run this site and optional analytics to understand
            what content you enjoy. You can choose what to allow. </span>See our{" "}
            <a href="/privacy" className="font-semibold text-mediumgreen underline-offset-2 hover:underline">
              privacy policy
            </a>{" "}
            for details.
          </p>
          <div className="mt-2 flex flex-wrap gap-2 sm:mt-3">
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-darkgreen"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-4 py-2 text-xs font-bold uppercase tracking-wide text-forest transition-colors hover:bg-cream"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => decide("rejected")}
          aria-label="Dismiss"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-cream hover:text-forest"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
