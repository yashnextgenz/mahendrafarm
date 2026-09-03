import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Activity } from "@/data/site";

type ActivityCardProps = {
  activity: Pick<Activity, "name" | "image">;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-20 w-20 sm:h-24 sm:w-24",
  md: "h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36",
  lg: "h-32 w-32 sm:h-40 sm:w-40 lg:h-44 lg:w-44",
};

export function ActivityCard({ activity, className, size = "md" }: ActivityCardProps) {
  return (
    <div className={cn("group flex flex-col items-center text-center", className)}>
      <div className="relative">
        <div
          className={cn(
            "overflow-hidden rounded-full border-2 border-lightgreen bg-white p-1 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-mediumgreen group-hover:shadow-md",
            sizeMap[size]
          )}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={activity.image}
              alt={activity.name}
              fill
              sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-forest sm:text-[13px]">
        {activity.name}
      </h3>
    </div>
  );
}
