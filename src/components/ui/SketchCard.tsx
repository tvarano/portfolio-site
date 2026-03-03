"use client";

import { motion } from "framer-motion";
import SketchBorder from "./SketchBorder";
import { ReactNode } from "react";

interface SketchCardProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
  strokeColor?: string;
}

export default function SketchCard({
  children,
  className,
  rotate = 0,
  strokeColor = "#14213D",
}: SketchCardProps) {
  return (
    <motion.div
      className={className}
      style={{ rotate }}
      whileHover={{ y: -4, scale: 1.02, rotate: 0 }}
      whileTap={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <SketchBorder strokeColor={strokeColor} roughness={1.2} strokeWidth={1.5}>
        {children}
      </SketchBorder>
    </motion.div>
  );
}
