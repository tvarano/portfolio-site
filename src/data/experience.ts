import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "meta",
    tier: "featured",
    role: "Software Engineer",
    company: "Meta",
    period: "August 2022 – Present",
    bullets: [
      "Engineered input platform features for Meta Quest VR operating system (Meta Horizon OS, Android-based).",
      "Shipped input features to millions of users across the entire OS stack, from AOSP, to the OpenXR Runtime implementation, to Shell, to 2D Android applications. Stack: C++, Java, Kotlin",
    ],
    projects: [
      {
        name: "New Input Paradigm",
        bullets: [
          "Architected infrastructure to support new input paradigm, deeply integrating with multiple UI frameworks, focusing on efficiency and stability.",
          "Led 7-engineer cross-org team through design and prototyping phase, investigating many in-depth pathways. Communicated project status and timeline with cross-company stakeholders.",
          "Delivered prototype over 8-month timeline, established technical approach for production execution.",
        ],
      },
      {
        name: "Quest Accessibility",
        bullets: [
          "Owned maintenance and improvement of the entire Quest Accessibility suite (Screen Reader, Voice Control, Captions, Text to Speech, UI settings). Oversaw features previously managed by 8 engineers.",
          "Outlined overhaul of technical stack, aligning with AOSP principles and significantly reducing tech debt. Streamlined multiple feature components, including telemetry, installation, and settings.",
          "Shipped Voice Control, allowing users to control devices with their voice.",
          "Proactively proposed and prototyped multiple feature improvements and rewrites, collaborating with designers to ensure maximum usability and minimize bugs.",
        ],
      },
      {
        name: "3P Device Onboarding",
        bullets: [
          "Designed and launched data-driven 3P device onboarding framework for Logitech MX Ink Stylus. Significantly reduced engineer load required to add new peripherals in Shell, from weeks to minutes of work. Collaborated with engineers across OS stack, from firmware to end app developers.",
        ],
      },
      {
        name: "Onboarding & Knowledge Sharing",
        bullets: [
          "Demonstrated rapid technical ramp-up across diverse, high-complexity codebases. Led wiki and onboarding initiatives for tribal-knowledge-rich ecosystems.",
        ],
      },
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
    accent: "#1D1D1F",
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
