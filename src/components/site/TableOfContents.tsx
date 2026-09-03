"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export type TocItem = { id: string; text: string };

/**
 * Sticky table of contents for long-form articles. Tracks the heading that is
 * currently in view and highlights it. Clicking an item smooth-scrolls to it.
 *
 * The headings must already exist in the DOM with matching `id`s. We assign
 * those ids from the parent article via the `ids` prop (slugged).
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block"
    >
      <div className="sticky top-24 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mediumgreen">
          On This Page
        </p>
        <ul className="mt-3 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={cn(
                  "block w-full border-l-2 py-1.5 pl-3 text-left text-sm transition-colors",
                  activeId === item.id
                    ? "border-mediumgreen font-semibold text-forest"
                    : "border-transparent text-ink/60 hover:text-forest hover:bg-cream"
                )}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          }}
          className="mt-4 inline-flex items-center gap-1.5 border-t border-border pt-3 text-xs font-bold uppercase tracking-wide text-mediumgreen transition-colors hover:text-forest"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          Back to top
        </button>
      </div>
    </nav>
  );
}
