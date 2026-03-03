"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import RetroBox from "@/components/ui/RetroBox";
import { skills } from "@/data/skills";

const primary = skills.filter((s) => s.tier === "primary");
const secondary = skills.filter((s) => s.tier === "secondary");
const tools = skills.filter((s) => s.tier === "tools");

const LANG_ICONS: Record<string, string> = {
  Python: "🐍",
  Swift: "🍎",
  Java: "☕",
};

const PRIMARY_COLORS: Record<string, string> = {
  Python: "#006D77",
  Swift: "#B5179E",
  Java: "#D4930A",
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Skills" accentColor="#D4930A" />
        </ScrollReveal>

        {/* Primary */}
        <ScrollReveal delay={0.1}>
          <p className="groovy-label mb-4">Most Proficient</p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-3 gap-5 mb-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {primary.map((skill) => {
            const accent = PRIMARY_COLORS[skill.name] ?? "#14213D";
            return (
              <motion.div
                key={skill.name}
                variants={item}
                whileHover={{ y: -6, x: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <RetroBox
                  accentColor={accent}
                  surface="white"
                  className="flex flex-col items-center gap-2 py-6 cursor-default"
                >
                  <span className="text-4xl">{LANG_ICONS[skill.name]}</span>
                  <span className="font-mono text-sm text-ink uppercase tracking-wide">{skill.name}</span>
                </RetroBox>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Secondary */}
        <ScrollReveal delay={0.15}>
          <p className="groovy-label mb-3">Other Experience</p>
        </ScrollReveal>

        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {secondary.map((skill) => (
            <motion.div key={skill.name} variants={item}>
              <Tag label={skill.name} color={skill.color} />
            </motion.div>
          ))}
        </motion.div>

        {/* Tools */}
        <ScrollReveal delay={0.2}>
          <p className="groovy-label mb-3">Tools &amp; Environments</p>
        </ScrollReveal>

        <motion.div
          className="flex flex-wrap gap-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tools.map((skill) => (
            <motion.div key={skill.name} variants={item}>
              <Tag label={skill.name} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
