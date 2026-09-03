import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Network } from "lucide-react";

type CTASectionProps = {
  heading?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

export function CTASection({
  heading = "BECOME OUR DISTRIBUTOR",
  description = "Join hands with us and grow your business with natural farm products.",
  buttonLabel = "KNOW MORE",
  buttonHref = "/gallery#distributor",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("container-page", className)} aria-label="Distributor call to action">
      <div className="relative overflow-hidden rounded-3xl bg-lightgreen px-6 py-10 shadow-soft ring-1 ring-mediumgreen/15 sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/40 blur-2xl"
        />
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center lg:items-start lg:text-left">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forest text-lightgreen shadow-sm">
              <Network className="h-8 w-8" strokeWidth={2} />
            </span>
            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-forest sm:text-3xl">
                {heading}
              </h2>
              <p className="mt-2 text-sm text-ink/75 sm:text-base">{description}</p>
            </div>
          </div>
          <Button href={buttonHref} variant="primary" size="lg" withArrow className="shrink-0">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
