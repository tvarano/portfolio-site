"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import RetroBox from "@/components/ui/RetroBox";
import { experiences } from "@/data/experience";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-[#FDF3D9]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Experience" accentColor="#D4930A" />
        </ScrollReveal>

        <div className="relative">
          {/* Animated center line (desktop only) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden md:block" aria-hidden>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="1" y1="0" x2="1" y2="100"
                stroke="#D4930A"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="space-y-10 md:space-y-0">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const cardAccent = exp.accent ?? "#D4930A";
              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row md:items-start gap-4 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Card */}
                  <div className="md:w-[calc(50%-2rem)]">
                    <RetroBox
                      accentColor={cardAccent}
                      surface="white"
                      className="p-5"
                    >
                      <h3 className="font-oi text-2xl text-ink mb-0.5">{exp.role}</h3>
                      <p
                        className="font-mono text-sm uppercase tracking-wide mb-0.5"
                        style={{ color: cardAccent }}
                      >
                        {exp.company}
                      </p>
                      <p className="groovy-label mb-3">{exp.period}</p>
                      <ul className="space-y-1.5">
                        {exp.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="font-inter text-sm text-ink/75 pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-xs"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </RetroBox>
                  </div>

                  {/* Dot on the line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full border-2 border-ink bg-amber z-10" />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
