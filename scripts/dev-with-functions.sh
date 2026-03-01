#!/bin/bash

echo "Starting development servers..."
echo ""
echo "📦 Building the project first..."
npm run build

echo ""
echo "🚀 Starting Cloudflare Pages dev server on http://localhost:8788"
echo "   This will handle the API routes and serve the built files"
echo ""
echo "⚡ Make sure you have created .dev.vars with your Google credentials!"
echo "   Copy .dev.vars.example to .dev.vars and fill in your values"
echo ""

# Start Wrangler in the background
wrangler pages dev dist --compatibility-date=2024-01-01 --port 8788