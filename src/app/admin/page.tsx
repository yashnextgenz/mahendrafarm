"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Lock,
  Loader2,
  RefreshCw,
  Mail,
  Phone,
  Tag,
  Clock,
  Trash2,
  CheckCircle2,
  Users,
  Inbox,
  Leaf,
  ArrowRight,
  Briefcase,
} from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
};

type Stats = { total: number; new: number; subscribers: number; activeSubs: number; applications: number };

const STATUS_OPTIONS = ["new", "read", "responded", "closed"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-mediumgreen/15 text-mediumgreen ring-mediumgreen/30",
  read: "bg-blue-100 text-blue-700 ring-blue-200",
  responded: "bg-amber-100 text-amber-700 ring-amber-200",
  closed: "bg-gray-200 text-gray-600 ring-gray-300",
};

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  message: string;
  status: string;
  createdAt: string;
};

const APP_STATUS_OPTIONS = ["new", "reviewing", "interviewed", "hired", "rejected"] as const;
type AppStatus = (typeof APP_STATUS_OPTIONS)[number];

const APP_STATUS_STYLES: Record<AppStatus, string> = {
  new: "bg-mediumgreen/15 text-mediumgreen ring-mediumgreen/30",
  reviewing: "bg-blue-100 text-blue-700 ring-blue-200",
  interviewed: "bg-amber-100 text-amber-700 ring-amber-200",
  hired: "bg-forest/15 text-forest ring-forest/30",
  rejected: "bg-gray-200 text-gray-600 ring-gray-300",
};

