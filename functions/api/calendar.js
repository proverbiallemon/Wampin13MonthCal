// Cloudflare Pages Function for Google Calendar integration
export async function onRequestGet(context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  }

  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers })
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
    
    // Get query parameters
    const url = new URL(context.request.url)
    const timeMin = url.searchParams.get('timeMin') || new Date().toISOString()
    const timeMax = url.searchParams.get('timeMax') || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()

    // Fetch events from Google Calendar API
    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?` + 
      `timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
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
        // We'll convert to 13-month format on the client side
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