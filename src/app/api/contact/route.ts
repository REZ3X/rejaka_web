import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FORMSUBMIT_EMAIL = process.env.FORMSUBMIT_EMAIL || "abim@rejaka.id";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    const formSubmitData = await formSubmitResponse.json().catch(() => null);

    if (!formSubmitResponse.ok || !formSubmitData?.success) {
      console.error("FormSubmit error:", formSubmitData);
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