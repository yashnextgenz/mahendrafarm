import { NextResponse } from "next/server";
import { Resend } from "resend";

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
export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim().slice(0, 100);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const phone = String(body?.phone ?? "").trim().slice(0, 20);
  const interest = String(body?.interest ?? "").trim();
  const message = String(body?.message ?? "").trim().slice(0, 5000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number";
  if (!INTERESTS.has(interest)) errors.interest = "Please select a valid option";
  if (message.length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Mahindra Integrated Farm <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured. Please call or email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Interested In", interest],
  ];

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#164D24;color:#fff;padding:20px 24px">
      <h2 style="margin:0;font-size:20px">New Website Enquiry</h2>
      <p style="margin:4px 0 0;color:#cfe8b8;font-size:13px">Mahindra Integrated Farm — Contact Form</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 24px;color:#6b7280;width:140px;border-bottom:1px solid #f3f4f6">${k}</td><td style="padding:10px 24px;color:#111827;font-weight:600;border-bottom:1px solid #f3f4f6">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <div style="padding:20px 24px">
      <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Message</p>
      <p style="margin:0;white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(message)}</p>
    </div>
  </div>`;

  const text = `New Website Enquiry\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${message}`;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      replyTo: email,
      subject: `New enquiry: ${interest} — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message right now. Please try again later." },
        { status: 502 },
      );
    }


    return NextResponse.json({ ok: true, id: data?.id ?? "sent" });
  } catch (e) {
    console.error("[contact] Unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Could not send your message right now. Please try again later." },
      { status: 500 },
    );
  }
}
