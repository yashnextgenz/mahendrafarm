import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "farm-admin-2025";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const enquiries = await db.contactEnquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ ok: true, enquiries });
  } catch (err) {
    console.error("[api/contact/list] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load enquiries" }, { status: 500 });
  }
}
