import { useEffect } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { resume as r } from './data/resume';
import { useActiveSection } from './hooks';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Experience, Projects, Skills, EducationSection, Achievements, Contact } from './components/Sections';

const hasAbout = !!(r.about.background || r.about.focus || r.about.direction || r.about.interests?.length || r.about.strengths?.length);
const hasContact = !!(r.contact.email || r.contact.linkedin || r.contact.github || r.contact.portfolio || r.contact.other?.length);

// Sections only appear when the resume has data for them.
const SECTIONS = [
  { id: 'home', label: 'HOME', show: true },
  { id: 'about', label: 'ABOUT', show: hasAbout },
  { id: 'experience', label: 'EXPERIENCE', show: r.experience.length > 0 },
  { id: 'projects', label: 'PROJECTS', show: r.projects.length > 0 },
  { id: 'skills', label: 'SKILLS', show: Object.keys(r.skills).length > 0 },
  { id: 'education', label: 'EDUCATION', show: r.education.length > 0 },
  { id: 'achievements', label: 'ACHIEVEMENTS', show: r.achievements.length > 0 },
  { id: 'contact', label: 'CONTACT', show: hasContact }
].filter(s => s.show);

export default function App() {
  const active = useActiveSection(SECTIONS.map(s => s.id));
  useEffect(() => { // SEO: title and description come from the resume
    if (r.name) document.title = `${r.name}${r.title ? ' | ' + r.title : ''} | Portfolio`;
    if (r.intro) document.querySelector('meta[name="description"]')?.setAttribute('content', r.intro);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <Nav items={SECTIONS} active={active} name={r.name} />
      <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <Hero r={r} />
        {hasAbout && <About a={r.about} />}
        {r.experience.length > 0 && <Experience jobs={r.experience} />}
        {r.projects.length > 0 && <Projects items={r.projects} />}
        {Object.keys(r.skills).length > 0 && <Skills skills={r.skills} />}
        {r.education.length > 0 && <EducationSection items={r.education} />}
        {r.achievements.length > 0 && <Achievements items={r.achievements} />}
        {hasContact && <Contact c={r.contact} />}
      </motion.main>
      <footer className="foot">{r.name && <p>© {new Date().getFullYear()} {r.name}</p>}</footer>
    </MotionConfig>
  );
}
