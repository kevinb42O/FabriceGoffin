import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function HomeHeroMobile() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="opening-mobile" aria-label="Kennismaken met Fabrice">
      <div className="opening-mobile-photo">
        <motion.img src="/images/ORIGINEELfabrice-hero.webp" alt="Fabrice Goffin" width="1920" height="1280" fetchPriority="high" style={{ y: reduced ? 0 : imageY, scale: reduced ? 1 : imageScale }} />
        <span className="opening-mobile-location">Oostende — 8400</span>
      </div>
      <div className="opening-mobile-copy">
        <h1 className="opening-title" aria-label="Ik ben Fabrice Goffin">
          <span className="opening-line"><span className={reduced ? '' : 'opening-arrive'}>Ik ben</span></span>
          <span className="opening-line opening-line--red"><span className={reduced ? '' : 'opening-arrive opening-arrive--second'}>Fabrice<span className="opening-period">.</span></span></span>
        </h1>
        <p className="opening-description">Schepen van Oostende, bevoegd voor <strong>Dierenwelzijn</strong>, <strong>Digitalisering</strong> en <strong>Ontmoetingcentra</strong>.</p>
        <div className="opening-actions">
          <Link className="opening-contact" to="/contact">Contacteer mij <ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></Link>
          <Link className="opening-about" to="/over">Over Fabrice <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></Link>
        </div>
        <div className="opening-mobile-bottom"><span>Vooruit Plus — Oostende</span><a href="#home-bio" aria-label="Ontdek mijn verhaal"><ArrowDown size={21} strokeWidth={1.5} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
