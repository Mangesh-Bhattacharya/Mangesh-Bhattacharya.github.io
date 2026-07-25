"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useCountUp } from "@/hooks/useCountUp";
import { profile, stats } from "@/data/resume";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-center gap-1 px-4 py-2 text-center sm:px-6"
    >
      <span className="font-mono text-2xl font-bold text-emerald sm:text-3xl">
        {current}
        {suffix}
      </span>
      <span className="max-w-[10rem] text-xs text-muted sm:text-sm">{label}</span>
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center pt-28 pb-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-blink" />
            status: open for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 flex h-9 items-center font-mono text-xl text-cyan sm:text-2xl"
          >
            <span>&gt;_ {typed}</span>
            <span className="ml-1 h-6 w-[2px] animate-blink bg-cyan" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-balance text-lg text-muted"
          >
            MITS-AI Graduate Student &amp; Cybersecurity Engineer — Cloud Security (AWS &amp; Azure),
            AI Threat Detection, and DevSecOps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald px-6 py-3 text-sm font-semibold text-[#04150f] transition-transform hover:scale-[1.03]"
            >
              Explore Portfolio
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              Contact Me
            </a>
            <div className="ml-1 flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-border p-2.5 text-muted transition-colors hover:border-emerald/40 hover:text-emerald"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-border p-2.5 text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="rounded-lg border border-border p-2.5 text-muted transition-colors hover:border-amber/40 hover:text-amber"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="animate-float rounded-2xl border border-border glass p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber/70" />
              <span className="h-3 w-3 rounded-full bg-emerald/70" />
              <span className="ml-2 font-mono text-xs text-muted">whoami.sh</span>
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-emerald sm:text-sm">
{`$ whoami
mangesh.bhattacharya

$ cat role.txt
Cybersecurity Engineer
MITS-AI Grad Student

$ ./scan_focus.sh
[✔] Cloud Security (AWS/Azure)
[✔] AI Threat Detection
[✔] DevSecOps & Automation
[✔] Offensive Security / CTF

$ echo $STATUS
open_for_opportunities`}
            </pre>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mx-auto mt-16 w-full max-w-5xl px-6 lg:px-8"
      >
        <div className="flex flex-wrap items-center justify-center divide-y divide-border rounded-2xl border border-border glass sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
