"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryCardProps = {
  src: string;
  alt: string;
  category: string;
  span?: boolean;
  onClick?: () => void;
  className?: string;
};

export function GalleryCard({ src, alt, category, span, onClick, className }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mediumgreen",
        span ? "sm:col-span-2 sm:row-span-1" : "",
        className
      )}
      aria-label={`View: ${alt}`}
    >
      <div className={cn("relative w-full", span ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/3]")}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkgreen/70 via-darkgreen/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full bg-lightgreen/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-forest">
            {category}
          </span>
          <p className="mt-2 text-sm font-semibold text-white drop-shadow">{alt}</p>
        </div>
      </div>
    </button>
  );
}
