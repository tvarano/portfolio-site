import { SITE } from "@/lib/constants";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-patrick text-sm">
          © {new Date().getFullYear()} {SITE.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="font-patrick text-sm hover:text-coral transition-colors"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
