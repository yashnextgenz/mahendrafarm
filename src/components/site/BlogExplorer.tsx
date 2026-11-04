"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";
import { BLOG_CATEGORIES } from "@/data/site";
import { cn } from "@/lib/utils";
import { Search, X, Filter } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  createdAt: Date | string;
};

type Category = (typeof BLOG_CATEGORIES)[number];

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");

  // Count per category (excluding "All")
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
    return map;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, category, query]);

  const hasFilters = category !== "All" || query.trim() !== "";

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col gap-5">
        {/* Search bar */}
        <div className="relative mx-auto w-full max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-10 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink/40 focus:border-mediumgreen focus:ring-2 focus:ring-mediumgreen/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-cream hover:text-forest"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink/50">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </span>
          {BLOG_CATEGORIES.map((c) => {
            const isAll = c === "All";
            const count = isAll ? posts.length : counts.get(c) ?? 0;
            // Hide empty categories (except All)
            if (!isAll && count === 0) return null;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 sm:text-sm",
                  category === c
                    ? "bg-forest text-white shadow-sm"
                    : "bg-white text-forest ring-1 ring-mediumgreen/30 hover:bg-lightgreen hover:ring-mediumgreen"
                )}
              >
                {c}
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums",
                    category === c
                      ? "bg-white/20 text-white"
                      : "bg-lightgreen text-forest"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="mt-6 text-center text-sm text-ink/60">
        {filtered.length === 0 ? (
          "No articles match your search."
        ) : (
          <>
            Showing <span className="font-semibold text-forest">{filtered.length}</span>{" "}
            article{filtered.length !== 1 && "s"}
            {category !== "All" && (
              <>
                {" "}in <span className="font-semibold text-forest">{category}</span>
              </>
            )}
            {query.trim() && (
              <>
                {" "}for “<span className="font-semibold text-forest">{query.trim()}</span>”
              </>
            )}
          </>
        )}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl bg-cream px-6 py-10 text-center sm:p-12 ring-1 ring-black/5">
          <p className="text-lg font-semibold text-forest">No articles found</p>
          <p className="mt-1 text-sm text-ink/60">
            Try a different search term or category.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-darkgreen"
            >
              <X className="h-3.5 w-3.5" />
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
