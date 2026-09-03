"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";

const AUTO_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const jump = (i: number) => setIndex(i);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  const active = TESTIMONIALS[index];

  return (
    <div
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/5 sm:p-10">
        <Quote
          className="absolute right-6 top-6 h-12 w-12 text-lightgreen/60"
          aria-hidden
        />
        <div className="flex gap-0.5 text-mediumgreen" aria-label={`${active.rating} out of 5 stars`}>
          {Array.from({ length: active.rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} />
          ))}
        </div>

        <blockquote
          key={active.name}
          className="mt-5 text-lg leading-relaxed text-ink/85 sm:text-xl"
        >
          “{active.quote}”
        </blockquote>

        <div className="mt-6 flex items-center gap-4">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-sm font-bold uppercase text-lightgreen"
            aria-hidden
          >
            {active.initials}
          </span>
          <div>
            <p className="text-base font-bold text-forest">{active.name}</p>
            <p className="text-sm text-ink/60">
              {active.role} · {active.location}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest shadow-soft ring-1 ring-black/5 transition-colors hover:bg-forest hover:text-lightgreen"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              aria-current={i === index}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-7 bg-mediumgreen"
                  : "w-2.5 bg-mediumgreen/30 hover:bg-mediumgreen/60"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest shadow-soft ring-1 ring-black/5 transition-colors hover:bg-forest hover:text-lightgreen"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
