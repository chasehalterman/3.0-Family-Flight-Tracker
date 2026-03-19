const express = require('express');
const https = require('https');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from any origin (your mom's browser)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Serve the frontend HTML at /
app.use(express.static('public'));

// Proxy endpoint: GET /fetch-ical?url=https://...
app.get('/fetch-ical', (req, res) => {
  let url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing ?url= parameter' });

  // Trim whitespace and convert webcal:// → https://
  url = url.trim().replace(/^webcal:\/\//i, 'https://');

  // Basic validation — must be http/https
  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ error: 'URL must start with http:// or https://' });
  }

  // Follow redirects up to 5 times (iCloud sometimes redirects multiple times)
  function doRequest(targetUrl, remainingRedirects) {
    const client = targetUrl.startsWith('https') ? https : http;
    const options = {
      timeout: 10000,
      headers: {
        // Some calendar servers require a proper User-Agent
        'User-Agent': 'FamilyFlightTracker/1.0 (calendar fetcher)',
        'Accept': 'text/calendar, application/calendar+xml, */*',
      }
    };

    const request = client.get(targetUrl, options, (upstream) => {
      // Follow redirects
      if ([301, 302, 303, 307, 308].includes(upstream.statusCode)) {
        if (remainingRedirects <= 0) {
          return res.status(502).json({ error: 'Too many redirects' });
        }
        let redirectUrl = upstream.headers.location;
        if (!redirectUrl) return res.status(502).json({ error: 'Redirect with no Location header' });
        // Handle relative redirects
        if (redirectUrl.startsWith('/')) {
          const base = new URL(targetUrl);
          redirectUrl = `${base.protocol}//${base.host}${redirectUrl}`;
        }
        // Drain the response before following redirect
        upstream.resume();
        return doRequest(redirectUrl, remainingRedirects - 1);
      }

      if (upstream.statusCode !== 200) {
        return res.status(502).json({ error: `Calendar server returned ${upstream.statusCode}` });
      }

      res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
      upstream.pipe(res);
    });

    request.on('timeout', () => {
      request.destroy();
      if (!res.headersSent) res.status(504).json({ error: 'Request timed out fetching calendar' });
    });

    request.on('error', (e) => {
      if (!res.headersSent) res.status(502).json({ error: `Could not fetch calendar: ${e.message}` });
    });
  }

  doRequest(url, 5);
});

// Must bind to 0.0.0.0 for Railway/Render to route traffic correctly
app.listen(PORT, '0.0.0.0', () => console.log(`Family Tracker running on http://0.0.0.0:${PORT}`));
