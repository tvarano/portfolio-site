"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PATH_TO_SECTION: Record<string, string> = {
  "/about":      "about",
  "/experience": "experience",
  "/coursework": "coursework",
  "/resume":     "resume",
  "/connect":    "connect",
};

export default function SectionScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = PATH_TO_SECTION[pathname];
    if (!sectionId) return;
    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
