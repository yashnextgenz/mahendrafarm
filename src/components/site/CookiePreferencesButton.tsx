"use client";

import { Cookie } from "lucide-react";
import { COOKIE_REOPEN_EVENT } from "./CookieConsent";

/**
 * A small footer link/button that re-opens the cookie consent banner by
 * dispatching the COOKIE_REOPEN_EVENT custom event. Lets users change their
 * cookie preference any time without a page reload.
 */
export function CookiePreferencesButton() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent(COOKIE_REOPEN_EVENT));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-cream/55 transition-colors hover:text-lightgreen"
    >
      <Cookie className="h-3.5 w-3.5" />
      Cookie preferences
    </button>
  );
}
