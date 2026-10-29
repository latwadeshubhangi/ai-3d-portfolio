# Prompt File (Iterations 1-3 and Final Prompt)

Attach your resume (text or PDF) and photo when you paste any of these. Save a screenshot of each AI reply as evidence.

## Iteration 1 - Initial prompt (basic structure)
**Role:** You are a senior front-end engineer and UI designer who builds recruiter-friendly portfolio sites.
**Task:** Build a personal portfolio website from my resume.
**Context:** This is a resume presented as an immersive digital experience, for recruiters and hiring managers.
**Input:** [paste resume text; photo file photo.jpg; original PDF resume.pdf]
**Constraints:** Use ONLY facts written in my resume. Do not invent personal details, companies, roles, projects, skills, qualifications, certifications, achievements, statistics, testimonials, contact details or social links. If a section has no data in the resume, omit it. No skill percentages, ratings or levels.
**Design requirements:** Hero (photo, name, title, intro, "View My Work", "Download Resume"), nav (HOME, ABOUT, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CONTACT), About, Experience timeline, Projects, Skills by category, Education, Achievements (only if present), Contact.
**Technical requirements:** React + TypeScript + Vite, component-based, all content in one typed data file.
**Output requirements:** Full project folder with file tree, then run instructions.
**Quality criteria:** Compiles without errors; no placeholder or fake content.

## Iteration 2 - Improvement prompt (UI, responsiveness, animation, 3D)
Improve the previous project. Keep all content unchanged and still resume-only.
1. Visual hierarchy: clearer headings, consistent spacing, readable contrast.
2. Responsive: tablet keeps hierarchy; mobile gets a hamburger menu and a simplified layout (not a shrunken desktop).
3. Animation (Framer Motion): page-load, hero entrance, scroll reveal, hover and button interactions, section transitions.
4. 3D (React Three Fiber): particles, soft light, floating geometric shapes, subtle grid, mouse parallax. The 3D must stay behind the content and never reduce readability.
5. Expandable project cards with hover effect and preview image where the resume provides one.
Return only changed files in full.

## Iteration 3 - Optimization prompt (performance, accessibility, SEO, mobile, code quality)
Optimize the project without changing content.
- Performance: lazy-load the 3D scene, fewer particles on mobile, `dpr` capped, low-power GPU hint, Intersection Observer for active nav, optimized and lazy images, GPU-friendly (transform/opacity) animation only.
- Accessibility: semantic landmarks, one h1 and logical h2/h3, alt text, visible focus, skip link, keyboard navigation, aria-expanded on toggles, WCAG AA contrast, full `prefers-reduced-motion` support (including the 3D loop).
- SEO: meaningful title and meta description generated from the resume, descriptive link text.
- Code quality: strict TypeScript, small reusable components, comments only where needed, no unused dependencies.
Then list what you changed and why.

## Final prompt (all nine components in one)
**1. Role / Persona:** Act as a senior React/TypeScript engineer, accessibility specialist and UI designer.
**2. Task:** Create a premium, interactive 3D personal portfolio website that presents my resume as an immersive digital experience.
**3. Context:** Audience is recruiters who must find who I am, what I do, what I built, my skills, education and contact within a short visit. 3D must enhance the resume, not hide it.
**4. Input:** My resume (single source of truth), professional photo, original resume PDF: [attach].
**5. Constraints:** Never invent personal information, companies, roles, projects, skills, qualifications, certifications, achievements, statistics, testimonials, contact details or social links. Omit any section with no resume data. No percentages, star ratings or level labels for skills. Do not exaggerate or reword my experience beyond fixing grammar. "Download Resume" must download my original PDF.
**6. Design requirements:** Sections: Hero (photo, name, title, intro, View My Work, Download Resume; particles, soft light, depth, floating shapes, grid, mouse parallax), sticky responsive nav with smooth scroll, active-section state and hamburger on mobile, About cards, Experience timeline, interactive Projects with expandable details, categorized Skills, Education, Achievements/Certifications (if present), Contact with "Let's build something meaningful."
**7. Technical requirements:** React + TypeScript + Vite; React Three Fiber/Three.js; Framer Motion; component-based; content in `src/data/resume.ts`; lazy loading; reduced particles on mobile; Intersection Observer; respects `prefers-reduced-motion`; semantic HTML, keyboard access, alt text, focus states, contrast; SEO title, meta description and headings.
**8. Output requirements:** Complete project (package.json, config, src tree, all files in full), README with install/run steps, and a list of assumptions.
**9. Quality criteria:** `npm run build` passes; no invented content; Lighthouse accessibility and SEO as high as possible; usable on desktop, tablet and mobile; 3D never blocks content.

## Comparison table (fill in after running)
| Iteration | What improved | Problems left | Manual fixes you made |
|-----------|---------------|---------------|-----------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
