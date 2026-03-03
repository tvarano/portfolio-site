"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { semesters } from "@/data/coursework";

export default function Coursework() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="coursework" className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Coursework" />
        </ScrollReveal>

        {/* Degree banner */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 p-4 rounded-xl bg-yellow/30 border-2 border-yellow/60 font-patrick text-navy">
            <p className="text-base font-semibold">BS Computer Science · Minor in Mathematics</p>
            <p className="text-sm text-navy/70">University of Maryland · May 2022 · Cum Laude · GPA 3.91</p>
          </div>
        </ScrollReveal>

        {/* Accordion */}
        <div className="space-y-3">
          {semesters.map((sem, i) => (
            <ScrollReveal key={sem.label} delay={0.05 * i}>
              <div className="border border-navy/15 rounded-xl overflow-hidden bg-white/60">
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-navy/5 transition-colors"
                  aria-expanded={openIdx === i}
                >
                  <span className="font-caveat text-xl text-navy">{sem.label}</span>
                  <motion.span
                    animate={{ rotate: openIdx === i ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-coral"
                  >
                    <ChevronRight size={18} />
                  </motion.span>
                </button>

                {/* Body */}
                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="px-5 pb-4 space-y-2">
                        {sem.courses.map((course) => (
                          <li
                            key={course.code}
                            className="flex items-start gap-2"
                          >
                            {course.highlight && (
                              <span className="mt-1 w-2 h-2 flex-shrink-0 rounded-full bg-coral" />
                            )}
                            <span className={`font-inter text-sm ${!course.highlight ? "pl-4" : ""} text-navy/80`}>
                              {course.href ? (
                                <a
                                  href={course.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-coral transition-colors"
                                >
                                  <span className="font-semibold">{course.code}</span> — {course.name}
                                </a>
                              ) : (
                                <>
                                  <span className="font-semibold">{course.code}</span> — {course.name}
                                </>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
