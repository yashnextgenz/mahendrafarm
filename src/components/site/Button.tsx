import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mediumgreen focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white shadow-sm hover:bg-darkgreen hover:shadow-md hover:-translate-y-0.5",
  outline:
    "border-2 border-forest text-forest bg-white/0 hover:bg-forest hover:text-white hover:-translate-y-0.5",
  light:
    "bg-white text-forest shadow-sm hover:bg-lightgreen hover:-translate-y-0.5",
  ghost: "text-forest hover:bg-lightgreen",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm sm:text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = false,
  ...rest
}: ButtonAsLink | ButtonAsButton) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" strokeWidth={2.2} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={"disabled" in rest ? rest.disabled : undefined}
      className={cn(classes, "disabled:cursor-not-allowed disabled:opacity-70")}
    >
      {content}
    </button>
  );
}
