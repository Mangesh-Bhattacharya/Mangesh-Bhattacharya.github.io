"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cloud, Crosshair, Wrench } from "lucide-react";
import { skillCategories, skills, type SkillCategory } from "@/data/resume";
import { SectionHeading } from "./ui/SectionHeading";

const categoryIcons: Record<SkillCategory, React.ElementType> = {
  "AI & Threat Detection": Brain,
  "Cloud & DevSecOps": Cloud,
  "Offensive Security & Pentesting": Crosshair,
  "Frameworks & Tools": Wrench,
};

const categoryAccent: Record<SkillCategory, string> = {
  "AI & Threat Detection": "hover:border-cyan/50 hover:text-cyan",
  "Cloud & DevSecOps": "hover:border-emerald/50 hover:text-emerald",
  "Offensive Security & Pentesting": "hover:border-amber/50 hover:text-amber",
  "Frameworks & Tools": "hover:border-cyan/50 hover:text-cyan",
};

type Filter = "All" | SkillCategory;

export function Skills() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...skillCategories];

  const visible = filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="./toolkit"
          title="Core Technical Toolkit"
          description="Filter by discipline to see the tools and frameworks I rely on day to day."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "border-emerald bg-emerald/15 text-emerald"
                  : "border-border bg-surface text-muted hover:border-emerald/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => {
              const Icon = categoryIcons[skill.category];
              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`card-glow flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-foreground/90 ${categoryAccent[skill.category]}`}
                >
                  <Icon size={16} className="shrink-0 opacity-70" />
                  <span className="leading-tight">{skill.name}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
