// Google OAuth handler for Cloudflare Pages
export async function onRequestGet(context) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = context.env
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  const url = new URL(context.request.url)
  const code = url.searchParams.get('code')
  const action = url.searchParams.get('action')

  // If no code, initiate OAuth flow
  if (!code && action === 'login') {
    const redirectUri = `${url.origin}/api/auth/google`
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar.readonly email')
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')

    return Response.redirect(authUrl.toString(), 302)
  }

  // If we have a code, exchange it for tokens
  if (code) {
    try {
      const redirectUri = `${url.origin}/api/auth/google`
      
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      })

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for tokens')
      }

      const tokens = await tokenResponse.json()
      
      // Redirect back to app with tokens in URL fragment (for client-side storage)
      const appUrl = new URL(url.origin)
      appUrl.hash = `access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token || ''}`
      
      return Response.redirect(appUrl.toString(), 302)
      
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Authentication failed', message: error.message }), 
        { status: 500, headers }
      )
    }
  }

  return new Response(
    JSON.stringify({ error: 'Invalid request' }), 
    { status: 400, headers }
  )
}