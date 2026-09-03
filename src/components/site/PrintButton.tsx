"use client";

import { Printer } from "lucide-react";

/**
 * A small client button that triggers the browser print dialog. Kept as a
 * client component because onClick handlers cannot live in server components.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-print-hide
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest bg-white/0 px-5 py-2.5 text-sm font-semibold text-forest transition-all duration-300 hover:bg-forest hover:text-white"
    >
      <Printer className="h-4 w-4" />
      Print
    </button>
  );
}
