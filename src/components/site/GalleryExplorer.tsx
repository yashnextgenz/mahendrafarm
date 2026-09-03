"use client";

import { useMemo, useState } from "react";
import { GalleryCard } from "./GalleryCard";
import { Lightbox } from "./Lightbox";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory } from "@/data/site";
import { cn } from "@/lib/utils";

export function GalleryExplorer() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Pre-compute counts per category for the filter badges
  const counts = useMemo(() => {
    const map = new Map<GalleryCategory, number>();
    GALLERY_FILTERS.forEach((f) => {
      map.set(
        f,
        f === "All" ? GALLERY.length : GALLERY.filter((g) => g.category === f).length
      );
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return GALLERY;
    return GALLERY.filter((g) => g.category === active);
  }, [active]);

  const handleNavigate = (index: number) => setLightboxIndex(index);

  return (
    <div>
      {/* Filter buttons with counts */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm",
              active === f
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-forest ring-1 ring-mediumgreen/30 hover:bg-lightgreen hover:ring-mediumgreen"
            )}
            aria-pressed={active === f}
          >
            {f}
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums",
                active === f ? "bg-white/20 text-white" : "bg-lightgreen text-forest"
              )}
            >
              {counts.get(f) ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Masonry-like grid */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {filtered.map((item, i) => (
          <GalleryCard
            key={item.src}
            src={item.src}
            alt={item.alt}
            category={item.category}
            span={item.span}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-3xl bg-cream p-12 text-center ring-1 ring-black/5">
          <p className="text-lg font-semibold text-forest">No photos in this category yet.</p>
        </div>
      )}

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
