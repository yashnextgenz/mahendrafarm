"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

// useSyncExternalStore lets us read a client-only value (whether we're mounted
// on the client) without triggering the "setState in render/effect" lint rule
// and without any hydration mismatch — the server snapshot is always `false`.
const subscribe = (cb: () => void) => {
  // We only need to "subscribe" to nothing; the store flips to true on first client read.
  // Use a microtask so the change is observed after mount.
  const t = setTimeout(cb, 0);
  return () => clearTimeout(t);
};
const getSnapshot = () => true; // client
const getServerSnapshot = () => false; // server

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-lightgreen",
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )
      ) : (
        // Placeholder to reserve space until mounted on the client
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
