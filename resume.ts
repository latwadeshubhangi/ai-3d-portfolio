import type { Resume } from '../types';

/**
 * SINGLE SOURCE OF TRUTH.
 * Copy ONLY what is written in your real resume. Leave a field empty ("" or [])
 * if your resume does not contain it: that section/item is then hidden automatically.
 * Never invent companies, projects, skills, links or numbers.
 */
export const resume: Resume = {
  name: '',            // e.g. your full name
  title: '',           // professional title as written in your resume
  intro: '',           // 1-2 sentence summary taken from your resume
  photo: '/photo.jpg',
  resumePdf: '/resume.pdf',
  about: { background: '', interests: [], focus: '', direction: '', strengths: [] },
  experience: [],      // { company, role, duration, responsibilities: [], achievements?: [], tech?: [] }
  projects: [],        // { name, description, tech?, contribution?, results?, github?, demo? }
  skills: {},          // { 'Programming Languages': ['...'], 'Frameworks': ['...'] }
  education: [],       // { degree, institution, duration, details? }
  achievements: [],    // { title, type?, detail? }
  contact: { email: '', linkedin: '', github: '', portfolio: '', other: [] }
};
