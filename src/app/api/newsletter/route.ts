import { NextResponse } from "next/server";

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

  // No persistence (database removed). Validate and acknowledge.
  return NextResponse.json({ ok: true, created: true });
}
