import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "meta",
    tier: "featured",
    role: "Software Engineer",
    company: "Meta",
    period: "August 2022 – Present",
    bullets: [
      "More info coming soon!",
    ],
    accent: "#0668E1",
  },
  {
    id: "apple",
    tier: "featured",
    role: "Software Engineering Intern",
    company: "Apple",
    period: "May 2021 – August 2021",
    bullets: [
      "Validated syncing capabilities of the Shortcuts app on iOS and macOS via UI tests.",
      "Developed MultiDevice testing architecture to sync multiple devices in a test run. Used Swift to run custom Test Plans, including network failure, race-condition editing, and more.",
      "Triaged test results, reported specific failures to app developers to improve product and reduce bugcount.",
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
      "Taught student-let course CMSC 389O, The Coding Interview. Taught students techniques for behavioral and technical interviews. Taught interview algorithm techniques to a classroom and ran mock interviews.",
      "Graded assignments and held office hours, for CMSC 132, Object Oriented Programming II.",
      "Assisted students with debugging projects and understanding exam results.",

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
