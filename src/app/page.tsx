import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TerminalSection } from "@/components/TerminalSection";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex-1">
      <GridBackdrop />
      <Navbar />
      <main>
        <Hero />
        <TerminalSection />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
