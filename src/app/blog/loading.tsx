import { FeaturedPostSkeleton, BlogCardSkeleton } from "@/components/site/Skeleton";

export default function BlogLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative isolate overflow-hidden bg-darkgreen py-20 text-white sm:py-24">
        <div className="container-page flex min-h-[42vh] flex-col items-center justify-center text-center">
          <div className="h-6 w-40 rounded-full bg-white/15 animate-pulse" />
          <div className="mt-5 h-12 w-72 rounded-2xl bg-white/10 animate-pulse" />
          <div className="mt-4 h-5 w-96 max-w-full rounded-xl bg-white/10 animate-pulse" />
        </div>
      </section>

      {/* Featured skeleton */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page">
          <FeaturedPostSkeleton />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col items-center gap-3">
            <div className="h-4 w-28 rounded-full bg-lightgreen/50 animate-pulse" />
            <div className="h-9 w-64 rounded-2xl bg-lightgreen/40 animate-pulse" />
            <div className="h-1 w-16 rounded-full bg-lightgreen/40 animate-pulse" />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
