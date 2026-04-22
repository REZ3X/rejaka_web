import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Proxies the Lanyard API for the configured Discord user.
 *
 * Requires DISCORD_USER_ID in env. The user must be a member of
 * discord.gg/lanyard for Lanyard to monitor their presence.
 *
 * Always returns HTTP 200; failures are in { success: false }.
 */
export async function GET() {
  const userId = process.env.DISCORD_USER_ID;

  if (!userId) {
    return NextResponse.json({
      success: false,
      error: "DISCORD_USER_ID is not configured",
    });
  }

  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${userId}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json({
        success: false,
        error:
          response.status === 404
            ? "User not found in Lanyard — join discord.gg/lanyard first"
            : `Lanyard error: ${response.status}`,
      });
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Failed to reach Lanyard API",
    });
  }
}
