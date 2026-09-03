import { Skeleton } from "@/components/site/Skeleton";

export default function BlogSlugLoading() {
  return (
    <article className="bg-cream">
      {/* Hero skeleton */}
      <header className="relative isolate overflow-hidden bg-darkgreen py-16 pb-20 text-white sm:py-20 sm:pb-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-7 w-32 rounded-full bg-white/15 animate-pulse" />
            <div className="mx-auto mt-5 h-5 w-28 rounded-full bg-white/10 animate-pulse" />
            <div className="mx-auto mt-4 h-10 w-full max-w-xl rounded-2xl bg-white/10 animate-pulse" />
            <div className="mx-auto mt-3 h-10 w-2/3 rounded-2xl bg-white/10 animate-pulse" />
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Body skeleton */}
      <div className="container-page py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-10">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-6 h-6 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
            <Skeleton className="mt-6 h-6 w-3/4" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        </div>
      </div>
    </article>
  );
}
