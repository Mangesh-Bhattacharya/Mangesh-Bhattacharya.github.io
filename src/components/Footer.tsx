import { profile } from "@/data/resume";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-emerald">
          <span className="text-muted">mangesh@security-lab:~$</span>{" "}
          <span>status: </span>
          <span className="text-emerald">Open for Opportunities</span>
          <span className="ml-1 inline-block h-4 w-[2px] animate-blink bg-emerald align-middle" />
        </div>
        <p className="text-center text-xs text-muted">
          © {year} {profile.name}. Built with Next.js, Tailwind CSS &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
