"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  jobId: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", phone: "", jobId: "", message: "" };

export function JobApplicationForm({
  jobs,
  preselectedJobId,
}: {
  jobs: { id: string; title: string }[];
  preselectedJobId?: string;
}) {
  const [values, setValues] = useState<FormState>({
    ...EMPTY,
    jobId: preselectedJobId ?? "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email";
    if (!/^[+]?[\d\s-]{7,15}$/.test(values.phone.trim()))
      next.phone = "Please enter a valid phone number";
    if (!values.jobId) next.jobId = "Please select a position";
    if (values.message.trim().length < 10)
      next.message = "Tell us a little about yourself (min 10 characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus("loading");
    // Simulate async submission (no backend wired for job applications yet)
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setValues({ ...EMPTY, jobId: preselectedJobId ?? "" });
    setTimeout(() => setStatus("idle"), 6000);
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink/40 focus:border-mediumgreen focus:ring-2 focus:ring-mediumgreen/30",
      errors[field] ? "border-red-400" : "border-border"
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="ja-name">
          <input
            id="ja-name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className={inputClass("name")}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="ja-email">
          <input
            id="ja-email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass("email")}
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Phone" error={errors.phone} htmlFor="ja-phone">
          <input
            id="ja-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="98765 43210"
            className={inputClass("phone")}
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Position" error={errors.jobId} htmlFor="ja-job">
          <select
            id="ja-job"
            value={values.jobId}
            onChange={(e) => update("jobId", e.target.value)}
            className={cn(inputClass("jobId"), "appearance-none")}
            aria-invalid={!!errors.jobId}
          >
            <option value="">Select a position</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Why are you interested?" error={errors.message} htmlFor="ja-message">
        <textarea
          id="ja-message"
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us a little about yourself and why you'd like to join our farm..."
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
            "Submit Application"
          )}
        </Button>
        {status === "success" && (
          <p
            role="status"
            className="inline-flex items-center gap-2 rounded-full bg-mediumgreen/10 px-4 py-2 text-sm font-medium text-mediumgreen"
          >
            <CheckCircle2 className="h-4 w-4" />
            Thank you! We&apos;ll review and be in touch.
          </p>
        )}
        {status === "error" && serverError && (
          <p
            role="alert"
            className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
          >
            <AlertCircle className="h-4 w-4" />
            {serverError}
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
