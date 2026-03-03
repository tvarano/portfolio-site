"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "chars" | "words";
}

export default function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  mode = "chars",
}: AnimatedTextProps) {
  const tokens = mode === "chars" ? text.split("") : text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={child}
          style={mode === "words" ? { marginRight: "0.25em" } : undefined}
        >
          {token === " " ? "\u00A0" : token}
        </motion.span>
      ))}
    </motion.span>
  );
}
