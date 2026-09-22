#!/usr/bin/env bash
# Discovers public repo activity for GITHUB_USER via the REST API.
# Must be run somewhere with unrestricted access to api.github.com
# (the cloud sandbox's egress proxy blocks github.com/api.github.com
# for this account unless the repo is explicitly added — run this on
# the linked desktop via device_bash instead).
#
# Usage: GITHUB_USER=Mangesh-Bhattacharya ./discover_github.sh > github-data.json
# Optional: GITHUB_TOKEN=<pat> for higher rate limits (60/hr unauth is plenty for a 6h cadence).
set -euo pipefail

USER="${GITHUB_USER:-Mangesh-Bhattacharya}"
AUTH_HEADER=()
if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  AUTH_HEADER=(-H "Authorization: Bearer ${GITHUB_TOKEN}")
fi

curl -sS "${AUTH_HEADER[@]}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed&type=owner" \
  | python3 -c '
import json, sys
repos = json.load(sys.stdin)
if isinstance(repos, dict):
    print(json.dumps({"error": repos}), file=sys.stderr)
    sys.exit(1)
out = []
for r in repos:
    if r.get("fork"):
        continue
    if r.get("archived"):
        continue
    out.append({
        "name": r["name"],
        "full_name": r["full_name"],
        "description": r.get("description") or "",
        "html_url": r["html_url"],
        "language": r.get("language"),
        "stars": r.get("stargazers_count", 0),
        "topics": r.get("topics", []),
        "pushed_at": r.get("pushed_at"),
        "created_at": r.get("created_at"),
    })
json.dump(out, sys.stdout, indent=2)
'
