import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Terminal } from "@/components/Terminal";
import { PromptFirewall } from "@/components/PromptFirewall";
import { LiveRepos } from "@/components/LiveRepos";
import { CyberBackground } from "@/components/CyberBackground";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { certs, education, experience, profile, projects, stats, thm, toolkit, type Project } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mangesh Bhattacharya — Cybersecurity Engineer & AI Threat Detection" },
      { name: "description", content: "Portfolio of Mangesh Bhattacharya: AI-security projects, live GitHub activity, TryHackMe paths, experience, certifications and an interactive security terminal." },
      { property: "og:title", content: "Mangesh Bhattacharya — Cybersecurity Engineer & AI Threat Detection" },
      { property: "og:description", content: "AI-driven detection, cloud security and DevSecOps. Try the live terminal and LLM prompt firewall." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [["toolkit", "Toolkit"], ["projects", "Projects"], ["lab", "Live lab"], ["experience", "Experience"], ["education", "Education"], ["thm", "Hackathons"], ["certs", "Certs"], ["contact", "Contact"]];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1200); setN(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Section({ id, tag, title, sub, children }: { id: string; tag: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs text-primary"><span className="size-1.5 rounded-full bg-primary" />./{tag}</span>
      <h2 className="mt-5 break-words text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
      <div className="mt-8 sm:mt-12">{children}</div>
    </section>
  );
}

function Index() {
  const [track, setTrack] = useState<"All" | Project["track"]>("All");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const shown = projects.filter((p) => track === "All" || p.track === track);
  const tools = cat === "All" ? Object.values(toolkit).flat() : (toolkit[cat] ?? []);

  return (
    <div className="relative isolate overflow-x-hidden">
      <CyberBackground />
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[900px]" />

      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-xl">
        <nav aria-label="Main navigation" className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:flex lg:justify-between">
          <a href="#top" aria-label="Mangesh Bhattacharya home" className="min-w-0 truncate font-mono text-[11px] font-semibold min-[360px]:text-xs sm:text-sm">Mangesh Bhattacharya<span className="caret text-primary">_</span></a>
          <div className="hidden min-w-0 gap-1 text-sm lg:flex">
            {NAV.map(([id, l]) => <Button asChild variant="ghost" size="sm" className="nav-feedback" key={id}><a href={`#${id}`}>{l}</a></Button>)}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild><a href={`mailto:${profile.email}`}>Hire me</a></Button>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </nav>
        {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="grid grid-cols-2 gap-1 border-t bg-card p-3 lg:hidden">
          {NAV.map(([id, label]) => <Button asChild key={id} variant="ghost" className="nav-feedback justify-start"><a href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a></Button>)}
        </nav>}
      </header>

      <main id="top" className="relative z-10">
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-20 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="relative flex size-2 shrink-0"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative size-2 rounded-full bg-primary" /></span>
            status: open for opportunities · {profile.location}
          </span>
          <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl">
            Securing the systems <span className="text-primary">AI</span> is about to run.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">I'm {profile.name} — {profile.summary}</p>
          <div className="mt-8 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:flex">
            <Button asChild size="lg"><a href="#lab">Try the live lab →</a></Button>
            <Button asChild variant="outline" size="lg"><a href="#projects">See projects</a></Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:mt-16 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0 bg-card p-4 sm:p-6">
                <div className="text-3xl font-semibold tabular-nums text-primary sm:text-4xl"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="overflow-hidden border-y py-4">
          <div className="marquee flex w-max gap-10 font-mono text-sm text-muted-foreground">
            {[...Object.values(toolkit).flat(), ...Object.values(toolkit).flat()].map((t, i) => <span key={i}>◆ {t}</span>)}
          </div>
        </div>

        <Section id="terminal" tag="interactive" title="Try the terminal" sub="Type a command or click one below — `github` pulls live data straight from my profile.">
          <Terminal />
        </Section>

        <Section id="toolkit" tag="toolkit" title="Core Technical Toolkit" sub="Filter by discipline.">
          <div className="flex flex-wrap gap-2">
            {["All", ...Object.keys(toolkit)].map((c) => (
              <Button key={c} variant="filter" data-active={cat === c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {tools.map((t) => <span key={t} className="rounded-lg border bg-card px-4 py-2 font-mono text-sm transition hover:border-primary hover:text-primary">{t}</span>)}
          </div>
        </Section>

        <Section id="projects" tag="projects" title="Latest projects" sub="AI-Security and AI/ML work — from research to production detection systems.">
          <div className="flex flex-wrap gap-2">
            {(["All", "AI-Security", "AI/ML", "Cloud"] as const).map((t) => (
              <Button key={t} variant="filter" data-active={track === t} aria-pressed={track === t} onClick={() => setTrack(t)}>{t}</Button>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {shown.map((p) => (
              <article key={p.title} className="card-feedback group min-w-0 rounded-lg border bg-card p-5 sm:p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 font-mono text-xs"><span className="text-primary">{p.track}</span><span className="shrink-0 text-muted-foreground">{p.level}</span></div>
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{p.impact}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded border bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">{t}</span>)}</div>
              </article>
            ))}
          </div>
          <h3 className="mb-6 mt-12 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 font-mono text-xs text-muted-foreground sm:text-sm"><span className="size-2 shrink-0 animate-pulse rounded-full bg-primary" />LIVE · latest GitHub activity (auto-refresh)</h3>
          <LiveRepos />
        </Section>

        <Section id="lab" tag="live-lab" title="Break my LLM firewall." sub="AI agents are the new attack surface. Paste any prompt — this detector scores it in real time against OWASP Top 10 for LLMs patterns, the same thinking I bring to production AI security.">
          <PromptFirewall />
        </Section>

        <Section id="experience" tag="experience" title="Professional Experience" sub="From LinkedIn — DevSecOps and AI observability work.">
          <div className="divide-y border-y">
            {experience.map((e, i) => (
              <div key={e.role}>
                <Button variant="ghost" onClick={() => setOpen(open === i ? -1 : i)} className="grid h-auto w-full grid-cols-[minmax(0,1fr)_auto] gap-4 whitespace-normal rounded-none px-2 py-5 text-left sm:px-4" aria-expanded={open === i} aria-controls={`experience-${i}`}>
                  <span className="min-w-0"><span className="block text-lg font-semibold">{e.role}</span><span className="block text-sm text-muted-foreground">{e.org}</span><span className="mt-2 block font-mono text-xs text-muted-foreground sm:hidden">{e.period}</span></span>
                  <span className="flex shrink-0 items-center gap-4"><span className="hidden font-mono text-xs text-muted-foreground sm:block">{e.period}</span><ChevronDown className={`transition-transform ${open === i ? "rotate-180" : ""}`} /></span>
                </Button>
                {open === i && <ul id={`experience-${i}`} className="space-y-2 px-2 pb-6 text-sm text-muted-foreground sm:px-4">{e.points.map((p) => <li key={p} className="flex gap-3"><span className="shrink-0 text-primary">▸</span>{p}</li>)}</ul>}
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" tag="education" title="Education" sub="Formal training in security, AI and networking — Ontario Tech, Seneca and Humber.">
          <div className="grid gap-4 md:grid-cols-3">
            {education.map((e) => <div key={e.school} className="card-feedback min-w-0 rounded-lg border bg-card p-5"><div className="font-mono text-xs text-muted-foreground">{e.period}</div><div className="mt-2 font-semibold">{e.school}</div><div className="text-sm text-muted-foreground">{e.degree}</div></div>)}
          </div>
        </Section>


        <Section id="thm" tag="hackathons" title="TryHackMe & CTF" sub="Learning paths and competitions completed — hands-on offense and defense.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {thm.map((t, i) => (
              <div key={t.path} className="card-feedback grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border bg-card p-5">
                <div className="min-w-0"><div className="font-mono text-xs text-muted-foreground">#{String(i + 1).padStart(2, "0")} · {t.tag}</div><div className="mt-1 font-semibold">{t.path}</div></div>
                <span className="shrink-0 font-mono text-success">✔</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid min-w-0 gap-4 sm:flex sm:items-center">
            <a href={profile.tryhackme} target="_blank" rel="noreferrer" className="linked-card-feedback min-w-0 w-fit max-w-full rounded-lg border bg-card p-2">
              <img
                src={`https://tryhackme-badges.s3.amazonaws.com/${profile.tryhackmeUser}.png`}
                alt={`TryHackMe live badge for ${profile.tryhackmeUser}`}
                className="h-auto w-[320px] max-w-full rounded-lg"
                loading="lazy"
              />
            </a>
            <Button asChild variant="link" className="justify-start px-0 font-mono"><a href={profile.tryhackme} target="_blank" rel="noreferrer">view TryHackMe profile ↗</a></Button>
          </div>
        </Section>

        <Section id="certs" tag="certs" title="Certifications">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {certs.map((c) => <div key={c.name} className="card-feedback min-w-0 rounded-lg border bg-card p-5"><div className="font-semibold">{c.name}</div><div className="mt-1 text-sm text-muted-foreground">{c.issuer}</div></div>)}
          </div>
        </Section>

        <Section id="contact" tag="contact" title="Let's secure what's next.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Email", profile.email, `mailto:${profile.email}`], ["Phone", profile.phone, `tel:${profile.phone.replace(/[^+\d]/g, "")}`], ["LinkedIn", "/in/mangesh-bhattacharya", profile.linkedin], ["GitHub", `/${profile.github}`, `https://github.com/${profile.github}`]].map(([k, v, h]) => (
              <a key={k} href={h} target="_blank" rel="noreferrer" className="linked-card-feedback min-w-0 rounded-lg border bg-card p-5"><div className="font-mono text-xs text-muted-foreground">{k}</div><div className="mt-2 break-all text-sm font-medium">{v}</div></a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="relative z-10 border-t px-4 py-8 text-center font-mono text-xs leading-relaxed text-muted-foreground">
        {"mangesh@security-lab:~$ "}status: open for opportunities · © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
