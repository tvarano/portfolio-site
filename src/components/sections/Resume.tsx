"use client";

import { useState } from "react";
import { Download, Copy, Printer } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SketchButton from "@/components/ui/SketchButton";
import { SITE } from "@/lib/constants";

const RESUME_PATH = "/resume/thomas-varano-resume.pdf";

export default function Resume() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE.url}${RESUME_PATH}`);
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
    <section id="resume" className="py-24 px-6 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader title="Resume" />
        </ScrollReveal>

        {/* Action buttons */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8">
            <SketchButton
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-1.5">
                <Download size={14} />
                Download
              </span>
            </SketchButton>

            <SketchButton onClick={handleCopy}>
              <span className="flex items-center gap-1.5">
                <Copy size={14} />
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </SketchButton>

            <SketchButton onClick={handlePrint}>
              <span className="flex items-center gap-1.5">
                <Printer size={14} />
                Print
              </span>
            </SketchButton>
          </div>
        </ScrollReveal>

        {/* PDF iframe — hidden on mobile, show download CTA */}
        <ScrollReveal delay={0.2}>
          <div
            className="hidden md:block w-full rounded-xl overflow-hidden border border-navy/15 shadow-sm"
            style={{ height: "80vh" }}
          >
            <iframe
              src={RESUME_PATH}
              className="w-full h-full"
              title="Thomas Varano Resume"
            />
          </div>

          <div className="md:hidden mt-4 p-6 rounded-xl bg-yellow/20 border border-yellow/50 text-center">
            <p className="font-patrick text-navy mb-4">
              PDF preview works best on desktop.
            </p>
            <SketchButton
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-1.5">
                <Download size={14} />
                Download Resume
              </span>
            </SketchButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
