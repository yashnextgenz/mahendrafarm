import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className,
}: SectionHeadingProps) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
            isDark ? "text-lightgreen" : "text-mediumgreen"
          )}
        >
          <Leaf className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl",
          isDark ? "text-white" : "text-forest"
        )}
      >
        {title}
      </h2>
      {align === "center" && (
        <span className="h-1 w-16 rounded-full bg-mediumgreen" aria-hidden />
      )}
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed",
            isDark ? "text-cream/75" : "text-ink/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
