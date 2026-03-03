import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "cv-projects",
    title: "Computer Vision Projects",
    category: "School",
    year: "2022",
    description:
      "Implemented several computer vision projects utilizing tools in Python.",
    bullets: [
      "Edge detector using manual filter convolution, gradient detection, and hysteresis thresholding.",
      "SIFT image classifier for three classes using KMeans, Linear SVM, and Kernel SVM.",
      "Manual 4-layer neural network with Numpy and back-propagation, compared against CNN built with PyTorch.",
      "Visual Odometry — estimating fundamental matrices, extracting rotation matrices, and reconstructing dashcam trajectory.",
    ],
    tech: ["Python", "Jupyter", "OpenCV", "PyTorch"],
  },
  {
    id: "networking",
    title: "Networking Projects",
    category: "School",
    year: "2021",
    description:
      "Implemented several networking protocols at the socket level to deepen understanding of how they work.",
    bullets: [
      "TCP server and client in C.",
      "UDP server and client in C.",
      "Distance Vector routing network in C.",
      "Chat server — reverse-engineered protocol, implemented in C.",
      "Chord Node in C++.",
      "BitTorrent client (private repo, contact for access) in Rust.",
    ],
    tech: ["C", "C++", "Rust"],
    href: "https://github.com/tvarano/downpou-rs",
  },
  {
    id: "apple-multidevice",
    title: "Apple MultiDevice Testing",
    category: "Intern",
    year: "2021",
    description:
      "Created an approach in XCTest using Swift to run test plans across multiple devices synchronously, recovering from tests failing, crashing, or hanging. Built XCUITests for the Shortcuts app, verifying sync in a continuous integration environment.",
    tech: ["Swift", "Xcode", "XCTest", "XCUITest"],
  },
  {
    id: "hits-analyzer",
    title: "Hits Analyzer",
    category: "School",
    year: "2021",
    description:
      "Data science project for UMD Intro to Data Science. Analyzed and categorized songs on the Billboard Hot 100. Cleaned 325k+ rows with pandas and numpy, then built a K-Means model with scikit-learn to cluster how songs trended.",
    tech: ["Python", "Jupyter", "pandas", "scikit-learn"],
    href: "https://tvarano.github.io/hit-analyzer/",
  },
  {
    id: "offset",
    title: "Offset",
    category: "Competition",
    year: "2021",
    description:
      "Bitcamp hackathon project analyzing the carbon footprint of consumer deliveries. Parses package tracking numbers from Gmail, reverse-engineers carrier APIs to compute carbon impact, and displays results in a Flask web app.",
    tech: ["Python", "Flask", "HTML/CSS"],
    href: "https://github.com/F28L/Offset",
  },
  {
    id: "portfolio-source",
    title: "Web Portfolio Source",
    category: "Personal",
    year: "2019–2021",
    description:
      "This site — a webapp hosted on Google Cloud with Flask, using Jinja for layouts and jQuery for front-end animations.",
    tech: ["Python", "Flask", "HTML/CSS", "JavaScript", "Google Cloud"],
    href: "https://github.com/tvarano/portfolio-site",
  },
  {
    id: "shell",
    title: "Shell",
    category: "School",
    year: "2020",
    description:
      "Implemented a small shell in C similar to tcsh, supporting subshells, pipes, and logical operators (AND, OR).",
    tech: ["C"],
  },
  {
    id: "month-in-review",
    title: "Month In Review",
    category: "Personal",
    year: "2020",
    description:
      "A tool using the Spotify API to create a playlist of the user's top songs over a given period of time.",
    tech: ["Node.js", "HTML/CSS", "Heroku"],
    href: "https://github.com/tvarano/top-hits",
  },
  {
    id: "ocean-pollution",
    title: "Ocean Pollution",
    category: "Competition",
    year: "2020",
    description:
      "UMD Data Challenge project analyzing Booz Allen Hamilton data on ocean pollution cleanups. Flask webapp illustrates cleanup effectiveness and pollution hotspots; SQLite database holds 45,000+ rows.",
    tech: ["Python", "Flask", "HTML/CSS", "JavaScript", "SQLite"],
    href: "https://github.com/tvarano/ocean-pollution",
  },
  {
    id: "career-day",
    title: "Career Day",
    category: "School",
    year: "2018–2019",
    description:
      "Sorted 800 students to preferred Career Day speakers based on top choices. Led a team of 12 student programmers in Java and Python using Git.",
    tech: ["Java", "Python", "HTML/CSS"],
    href: "https://github.com/pas-code/career-day-sorter",
  },
  {
    id: "agenda",
    title: "Agenda",
    category: "Personal",
    year: "2017–2018",
    description:
      "Tracked rotating schedules, labs, GPA, and time management for high school students. Released for macOS, iOS, and web using Java, Swift, and HTML/CSS/JS respectively.",
    tech: ["Java", "Swift", "JavaScript", "HTML/CSS", "Xcode"],
    href: "https://tvarano.github.io/agenda",
  },
  {
    id: "spotsaver",
    title: "SpotSaver",
    category: "Personal",
    year: "2019",
    description:
      "iOS app that saves a location for later navigation — essentially a manual \"parking spot saver\" built with Swift.",
    tech: ["Swift", "Xcode"],
    href: "https://github.com/tvarano/spot-saver",
  },
];
