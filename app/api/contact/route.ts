import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function safeLogValue(value: unknown, maxLength = 300) {
  return String(value ?? "").replace(/[\r\n\t]+/g, " ").slice(0, maxLength);
}

export async function POST(request: Request) {
  const submissionId = crypto.randomUUID();
  try {
    const body = await request.json();
    if (body.company_website) return NextResponse.json({ ok: true });
    const formStartedAt = Number(body.form_started_at);
    const completionTime = Date.now() - formStartedAt;
    if (!Number.isFinite(formStartedAt) || completionTime < 3000 || completionTime > 7_200_000) return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const platform = String(body.platform ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!name || !email || !platform || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_FROM || !CONTACT_TO) return NextResponse.json({ error: "Mail is not configured" }, { status: 503 });
    const smtpPort = Number(SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      requireTLS: smtpPort !== 465,
      tls: { minVersion: "TLSv1.2", servername: SMTP_HOST },
      auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const result = await transporter.sendMail({ from: SMTP_FROM, to: CONTACT_TO, replyTo: email, subject: `AI Taskers fit check: ${platform}`, text: `Name: ${name}\nEmail: ${email}\nPlatform: ${platform}\n\n${message || "No additional message."}` });
    console.info("contact_email_result", {
      submissionId,
      messageId: safeLogValue(result.messageId, 160),
      acceptedCount: result.accepted.length,
      rejectedCount: result.rejected.length,
      pendingCount: result.pending?.length ?? 0,
      response: safeLogValue(result.response),
    });
    return NextResponse.json({ ok: true, submissionId });
  } catch (error) {
    const smtpError = error as { code?: unknown; command?: unknown; responseCode?: unknown; response?: unknown };
    console.error("contact_email_error", {
      submissionId,
      code: safeLogValue(smtpError.code, 80),
      command: safeLogValue(smtpError.command, 80),
      responseCode: safeLogValue(smtpError.responseCode, 20),
      response: safeLogValue(smtpError.response),
    });
    return NextResponse.json({ error: "Unable to send", submissionId }, { status: 500 });
  }
}
