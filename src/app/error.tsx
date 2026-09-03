"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/site/Button";
import { Leaf, RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console (in production this would go to a service)
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-mediumgreen/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-lightgreen/30 blur-3xl"
      />
      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-forest text-lightgreen shadow-float">
          <AlertTriangle className="h-8 w-8" strokeWidth={2} />
        </span>
        <p className="mt-8 text-5xl font-extrabold tracking-tight text-forest sm:text-6xl">
          Something Went Wrong
        </p>
        <span className="mt-3 h-1 w-16 rounded-full bg-mediumgreen" />
        <h1 className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-ink/70 sm:text-xl">
          An unexpected error occurred while loading this page. Please try again —
          if the problem persists, head back to the farm.
        </h1>
        {error.digest && (
          <p className="mt-3 rounded-full bg-white/60 px-3 py-1 text-xs font-mono text-ink/40">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-darkgreen hover:shadow-md hover:-translate-y-0.5 sm:text-base"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Button href="/" variant="outline" size="lg">
            <Home className="h-4 w-4" />
            Back To Home
          </Button>
        </div>
        <Link
          href="/blog"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mediumgreen transition-colors hover:text-forest"
        >
          <Leaf className="h-4 w-4" />
          Or read our latest stories
        </Link>
      </div>
    </section>
  );
}
