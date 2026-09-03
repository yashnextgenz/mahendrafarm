import { Skeleton } from "@/components/site/Skeleton";

export default function ProductsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative isolate overflow-hidden bg-darkgreen py-20 text-white sm:py-24">
        <div className="container-page flex min-h-[42vh] flex-col items-center justify-center text-center">
          <div className="h-6 w-32 rounded-full bg-white/15 animate-pulse" />
          <div className="mt-5 h-12 w-72 rounded-2xl bg-white/10 animate-pulse" />
          <div className="mt-4 h-5 w-80 max-w-full rounded-xl bg-white/10 animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto mt-3 h-5 w-80" />
          </div>
          {/* Filter pills skeleton */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
          {/* Grid skeleton */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="flex flex-1 flex-col p-5">
                  <Skeleton className="h-5 w-28 rounded-full" />
                  <Skeleton className="mt-3 h-5 w-2/3" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                  <Skeleton className="mt-4 h-9 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
