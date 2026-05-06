import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const metrics = body?.metrics;
    const meta = body?.meta;

    if (!metrics || typeof metrics !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 },
      );
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("Performance metrics", {
        metrics,
        meta,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Metrics ingest error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }
}
