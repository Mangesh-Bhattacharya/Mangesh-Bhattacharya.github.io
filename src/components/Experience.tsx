"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/resume";
import { SectionHeading } from "./ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="./experience"
          title="Professional Experience"
          description="Freelance security engagements and in-house DevSecOps / AI-observability work."
        />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald via-cyan to-transparent sm:left-[15px]" />

          <div className="flex flex-col gap-10">
            {experience.map((role, i) => (
              <motion.div
                key={role.role + role.start}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald bg-background text-emerald sm:-left-10 sm:h-8 sm:w-8">
                  <Briefcase size={14} />
                </span>

                <div className="card-glow rounded-xl border border-border bg-surface p-5 sm:p-6">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{role.role}</h3>
                    <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-emerald">
                      {role.start} — {role.end}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-cyan">
                    {role.org}
                    {role.location ? ` · ${role.location}` : ""}
                  </p>
                  <ul className="space-y-2">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
