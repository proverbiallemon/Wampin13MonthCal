# Google Calendar Integration Setup

This guide will help you set up Google Calendar synchronization for the 13-month calendar application.

## Prerequisites

- A Google Cloud Console account
- The Wrangler CLI installed (`npm install -g wrangler`)

## Setup Steps

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Configure the OAuth consent screen if prompted
   - Choose "Web application" as the application type
   - Add authorized redirect URIs:
     - For local development: `http://localhost:8788/api/auth/google`
     - For production: `https://wampin-13-month-calendar.pages.dev/api/auth/google`
   - Save your Client ID and Client Secret

### 2. Configure Local Development

1. Copy the example configuration file:
   ```bash
   cp .dev.vars.example .dev.vars
   ```

2. Edit `.dev.vars` and add your Google credentials:
   ```
   GOOGLE_CLIENT_ID=your-actual-client-id
   GOOGLE_CLIENT_SECRET=your-actual-client-secret
   ```

### 3. Test Locally with Wrangler

1. Start the development server with Cloudflare Pages Functions:
   ```bash
   wrangler pages dev dist --compatibility-date=2024-01-01 --port 8788
   ```

2. In another terminal, run the Vite dev server:
   ```bash
   npm run dev
   ```

3. Access the application at `http://localhost:8788`

4. Click "Sign in with Google" in the Google Calendar section

### 4. Deploy to Production

1. Add secrets to your Cloudflare Pages project:
   ```bash
   wrangler pages secret put GOOGLE_CLIENT_ID
   wrangler pages secret put GOOGLE_CLIENT_SECRET
   ```

2. Deploy the application:
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

## How It Works

1. **Authentication Flow**:
   - User clicks "Sign in with Google"
   - Redirected to Google OAuth consent screen
   - After authorization, redirected back with an authorization code
   - Code is exchanged for access tokens
   - Tokens are stored in browser localStorage

2. **Event Fetching**:
   - Access token is sent to `/api/calendar` endpoint
   - Cloudflare Function fetches events from Google Calendar API
   - Events are converted to include 13-month calendar dates
   - Events are displayed on the calendar with visual indicators

3. **Security**:
   - Client secrets are never exposed to the browser
   - OAuth flow happens server-side through Cloudflare Functions
   - Access tokens are stored locally and expire automatically

## Troubleshooting

- **"Invalid redirect URI"**: Make sure the redirect URI in Google Console matches your development/production URL exactly
- **"Authentication failed"**: Check that your client ID and secret are correctly set in `.dev.vars`
- **Events not showing**: Ensure the Google Calendar API is enabled in your Google Cloud project
- **Token expired**: Click "Sign out" and sign in again to refresh tokens

## Notes

- The integration is read-only and fetches events from your primary Google Calendar
- Events are fetched for the next 90 days by default
- The calendar shows a small dot indicator on days with Google Calendar events