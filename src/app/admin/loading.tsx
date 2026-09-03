import { Skeleton } from "@/components/site/Skeleton";

export default function AdminLoading() {
  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="container-page">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>
        </div>

        {/* Stat cards skeleton */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5"
            >
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <Skeleton className="mt-3 h-7 w-16" />
              <Skeleton className="mt-2 h-3 w-24" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="mt-8 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5 sm:p-7">
          <Skeleton className="h-6 w-48" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border pb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
