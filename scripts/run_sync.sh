#!/usr/bin/env bash
# End-to-end portfolio sync: discover GitHub activity, diff against the last
# snapshot, and (if anything changed) push a branch + open a PR for review.
#
# MUST run somewhere with real access to api.github.com and github.com —
# the cloud sandbox blocks both for this account, so this runs via
# device_bash on the linked desktop, inside a checkout of
# mangesh-bhattacharya.github.io.
#
# Requires: git, python3, curl, and GITHUB_TOKEN (a fine-grained PAT scoped
# to this repo, Contents: Read & write) in the environment.
#
# Usage: GITHUB_TOKEN=ghp_xxx REPO_DIR=/path/to/checkout ./scripts/run_sync.sh
set -euo pipefail

: "${GITHUB_TOKEN:?Set GITHUB_TOKEN to a PAT scoped to this repo}"
REPO_DIR="${REPO_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
OWNER="Mangesh-Bhattacharya"
REPO="Mangesh-Bhattacharya.github.io"
BRANCH="portfolio-sync/$(date +%Y-%m-%d)"

cd "$REPO_DIR"

# GitHub's noreply address avoids "GH007: would publish a private email" pushes.
git config user.name "${GIT_AUTHOR_NAME:-Mangesh Bhattacharya (auto-sync)}"
git config user.email "${GIT_AUTHOR_EMAIL:-84471637+Mangesh-Bhattacharya@users.noreply.github.com}"

git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${OWNER}/${REPO}.git"
git fetch origin main
git checkout -B "$BRANCH" origin/main

GITHUB_TOKEN="$GITHUB_TOKEN" GITHUB_USER="$OWNER" bash scripts/discover_github.sh > /tmp/github-data.json
CHANGED_LINE=$(python3 scripts/sync_github.py --github-data /tmp/github-data.json)

if [[ "$CHANGED_LINE" != "CHANGED=1" ]]; then
  echo "Nothing changed — skipping commit/PR."
  git checkout main
  git branch -D "$BRANCH" 2>/dev/null || true
  exit 0
fi

git add data/github-snapshot.json sync_summary.md
git commit -m "chore: automated GitHub activity sync

$(cat sync_summary.md)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push -u origin "$BRANCH" --force-with-lease

PR_BODY=$(python3 -c "import json,sys; print(json.dumps(open('sync_summary.md').read()))")
PR_RESPONSE=$(curl -sS -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/${OWNER}/${REPO}/pulls" \
  -d "{\"title\":\"Automated GitHub activity sync ($(date +%Y-%m-%d))\",\"head\":\"${BRANCH}\",\"base\":\"main\",\"body\":${PR_BODY}}")

PR_URL=$(echo "$PR_RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('html_url',''))" 2>/dev/null || true)

if [[ -n "$PR_URL" ]]; then
  echo "Opened PR: $PR_URL"
else
  echo "Branch pushed but PR creation failed (token likely missing 'Pull requests: Read and write')."
  echo "API response: $PR_RESPONSE"
  echo "Open manually: https://github.com/${OWNER}/${REPO}/pull/new/${BRANCH}"
fi
