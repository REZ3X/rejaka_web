import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { start_time, end_time, summary, timeZone } = body;

    if (!start_time || !end_time) {
      return NextResponse.json(
        { success: false, error: 'Missing start_time or end_time' },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary: summary || 'Reminder',
      start: {
        dateTime: start_time,
        timeZone: timeZone || 'Asia/Jakarta',
      },
      end: {
        dateTime: end_time,
        timeZone: timeZone || 'Asia/Jakarta',
      },
    };

    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    });

    return NextResponse.json({
      success: true,
      event_id: res.data.id,
      html_link: res.data.htmlLink,
    });

  } catch (error: any) {
    console.error('Calendar insert error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}