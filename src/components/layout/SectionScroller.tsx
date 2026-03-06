"use client";
import { useEffect } from "react";

const PATH_TO_SECTION: Record<string, string> = {
  "/about":      "about",
  "/experience": "experience",
  "/education": "education",
  "/resume":     "resume",
  "/connect":    "connect",
};

export default function SectionScroller() {
  useEffect(() => {
    const sectionId = PATH_TO_SECTION[window.location.pathname];
    if (!sectionId) return;
    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, []); // runs once on mount — ignores subsequent replaceState calls

  return null;
}
