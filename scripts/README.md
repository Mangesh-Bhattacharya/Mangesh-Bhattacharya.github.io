# Portfolio auto-sync

Keeps `data/github-snapshot.json` current with your public GitHub repos and
opens a PR summarizing what changed. It never auto-edits the curated
`projects` array in `src/data/resume.ts` — new repos are surfaced for you to
review and add by hand if they're portfolio-worthy.

## Why this runs on your desktop, not in the cloud

The cloud sandbox this assistant runs in blocks `github.com` / `api.github.com`
for this account (a Claude Code safety restriction unrelated to your GitHub
account itself). `run_sync.sh` is meant to run wherever `device_bash` reaches —
your desktop, via the Claude Cowork device bridge — since that has normal
GitHub API access.

## Running it

```bash
GITHUB_TOKEN=<fine-grained PAT, Contents: R/W, Pull requests: R/W> \
  bash scripts/run_sync.sh
```

Token: create at github.com/settings/personal-access-tokens/new, scoped to
**only** this repo, with **Contents: Read and write** and
**Pull requests: Read and write**. Without the PR scope, the script still
pushes the branch and prints a manual "open a PR" link.

## What it touches

- `data/github-snapshot.json` — machine state, safe to overwrite each run.
- `sync_summary.md` — becomes the PR body; regenerated each run.
- Nothing else. `src/data/resume.ts` is read-only to this pipeline.

## TryHackMe

No automation — TryHackMe has no public API and its site sits behind a
Vercel bot-checkpoint that blocks plain HTTP scraping. When you want your
TryHackMe badges/certs refreshed in `resume.ts`, paste an updated list and
it'll be a one-line manual edit.

## LinkedIn

Deliberately not automated — third-party LinkedIn scraping APIs
(Proxycurl/RapidAPI) violate LinkedIn's ToS and risk account bans. Update
LinkedIn-sourced resume content by hand.
