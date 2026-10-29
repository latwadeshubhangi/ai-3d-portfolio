# AI-Powered 3D Personal Portfolio

## Objective
Turn my real resume and photograph into an immersive, accessible, responsive portfolio. The resume is the single source of truth: nothing is invented, and sections with no resume data are hidden automatically.

## Technologies
React 18, TypeScript, Vite, Three.js with React Three Fiber, Framer Motion, plain CSS.

## AI tool used
[Write the tool you used, e.g. Claude / ChatGPT / Gemini]. This project folder was generated with AI assistance; your own edits and testing must be listed separately in your submission.

## Prompting approach
Prompts use nine components (role, task, context, input, constraints, design, technical, output, quality) and three iterations. See `docs/PROMPTS.md`.

## Installation
1. Install Node.js 18+ from https://nodejs.org.
2. In this folder run: `npm install`
3. Put your original resume at `public/resume.pdf` and your photo at `public/photo.jpg`.
4. Fill `src/data/resume.ts` using ONLY what your resume says.

## Execution
- Development: `npm run dev`, then open the shown local address.
- Production check: `npm run build` then `npm run preview`.

## Features
- Hero with 3D particles, floating shapes, grid, mouse parallax, entrance animation
- Sticky nav, smooth scroll, active-section highlight, hamburger menu
- About cards, experience timeline, expandable project cards, categorized skills (no ratings), education timeline, optional achievements, contact CTA
- Download button serves the original PDF
- Lazy-loaded 3D, fewer particles on mobile, `prefers-reduced-motion` respected
- Semantic HTML, skip link, focus states, alt text, title and meta description from the resume

## Challenges faced
[Fill in from your own experience]

## Improvements made
[Fill in: changes you made after each AI iteration]

## Future scope
Dark/light toggle, blog section, GitHub API for live repositories, contact form with a backend, multi-language support.
