import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "apple",
    tier: "featured",
    role: "Software Engineering Intern",
    company: "Apple",
    period: "May 2021 – August 2021",
    bullets: [
      "Validated syncing capabilities of the Shortcuts app on iOS and macOS.",
      "Quickly comprehended and navigated an expansive codebase, developing new tests and improving their underlying structure.",
      "Developed MultiDevice testing approach to synchronize multiple devices in a test run using Swift custom Test Plans.",
      "Triaged test results and reported specific failures to Shortcuts developers to improve the product.",
    ],
    accent: "#FFD166",
  },
  {
    id: "umd-ta",
    tier: "featured",
    role: "Teaching Assistant",
    company: "University of Maryland",
    period: "August 2020 – May 2022",
    bullets: [
      "Taught student-led course CMSC 389O: The Coding Interview — covering behavioral and technical interview techniques.",
      "Served as office hours and grading TA for CMSC 132 (Object-Oriented Programming II).",
      "Held virtual office hours teaching data structures in Java and helping students debug projects.",
    ],
  },
  {
    id: "fidelity",
    tier: "featured",
    role: "IT Intern",
    company: "Fidelity National Financial",
    period: "July 2020 – August 2020",
    bullets: [
      "Imaged devices, set up workstations, and configured print servers.",
      "Troubleshot server and user issues in person and over remote connection.",
      "Learned intricacies of numerous software programs for installation, troubleshooting, and repair.",
    ],
  },
  {
    id: "phhs-ta",
    tier: "minor",
    role: "Teaching Assistant",
    company: "Pascack Hills High School",
    period: "September 2018 – June 2019",
    bullets: [
      "Taught students fundamental programming in Java; helped debug and analyze student projects.",
      "Co-founded an Advanced Topics in Computer Science class covering Python, web dev, Swift, and Arduino.",
    ],
  },
  {
    id: "campgaw",
    tier: "minor",
    role: "Ski Instructor",
    company: "Campgaw Mountain",
    period: "December 2020 – January 2021",
    bullets: [
      "Taught individuals and groups of up to 8–10 skiers fundamental skiing technique.",
      "Taught all ages, from four years old to adults.",
    ],
  },
  {
    id: "lifetime",
    tier: "minor",
    role: "Kitchen Manager",
    company: "Life Time Athletic",
    period: "May 2017 – January 2020",
    bullets: [
      "Managed a team to efficiently operate a bistro kitchen.",
      "Coordinated with members and managers to ensure schedule coverage, produce ordering, and waste prevention.",
    ],
  },
  {
    id: "referee",
    tier: "minor",
    role: "Soccer Referee",
    company: "Montvale Athletic League",
    period: "August 2015 – December 2017",
    bullets: [
      "Officiated recreational soccer games, ages 6–15.",
      "Taught players rules and effective technique.",
      "Coordinated with other referees for scheduling and score reporting.",
    ],
  },
];
