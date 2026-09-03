import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;
const INTERESTS = new Set([
  "Fresh Vegetables",
  "Dairy Products",
  "Poultry Products",
  "Flowers",
  "Groundnuts & Pulses",
  "Distributorship",
  "General Enquiry",
]);

export const dynamic = "force-dynamic";

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
  const interest = String(body?.interest ?? "").trim();
  const message = String(body?.message ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number";
  if (!INTERESTS.has(interest)) errors.interest = "Please select a valid option";
  if (message.length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const enquiry = await db.contactEnquiry.create({
      data: { name, email, phone, interest, message },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err) {
    console.error("[api/contact] Failed to persist enquiry:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your enquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const total = await db.contactEnquiry.count();
    const newCount = await db.contactEnquiry.count({ where: { status: "new" } });
    return NextResponse.json({ ok: true, total, new: newCount });
  } catch (err) {
    console.error("[api/contact] GET failed:", err);
    return NextResponse.json({ ok: false, error: "Unable to fetch counts" }, { status: 500 });
  }
}
