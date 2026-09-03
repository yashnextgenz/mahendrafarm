import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body?.email ?? "").trim().toLowerCase();
  const source = String(body?.source ?? "footer").trim() || "footer";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address" },
      { status: 422 }
    );
  }

  try {
    // Upsert: if already subscribed, just re-activate silently (idempotent).
    const existing = await db.subscriber.findUnique({ where: { email } });
    if (existing) {
      if (!existing.active) {
        await db.subscriber.update({
          where: { email },
          data: { active: true, source },
        });
      }
      return NextResponse.json({ ok: true, reactivated: !existing.active });
    }
    await db.subscriber.create({ data: { email, source } });
    return NextResponse.json({ ok: true, created: true });
  } catch (err) {
    console.error("[api/newsletter] Failed to subscribe:", err);
    return NextResponse.json(
      { ok: false, error: "Could not subscribe right now. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const total = await db.subscriber.count();
    const active = await db.subscriber.count({ where: { active: true } });
    return NextResponse.json({ ok: true, total, active });
  } catch (err) {
    console.error("[api/newsletter] GET failed:", err);
    return NextResponse.json({ ok: false, error: "Unable to fetch counts" }, { status: 500 });
  }
}
