"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RetroCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  surface?: string;
  offset?: number;
}

export default function RetroCard({
  children,
  className,
  accentColor,
  surface,
  offset = 5,
}: RetroCardProps) {
  const color = accentColor ?? "var(--ink)";
  const bg = surface ?? "white";
  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        border: `3px solid ${color}`,
        background: bg,
        boxShadow: `${offset}px ${offset}px 0px ${color}`,
      }}
      whileHover={{
        y: -8,
        x: -4,
        boxShadow: `${offset + 4}px ${offset + 4}px 0px ${color}`,
      }}
      whileTap={{
        y: -2,
        x: -1,
        boxShadow: `2px 2px 0px ${color}`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
