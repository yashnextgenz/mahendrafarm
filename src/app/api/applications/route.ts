import { NextResponse } from "next/server";
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

  // No persistence (database removed). Validate and acknowledge.
  return NextResponse.json({ ok: true, id: "submitted" });
}
