import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, Clock, ArrowRight, Leaf } from "lucide-react";

// Slugify a category name into a URL-safe slug for the category page.
function categoryHref(category: string): string {
  const slug = category
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `/blog/category/${slug}`;
}

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  createdAt: Date | string;
  featured?: boolean;
};

function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ post, className }: { post: BlogCardData; className?: string }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={categoryHref(post.category)}
            className="inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-forest transition-colors hover:bg-forest hover:text-white"
          >
            <Leaf className="h-3 w-3" />
            {post.category}
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-ink/40">
            <Clock className="h-3.5 w-3.5" />
            {post.readMinutes} min
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-forest">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-mediumgreen">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-ink/40">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.createdAt)}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-mediumgreen transition-colors hover:text-forest"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
