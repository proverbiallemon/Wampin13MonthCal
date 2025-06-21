# Cloudflare Pages Setup Instructions

## 🔑 Step 1: Get Your Cloudflare API Token

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/

2. **Navigate to API Tokens**
   - Click on your profile icon (top right)
   - Select "My Profile"
   - Click on "API Tokens" tab

3. **Create a New Token**
   - Click "Create Token"
   - Use the "Custom token" template
   - Give it a name like "GitHub Actions - 13 Month Calendar"

4. **Configure Token Permissions**
   - **Account permissions:**
     - `Cloudflare Pages:Edit`
   - **Zone permissions:**
     - None needed for Pages
   - **Account resources:**
     - Include → All accounts (or select your specific account)

5. **Create and Copy Token**
   - Click "Continue to summary"
   - Click "Create Token"
   - **IMPORTANT**: Copy the token now! You won't see it again.

## 🆔 Step 2: Get Your Account ID

1. **From Cloudflare Dashboard**
   - Go to any domain in your account
   - Look in the right sidebar
   - Find "Account ID" and copy it

## 🔧 Step 3: Add Secrets to GitHub

1. **Go to Your Repository**
   - https://github.com/proverbiallemon/Wampin13MonthCal

2. **Navigate to Settings**
   - Click "Settings" tab
   - Go to "Secrets and variables" → "Actions"

3. **Add Repository Secrets**
   - Click "New repository secret"
   
   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (paste your API token)
   
   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (paste your account ID)

## 🚀 Step 4: Create Cloudflare Pages Project

1. **Go to Cloudflare Pages**
   - https://dash.cloudflare.com/pages

2. **Create a New Project**
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose GitHub and authorize if needed
   - Select "ProverbialLemon/Wampin13MonthCal"

3. **Configure Build Settings**
   - Project name: `wampin-13-month-calendar` (must match the GitHub Action)
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`

4. **Save and Deploy**
   - Click "Save and Deploy"

## ✅ That's It!

Your GitHub Actions will now automatically deploy to Cloudflare Pages whenever you push to the main branch!

### Troubleshooting:
- Make sure the project name in Cloudflare Pages matches the `projectName` in `.github/workflows/deploy.yml`
- The API token needs Cloudflare Pages edit permissions
- Check the Actions tab in GitHub to see deployment status