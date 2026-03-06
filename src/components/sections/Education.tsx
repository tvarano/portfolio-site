"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import RetroBox from "@/components/ui/RetroBox";
import { semesters } from "@/data/coursework";

export default function Education() {
  const [open, setOpen] = useState(false);

  const allCourses = semesters.flatMap((sem) =>
    sem.courses.map((course) => ({ ...course, semester: sem.label }))
  );

  return (
    <section id="education" className="py-24 px-6 bg-[#FCE4F8]">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Education" accentColor="#B5179E" />
        </ScrollReveal>

        {/* Degree banner */}
        <ScrollReveal delay={0.1}>
          <RetroBox accentColor="#B5179E" surface="#F8E6F6" className="mb-8 p-4">
            <p className="font-oi text-xl text-ink">BS Computer Science · Minor in Mathematics</p>
            <p className="font-mono text-xs text-ink/60 uppercase tracking-widest mt-1">
              University of Maryland · May 2022 · Cum Laude · GPA 3.91
            </p>
          </RetroBox>
        </ScrollReveal>

        {/* Single dropdown for all courses */}
        <ScrollReveal delay={0.15}>
          <div className="border-2 border-ink/20 bg-white/60 overflow-hidden">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-magenta/5 transition-colors"
              aria-expanded={open}
            >
              <span className="font-oi text-xl text-ink">Relevant Coursework</span>
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-magenta"
              >
                <ChevronRight size={18} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="px-5 pb-4 space-y-2">
                    {allCourses.map((course) => (
                      <li key={course.code} className="flex items-start gap-2">
                        {course.highlight && (
                          <span className="mt-1 w-2 h-2 flex-shrink-0 rounded-full bg-magenta" />
                        )}
                        <span className={`font-inter text-sm ${!course.highlight ? "pl-4" : ""} text-ink/80`}>
                          {course.href ? (
                            <a
                              href={course.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-magenta transition-colors"
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
      </div>
    </section>
  );
}
