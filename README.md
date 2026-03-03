# Portfolio Website
### by Thomas Varano

Tom Varano's personal portfolio — built with Next.js 14, Tailwind CSS, and Framer Motion.

Check it out at https://www.tomvarano.com

---

## Requirements

- Node.js 22+ (see note below)
- npm

> **Node version:** The repo requires Node 22.
> ```bash
> source ~/.nvm/nvm.sh && nvm use 22
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

`build` compiles and statically optimizes all pages. `start` serves  compiled output.
the
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
