"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Github, FileText, Linkedin, ChevronDown } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import RetroButton from "@/components/ui/RetroButton";
import { SITE } from "@/lib/constants";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream"
    >
      {/* Dot-grid background */}
      <motion.div
        className="absolute inset-0 dot-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
          {/* Left column */}
          <div className="flex-1 text-center md:text-left">
            {/* Name */}
            <h1 className="font-oi text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ink leading-none mb-4">
              <div><AnimatedText text="Tom" delay={0.4} stagger={0.05} /></div>
              <div><AnimatedText text="Varano" delay={0.6} stagger={0.05} /></div>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-base sm:text-xl text-teal uppercase tracking-[0.3em] mb-8"
              {...fadeUp(0.9)}
            >
              Software Engineer
            </motion.p>

            {/* Quick links */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              {[
                { label: "Email", href: `mailto:${SITE.email}`, icon: <Mail size={15} />, delay: 0, variant: "primary" as const },
                { label: "GitHub", href: SITE.github, icon: <Github size={15} />, delay: 0.08, target: "_blank", rel: "noopener noreferrer", variant: "secondary" as const },
                { label: "Resume", href: "/resume/thomas-varano-resume.pdf", icon: <FileText size={15} />, delay: 0.16, target: "_blank", rel: "noopener noreferrer", variant: "ghost" as const },
                { label: "LinkedIn", href: SITE.linkedin, icon: <Linkedin size={15} />, delay: 0.24, target: "_blank", rel: "noopener noreferrer", variant: "ghost" as const },
              ].map(({ label, href, icon, delay, target, rel, variant }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + delay, duration: 0.35 }}
                >
                  <RetroButton href={href} target={target} rel={rel} variant={variant}>
                    <span className="flex items-center gap-1.5">
                      {icon}
                      {label}
                    </span>
                  </RetroButton>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column — photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div
              className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden border-4 border-ink"
              style={{ boxShadow: "8px 8px 0 #006D77", transform: "rotate(-2deg)" }}
            >
              <Image
                src="/images/profme.jpg"
                alt="Tom Varano"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 224px, 288px"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-teal/70 hover:text-teal transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
}
