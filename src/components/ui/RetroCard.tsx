"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import RetroBox from "./RetroBox";

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
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, x: -3 }}
      whileTap={{ y: -2, x: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <RetroBox accentColor={accentColor} surface={surface} offset={offset}>
        {children}
      </RetroBox>
    </motion.div>
  );
}
