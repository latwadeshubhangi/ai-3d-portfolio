import { useEffect, useState } from 'react';

/** True on phones/small tablets: used to simplify 3D and reduce particles. */
export function useIsMobile(): boolean {
  const q = '(max-width: 768px)';
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return m;
}

/** Highlights the nav item whose section is currently in view (Intersection Observer). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? 'home');
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}
