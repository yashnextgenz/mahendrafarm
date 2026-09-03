import Image from "next/image";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  align?: "center" | "left";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  align = "center",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        className
      )}
      aria-label={title}
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-darkgreen/85 via-darkgreen/75 to-forest/85" />
      </div>

      <div
        className={cn(
          "container-page flex min-h-[42vh] flex-col justify-center py-20 sm:py-24 lg:min-h-[46vh]",
          align === "center" ? "items-center text-center" : "items-start text-left"
        )}
      >
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-lightgreen ring-1 ring-white/15 backdrop-blur">
            <Leaf className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
