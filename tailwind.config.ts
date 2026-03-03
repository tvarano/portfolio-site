import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        navy: "#14213D",
        coral: "#FF6B6B",
        yellow: "#FFD166",
        muted: "#6B7280",
      },
      fontFamily: {
        caveat: ["var(--font-caveat)", "cursive"],
        patrick: ["var(--font-patrick-hand)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "bounce-slow": "bounce 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
