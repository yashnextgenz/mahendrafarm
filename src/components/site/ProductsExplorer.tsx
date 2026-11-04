"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS, PRODUCT_FILTERS, type ProductCategory } from "@/data/site";
import { cn } from "@/lib/utils";

type Filter = "All" | ProductCategory;

export function ProductsExplorer() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {PRODUCT_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm",
              active === f
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-forest ring-1 ring-mediumgreen/30 hover:bg-lightgreen hover:ring-mediumgreen"
            )}
            aria-pressed={active === f}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mt-6 text-center text-sm text-ink/60">
        Showing {filtered.length} product{filtered.length !== 1 && "s"}
        {active !== "All" && (
          <>
            {" "}in <span className="font-semibold text-forest">{active}</span>
          </>
        )}
      </p>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-3xl bg-cream px-6 py-10 text-center sm:p-12 ring-1 ring-black/5">
          <p className="text-lg font-semibold text-forest">No products in this category yet.</p>
          <p className="mt-1 text-sm text-ink/60">Please check back soon or contact us directly.</p>
        </div>
      )}
    </div>
  );
}
