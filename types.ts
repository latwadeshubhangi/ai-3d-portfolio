// Shapes of the resume data. Every field comes from the student's real resume.
export interface Job { company: string; role: string; duration: string; responsibilities: string[]; achievements?: string[]; tech?: string[] }
export interface Project { name: string; description: string; tech?: string[]; contribution?: string; results?: string[]; github?: string; demo?: string; image?: string }
export interface Education { degree: string; institution: string; duration: string; details?: string }
export interface Achievement { title: string; type?: string; detail?: string }
export interface Resume {
  name: string; title: string; intro: string;
  photo: string;      // e.g. "/photo.jpg" (file placed in /public)
  resumePdf: string;  // e.g. "/resume.pdf" (the ORIGINAL pdf placed in /public)
  about: { background?: string; interests?: string[]; focus?: string; direction?: string; strengths?: string[] };
  experience: Job[]; projects: Project[];
  skills: Record<string, string[]>; // category -> skill names (no ratings)
  education: Education[]; achievements: Achievement[];
  contact: { email?: string; linkedin?: string; github?: string; portfolio?: string; other?: { label: string; url: string }[] };
}
