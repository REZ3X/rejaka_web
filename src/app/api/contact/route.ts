import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FORMSUBMIT_EMAIL = process.env.FORMSUBMIT_EMAIL || "abim@rejaka.id";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;

/**
 * Some upstream sources (e.g. chatbot/flow platforms with array-typed
 * variables) template values in as JSON-stringified arrays, e.g.
 * '["test@gmail.com"]' instead of "test@gmail.com". This unwraps that
 * shape and strips stray wrapping quotes/brackets, so downstream
 * validation and FormSubmit both receive a clean plain string.
 */
function sanitizeField(value: unknown): string {
  if (typeof value !== "string") return "";
  let v = value.trim();

  // Try to unwrap a JSON array string, e.g. '["test@gmail.com"]'
  if (v.startsWith("[") && v.endsWith("]")) {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed) && parsed.length > 0) {
        v = String(parsed[0]).trim();
      }
    } catch {
      // Not valid JSON — fall back to stripping brackets/quotes manually
      v = v.replace(/^\[+|\]+$/g, "").trim();
    }
  }

  // Strip any leftover wrapping quotes
  v = v.replace(/^["']+|["']+$/g, "").trim();

  return v;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = sanitizeField(body.name);
    const email = sanitizeField(body.email);
    const subject = sanitizeField(body.subject);
    const message = sanitizeField(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@[\]"']+@[^\s@[\]"']+\.[^\s@[\]"']+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    console.log("Contact Form Submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    const formSubmitResponse = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      }),
    });

    const rawText = await formSubmitResponse.text();
    let formSubmitData: { success?: boolean; message?: string } | null = null;
    try {
      formSubmitData = JSON.parse(rawText);
    } catch {
      formSubmitData = null;
    }

    if (!formSubmitResponse.ok || !formSubmitData?.success) {
      console.error("FormSubmit error:", {
        status: formSubmitResponse.status,
        statusText: formSubmitResponse.statusText,
        body: rawText.slice(0, 500), // avoid dumping a huge HTML error page
      });
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send message. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        data: {
          id: `msg_${Date.now()}`,
          receivedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}