import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.company_website) return NextResponse.json({ ok: true });
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const platform = String(body.platform ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!name || !email || !platform || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_FROM || !CONTACT_TO) return NextResponse.json({ error: "Mail is not configured" }, { status: 503 });
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined });
    await transporter.sendMail({ from: SMTP_FROM, to: CONTACT_TO, replyTo: email, subject: `AI Taskers fit check: ${platform}`, text: `Name: ${name}\nEmail: ${email}\nPlatform: ${platform}\n\n${message || "No additional message."}` });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to send" }, { status: 500 }); }
}
