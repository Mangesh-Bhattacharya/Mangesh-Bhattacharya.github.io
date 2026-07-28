import { MapPin, GraduationCap, ShieldCheck, Cpu } from "lucide-react";
import { profile } from "@/data/resume";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const facts = [
  { icon: MapPin, label: profile.location },
  { icon: GraduationCap, label: "MITS-AI Graduate Student, Ontario Tech University" },
  { icon: ShieldCheck, label: "Open to Work — Full-Time & Contract Roles" },
  { icon: Cpu, label: "AI-Driven Detection · Cloud Security · DevSecOps" },
];

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading eyebrow="./about" title="About Me" />

        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
            <p className="text-balance text-center text-lg leading-relaxed text-foreground/90">
              {profile.summary}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-muted"
                >
                  <f.icon size={16} className="shrink-0 text-emerald" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
