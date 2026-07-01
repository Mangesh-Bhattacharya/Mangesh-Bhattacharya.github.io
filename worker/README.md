# Wiring up the real AI "Ask" panel (optional)

Your site works fine without this step — the "Ask about Mangesh" panel
already answers common questions honestly using a small built-in FAQ
(see `assets/js/chat.js`). This step upgrades it to a real LLM for
open-ended questions, **without ever exposing your API key in the
browser** (GitHub Pages is static hosting only — it cannot hide secrets
on its own, so this proxy is required if you want a real key-backed AI).

## 1. Get a free Gemini API key
Go to https://aistudio.google.com/app/apikey and create a free API key.

## 2. Deploy the Worker (free Cloudflare account)
```
npm install -g wrangler
cd worker
wrangler login
wrangler secret put GEMINI_API_KEY   # paste your key when prompted
wrangler deploy
```
This prints a URL like `https://mb-portfolio-ai.<you>.workers.dev`.

## 3. Point the site at it
In `assets/js/config.js`, set:
```js
window.MB_CONFIG = { WORKER_ENDPOINT: 'https://mb-portfolio-ai.<you>.workers.dev' };
```
Commit and push. The Ask panel will now call your Worker for anything
the built-in FAQ doesn't already answer, and the Worker calls Gemini
server-side. Your key never appears in page source.

## Cost / limits
Gemini's free tier and Cloudflare Workers' free tier (100k requests/day)
comfortably cover a personal portfolio's traffic. The Worker also caps
question/answer length to keep usage predictable.
