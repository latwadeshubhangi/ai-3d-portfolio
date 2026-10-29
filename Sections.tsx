import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Achievement, Education, Job, Project, Resume } from '../types';
import Reveal from './Reveal';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-t`}>
      <Reveal><h2 id={`${id}-t`}>{title}</h2></Reveal>
      {children}
    </section>
  );
}
const Tags = ({ items }: { items?: string[] }) =>
  items?.length ? <ul className="tags">{items.map(t => <li key={t}>{t}</li>)}</ul> : null;

export function About({ a }: { a: Resume['about'] }) {
  const cards: { icon: string; title: string; body?: string; list?: string[] }[] = [
    { icon: '👤', title: 'Background', body: a.background },
    { icon: '🔍', title: 'Interests', list: a.interests },
    { icon: '🎯', title: 'Focus', body: a.focus },
    { icon: '🧭', title: 'Career direction', body: a.direction },
    { icon: '💪', title: 'Key strengths', list: a.strengths }
  ].filter(c => c.body || c.list?.length);
  return (
    <Section id="about" title="About">
      <div className="cards">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <motion.article className="card" whileHover={{ y: -4 }}>
              <h3><span aria-hidden="true">{c.icon}</span> {c.title}</h3>
              {c.body && <p>{c.body}</p>}
              <Tags items={c.list} />
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <Section id="experience" title="Experience">
      <ol className="timeline">
        {jobs.map(j => (
          <Reveal key={j.company + j.role + j.duration}>
            <li className="tl-item">
              <h3>{j.role}</h3>
              <p className="meta">{j.company} · {j.duration}</p>
              {j.responsibilities.length > 0 && <ul>{j.responsibilities.map(x => <li key={x}>{x}</li>)}</ul>}
              {j.achievements?.length ? <><h4>Achievements</h4><ul>{j.achievements.map(x => <li key={x}>{x}</li>)}</ul></> : null}
              <Tags items={j.tech} />
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const id = 'proj-' + p.name.replace(/\W+/g, '-');
  return (
    <motion.article className="card project" whileHover={{ y: -6, rotateX: 2, rotateY: -2 }} style={{ transformPerspective: 800 }}>
      {p.image && <img src={p.image} alt={`${p.name} preview`} loading="lazy" width={480} height={270} />}
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <Tags items={p.tech} />
      <button className="btn small" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
        {open ? 'Hide details' : 'Show details'}
      </button>
      {open && (
        <motion.div id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          {p.contribution && <p><strong>My contribution:</strong> {p.contribution}</p>}
          {p.results?.length ? <ul>{p.results.map(x => <li key={x}>{x}</li>)}</ul> : null}
        </motion.div>
      )}
      <p className="links">
        {p.github && <a href={p.github} target="_blank" rel="noreferrer">{p.name} on GitHub</a>}
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">{p.name} live demo</a>}
      </p>
    </motion.article>
  );
}
export function Projects({ items }: { items: Project[] }) {
  return (
    <Section id="projects" title="Projects">
      <div className="cards">{items.map((p, i) => <Reveal key={p.name} delay={i * 0.06}><ProjectCard p={p} /></Reveal>)}</div>
    </Section>
  );
}

// No percentages, stars or levels: only names grouped by category.
export function Skills({ skills }: { skills: Record<string, string[]> }) {
  return (
    <Section id="skills" title="Skills">
      <div className="cards">
        {Object.entries(skills).filter(([, v]) => v.length).map(([cat, list]) => (
          <Reveal key={cat}><article className="card"><h3>{cat}</h3><Tags items={list} /></article></Reveal>
        ))}
      </div>
    </Section>
  );
}

export function EducationSection({ items }: { items: Education[] }) {
  return (
    <Section id="education" title="Education">
      <ol className="timeline">
        {items.map(e => (
          <Reveal key={e.degree + e.institution}>
            <li className="tl-item"><h3>{e.degree}</h3><p className="meta">{e.institution} · {e.duration}</p>{e.details && <p>{e.details}</p>}</li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Achievements({ items }: { items: Achievement[] }) {
  return (
    <Section id="achievements" title="Achievements & Certifications">
      <div className="cards">
        {items.map(a => (
          <Reveal key={a.title}><article className="card"><h3>{a.title}</h3>{a.type && <p className="meta">{a.type}</p>}{a.detail && <p>{a.detail}</p>}</article></Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Contact({ c }: { c: Resume['contact'] }) {
  const links = [
    c.email && { label: 'Email', text: c.email, href: `mailto:${c.email}` },
    c.linkedin && { label: 'LinkedIn', text: 'LinkedIn profile', href: c.linkedin },
    c.github && { label: 'GitHub', text: 'GitHub profile', href: c.github },
    c.portfolio && { label: 'Portfolio', text: 'Portfolio website', href: c.portfolio },
    ...(c.other ?? []).map(o => ({ label: o.label, text: o.label, href: o.url }))
  ].filter(Boolean) as { label: string; text: string; href: string }[];
  return (
    <Section id="contact" title="Contact">
      <Reveal><p className="cta">Let’s build something meaningful.</p></Reveal>
      <ul className="contact">{links.map(l => <li key={l.label}><strong>{l.label}:</strong> <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">{l.text}</a></li>)}</ul>
    </Section>
  );
}
