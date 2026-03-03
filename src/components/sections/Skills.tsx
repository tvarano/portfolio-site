"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import { skills } from "@/data/skills";

const primary = skills.filter((s) => s.tier === "primary");
const secondary = skills.filter((s) => s.tier === "secondary");
const tools = skills.filter((s) => s.tier === "tools");

const LANG_ICONS: Record<string, string> = {
  Python: "🐍",
  Swift: "🍎",
  Java: "☕",
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
    <section id="skills" className="py-24 px-6 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Skills" />
        </ScrollReveal>

        {/* Primary */}
        <ScrollReveal delay={0.1}>
          <p className="font-patrick text-muted text-sm mb-4">Most Proficient</p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-3 gap-4 mb-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {primary.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex flex-col items-center gap-2 py-6 rounded-xl bg-white border border-navy/10 shadow-sm cursor-default"
            >
              <span className="text-4xl">{LANG_ICONS[skill.name]}</span>
              <span className="font-patrick text-base text-navy">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary */}
        <ScrollReveal delay={0.15}>
          <p className="font-patrick text-muted text-sm mb-3">Other Experience</p>
        </ScrollReveal>

        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {secondary.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={item}
              style={{ rotate: (i % 2 === 0 ? 1 : -1) * (Math.random() * 1.5) }}
            >
              <Tag label={skill.name} color={skill.color} />
            </motion.div>
          ))}
        </motion.div>

        {/* Tools */}
        <ScrollReveal delay={0.2}>
          <p className="font-patrick text-muted text-sm mb-3">Tools &amp; Environments</p>
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
              <Tag label={skill.name} className="text-xs" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
