import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Fetches WakaTime language stats via the public embeddable JSON endpoint.
 *
 * WakaTime advises against exposing the secret API key client-side.
 * Use the embeddable JSON URL from https://wakatime.com/share/embed instead.
 *
 * Set WAKATIME_JSON_URL in .env to the generated URL
 * (Last 7 Days → Languages → JSON format).
 *
 * Always returns HTTP 200; failures are in { success: false }.
 */
export async function GET() {
  const jsonUrl = process.env.WAKATIME_JSON_URL;

  if (!jsonUrl) {
    return NextResponse.json({
      success: false,
      error: "WAKATIME_JSON_URL is not configured — generate one at https://wakatime.com/share/embed",
    });
  }

  try {
    const response = await fetch(jsonUrl, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `WakaTime embed returned ${response.status}`,
      });
    }

    const raw = await response.json();

    const languages: { name: string; percent: number; text: string }[] = (
      raw.data ?? []
    )
      .slice(0, 8)
      .map((lang: { name: string; percent: number; text: string }) => ({
        name: lang.name,
        percent: lang.percent,
        text: lang.text,
      }));

    return NextResponse.json({
      success: true,
      data: { languages, range: "Last 7 Days" },
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Failed to reach WakaTime embed URL",
    });
  }
}
