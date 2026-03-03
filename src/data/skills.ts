import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  // Primary — big icon cards
  { name: "Python", tier: "primary", color: "#3776AB" },
  { name: "Swift", tier: "primary", color: "#FA7343" },
  { name: "Java", tier: "primary", color: "#007396" },

  // Secondary — tag grid
  { name: "C / C++", tier: "secondary" },
  { name: "Rust", tier: "secondary", color: "#CE412B" },
  { name: "JavaScript", tier: "secondary", color: "#F7DF1E" },
  { name: "HTML / CSS", tier: "secondary", color: "#E34F26" },
  { name: "SQLite", tier: "secondary" },
  { name: "Matlab", tier: "secondary" },
  { name: "Ruby", tier: "secondary", color: "#CC342D" },
  { name: "OCaml", tier: "secondary", color: "#EC6813" },
  { name: "BASH", tier: "secondary" },
  { name: "LaTeX", tier: "secondary", color: "#008080" },
  { name: "MIPS Assembly", tier: "secondary" },

  // Tools
  { name: "VS Code", tier: "tools" },
  { name: "Xcode", tier: "tools" },
  { name: "Git", tier: "tools" },
  { name: "Google Cloud", tier: "tools" },
  { name: "Heroku", tier: "tools" },
  { name: "XCTest", tier: "tools" },
  { name: "JUnit", tier: "tools" },
];
