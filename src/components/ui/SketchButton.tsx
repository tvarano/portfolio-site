"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rough from "roughjs";
import { cn } from "@/lib/utils";

interface SketchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  target?: string;
  rel?: string;
}

export default function SketchButton({
  children,
  onClick,
  href,
  className,
  variant = "outline",
  target,
  rel,
}: SketchButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  const draw = (fill: boolean) => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    const rc = rough.canvas(canvas);
    rc.rectangle(2, 2, width - 4, height - 4, {
      roughness: 1.8,
      stroke: variant === "primary" ? "#FAFAF8" : "#FF6B6B",
      strokeWidth: 2,
      fill: fill ? "#FF6B6B" : "transparent",
      fillStyle: "solid",
    });
  };

  useEffect(() => {
    draw(hovered && variant !== "ghost");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, variant]);

  useEffect(() => {
    const ro = new ResizeObserver(() => draw(hovered && variant !== "ghost"));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textColor =
    hovered && variant !== "ghost"
      ? "text-white"
      : variant === "primary"
      ? "text-white"
      : "text-coral";

  const inner = (
    <motion.div
      ref={containerRef}
      className={cn("relative cursor-pointer inline-flex items-center justify-center gap-2", className)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />
      <span className={cn("relative z-10 font-patrick text-sm px-5 py-2 transition-colors duration-150", textColor)}>
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel}>
        {inner}
      </a>
    );
  }
  return inner;
}
