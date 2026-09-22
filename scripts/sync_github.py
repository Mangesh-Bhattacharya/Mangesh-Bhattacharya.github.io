#!/usr/bin/env python3
"""
Diffs freshly-fetched GitHub repo data against the last known snapshot and:

  1. Updates data/github-snapshot.json (source of truth for "what we've seen").
  2. NEVER auto-edits src/data/resume.ts's curated `projects` array — deciding
     whether a repo is portfolio-worthy, and how to describe it, is a judgment
     call that stays with Mangesh. Auto-inserting marketing copy for every new
     repo (including scratch/WIP ones) would degrade a recruiter-facing page.
  3. Instead, writes a plain-English summary of what's new to sync_summary.md,
     for use as the PR description — new repos, repos that went quiet, repos
     with fresh commit activity on ones already featured in resume.ts.

Run from the repo root:
    python3 scripts/sync_github.py --github-data github-data.json
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SNAPSHOT_PATH = REPO_ROOT / "data" / "github-snapshot.json"
RESUME_TS_PATH = REPO_ROOT / "src" / "data" / "resume.ts"
SUMMARY_PATH = REPO_ROOT / "sync_summary.md"


def load_json(path: Path):
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def featured_repo_names() -> set[str]:
    """Best-effort extraction of repo names already linked from resume.ts's
    projects array, so we can flag fresh activity on repos already featured."""
    if not RESUME_TS_PATH.exists():
        return set()
    text = RESUME_TS_PATH.read_text(encoding="utf-8")
    return set(re.findall(r"github\.com/[\w.-]+/([\w.-]+)", text))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--github-data", required=True, type=Path,
                         help="JSON produced by discover_github.sh")
    args = parser.parse_args()

    new_data = load_json(args.github_data)
    old_data = load_json(SNAPSHOT_PATH)

    old_by_name = {r["name"]: r for r in old_data}
    new_by_name = {r["name"]: r for r in new_data}
    featured = featured_repo_names()

    brand_new = [r for r in new_data if r["name"] not in old_by_name]
    freshly_pushed = [
        r for r in new_data
        if r["name"] in old_by_name
        and r["pushed_at"] != old_by_name[r["name"]]["pushed_at"]
    ]
    disappeared = [r for r in old_data if r["name"] not in new_by_name]

    lines: list[str] = ["## Automated GitHub sync\n"]
    changed = False

    if brand_new:
        changed = True
        lines.append(f"### New public repos ({len(brand_new)})\n")
        for r in sorted(brand_new, key=lambda r: r["pushed_at"], reverse=True):
            star_note = f", {r['stars']}★" if r["stars"] else ""
            lines.append(
                f"- **[{r['name']}]({r['html_url']})**{star_note} "
                f"({r['language'] or 'unknown'}) — {r['description'] or 'no description'}"
            )
        lines.append(
            "\n_Not added to the curated `projects` list automatically — "
            "review and add manually in `src/data/resume.ts` if portfolio-worthy._\n"
        )

    if freshly_pushed:
        featured_updates = [r for r in freshly_pushed if r["name"] in featured]
        other_updates = [r for r in freshly_pushed if r["name"] not in featured]
        if featured_updates:
            changed = True
            lines.append(f"### Fresh commits on featured projects ({len(featured_updates)})\n")
            for r in featured_updates:
                lines.append(f"- **{r['name']}** — pushed {r['pushed_at']}")
            lines.append("")
        if other_updates:
            lines.append(f"### Fresh commits on other repos ({len(other_updates)}, not featured)\n")
            for r in other_updates[:10]:
                lines.append(f"- {r['name']} — pushed {r['pushed_at']}")
            lines.append("")

    if disappeared:
        changed = True
        lines.append(f"### Repos no longer visible ({len(disappeared)})\n")
        for r in disappeared:
            lines.append(f"- {r['name']} (deleted, renamed, or made private)")
        lines.append("")

    if not changed:
        lines.append("No new repos, no fresh activity on featured projects, nothing removed.\n")

    SUMMARY_PATH.write_text("\n".join(lines), encoding="utf-8")
    SNAPSHOT_PATH.parent.mkdir(parents=True, exist_ok=True)
    SNAPSHOT_PATH.write_text(json.dumps(new_data, indent=2), encoding="utf-8")

    print(f"Wrote {SUMMARY_PATH}", file=sys.stderr)
    print(f"Wrote {SNAPSHOT_PATH}", file=sys.stderr)
    print("CHANGED=1" if changed else "CHANGED=0")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
