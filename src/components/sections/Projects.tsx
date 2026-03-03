"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import RetroCard from "@/components/ui/RetroCard";
import Tag from "@/components/ui/Tag";
import { projects } from "@/data/projects";

const CATEGORY_COLOR: Record<string, string> = {
  Personal: "#006D77",
  School: "#14213D",
  Intern: "#D4930A",
  Competition: "#B5179E",
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Projects" accentColor="#006D77" />
        </ScrollReveal>

        <motion.div
          className="columns-1 md:columns-2 gap-5 space-y-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, i) => {
            const accent = CATEGORY_COLOR[project.category] ?? "#14213D";
            return (
              <motion.div key={project.id} variants={item} className="break-inside-avoid">
                <RetroCard accentColor={accent} className="w-full">
                  <div className="p-5">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span
                          className="font-mono text-xs px-3 py-0.5 rounded-full text-cream border-2"
                          style={{ backgroundColor: accent, borderColor: accent }}
                        >
                          {project.category}
                        </span>
                        <span className="groovy-label ml-2">
                          {project.year}
                        </span>
                      </div>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal hover:text-teal/70 transition-colors flex-shrink-0"
                          aria-label={`Open ${project.title}`}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-oi text-2xl text-ink mb-2 leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-sm text-ink/75 leading-relaxed mb-3">
                      {project.description}
                    </p>

                    {/* Bullets */}
                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {project.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="font-inter text-xs text-ink/65 pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-teal"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech.map((t) => (
                        <Tag key={t} label={t} />
                      ))}
                    </div>
                  </div>
                </RetroCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
