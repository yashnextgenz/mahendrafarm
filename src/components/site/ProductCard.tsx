"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/site";
import { CheckCircle2 } from "lucide-react";

type ProductCardProps = {
  product: Product;
  className?: string;
  onEnquire?: (product: Product) => void;
};

export function ProductCard({ product, className, onEnquire }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-forest/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur">
          <CheckCircle2 className="h-3 w-3" />
          {product.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-forest">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
          {product.description}
        </p>
        <button
          type="button"
          onClick={() => onEnquire?.(product)}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-lightgreen px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-forest transition-all duration-300 hover:bg-forest hover:text-white"
        >
          Enquire Now
        </button>
      </div>
    </article>
  );
}
