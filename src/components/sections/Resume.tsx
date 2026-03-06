"use client";

import { useState } from "react";
import { Download, Copy, Printer } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import RetroButton from "@/components/ui/RetroButton";
import RetroBox from "@/components/ui/RetroBox";
import { SITE } from "@/lib/constants";

const RESUME_PATH = "/resume/thomas-varano-resume.pdf";
const RESUME_VIEW_PATH = "/resume/view";

export default function Resume() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE.url}${RESUME_VIEW_PATH}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: ignore */
    }
  };

  const handlePrint = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = RESUME_PATH;
    document.body.appendChild(iframe);
    iframe.onload = () => iframe.contentWindow?.print();
  };

  return (
    <section id="resume" className="py-24 px-6 bg-[#E0F5EA]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Resume" accentColor="#1A7A4A" />
        </ScrollReveal>

        {/* Action buttons */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8">
            <RetroButton
              href={RESUME_PATH}
              download="thomas-varano-resume.pdf"
              accentBg="#1A7A4A"
              accentText="#FEFAE0"
            >
              <span className="flex items-center gap-1.5">
                <Download size={14} />
                Download
              </span>
            </RetroButton>

            <RetroButton
              href={RESUME_VIEW_PATH}
              target="_blank"
              rel="noopener noreferrer"
              accentBg="#1A7A4A"
              accentText="#FEFAE0"
            >
              <span className="flex items-center gap-1.5">
                View
              </span>
            </RetroButton>

            <RetroButton onClick={handleCopy} variant="ghost">
              <span className="flex items-center gap-1.5">
                <Copy size={14} />
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </RetroButton>

            <RetroButton onClick={handlePrint} variant="ghost">
              <span className="flex items-center gap-1.5">
                <Printer size={14} />
                Print
              </span>
            </RetroButton>
          </div>
        </ScrollReveal>

        {/* PDF iframe */}
        <ScrollReveal delay={0.2}>
          <div className="hidden md:block">
            <RetroBox accentColor="#1A7A4A" offset={8} className="overflow-hidden" style={{ height: "80vh" }}>
              <iframe
                src={RESUME_PATH}
                className="w-full h-full"
                title="Thomas Varano Resume"
              />
            </RetroBox>
          </div>

          <div className="md:hidden mt-4 p-6 border-2 border-emerald/40 bg-emerald/10 text-center">
            <p className="font-mono text-sm text-ink mb-4 uppercase tracking-widest">
              PDF preview works best on desktop.
            </p>
            <RetroButton
              href={RESUME_VIEW_PATH}
              target="_blank"
              rel="noopener noreferrer"
              accentBg="#1A7A4A"
              accentText="#FEFAE0"
            >
              <span className="flex items-center gap-1.5">
                View Resume
              </span>
            </RetroButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
