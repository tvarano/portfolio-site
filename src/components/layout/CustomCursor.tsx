"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const rx = useSpring(mx, springConfig);
  const ry = useSpring(my, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsTouch(false);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [mx, my]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-2.5 h-2.5 rounded-full bg-coral pointer-events-none"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] w-9 h-9 rounded-full border-2 border-coral/50 pointer-events-none"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
