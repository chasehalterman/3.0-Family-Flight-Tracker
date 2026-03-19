# ✈ Family Flight Tracker (PWA)

## Step 1 — Put the files on GitHub

You don't need to know Git. Here's the easiest way:

1. Go to **github.com** and create a free account if you don't have one
2. Click the **+** button in the top-right corner → **"New repository"**
3. Name it `family-flight-tracker`, leave everything else as default, click **"Create repository"**
4. On the next page, click the link that says **"uploading an existing file"**
5. **Unzip** the folder you downloaded on your computer
6. Open the unzipped folder — you'll see these files inside:
   ```
   server.js
   package.json
   railway.json
   README.md
   .gitignore
   public/
     index.html
     manifest.json
     sw.js
     icon-192.png
     icon-512.png
     icon-apple-touch.png
   ```
7. Drag **all of those files and the public folder** into the GitHub upload area
8. Scroll down and click **"Commit changes"**

Your code is now on GitHub ✅

---

## Step 2 — Deploy to Railway (free)

1. Go to **railway.app** and sign up with your GitHub account
2. Click **"New Project"**
3. Choose **"Deploy from GitHub repo"**
4. Select your `family-flight-tracker` repository
5. Railway will automatically detect it's a Node.js app and deploy it
6. After ~1 minute, click **"Settings"** → **"Domains"** → **"Generate Domain"**
7. You'll get a URL like `family-flight-tracker-production.up.railway.app`

Share that URL with your mom ✅

---

## Step 3 — Install on iPhone as an app

1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (the box with an arrow at the bottom)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add**

Opens full screen, auto-refreshes every 15 min, works offline ✅

---

## Getting iCal URLs (for each kid to share)

| Calendar App | How to get the URL |
|---|---|
| **Google Calendar** | Settings (gear) → click calendar name → scroll to "Secret address in iCal format" → copy |
| **Apple iCloud** | Calendar app on Mac → right-click calendar → "Share Calendar" → enable public → copy link |
| **Outlook / Office 365** | Calendar settings → "Publish calendar" → copy the ICS link |

URLs start with `webcal://` or `https://` — both work fine.
