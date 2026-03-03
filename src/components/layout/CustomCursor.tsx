"use client";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label, [tabindex]";

function getBgLuminance(x: number, y: number): number {
  let node: Element | null = document.elementFromPoint(x, y);
  while (node) {
    const bg = window.getComputedStyle(node).backgroundColor;
    const m  = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m && bg !== "rgba(0, 0, 0, 0)") {
      return 0.2126 * (+m[1] / 255) + 0.7152 * (+m[2] / 255) + 0.0722 * (+m[3] / 255);
    }
    node = node.parentElement;
  }
  return 1;
}

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsTouch(false);

    let x = -200, y = -200, vx = 0, vy = 0;
    let curW = 18, curH = 18;
    let visible = false, hovering = false, isDark = false;
    let lastLumCheck = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      vx = (e.clientX - x) * 0.6 + vx * 0.4;
      vy = (e.clientY - y) * 0.6 + vy * 0.4;
      x = e.clientX; y = e.clientY; visible = true;
    };
    const onLeave = () => { visible = false; };
    const onOver  = (e: MouseEvent) => { if ((e.target as Element).closest(INTERACTIVE)) hovering = true; };
    const onOut   = (e: MouseEvent) => { if (!(e.relatedTarget as Element | null)?.closest(INTERACTIVE)) hovering = false; };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);

    const tick = (now: number) => {
      const blob = blobRef.current;
      const dot  = dotRef.current;

      if (blob && dot) {
        if (now - lastLumCheck > 80) {
          isDark = getBgLuminance(x, y) < 0.35;
          lastLumCheck = now;
        }

        const color = isDark ? "#FEFAE0" : "#14213D";
        const op = visible ? "1" : "0";
        blob.style.opacity = op;
        dot.style.opacity  = op;

        dot.style.transform       = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        dot.style.backgroundColor = hovering ? "#006D77" : color;

        const speed   = Math.sqrt(vx * vx + vy * vy);
        const stretch = hovering ? 0 : Math.min(speed * 0.12, 2.8);
        const angle   = speed > 0.5 && !hovering ? Math.atan2(vy, vx) * (180 / Math.PI) : 0;
        const targetW = hovering ? 48 : 18 + stretch * 10;
        const targetH = hovering ? 48 : Math.max(8, 18 - stretch * 3);

        curW += (targetW - curW) * 0.22;
        curH += (targetH - curH) * 0.22;

        blob.style.width           = `${curW}px`;
        blob.style.height          = `${curH}px`;
        blob.style.backgroundColor = hovering ? "rgba(0,109,119,0.1)" : color;
        blob.style.boxShadow       = hovering ? "0 0 0 2.5px #006D77" : "none";
        blob.style.transform       = `translate(${x - curW / 2}px, ${y - curH / 2}px) rotate(${angle}deg)`;

        vx *= 0.82; vy *= 0.82;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={blobRef} style={{
        position: "fixed", top: 0, left: 0, width: 18, height: 18,
        borderRadius: "50%", backgroundColor: "#14213D",
        pointerEvents: "none", zIndex: 9999, opacity: 0,
        willChange: "transform, width, height",
      }} />
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, width: 6, height: 6,
        borderRadius: "50%", backgroundColor: "#14213D",
        pointerEvents: "none", zIndex: 10000, opacity: 0,
        willChange: "transform",
      }} />
    </>
  );
}
