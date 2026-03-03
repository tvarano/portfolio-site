"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export default function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className ?? ""}`}>
      <h2 className="font-caveat text-5xl md:text-6xl text-navy inline-block">
        {title}
      </h2>
      <div className="relative mt-1 h-4 w-48">
        <svg viewBox="0 0 180 12" fill="none" className="w-full h-full overflow-visible">
          <motion.path
            d="M2 8 C30 2, 60 12, 90 6 C120 0, 150 10, 178 5"
            stroke="#FF6B6B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
