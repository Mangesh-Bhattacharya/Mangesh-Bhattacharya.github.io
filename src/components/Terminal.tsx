"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import {
  profile,
  skills,
  experience,
  projects,
  education,
  certifications,
} from "@/data/resume";

type Line = { type: "input" | "output" | "error"; content: string };

const COMMANDS = ["help", "whoami", "skills", "experience", "projects", "education", "certs", "contact", "socials", "sudo hire-me", "clear"];

function jsonBlock(data: unknown) {
  return JSON.stringify(data, null, 2);
}

function runCommand(raw: string): string {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case "":
      return "";
    case "help":
      return [
        "Available commands:",
        "  help          show this help message",
        "  whoami        quick profile summary",
        "  skills        core technical toolkit (JSON)",
        "  experience    professional experience timeline",
        "  projects      featured cybersecurity projects",
        "  education     education & certifications",
        "  certs         certifications only",
        "  contact       how to reach me",
        "  socials       linkedin / github / email",
        "  sudo hire-me  ;)",
        "  clear         clear the terminal",
      ].join("\n");

    case "whoami":
      return jsonBlock({
        name: profile.name,
        titles: profile.roles,
        location: profile.location,
        status: "open_for_opportunities",
        summary: profile.summary,
      });

    case "skills": {
      const grouped: Record<string, string[]> = {};
      skills.forEach((s) => {
        grouped[s.category] = grouped[s.category] || [];
        grouped[s.category].push(s.name);
      });
      return jsonBlock(grouped);
    }

    case "experience":
      return jsonBlock(
        experience.map((e) => ({
          role: e.role,
          org: e.org,
          duration: `${e.start} - ${e.end}`,
        }))
      );

    case "projects":
      return jsonBlock(
        projects.map((p) => ({
          title: p.title,
          difficulty: p.difficulty,
          tagline: p.tagline,
          link: p.link ?? "see portfolio section",
        }))
      );

    case "education":
      return jsonBlock({
        education: education.map((e) => `${e.school} — ${e.degree} (${e.start} - ${e.end})`),
        certifications,
      });

    case "certs":
      return certifications.map((c) => `[✔] ${c}`).join("\n");

    case "contact":
      return jsonBlock({
        email: profile.email,
        phone: profile.phone,
        linkedin: profile.linkedin,
        github: profile.github,
      });

    case "socials":
      return `linkedin: ${profile.linkedin}\ngithub:   ${profile.github}\nemail:    ${profile.email}`;

    case "sudo hire-me":
      return [
        "[sudo] password for recruiter: ********",
        "Permission granted. Escalating to: Full-Time Offer",
        "Initiating handshake with mangeshb20@gmail.com ...",
        "Connection established. Let's build something secure together.",
      ].join("\n");

    default:
      return `command not found: ${raw}\ntype 'help' to see available commands`;
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", content: "Welcome to Mangesh's terminal. Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function execute(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: "input", content: cmd },
      { type: "output", content: runCommand(cmd) },
    ]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    execute(input);
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-[#080b12] shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-amber/70" />
        <span className="h-3 w-3 rounded-full bg-emerald/70" />
        <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-muted">
          <TerminalSquare size={13} />
          mangesh@security-lab: ~
        </span>
      </div>

      <div ref={scrollRef} className="h-80 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <div key={i} className="mb-1.5">
            {line.type === "input" ? (
              <div className="text-cyan">
                <span className="text-emerald">mangesh@security-lab:~$</span> {line.content}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-foreground/90">{line.content}</pre>
            )}
          </div>
        ))}

        <form onSubmit={onSubmit} className="flex items-center gap-2 text-emerald">
          <span>mangesh@security-lab:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-cyan outline-none"
            placeholder="type a command..."
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border bg-surface px-4 py-3">
        {COMMANDS.map((c) => (
          <motion.button
            key={c}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => execute(c)}
            className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-emerald/40 hover:text-emerald"
          >
            {c}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
