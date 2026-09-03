import { Sprout, BadgeCheck, Leaf, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  Icon: typeof Sprout;
  title: string;
  subtitle: string;
};

const FEATURES: Feature[] = [
  { Icon: Sprout, title: "Natural Farming", subtitle: "100% Chemical Free" },
  { Icon: BadgeCheck, title: "Quality Products", subtitle: "Fresh & Healthy" },
  { Icon: Leaf, title: "Sustainable Practices", subtitle: "Eco Friendly" },
  { Icon: HeartHandshake, title: "Trust & Transparency", subtitle: "From Our Farm To You" },
];

export function FeatureStrip({ className }: { className?: string }) {
  return (
    <section className={cn("container-page", className)} aria-label="Our values at a glance">
      <div className="relative -mt-12 z-10 overflow-hidden rounded-3xl bg-forest px-6 py-8 shadow-lift sm:px-10 sm:py-9">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mediumgreen/20 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-lightgreen/10 blur-2xl"
        />
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {FEATURES.map(({ Icon, title, subtitle }) => (
            <li key={title} className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lightgreen ring-1 ring-white/15">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-bold uppercase tracking-wide text-white sm:text-[15px]">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs text-cream/70 sm:text-[13px]">{subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
