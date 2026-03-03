import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SketchBorder from "@/components/ui/SketchBorder";
import SketchButton from "@/components/ui/SketchButton";
import { SITE } from "@/lib/constants";

const FACTS = ["UMD 2022", "CS + Math Minor", "Cum Laude", "GPA 3.91"];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="About" />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Bio */}
          <ScrollReveal delay={0.1} className="md:col-span-2">
            <div className="space-y-4 font-inter text-navy/85 leading-relaxed text-base">
              <p>
                Hi! I&apos;m a software engineer and recent graduate from the University
                of Maryland, graduating cum laude in 2022 with a BS in Computer
                Science and a minor in Mathematics.
              </p>
              <p>
                My interests span networks, systems programming, backend web
                development, and information processing. I love building things
                that are fast, elegant, and actually solve problems — this site
                included.
              </p>
              <p>
                Feel free to reach out — I&apos;m always happy to chat about software,
                projects, or anything else.
              </p>
            </div>

            <div className="mt-8">
              <SketchButton href={`mailto:${SITE.email}`}>
                Say hello →
              </SketchButton>
            </div>
          </ScrollReveal>

          {/* Fact chips */}
          <ScrollReveal delay={0.25}>
            <SketchBorder roughness={1.6} strokeColor="#FF6B6B" padding={16}>
              <div className="flex flex-wrap gap-3">
                {FACTS.map((fact) => (
                  <span
                    key={fact}
                    className="font-patrick text-sm bg-coral/10 text-coral px-3 py-1 rounded-md"
                  >
                    {fact}
                  </span>
                ))}
                <p className="w-full font-patrick text-xs text-muted mt-2">
                  University of Maryland · College Park
                </p>
              </div>
            </SketchBorder>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
