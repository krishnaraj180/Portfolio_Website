import { portfolio } from "@/data/portfolio";

/* ── Simple in-memory rate limiter ──────────────────── */
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;             // max 3 requests per window

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { start: now, count: 1 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request) {
  try {
    /* ── Rate limit ─────────────────────────────────── */
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { message: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }

    /* ── Parse & validate ───────────────────────────── */
    const formData = await request.formData();
    const name     = String(formData.get("name") || "").trim();
    const email    = String(formData.get("email") || "").trim();
    const message  = String(formData.get("message") || "").trim();
    const honeypot = String(formData.get("_honey") || "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Honeypot — silently accept bots
    if (honeypot) {
      return Response.json({ success: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        { message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 2000) {
      return Response.json(
        { message: "Input exceeds maximum length." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email) || message.length < 10) {
      return Response.json(
        { message: "Please provide a valid email and a little more project detail." },
        { status: 400 },
      );
    }

    /* ── Forward to FormSubmit ──────────────────────── */
    const submission = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (key === "_honey") continue;
      submission.set(key, String(value));
    }
    submission.set("_subject", "New portfolio inquiry");
    submission.set("_template", "table");
    submission.set("_captcha", "false");

    const response = await fetch(
      `https://formsubmit.co/ajax/${portfolio.email}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: submission.toString(),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return Response.json(
        { message: "Email service rejected the submission." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { message: "Unable to submit the form right now." },
      { status: 500 },
    );
  }
}
