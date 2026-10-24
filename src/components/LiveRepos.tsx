import { useQuery } from "@tanstack/react-query";
import { profile } from "@/data/profile";

type Repo = { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; pushed_at: string; fork: boolean };

function ago(d: string) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function LiveRepos() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["repos"],
    queryFn: async () => {
      const r = await fetch(`https://api.github.com/users/${profile.github}/repos?sort=pushed&per_page=12`);
      if (!r.ok) throw new Error(String(r.status));
      return ((await r.json()) as Repo[]).filter((x) => !x.fork).slice(0, 6);
    },
    refetchInterval: 120_000,
  });

  if (isLoading) return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-lg border bg-card" />)}</div>;
  if (isError || !data) return <p className="font-mono text-sm text-muted-foreground">GitHub is rate-limiting right now — <a className="text-primary" href={`https://github.com/${profile.github}`}>view repos on GitHub ↗</a></p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((r) => (
        <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="linked-card-feedback group min-w-0 rounded-lg border bg-card p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="flex min-w-0 items-center gap-2"><span className="size-1.5 shrink-0 animate-pulse rounded-full bg-primary" />pushed {ago(r.pushed_at)}</span>
            <span className="shrink-0">★ {r.stargazers_count}</span>
          </div>
          <h4 className="mt-3 break-words font-semibold [overflow-wrap:anywhere]">{r.name}</h4>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description ?? "No description yet."}</p>
          <span className="mt-3 inline-block font-mono text-xs text-primary">{r.language ?? "—"}</span>
        </a>
      ))}
    </div>
  );
}
