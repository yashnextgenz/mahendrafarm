"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { CheckCircle2, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

const INTERESTS = [
  "Fresh Vegetables",
  "Dairy Products",
  "Poultry Products",
  "Flowers",
  "Groundnuts & Pulses",
  "Distributorship",
  "General Enquiry",
];

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (field: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!values.name.trim() || values.name.trim().length < 2)
      next.name = "Please enter your name";
    if (!values.email.trim()) {
      next.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email";
    }
    if (!values.phone.trim()) {
      next.phone = "Please enter your phone number";
    } else if (!/^[+]?[\d\s-]{7,15}$/.test(values.phone.trim())) {
      next.phone = "Please enter a valid phone number";
    }
    if (!values.interest) next.interest = "Please select an option";
    if (!values.message.trim() || values.message.trim().length < 10)
      next.message = "Please tell us a little more (min 10 characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulate async submission (no backend wired yet)
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setValues(EMPTY);
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink/40 focus:border-mediumgreen focus:ring-2 focus:ring-mediumgreen/30",
      errors[field] ? "border-red-400" : "border-border"
    );

  return (
    <form onSubmit={onSubmit} noValidate className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="cf-name">
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className={inputClass("name")}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="cf-email">
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass("email")}
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Phone" error={errors.phone} htmlFor="cf-phone">
          <input
            id="cf-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="98765 43210"
            className={inputClass("phone")}
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Interested In" error={errors.interest} htmlFor="cf-interest">
          <select
            id="cf-interest"
            value={values.interest}
            onChange={(e) => update("interest", e.target.value)}
            className={cn(inputClass("interest"), "appearance-none")}
            aria-invalid={!!errors.interest}
          >
            <option value="">Select an option</option>
            {INTERESTS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message} htmlFor="cf-message">
        <textarea
          id="cf-message"
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us how we can help you..."
          className={cn(inputClass("message"), "resize-none")}
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" withArrow disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Submit Enquiry"
          )}
        </Button>
        {status === "success" && (
          <p className="inline-flex items-center gap-2 rounded-full bg-mediumgreen/10 px-4 py-2 text-sm font-medium text-mediumgreen">
            <CheckCircle2 className="h-4 w-4" />
            Thank you! We&apos;ll be in touch soon.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wide text-ink/70">
        {label}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
