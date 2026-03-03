"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { experiences } from "@/data/experience";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Experience" />
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
                stroke="#FF6B6B"
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
                  <div
                    className={`md:w-[calc(50%-2rem)] rounded-xl p-5 border bg-white shadow-sm ${
                      exp.accent ? "" : "border-navy/10"
                    }`}
                    style={{
                      borderColor: exp.accent ? `${exp.accent}80` : undefined,
                      backgroundColor: exp.accent ? `${exp.accent}10` : undefined,
                    }}
                  >
                    <h3 className="font-caveat text-2xl text-navy mb-0.5">{exp.role}</h3>
                    <p
                      className="font-patrick text-sm font-semibold mb-0.5"
                      style={{ color: exp.accent ?? "#FF6B6B" }}
                    >
                      {exp.company}
                    </p>
                    <p className="font-patrick text-xs text-muted mb-3">{exp.period}</p>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="font-inter text-sm text-navy/75 pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-xs"
                          style={{
                            ["--tw-before-color" as string]: exp.accent ?? "#FF6B6B",
                          }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dot on the line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-coral bg-background z-10" />

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
