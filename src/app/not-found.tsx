import Link from "next/link";
import { Button } from "@/components/site/Button";
import { Leaf, ArrowLeft, Home, Phone } from "lucide-react";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
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
          <Leaf className="h-8 w-8" strokeWidth={2} />
        </span>
        <p className="mt-8 text-6xl font-extrabold tracking-tight text-forest sm:text-8xl">
          404
        </p>
        <span className="mt-3 h-1 w-16 rounded-full bg-mediumgreen" />
        <h1 className="mt-5 text-2xl font-extrabold uppercase tracking-tight text-forest sm:text-3xl">
          This Page Took A Different Path
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
          The page you were looking for doesn't exist or has moved. Let's get you
          back to the farm — fresh content, products and stories await.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg" withArrow>
            <Home className="h-4 w-4" />
            Back To Home
          </Button>
          <Button href="/blog" variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Read The Blog
          </Button>
        </div>
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mediumgreen transition-colors hover:text-forest"
        >
          <Phone className="h-4 w-4" />
          Or call us at {SITE.phone}
        </a>
      </div>
    </section>
  );
}
