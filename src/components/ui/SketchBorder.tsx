"use client";

import { useEffect, useRef, ReactNode } from "react";
import rough from "roughjs";

interface SketchBorderProps {
  children: ReactNode;
  className?: string;
  roughness?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
  padding?: number;
}

export default function SketchBorder({
  children,
  className,
  roughness = 1.5,
  strokeColor = "#14213D",
  strokeWidth = 1.5,
  fill = "none",
  padding = 6,
}: SketchBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
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
      rc.rectangle(padding / 2, padding / 2, width - padding, height - padding, {
        roughness,
        stroke: strokeColor,
        strokeWidth,
        fill,
        fillStyle: "solid",
      });
    };

    draw();

    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, [roughness, strokeColor, strokeWidth, fill, padding]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      />
      <div className="relative z-10" style={{ padding }}>
        {children}
      </div>
    </div>
  );
}
