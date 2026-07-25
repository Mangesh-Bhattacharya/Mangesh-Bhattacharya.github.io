import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "@/data/resume";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="./education"
          title="Education & Certifications"
          description="Formal education paired with continuous, hands-on certification through offensive-security training."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <div className="mb-5 flex items-center gap-2 text-emerald">
                <GraduationCap size={20} />
                <h3 className="text-base font-semibold text-foreground">Education</h3>
              </div>
              <div className="flex flex-col gap-5">
                {education.map((e) => (
                  <div key={e.school} className="card-glow rounded-xl border border-border bg-surface-2 p-4">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold text-foreground">{e.school}</h4>
                      <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-cyan">
                        {e.start} — {e.end}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{e.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <div className="mb-5 flex items-center gap-2 text-amber">
                <Award size={20} />
                <h3 className="text-base font-semibold text-foreground">Certifications</h3>
              </div>
              <div className="flex flex-col gap-3">
                {certifications.map((c) => (
                  <div
                    key={c}
                    className="card-glow flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-foreground/90"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-amber" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
