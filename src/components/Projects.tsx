"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ShieldCheck } from "lucide-react";
import { projects, type Difficulty } from "@/data/resume";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const difficultyColor: Record<Difficulty, string> = {
  Beginner: "text-emerald border-emerald/40 bg-emerald/10",
  Intermediate: "text-cyan border-cyan/40 bg-cyan/10",
  Advanced: "text-amber border-amber/40 bg-amber/10",
};

export function Projects() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="./projects"
          title="Featured Projects & Highlights"
          description="Hands-on cybersecurity work spanning beginner-friendly research tools to advanced ML/graph-based detection systems."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(p)}
                className="card-glow group flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-6 text-left"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="rounded-lg border border-emerald/30 bg-emerald/10 p-2 text-emerald">
                    <ShieldCheck size={18} />
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${difficultyColor[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-emerald">
                  {p.title}
                </h3>
                <p className="mb-4 text-sm text-cyan">{p.tagline}</p>
                <p className="mb-5 line-clamp-3 text-sm text-muted">{p.description}</p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] text-muted">
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] text-muted">
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-border bg-surface p-7 shadow-2xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-emerald/30 bg-emerald/10 p-2 text-emerald">
                    <ShieldCheck size={20} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{active.title}</h3>
                    <p className="text-sm text-cyan">{active.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted">{active.description}</p>

              <div className="mb-5 grid grid-cols-2 gap-3">
                {active.metrics.map((m) => (
                  <div key={m} className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-emerald">
                    {m}
                  </div>
                ))}
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {active.stack.map((s) => (
                  <span key={s} className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>

              {active.link && (
                <a
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald px-5 py-2.5 text-sm font-semibold text-[#04150f] transition-transform hover:scale-[1.03]"
                >
                  View on GitHub
                  <ExternalLink size={15} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
