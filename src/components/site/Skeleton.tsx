import { cn } from "@/lib/utils";

/**
 * Lightweight shimmering skeleton block for loading states.
 * Uses a CSS-only pulse animation — no animation libraries.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-lightgreen/40 animate-pulse",
        className
      )}
      aria-hidden
    />
  );
}

/** A skeleton card matching BlogCard's shape, used in blog loading states. */
export function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="mt-3 h-6 w-full" />
        <Skeleton className="mt-2 h-6 w-2/3" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

/** A skeleton matching the featured post split-card on the blog listing. */
export function FeaturedPostSkeleton() {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 lg:grid-cols-2">
      <Skeleton className="aspect-[16/10] w-full rounded-none lg:aspect-auto lg:min-h-[22rem]" />
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="mt-4 h-8 w-full" />
        <Skeleton className="mt-2 h-8 w-3/4" />
        <Skeleton className="mt-3 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-5/6" />
        <div className="mt-5 flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="mt-7 h-11 w-40 rounded-full" />
      </div>
    </div>
  );
}
