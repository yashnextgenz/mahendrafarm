import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { JOB_OPENINGS } from "@/data/site";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;
const VALID_JOB_IDS = new Set(JOB_OPENINGS.map((j) => j.id));

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const jobId = String(body?.jobId ?? "").trim();
  const message = String(body?.message ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number";
  if (!VALID_JOB_IDS.has(jobId)) errors.jobId = "Please select a valid position";
  if (message.length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const application = await db.jobApplication.create({
      data: { name, email, phone, jobId, message },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, id: application.id });
  } catch (err) {
    console.error("[api/applications] Failed to persist application:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your application. Please try again." },
      { status: 500 }
    );
  }
}

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "farm-admin-2025";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const applications = await db.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ ok: true, applications });
  } catch (err) {
    console.error("[api/applications] GET failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load applications" }, { status: 500 });
  }
}
