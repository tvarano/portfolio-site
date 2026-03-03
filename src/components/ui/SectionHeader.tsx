"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const doneRef = useRef(false);
  const inView  = useInView(wrapRef, { once: true, amount: 0.5 });

  // Set actual stroke-dash values from the real path length after mount.
  // Using the numeric CSS properties directly avoids Safari's inconsistent
  // handling of Framer Motion's CSS-custom-property pathLength approach.
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray  = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  }, []);

  // Animate when the section header scrolls into view.
  useEffect(() => {
    if (!inView || doneRef.current || !pathRef.current) return;
    doneRef.current = true;
    const p = pathRef.current;
    p.style.transition = "stroke-dashoffset 0.7s ease-out";
    // Force the browser to compute the current style so it registers the
    // "before" state — required for the transition to fire on Safari.
    void getComputedStyle(p).getPropertyValue("stroke-dashoffset");
    p.style.strokeDashoffset = "0";
  }, [inView]);

  return (
    <div className="mb-10">
      <h2 className={cn("font-oi text-4xl sm:text-5xl md:text-6xl text-ink inline-block", className)}>
        {title}
      </h2>
      <div ref={wrapRef} className="relative mt-1 h-5 w-48">
        <svg viewBox="0 0 180 14" fill="none" className="w-full h-full overflow-visible">
          {/* Large initial dashoffset hides the path during SSR/hydration */}
          <path
            ref={pathRef}
            d="M2 8 C30 2, 60 12, 90 6 C120 0, 150 10, 178 5"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="9999"
            strokeDashoffset="9999"
          />
        </svg>
      </div>
    </div>
  );
}
