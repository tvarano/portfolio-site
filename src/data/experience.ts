import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "meta",
    tier: "featured",
    role: "Software Engineer",
    company: "Meta",
    period: "August 2022 – Present",
    bullets: [
      "Built input and interaction features for the Meta Quest VR operating system across the full stack — from low-level OS services to the system shell to Android apps. C++, Java, Kotlin.",
    ],
    projects: [
      {
        name: "Novel Input Modality",
        bullets: [
          "Led a 7-engineer cross-org team to design and build OS-level infrastructure for a new input modality, from prototype through production.",
          "Designed the full pipeline — element detection, transport, storage, and developer APIs. Built the initial prototype and majority of the production implementation.",
        ],
      },
      {
        name: "VR Accessibility",
        bullets: [
          "Took over the full VR accessibility stack (screen reader, voice control, captions, text-to-speech, settings) from 8 previous engineers.",
          "Shipped voice control under regulatory deadlines. Fixed critical bugs, rewrote UI components, and added a controller-free gesture for quick menu access.",
          "Built an AI-powered linter to audit accessibility issues across VR products. Wrote the team's long-term accessibility strategy.",
        ],
      },
      {
        name: "Hand-Tracking Improvements",
        bullets: [
          "Rebuilt the hand-tracking raycasting pipeline with improved filtering, extrapolation, and stabilization. Created a new internal API for higher-fidelity hand pose data.",
          "Measurably improved hand-tracking adoption and retention metrics across the user base.",
        ],
      },
      {
        name: "Peripheral Device Platform",
        bullets: [
          "Designed a platform for onboarding third-party peripherals (styluses, keyboards) to the OS. Reduced integration work from thousands of lines of code to a small JSON config.",
          "Launched a partner stylus on this platform, coordinating across hardware partners, runtime engineers, and QA.",
        ],
      },
      {
        name: "System Shell UI",
        bullets: [
          "Built core OS interaction elements — a body-anchored button, quick-actions menu, and system icon overlays. Reduced GPU cost 75% on one component via layer optimization.",
          "Implemented a hand overlay system for mixed reality using convex hull and spline algorithms to separate virtual and real hands during touch.",
        ],
      },
      {
        name: "Limited-Edition Hardware Launch",
        bullets: [
          "Handled controller rendering for a co-branded headset launch. Rebuilt 3D assets in Blender when art deliverables had issues, shipped with zero bugs.",
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
      "Built automated testing infrastructure for the Shortcuts app across iOS and macOS, validating cross-device syncing capabilities.",
      "Developed a MultiDevice testing architecture to coordinate multiple devices in a single test run. Wrote custom Test Plans in Swift covering network failure, race-condition editing, and sync edge cases.",
      "Triaged test results and reported specific failures to app developers, directly reducing bug count before release.",
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
      "Taught student-led course CMSC 389O, The Coding Interview. Covered behavioral and technical interview techniques, taught algorithm strategies, and ran mock interviews.",
      "Graded assignments and held office hours for CMSC 132, Object Oriented Programming II.",
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
