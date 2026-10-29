import { lazy, Suspense, useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import type { Resume } from '../types';
import { useIsMobile } from '../hooks';

const Scene3D = lazy(() => import('./Scene3D')); // lazy: 3D code loads after first paint

export default function Hero({ r }: { r: Resume }) {
  const reduced = useReducedMotion() ?? false;
  const mobile = useIsMobile();
  const [photoOk, setPhotoOk] = useState(true);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useTransform(mx, [-1, 1], [-14, 14]), py = useTransform(my, [-1, 1], [-9, 9]);
  const onMove = (e: MouseEvent) => {
    if (reduced || mobile) return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };
  const workHref = r.projects.length ? '#projects' : '#about';
  return (
    <section id="home" className="hero" onMouseMove={onMove} aria-labelledby="hero-title">
      <div className="grid-bg" aria-hidden="true" />
      <div className="scene" aria-hidden="true">
        <Suspense fallback={null}><Scene3D reduced={reduced} mobile={mobile} /></Suspense>
      </div>
      <div className="hero-inner">
        <motion.div className="hero-text" style={{ x: px, y: py }}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <h1 id="hero-title">{r.name || 'Your Name'}</h1>
          {r.title && <p className="role">{r.title}</p>}
          {r.intro ? <p className="intro">{r.intro}</p> : <p className="intro">Add your details in <code>src/data/resume.ts</code>.</p>}
          <div className="btns">
            <motion.a className="btn primary" href={workHref} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>View My Work</motion.a>
            {r.resumePdf && (
              <motion.a className="btn" href={r.resumePdf} download whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Download Resume</motion.a>
            )}
          </div>
        </motion.div>
        <motion.div className="photo" style={{ x: useTransform(px, v => -v), y: useTransform(py, v => -v) }}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
          {photoOk
            ? <img src={r.photo} alt={r.name ? `Portrait of ${r.name}` : 'Portrait'} width={360} height={360} fetchPriority="high" onError={() => setPhotoOk(false)} />
            : <div className="photo-missing">Add <code>public/photo.jpg</code></div>}
        </motion.div>
      </div>
    </section>
  );
}
