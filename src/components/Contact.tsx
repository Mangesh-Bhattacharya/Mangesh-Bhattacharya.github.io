"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { profile } from "@/data/resume";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || "Anonymous"} (${form.email || "no email provided"})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="./contact"
          title="Let's Work Together"
          description="Open to full-time roles, contract security engagements, and interesting problems in AI + cybersecurity."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="card-glow flex items-center gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <span className="rounded-lg border border-emerald/30 bg-emerald/10 p-2.5 text-emerald">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">Email</p>
                  <p className="font-medium text-foreground">{profile.email}</p>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
                className="card-glow flex items-center gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <span className="rounded-lg border border-cyan/30 bg-cyan/10 p-2.5 text-cyan">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">Phone</p>
                  <p className="font-medium text-foreground">{profile.phone}</p>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="card-glow flex items-center gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <span className="rounded-lg border border-amber/30 bg-amber/10 p-2.5 text-amber">
                  <LinkedinIcon size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">LinkedIn</p>
                  <p className="font-medium text-foreground">/in/mangesh-bhattacharya</p>
                </div>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="card-glow flex items-center gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <span className="rounded-lg border border-border bg-surface-2 p-2.5 text-foreground">
                  <GithubIcon size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">GitHub</p>
                  <p className="font-medium text-foreground">/Mangesh-Bhattacharya</p>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
            >
              <div>
                <label className="mb-1.5 block text-xs text-muted">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-emerald/50"
                  placeholder="Jane Recruiter"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-emerald/50"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block text-xs text-muted">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-none rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-emerald/50"
                  placeholder="Let's talk about a role or a project..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-semibold text-[#04150f]"
              >
                Send Message
                <Send size={15} />
              </motion.button>
              <p className="text-center text-[11px] text-muted">
                Opens your email client — nothing is sent from this page.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
