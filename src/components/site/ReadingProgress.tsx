"use client";

import { useEffect, useState } from "react";

/**
 * A thin fixed progress bar at the top of the viewport that tracks how far
 * the user has scrolled through the page. Respects reduced motion (renders
 * statically without transitions in that case, but still updates).
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-mediumgreen via-lightgreen to-mediumgreen transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
