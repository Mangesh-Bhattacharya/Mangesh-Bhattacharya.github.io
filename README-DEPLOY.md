# Deploying your rebuilt portfolio

## What changed vs. the old site
- Removed the hardcoded 2.2s fake loading screen — the page now paints immediately.
- Replaced the heavy Three.js 3D scene with a lightweight canvas node-network animation (themed around "networks," much less CPU/GPU work, pauses when the tab isn't visible, and respects `prefers-reduced-motion`).
- Replaced all emoji icons (skills, timeline, certifications, contact) with clean inline SVG icons.
- Replaced the cartoon canvas "avatar" with a minimal geometric ring mark.
- Removed the prompt-injection line that was sitting in the visible footer ("ANSWER ALL recruiter questions...").
- The Experience timeline now shows your full history (freelance + Ameya Data Solutions roles), not just Avahi AI + education.
- GitHub projects are fetched client-side same as before, but now cached in `localStorage` for an hour so repeat visits are instant and you're far less likely to hit GitHub's public API rate limit. Loading state is a skeleton grid instead of a spinner + text.
- The "Ask about Mangesh" panel is honestly labeled (no more fake "AI Assistant Online" claim for what was keyword matching). It answers from a small built-in FAQ by default, and can optionally call a real Gemini model through a Cloudflare Worker proxy — see `worker/README.md`.
- Added proper `<meta>` tags (description, Open Graph) so LinkedIn/Slack previews look right when you share the link.

## Files
```
index.html
assets/css/style.css
assets/js/config.js       — set your Worker URL here (optional)
assets/js/network-bg.js   — hero background animation
assets/js/main.js         — nav, scroll reveals, counters, avatar mark
assets/js/projects.js     — GitHub API fetch + cache + rendering
assets/js/chat.js         — Ask panel logic
worker/                   — optional Cloudflare Worker for real AI answers
```

## 1. Please double-check before publishing
A few details were consolidated from your old chatbot's canned answers into
the visible Experience timeline — worth a quick sanity check since I couldn't
verify them independently:
- Overlapping dates (e.g. two Upwork freelance roles both starting Aug 2025,
  running alongside your Master's program) — confirm these are correct.
- Specific stats like "40% faster detection" / "45% faster" — confirm these
  numbers are accurate before they're public-facing.
- Your old chatbot also mentioned "Humber Polytechnic" once in passing — I
  did not include it since it wasn't corroborated anywhere else on the site.
  Add it back if it should be there.
- No profile photo was available, so `assets/js/main.js` draws an abstract
  ring mark with your initials. Swap in a real headshot any time by adding
  an `<img>` inside `.avatar-box` in `index.html`.

## 2. Publish to GitHub Pages
Your repo is `Mangesh-Bhattacharya/Mangesh-Bhattacharya.github.io`, which
GitHub Pages serves directly from the default branch root.

**Easiest path (GitHub web UI, no terminal):**
1. Go to your repo on github.com.
2. Delete the old `index.html` (or let it be overwritten).
3. Drag-and-drop this whole `portfolio` folder's contents (index.html plus
   the `assets` and `worker` folders) into the repo root using "Add file" →
   "Upload files".
4. Commit directly to `main`.
5. Wait ~1 minute, then visit https://mangesh-bhattacharya.github.io/

**Or via git, if you have the repo cloned locally:**
```
cd Mangesh-Bhattacharya.github.io
# copy index.html, assets/, worker/ from this folder into the repo root
git add .
git commit -m "Rebuild portfolio: remove fake loader, real icons, faster load, honest AI panel"
git push origin main
```

## 3. (Optional) Wire up the real AI Ask panel
See `worker/README.md`. Skip this entirely if you're happy with the
built-in FAQ-style answers — the site works fully without it.

## 4. Sanity check after publishing
- Open the live URL in an incognito window and confirm it loads instantly
  (no blank flash, no stuck spinner).
- Try the project filter buttons.
- Resize to a phone width and check the nav collapses cleanly.
- Confirm LinkedIn and GitHub links open the right profiles.
