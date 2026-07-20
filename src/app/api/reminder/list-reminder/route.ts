import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

// Unwraps array-wrapped or stringified-array values into a plain string
function unwrap(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (Array.isArray(value)) return String(value[0]);
  if (typeof value === 'string' && value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? String(parsed[0]) : value;
    } catch {
      return value;
    }
  }
  return String(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // Optional filters — all safe to omit
    const timeMin = unwrap(body.timeMin); // e.g. "2026-07-20T00:00:00+07:00"
    const timeMax = unwrap(body.timeMax); // e.g. "2026-08-01T00:00:00+07:00"
    const maxResultsRaw = unwrap(body.maxResults);
    const maxResults = maxResultsRaw ? parseInt(maxResultsRaw, 10) : 20;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: timeMin || new Date().toISOString(), // default: from now onward
      timeMax: timeMax || undefined,
      maxResults: isNaN(maxResults) ? 20 : maxResults,
      singleEvents: true,   // expands recurring events into individual instances
      orderBy: 'startTime',
    });

    const events = (res.data.items || []).map((event: any) => ({
      id: event.id,
      summary: event.summary || '(No title)',
      start: event.start?.dateTime || event.start?.date || null,
      end: event.end?.dateTime || event.end?.date || null,
      timeZone: event.start?.timeZone || null,
      status: event.status,
      html_link: event.htmlLink,
    }));

    return NextResponse.json({
      success: true,
      count: events.length,
      reminders: events,
    });

  } catch (error: any) {
    console.error('Calendar list error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}