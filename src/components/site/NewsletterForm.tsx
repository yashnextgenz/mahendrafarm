"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Mail, CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError(undefined);
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setServerError(data.error ?? "Could not subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={submit} noValidate className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50"
            aria-hidden
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            placeholder="Your email address"
            aria-label="Email address for newsletter"
            aria-invalid={!!error}
            className={cn(
              "w-full rounded-full border bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-cream/40 outline-none transition-colors focus:bg-white/15 focus:ring-2 focus:ring-lightgreen/50",
              error ? "border-red-400/70" : "border-white/15"
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-lightgreen px-5 py-3 text-sm font-bold uppercase tracking-wide text-forest transition-colors hover:bg-white disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              Subscribe
            </>
          )}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      {status === "success" && (
        <p role="status" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-lightgreen">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Subscribed! Watch for farm updates in your inbox.
        </p>
      )}
      {status === "error" && serverError && (
        <p role="alert" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-300">
          <AlertCircle className="h-3.5 w-3.5" />
          {serverError}
        </p>
      )}
    </div>
  );
}

