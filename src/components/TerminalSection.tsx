import { SectionHeading } from "./ui/SectionHeading";
import { Terminal } from "./Terminal";
import { Reveal } from "./ui/Reveal";

export function TerminalSection() {
  return (
    <section id="terminal" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="./interactive"
          title="Try the terminal"
          description="Type a command or click one below — pulls live data straight from my profile."
        />
        <Reveal delay={0.1}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
