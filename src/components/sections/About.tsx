"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import Tag from "@/components/ui/Tag";
import { SITE } from "@/lib/constants";
import { skills } from "@/data/skills";

const primary = skills.filter((s) => s.tier === "primary");
const secondary = skills.filter((s) => s.tier === "secondary");
const soft = skills.filter((s) => s.tier === "soft");

const LANG_ICONS: Record<string, string> = {
  "C++": "⚙️",
  Java: "☕",
  Android: "🤖",
};

const PRIMARY_COLORS: Record<string, string> = {
  "C++": "#00599C",
  Java: "#D4930A",
  Android: "#34A853",
};

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

          {/* Mini skills panel */}
          <ScrollReveal delay={0.25}>
            <div className="space-y-3">
              <p className="groovy-label mb-2">Languages</p>
              <div className="grid grid-cols-3 gap-2">
                {primary.map((skill) => {
                  const accent = PRIMARY_COLORS[skill.name] ?? "#14213D";
                  return (
                    <RetroCard
                      key={skill.name}
                      accentColor={accent}
                      surface="white"
                      offset={4}
                      className="flex flex-col items-center gap-1 py-3 px-1 cursor-default"
                    >
                      <span className="text-2xl">{LANG_ICONS[skill.name]}</span>
                      <span className="font-mono text-xs text-ink uppercase tracking-wide">
                        {skill.name}
                      </span>
                    </RetroCard>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {secondary.slice(0, 10).map((s) => (
                  <Tag key={s.name} label={s.name} color={s.color} />
                ))}
              </div>
              <div className="mt-3">
                <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-1.5">Also</p>
                <div className="flex flex-wrap gap-1">
                  {soft.map((s) => (
                    <span
                      key={s.name}
                      className="font-inter text-[11px] text-ink/50 italic"
                    >
                      {s.name}
                      {soft.indexOf(s) < soft.length - 1 && <span className="mx-0.5">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
