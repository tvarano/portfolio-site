# Portfolio Website
### by Thomas Varano

Tom Varano's personal portfolio — built with Next.js 14, Tailwind CSS, and Framer Motion.

Check it out at https://www.tomvarano.com

---

## Requirements

- Node.js 20+ (see note below)
- npm

> **Node version:** The repo uses Node 20. If your shell defaults to an older version, activate it first:
> ```bash
> source ~/.nvm/nvm.sh && nvm use 20
> ```

## Install

```bash
npm install
```

## Dev server

```bash
npm run dev
```

Opens at http://localhost:3000. Hot-reloads on save.

## Production build

```bash
npm run build
npm start
```

`build` compiles and statically optimizes all pages. `start` serves the compiled output.

## Project structure

```
src/
├── app/            # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── layout/     # Header, Footer, CustomCursor, SectionDivider
│   ├── sections/   # Hero, About, Skills, Projects, Experience, Coursework, Resume, Connect
│   └── ui/         # SketchBorder, SketchButton, SketchCard, Tag, ScrollReveal, …
├── data/           # Content as typed TS arrays (projects, experience, skills, …)
├── lib/            # cn() utility, site constants
└── types/          # Shared TypeScript interfaces
public/
├── images/         # Profile photo
├── resume/         # thomas-varano-resume.pdf
└── favicons/
```

## Deploy

The site is deployed on Vercel. Push to `master` to trigger a production deploy.
