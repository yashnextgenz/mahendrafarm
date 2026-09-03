import { cn } from "@/lib/utils";

type Stat = { value: string; label: string };

export function StatsSection({
  stats,
  className,
  variant = "light",
}: {
  stats: Stat[];
  className?: string;
  variant?: "light" | "dark" | "card";
}) {
  const isDark = variant === "dark";
  const isCard = variant === "card";
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4",
        isCard && "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:p-8",
        className
      )}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={cn(
            "flex flex-col items-center text-center",
            isCard && "rounded-2xl bg-cream/60 px-3 py-6"
          )}
        >
          <span
            className={cn(
              "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
              isDark ? "text-lightgreen" : "text-forest"
            )}
          >
            {s.value}
          </span>
          <span
            className={cn(
              "mt-1.5 text-xs font-semibold uppercase tracking-wide sm:text-sm",
              isDark ? "text-cream/75" : "text-ink/70"
            )}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
