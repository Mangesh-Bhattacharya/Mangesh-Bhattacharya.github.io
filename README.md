# Mangesh Bhattacharya — Cybersecurity Portfolio

Source for [mangesh-bhattacharya.github.io](https://mangesh-bhattacharya.github.io) — a dark-themed, animated
cybersecurity portfolio built with Next.js (App Router), Tailwind CSS v4, and Framer Motion.

## Stack

- Next.js 16 (static export)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All resume content (skills, projects, experience, education, certifications) lives in one place:
[`src/data/resume.ts`](src/data/resume.ts). Update that file and every section on the page updates with it.

To replace the "Download CV" file, drop your PDF at `public/resume.pdf` (same filename).

## Build

```bash
npm run build
```

Produces a static site in `out/` (`next.config.ts` sets `output: "export"`).

## Deployment

Pushes to `main` build and deploy automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) using GitHub Actions + Pages.

**One-time setup:** in the repo's Settings → Pages, set **Source** to **GitHub Actions** (not "Deploy from a branch").
