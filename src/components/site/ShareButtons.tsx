"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Share2, Link2, Check, Facebook, Twitter, MessageCircle, Mail } from "lucide-react";

type ShareButtonsProps = {
  title: string;
  className?: string;
};

/**
 * Social share buttons for a blog article. Uses the current URL at click time
 * (so it works correctly after any client-side routing). WhatsApp, Facebook,
 * X (Twitter), Email, and a "copy link" button with a copied-confirmation state.
 */
export function ShareButtons({ title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const share = (network: "whatsapp" | "facebook" | "twitter" | "email") => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(title);
    const links: Record<typeof network, string> = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      email: `mailto:?subject=${text}&body=I%20thought%20you%20might%20like%20this%20article%20from%20Mahindra%20Integrated%20Farm%3A%0A%0A${url}`,
    };
    if (network === "email") {
      window.location.href = links[network];
    } else {
      window.open(links[network], "_blank", "noopener,noreferrer,width=640,height=540");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const btn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mediumgreen focus-visible:ring-offset-2";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cream/70">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </span>
      <button
        type="button"
        onClick={() => share("whatsapp")}
        aria-label="Share on WhatsApp"
        className={cn(btn, "bg-white/10 text-lightgreen hover:bg-white/20")}
      >
        <MessageCircle className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => share("facebook")}
        aria-label="Share on Facebook"
        className={cn(btn, "bg-white/10 text-lightgreen hover:bg-white/20")}
      >
        <Facebook className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => share("twitter")}
        aria-label="Share on X (Twitter)"
        className={cn(btn, "bg-white/10 text-lightgreen hover:bg-white/20")}
      >
        <Twitter className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => share("email")}
        aria-label="Share via email"
        className={cn(btn, "bg-white/10 text-lightgreen hover:bg-white/20")}
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className={cn(btn, "bg-lightgreen text-forest hover:bg-white")}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      {copied && (
        <span className="text-xs font-medium text-lightgreen">Copied!</span>
      )}
    </div>
  );
}
