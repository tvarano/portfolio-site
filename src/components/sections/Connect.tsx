"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaSpotify,
  FaLastfm,
  FaSnapchat,
  FaEnvelope,
} from "react-icons/fa";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SketchButton from "@/components/ui/SketchButton";
import { socials } from "@/data/socials";

const ICON_MAP: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={20} />,
  FaLinkedin: <FaLinkedin size={20} />,
  FaInstagram: <FaInstagram size={20} />,
  FaSpotify: <FaSpotify size={20} />,
  FaLastfm: <FaLastfm size={20} />,
  FaSnapchat: <FaSnapchat size={20} />,
  FaEnvelope: <FaEnvelope size={20} />,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Connect() {
  return (
    <section id="connect" className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Connect" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-caveat text-4xl md:text-5xl text-navy mb-10">
            hi, I&apos;m Tom.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {socials.map((social) => (
            <motion.div key={social.label} variants={item}>
              <SketchButton
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2 w-full py-1">
                  {ICON_MAP[social.icon]}
                  <span>{social.label}</span>
                </span>
              </SketchButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
