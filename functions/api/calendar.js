// Cloudflare Pages Function for Google Calendar integration

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/

function isValidISODate(value) {
  return ISO_DATE_RE.test(value)
}

export async function onRequestGet(context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  }

  try {
    // Get the authorization header
    const authHeader = context.request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'No authorization token provided' }),
        { status: 401, headers }
      )
    }

    const accessToken = authHeader.substring(7)

    // Get and validate query parameters
    const url = new URL(context.request.url)
    const timeMin = url.searchParams.get('timeMin') || new Date().toISOString()
    const timeMax = url.searchParams.get('timeMax') || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()

    if (!isValidISODate(timeMin) || !isValidISODate(timeMax)) {
      return new Response(
        JSON.stringify({ error: 'Invalid timeMin or timeMax format' }),
        { status: 400, headers }
      )
    }

    // Build Google API URL safely with URLSearchParams
    const calendarParams = new URLSearchParams({
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
    })

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${calendarParams}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        }
      }
    )

    if (!calendarResponse.ok) {
      const error = await calendarResponse.text()
      return new Response(
        JSON.stringify({ error: 'Failed to fetch calendar events', details: error }),
        { status: calendarResponse.status, headers }
      )
    }

    const data = await calendarResponse.json()

    // Transform the events to include 13-month calendar dates
    const events = data.items?.map(event => {
      const start = event.start?.dateTime || event.start?.date
      const end = event.end?.dateTime || event.end?.date

      return {
        id: event.id,
        summary: event.summary,
        description: event.description,
        start: start,
        end: end,
        allDay: !event.start?.dateTime,
      }
    }) || []

    return new Response(
      JSON.stringify({ events, nextSyncToken: data.nextSyncToken }),
      { headers }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers }
    )
  }
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}
