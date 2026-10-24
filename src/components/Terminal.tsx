import { useEffect, useRef, useState, type ReactNode } from "react";
import { certs, education, experience, profile, projects, toolkit, thm } from "@/data/profile";
import { Button } from "@/components/ui/button";

type Line = { kind: "in" | "out"; node: ReactNode };
const CMDS = ["help", "whoami", "skills", "experience", "projects", "education", "certs", "thm", "github", "contact", "socials", "sudo hire-me", "clear"];
const P = "mangesh@security-lab:~$";

async function githubLatest(): Promise<ReactNode> {
  const r = await fetch(`https://api.github.com/users/${profile.github}/repos?sort=pushed&per_page=5`);
  if (!r.ok) return <span className="text-destructive">github api: {r.status} (rate-limited?)</span>;
  const repos: { name: string; html_url: string; pushed_at: string; language: string | null }[] = await r.json();
  return (
    <div>
      <div className="text-muted-foreground">[live] latest pushes from github.com/{profile.github}</div>
      {repos.map((x) => (
        <div key={x.name}>
          <a className="text-info underline-offset-2 hover:underline" href={x.html_url} target="_blank" rel="noreferrer">{x.name}</a>
          <span className="text-muted-foreground"> · {x.language ?? "—"} · {new Date(x.pushed_at).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}

function run(cmd: string): ReactNode | Promise<ReactNode> {
  switch (cmd) {
    case "help":
      return <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">{CMDS.map((c) => <span key={c}><span className="text-primary">{c}</span></span>)}</div>;
    case "whoami":
      return <div><div className="text-primary">{profile.name}</div><div>{profile.role}</div><div className="text-muted-foreground">{profile.location}</div></div>;
    case "skills":
      return <div>{Object.entries(toolkit).map(([k, v]) => <div key={k}><span className="text-warning">{k}:</span> {v.join(", ")}</div>)}</div>;
    case "experience":
      return <div>{experience.map((e) => <div key={e.role}><span className="text-primary">{e.role}</span> <span className="text-muted-foreground">— {e.period}</span></div>)}</div>;
    case "projects":
      return <div>{projects.map((p) => <div key={p.title}>[{p.track}] <span className="text-primary">{p.title}</span> <span className="text-muted-foreground">· {p.impact}</span></div>)}</div>;
    case "education":
      return <div>{education.map((e) => <div key={e.school}><span className="text-primary">{e.school}</span> — {e.degree}</div>)}</div>;
    case "certs":
      return <div>{certs.map((c) => <div key={c.name}>✔ {c.name} <span className="text-muted-foreground">({c.issuer})</span></div>)}</div>;
    case "thm":
      return <div>{thm.map((t) => <div key={t.path}>🏁 {t.path} <span className="text-muted-foreground">[{t.tag}]</span></div>)}</div>;
    case "github":
      return githubLatest();
    case "contact":
      return <div><div>email: <a className="text-info" href={`mailto:${profile.email}`}>{profile.email}</a></div><div>phone: {profile.phone}</div></div>;
    case "socials":
      return <div><a className="text-info" href={profile.linkedin} target="_blank" rel="noreferrer">linkedin</a> · <a className="text-info" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">github</a> · <a className="text-info" href={profile.tryhackme} target="_blank" rel="noreferrer">tryhackme</a></div>;
    case "sudo hire-me":
      return <div><div className="text-warning">[sudo] password for recruiter: ********</div><div className="text-primary">Access granted. Opening secure channel…</div><div>→ <a className="text-info" href={`mailto:${profile.email}?subject=Let's work together`}>{profile.email}</a></div></div>;
    case "sudo rm -rf /":
      return <span className="text-destructive">Nice try. This incident has been logged to the SIEM. 🛡️</span>;
    default:
      return <span className="text-destructive">command not found: {cmd}. Type 'help'.</span>;
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "out", node: <span className="text-muted-foreground">Welcome to Mangesh's terminal. Type 'help' to get started. (Tab autocompletes, ↑ for history)</span> }]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight }); }, [lines]);

  async function exec(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHist((h) => [cmd, ...h]); setHi(-1); setInput("");
    if (cmd === "clear") return setLines([]);
    setLines((l) => [...l, { kind: "in", node: cmd }]);
    const res = run(cmd);
    if (res instanceof Promise) {
      setLines((l) => [...l, { kind: "out", node: <span className="text-muted-foreground">fetching…</span> }]);
      const n = await res.catch(() => <span className="text-destructive">network error</span>);
      setLines((l) => [...l.slice(0, -1), { kind: "out", node: n }]);
    } else setLines((l) => [...l, { kind: "out", node: res }]);
  }

  return (
    <div className="term-panel overflow-hidden rounded-lg border bg-term font-mono text-sm text-foreground">
      <div className="flex min-w-0 items-center gap-2 border-b bg-card px-4 py-3">
        <span className="size-3 rounded-full bg-destructive" /><span className="size-3 rounded-full bg-warning" /><span className="size-3 rounded-full bg-primary" />
        <span className="ml-1 min-w-0 truncate text-xs text-muted-foreground sm:ml-3">▣ mangesh@security-lab: ~</span>
      </div>
      <div ref={body} onClick={() => inputRef.current?.focus()} className="h-80 space-y-1 overflow-y-auto break-words p-4 leading-relaxed sm:p-5 [overflow-wrap:anywhere]">
        {lines.map((l, i) => l.kind === "in" ? <div key={i}><span className="text-primary">{P}</span> {l.node}</div> : <div key={i}>{l.node}</div>)}
        <div className="grid min-w-0 gap-1 sm:flex sm:items-center sm:gap-2">
          <span className="shrink-0 text-primary">{P}</span>
          <input
            ref={inputRef} value={input} aria-label="Terminal command" spellCheck={false} autoComplete="off"
            placeholder="type a command..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") exec(input);
              if (e.key === "Tab") { e.preventDefault(); const m = CMDS.find((c) => c.startsWith(input)); if (m) setInput(m); }
              if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); if (n >= 0) { setHi(n); setInput(hist[n] ?? ""); } }
              if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(n); setInput(n >= 0 ? (hist[n] ?? "") : ""); }
            }}
            className="min-h-11 w-full min-w-0 flex-1 rounded-md bg-transparent text-base text-foreground caret-primary outline-none focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground sm:min-h-8 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t bg-card p-4">
        {CMDS.map((c) => (
          <Button key={c} variant="outline" size="sm" onClick={() => exec(c)} className="font-mono text-muted-foreground hover:border-primary hover:text-primary">{c}</Button>
        ))}
      </div>
    </div>
  );
}
