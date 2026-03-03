"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
  accentColor?: string;
}

export default function SectionHeader({
  title,
  className,
  accentColor = "#D4930A",
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <h2 className={cn("font-oi text-4xl sm:text-5xl md:text-6xl text-ink inline-block", className)}>
        {title}
      </h2>
      <div className="relative mt-1 h-5 w-48">
        <svg viewBox="0 0 180 14" fill="none" className="w-full h-full overflow-visible">
          <motion.path
            d="M2 8 C30 2, 60 12, 90 6 C120 0, 150 10, 178 5"
            stroke={accentColor}
            strokeWidth="4"
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
