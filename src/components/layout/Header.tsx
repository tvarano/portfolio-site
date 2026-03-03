"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#coursework", label: "Coursework" },
  { href: "#resume", label: "Resume" },
  { href: "#connect", label: "Connect" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-sm border-b-2 border-ink"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#hero");
          }}
          className="font-oi text-2xl text-teal"
        >
          TV
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} onClick={handleNav} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream/98 backdrop-blur-sm border-t-2 border-ink overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {NAV_LINKS.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className="text-left font-oi text-xl text-ink hover:text-teal transition-colors py-1"
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (href: string) => void;
}) {
  return (
    <motion.button
      onClick={() => onClick(href)}
      className="relative font-mono text-xs uppercase tracking-widest text-ink hover:text-teal transition-colors group"
      whileHover="hovered"
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-0.5 bg-teal"
        variants={{
          hovered: { width: "100%", opacity: 1 },
        }}
        initial={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}
