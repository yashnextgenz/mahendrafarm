"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, X, Loader2, FileText, Package, Sprout, ArrowRight, Leaf } from "lucide-react";

type Result = {
  type: "blog" | "product" | "activity";
  title: string;
  excerpt: string;
  href: string;
  category: string;
};

type Results = {
  blog: Result[];
  products: Result[];
  activities: Result[];
};

const TYPE_META: Record<
  Result["type"],
  { label: string; Icon: typeof FileText; tint: string }
> = {
  blog: { label: "Article", Icon: FileText, tint: "bg-mediumgreen/15 text-mediumgreen" },
  product: { label: "Product", Icon: Package, tint: "bg-forest/15 text-forest" },
  activity: { label: "Activity", Icon: Sprout, tint: "bg-lightgreen text-forest" },
};

const POPULAR_SEARCHES = [
  "dairy",
  "vegetables",
  "natural farming",
  "distributor",
  "eggs",
  "coconut",
];

export function SearchExplorer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search as the user types
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults(null);
      setLoading(false);
      setSubmitted(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          results?: Results;
        };
        if (data.ok && data.results) {
          setResults(data.results);
        } else {
          setResults({ blog: [], products: [], activities: [] });
        }
      } catch {
        setResults({ blog: [], products: [], activities: [] });
      } finally {
        setLoading(false);
        setSubmitted(true);
      }
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const allResults = results
    ? [...results.blog, ...results.products, ...results.activities]
    : [];
  const total = allResults.length;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, products, farming activities..."
          aria-label="Search the website"
          className="w-full rounded-full border border-border bg-white py-4 pl-12 pr-12 text-base text-ink shadow-soft outline-none transition-colors placeholder:text-ink/40 focus:border-mediumgreen focus:ring-2 focus:ring-mediumgreen/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-cream hover:text-forest"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Popular searches (shown when no query) */}
      {!query.trim() && (
        <div className="mt-5">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-ink/40">
            Popular searches
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-forest shadow-soft ring-1 ring-mediumgreen/20 transition-all duration-200 hover:bg-forest hover:text-white hover:ring-forest"
              >
                <Search className="h-3 w-3" />
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helper text */}
      <p className="mt-3 text-center text-sm text-ink/60">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Searching...
          </span>
        ) : query.trim().length < 2 ? (
          "Type at least 2 characters to search across our blog, products and farming activities."
        ) : submitted ? (
          total === 0 ? (
            <>No results for “<span className="font-semibold text-forest">{query.trim()}</span>”.</>
          ) : (
            <>
              <span className="font-semibold text-forest">{total}</span> result
              {total !== 1 && "s"} for “<span className="font-semibold text-forest">{query.trim()}</span>”
            </>
          )
        ) : null}
      </p>

      {/* Results */}
      {submitted && total > 0 && (
        <div className="mt-8 space-y-3">
          {allResults.map((r, i) => {
            const meta = TYPE_META[r.type];
            return (
              <Link
                key={`${r.type}-${i}`}
                href={r.href}
                className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    meta.tint
                  )}
                >
                  <meta.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-lightgreen px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest">
                      {meta.label}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wide text-ink/40">
                      {r.category}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-base font-bold text-forest transition-colors group-hover:text-mediumgreen">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65 line-clamp-2">
                    {r.excerpt}
                  </p>
                </div>
                <ArrowRight className="mt-3 h-4 w-4 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:text-mediumgreen" />
              </Link>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {submitted && total === 0 && (
        <div className="mt-8 rounded-3xl bg-cream px-6 py-10 text-center sm:p-10 ring-1 ring-black/5">
          <Leaf className="mx-auto h-10 w-10 text-ink/30" />
          <p className="mt-3 text-lg font-semibold text-forest">No results found</p>
          <p className="mt-1 text-sm text-ink/60">
            Try a different term, or browse our{" "}
            <Link href="/blog" className="font-semibold text-mediumgreen hover:underline">
              blog
            </Link>{" "}
            and{" "}
            <Link href="/products" className="font-semibold text-mediumgreen hover:underline">
              products
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
