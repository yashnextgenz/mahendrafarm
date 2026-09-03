import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Simple token-based admin guard. In production this would be a real auth
// session; for now we compare a query-string token to an env var (with a
// dev fallback) so the dashboard is not open to the public.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "farm-admin-2025";

function authorize(req: Request): boolean {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  return token === ADMIN_TOKEN;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* allow empty body */
  }
  const status = String(body?.status ?? "").trim();
  const allowed = new Set(["new", "read", "responded", "closed"]);
  if (!allowed.has(status)) {
    return NextResponse.json(
      { ok: false, error: "Invalid status. Allowed: new, read, responded, closed." },
      { status: 422 }
    );
  }
  try {
    const updated = await db.contactEnquiry.update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    });
    return NextResponse.json({ ok: true, enquiry: updated });
  } catch (err) {
    console.error("[api/contact/[id]] PATCH failed:", err);
    return NextResponse.json({ ok: false, error: "Not found or could not update" }, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.contactEnquiry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact/[id]] DELETE failed:", err);
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}
