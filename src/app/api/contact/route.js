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
    const submission = {};
    for (const [key, value] of formData.entries()) {
      if (key === "_honey") continue;
      submission[key] = String(value);
    }
    submission._subject = "New portfolio inquiry";
    submission._template = "table";
    submission._captcha = "false";
    submission.replyto = email;

    const response = await fetch(
      `https://formsubmit.co/ajax/${portfolio.email}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
        cache: "no-store",
      },
    );

    const serviceResult = await response.json().catch(() => ({}));
    const serviceFailed =
      !response.ok ||
      serviceResult.success === false ||
      serviceResult.success === "false";

    if (serviceFailed) {
      const serviceMessage = String(serviceResult.message || "");
      const activationRequired = /activat|confirm/i.test(serviceMessage);
      console.error("FormSubmit rejected enquiry:", serviceResult);
      return Response.json(
        {
          message: activationRequired
            ? "The contact form needs one-time email activation. Please check the portfolio inbox for FormSubmit's activation email."
            : `Email delivery is not active for this form yet. Please activate FormSubmit for ${portfolio.email}, then try again.`,
        },
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
