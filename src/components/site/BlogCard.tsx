import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, Clock, ArrowRight } from "lucide-react";

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
        <span className="absolute left-3 top-3 rounded-full bg-forest/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-wide text-ink/50">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1">
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
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-mediumgreen transition-colors hover:text-forest"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
