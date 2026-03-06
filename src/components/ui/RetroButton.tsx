"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RetroButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  target?: string;
  rel?: string;
  download?: string;
  accentBg?: string;
  accentText?: string;
}

const VARIANTS = {
  primary: { bg: "#D4930A", text: "#14213D", border: "#14213D" },
  secondary: { bg: "#006D77", text: "#FEFAE0", border: "#14213D" },
  ghost: { bg: "transparent", text: "#14213D", border: "#14213D" },
};

export default function RetroButton({
  children,
  onClick,
  href,
  className,
  variant = "primary",
  target,
  rel,
  download,
  accentBg,
  accentText,
}: RetroButtonProps) {
  const v = VARIANTS[variant];
  const bg = accentBg ?? v.bg;
  const text = accentText ?? v.text;

  const baseStyle = {
    backgroundColor: bg,
    color: text,
    borderColor: v.border,
    boxShadow: variant !== "ghost" ? `4px 4px 0px ${v.border}` : "none",
  };

  const sharedClass = cn(
    "inline-flex items-center justify-center gap-2 px-5 py-2.5",
    "font-mono text-sm uppercase tracking-wide cursor-pointer border-2",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={sharedClass}
        style={baseStyle}
        whileHover={{ y: -2, boxShadow: variant !== "ghost" ? "6px 6px 0px #14213D" : "none" }}
        whileTap={{
          x: 3,
          y: 3,
          boxShadow: variant !== "ghost" ? "1px 1px 0px #14213D" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={sharedClass}
      style={baseStyle}
      whileHover={{ y: -2, boxShadow: variant !== "ghost" ? "6px 6px 0px #14213D" : "none" }}
      whileTap={{
        x: 3,
        y: 3,
        boxShadow: variant !== "ghost" ? "1px 1px 0px #14213D" : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      type="button"
    >
      {children}
    </motion.button>
  );
}
