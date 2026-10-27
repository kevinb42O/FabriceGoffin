import { motion, type MotionStyle } from 'motion/react';
import type { Ref } from 'react';

const biographyTitle = ['Een hart voor dieren,', 'een blik op de toekomst.'] as const;

/** Shared copy keeps the cinematic and normal-flow biography identical. */
export function HomeBioContent({ animated = true, titleRef, titleStyle, photoInkStyle, detailsStyle }: {
  animated?: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
  titleStyle?: MotionStyle;
  photoInkStyle?: MotionStyle;
  detailsStyle?: MotionStyle;
}) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 24 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="home-bio-content"
    >
      <motion.h2 ref={titleRef} style={titleStyle}>
        <span className="home-bio-title-line">{biographyTitle[0]}</span>{' '}
        <span className="home-bio-title-line home-bio-title-accent">{biographyTitle[1]}</span>
        {photoInkStyle && <motion.span className="home-bio-photo-ink" style={photoInkStyle} aria-hidden="true">
          <span className="home-bio-title-line">{biographyTitle[0]}</span>
          <span className="home-bio-title-line">{biographyTitle[1]}</span>
        </motion.span>}
      </motion.h2>
      <motion.div className="home-bio-details" style={detailsStyle}>
        <div className="home-bio-prose">
          <p>Ik ben een Oostendse ondernemer met een hart voor dieren. Founder en ex-Co-CEO van softwarebedrijf Talemate, voormalig voorzitter van het Blauwe Kruis van de Kust en bovenal een enthousiaste en gemotiveerde dierenliefhebber, die van Oostende de meest diervriendelijke stad van Vlaanderen wil maken.</p>
          <p>Sinds eind 2024 ben ik Schepen in Oostende bevoegd voor Dierenwelzijn, Digitalisering en Ontmoetingcentra. Help je graag mee, heb je vragen of ideeën? Aarzel dan niet om me te contacteren.</p>
        </div>
        <blockquote>“Laat ons samen werk maken van een hoger dierenwelzijn en een <span>echte dierenbescherming.</span>”</blockquote>
      </motion.div>
    </motion.div>
  );
}

export function HomeBio({ id = 'home-bio' }: { id?: string }) {
  return (
    <section id={id} className="home-bio-section">
      <div className="layout-shell-wide home-bio-grid">
        <div className="home-bio-image"><img src="/images/diervriendelijk.webp" width="1920" height="1920" alt="Fabrice Goffin en zijn hond op het strand" loading="lazy" /></div>
        <HomeBioContent />
      </div>
    </section>
  );
}
