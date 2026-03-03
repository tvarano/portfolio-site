import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import RetroBox from "@/components/ui/RetroBox";
import RetroButton from "@/components/ui/RetroButton";
import { SITE } from "@/lib/constants";

const FACTS = ["UMD 2022", "CS + Math Minor", "Cum Laude", "GPA 3.91"];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#E0F2F3]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="About" accentColor="#006D77" />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Bio */}
          <ScrollReveal delay={0.1} className="md:col-span-2">
            <div className="space-y-4 font-inter text-ink/85 leading-relaxed text-base">
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
              <RetroButton href={`mailto:${SITE.email}`} variant="secondary">
                Say hello →
              </RetroButton>
            </div>
          </ScrollReveal>

          {/* Fact chips */}
          <ScrollReveal delay={0.25}>
            <RetroBox accentColor="#006D77" surface="#E8F7F8" className="p-5">
              <div className="flex flex-wrap gap-3">
                {FACTS.map((fact) => (
                  <span
                    key={fact}
                    className="font-mono text-xs bg-teal/10 text-teal px-4 py-1.5 rounded-full border-2 border-teal uppercase tracking-widest"
                  >
                    {fact}
                  </span>
                ))}
                <p className="w-full font-mono text-xs text-ink/50 mt-2 uppercase tracking-widest">
                  University of Maryland · College Park
                </p>
              </div>
            </RetroBox>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