function formatDate(d: string) {
  return new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Auto-restore token from URL on first load (?token=...)
  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get("token");
    if (t) {
      setToken(t);
      setAuthed(true);
    }
  }, []);

  const fetchData = useCallback(async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const qs = `?token=${encodeURIComponent(t)}`;
      const [enqRes, contactRes, subRes, appRes] = await Promise.all([
        fetch(`/api/contact/list${qs}`, { cache: "no-store" }),
        fetch(`/api/contact`, { cache: "no-store" }),
        fetch(`/api/newsletter`, { cache: "no-store" }),
        fetch(`/api/applications${qs}`, { cache: "no-store" }),
      ]);
      if (enqRes.status === 401) {
        setAuthed(false);
        setError("Invalid token. Please check your admin token.");
        return;
      }
      const enqData = (await enqRes.json()) as { ok?: boolean; enquiries?: Enquiry[] };
      const contactData = (await contactRes.json()) as { ok?: boolean; total?: number; new?: number };
      const subData = (await subRes.json()) as { ok?: boolean; total?: number; active?: number };
      const appData = (await appRes.json().catch(() => ({}))) as { ok?: boolean; applications?: Application[] };
      setEnquiries(enqData.enquiries ?? []);
      setApplications(appData.applications ?? []);
      setStats({
        total: contactData.total ?? 0,
        new: contactData.new ?? 0,
        subscribers: subData.total ?? 0,
        activeSubs: subData.active ?? 0,
        applications: appData.applications?.length ?? 0,
      });
    } catch {
      setError("Network error while loading data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed && token) void fetchData(token);
  }, [authed, token, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setAuthed(true);
    // Update URL so the token persists on refresh
    const url = new URL(window.location.href);
    url.searchParams.set("token", token.trim());
    window.history.replaceState({}, "", url.toString());
  };

  const updateStatus = async (id: string, status: Status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/contact/${id}?token=${encodeURIComponent(token)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      } else {
        setError(data.error ?? "Could not update enquiry.");
      }
    } catch {
      setError("Network error while updating.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    try {
      const res = await fetch(`/api/contact/${id}?token=${encodeURIComponent(token)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      setError("Network error while deleting.");
    }
  };

  const updateAppStatus = async (id: string, status: AppStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/applications/${id}?token=${encodeURIComponent(token)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      } else {
        setError(data.error ?? "Could not update application.");
      }
    } catch {
      setError("Network error while updating.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this application permanently?")) return;
    try {
      const res = await fetch(`/api/applications/${id}?token=${encodeURIComponent(token)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      setError("Network error while deleting.");
    }
  };

  // ---- Login screen ----
  if (!authed) {
    return (
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-black/5 sm:p-10">
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-lightgreen">
                  <Lock className="h-7 w-7" />
                </span>
                <h1 className="mt-5 text-2xl font-extrabold text-forest sm:text-3xl">
                  Admin Access
                </h1>
                <p className="mt-2 text-sm text-ink/60">
                  Enter your admin token to view enquiries and subscribers.
                </p>
              </div>
              <form onSubmit={handleLogin} className="mt-7 space-y-4">
                <div>
                  <label
                    htmlFor="admin-token"
                    className="text-xs font-semibold uppercase tracking-wide text-ink/70"
                  >
                    Admin Token
                  </label>
                  <input
                    id="admin-token"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter admin token"
                    autoFocus
                    className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition-colors focus:border-mediumgreen focus:ring-2 focus:ring-mediumgreen/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!token.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-darkgreen disabled:opacity-60"
                >
                  Unlock Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-5 rounded-2xl bg-cream p-3 text-center text-xs text-ink/50">
                Dev token: <code className="font-mono text-forest">farm-admin-2025</code>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- Dashboard ----
  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lightgreen">
              <Leaf className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-forest sm:text-3xl">
                Farm Admin Dashboard
              </h1>
              <p className="text-sm text-ink/60">Enquiries, subscribers & status overview</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void fetchData(token)}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-forest shadow-soft ring-1 ring-mediumgreen/30 transition-colors hover:bg-lightgreen disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200"
          >
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard Icon={Inbox} label="Total Enquiries" value={stats?.total ?? "—"} tint="bg-mediumgreen/15 text-mediumgreen" />
          <StatCard Icon={Clock} label="New Enquiries" value={stats?.new ?? "—"} tint="bg-amber-100 text-amber-700" />
          <StatCard Icon={Users} label="Subscribers" value={stats?.subscribers ?? "—"} tint="bg-blue-100 text-blue-700" />
          <StatCard Icon={CheckCircle2} label="Active Subs" value={stats?.activeSubs ?? "—"} tint="bg-forest/10 text-forest" />
          <StatCard Icon={Briefcase} label="Job Applications" value={stats?.applications ?? "—"} tint="bg-purple-100 text-purple-700" />
        </div>

        {/* Enquiries table */}
        <div className="mt-8 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-forest">
              Contact Enquiries
              <span className="ml-2 text-sm font-medium text-ink/50">({enquiries.length})</span>
            </h2>
          </div>

          {loading && enquiries.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-ink/50">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2 text-sm">Loading enquiries…</span>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-16 text-center">
              <Inbox className="mx-auto h-10 w-10 text-ink/30" />
              <p className="mt-3 text-sm text-ink/60">No enquiries yet.</p>
            </div>
          ) : (
            <div className="mt-5 -mx-5 overflow-x-auto sm:mx-0">
              <div className="min-w-[40rem] px-5 sm:px-0">
                <div className="grid grid-cols-12 gap-3 border-b border-border pb-2 text-[11px] font-bold uppercase tracking-wide text-ink/50">
                  <div className="col-span-4">Contact</div>
                  <div className="col-span-3">Interest</div>
                  <div className="col-span-3">Message</div>
                  <div className="col-span-2 text-right">Status / Action</div>
                </div>
                <ul className="divide-y divide-border">
                  {enquiries.map((e) => (
                    <li key={e.id} className="grid grid-cols-12 gap-3 py-4 text-sm">
                      <div className="col-span-4">
                        <p className="font-bold text-forest">{e.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/60">
                          <Mail className="h-3 w-3" />
                          <span className="break-all">{e.email}</span>
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/60">
                          <Phone className="h-3 w-3" />
                          <span className="tabular-nums">{e.phone}</span>
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink/40">{formatDate(e.createdAt)}</p>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-lightgreen px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-mediumgreen">
                          <Tag className="h-3 w-3" />
                          {e.interest}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <p className="text-xs leading-relaxed text-ink/70 line-clamp-3">
                          {e.message}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex flex-col items-end gap-2">
                          <select
                            value={e.status}
                            disabled={updatingId === e.id}
                            onChange={(ev) => updateStatus(e.id, ev.target.value as Status)}
                            className={cn(
                              "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 outline-none transition-colors",
                              STATUS_STYLES[e.status as Status] ?? STATUS_STYLES.new
                            )}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => void deleteEnquiry(e.id)}
                            disabled={updatingId === e.id}
                            aria-label="Delete enquiry"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Job applications table */}
        <div className="mt-8 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-forest">
              Job Applications
              <span className="ml-2 text-sm font-medium text-ink/50">({applications.length})</span>
            </h2>
          </div>

          {loading && applications.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-ink/50">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2 text-sm">Loading applications…</span>
            </div>
          ) : applications.length === 0 ? (
            <div className="py-16 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-ink/30" />
              <p className="mt-3 text-sm text-ink/60">No job applications yet.</p>
            </div>
          ) : (
            <div className="mt-5 -mx-5 overflow-x-auto sm:mx-0">
              <div className="min-w-[40rem] px-5 sm:px-0">
                <div className="grid grid-cols-12 gap-3 border-b border-border pb-2 text-[11px] font-bold uppercase tracking-wide text-ink/50">
                  <div className="col-span-4">Applicant</div>
                  <div className="col-span-3">Position</div>
                  <div className="col-span-3">Note</div>
                  <div className="col-span-2 text-right">Status / Action</div>
                </div>
                <ul className="divide-y divide-border">
                  {applications.map((a) => (
                    <li key={a.id} className="grid grid-cols-12 gap-3 py-4 text-sm">
                      <div className="col-span-4">
                        <p className="font-bold text-forest">{a.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/60">
                          <Mail className="h-3 w-3" />
                          <span className="break-all">{a.email}</span>
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/60">
                          <Phone className="h-3 w-3" />
                          <span className="tabular-nums">{a.phone}</span>
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink/40">{formatDate(a.createdAt)}</p>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-lightgreen px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-forest">
                          <Briefcase className="h-3 w-3" />
                          {a.jobId}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <p className="text-xs leading-relaxed text-ink/70 line-clamp-3">
                          {a.message}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex flex-col items-end gap-2">
                          <select
                            value={a.status}
                            disabled={updatingId === a.id}
                            onChange={(ev) => updateAppStatus(a.id, ev.target.value as AppStatus)}
                            className={cn(
                              "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 outline-none transition-colors",
                              APP_STATUS_STYLES[a.status as AppStatus] ?? APP_STATUS_STYLES.new
                            )}
                          >
                            {APP_STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => void deleteApplication(a.id)}
                            disabled={updatingId === a.id}
                            aria-label="Delete application"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  Icon,
  label,
  value,
  tint,
}: {
  Icon: typeof Inbox;
  label: string;
  value: number | string;
  tint: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5">
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", tint)}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-2xl font-extrabold text-forest tabular-nums">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">{label}</p>
    </div>
  );
}
