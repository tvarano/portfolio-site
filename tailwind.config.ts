import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FEFAE0",
        ink: "#14213D",
        teal: "#006D77",
        amber: "#D4930A",
        magenta: "#B5179E",
        emerald: "#1A7A4A",
      },
      fontFamily: {
        oi: ["var(--font-oi)", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        retro: "5px 5px 0px #14213D",
        "retro-sm": "3px 3px 0px #14213D",
        "retro-lg": "8px 8px 0px #14213D",
        "retro-teal": "5px 5px 0px #006D77",
        "retro-amber": "5px 5px 0px #D4930A",
        "retro-magenta": "5px 5px 0px #B5179E",
        "retro-emerald": "5px 5px 0px #1A7A4A",
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
