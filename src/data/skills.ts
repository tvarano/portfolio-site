import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  // Primary — big icon cards
  { name: "C++", tier: "primary", color: "#3776AB" },
  { name: "Java", tier: "primary", color: "#007396" },
  { name: "Android", tier: "primary", color: "#007396" },
  
  // Secondary — tag grid
  { name: "AOSP", tier: "secondary", color: "#CE412B" },
  { name: "Accessibility", tier: "secondary"},
  { name: "OpenXR", tier: "secondary" },
  
  // tertiary, for later
  { name: "HTML / CSS", tier: "tertiary", color: "#E34F26" },
  { name: "Swift", tier: "tertiary", color: "#FA7343" },
  { name: "SQLite", tier: "tertiary" },
  { name: "Matlab", tier: "tertiary" },
  { name: "Ruby", tier: "tertiary", color: "#CC342D" },
  { name: "OCaml", tier: "tertiary", color: "#EC6813" },
  { name: "BASH", tier: "tertiary" },
  
  // Soft skills 
  { name: "Technical Design", tier: "soft" },
  { name: "XFN Collaboration", tier: "soft" },
  { name: "Prototyping", tier: "soft" },
  { name: "3D Math / Programming", tier: "soft" },
  { name: "ECS design", tier: "soft" },
  { name: "Rapid rampup", tier: "soft" },
  
  // Tools
  { name: "VS Code", tier: "tools" },
  { name: "Xcode", tier: "tools" },
  { name: "Git", tier: "tools" },
  { name: "Google Cloud", tier: "tools" },
  { name: "Heroku", tier: "tools" },
  { name: "XCTest", tier: "tools" },
  { name: "JUnit", tier: "tools" },
];
