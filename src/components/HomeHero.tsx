import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HomeHeroMobile } from './HomeHeroMobile';
import { HomeBio, HomeBioContent } from './HomeBio';
import { chapterProgress, openingQuery, openingScore } from '../lib/homeMotion';
import { introScore, useIntroSequence } from '../lib/introSequence';
import './HomeOpening.css';

export function HomeHero() {
  const shared = useIntroSequence();
  const still = useMotionValue(0);
  const fallbackFrame = useMotionValue({ left: 4, top: 13, width: 41, height: 76 });
  const transfer = shared?.enabled ? shared.transferProgress : still;
  const targetFrame = shared?.firstFrame ?? fallbackFrame;
  const sequence = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const titleGeometry = useMotionValue({ x: 0, y: 0, scale: 1, left: 0, width: 1, stageWidth: 1 });
  const intro = useRef<HTMLDivElement>(null);
  const introControls = useRef<HTMLDivElement>(null);
  const bottomControls = useRef<HTMLDivElement>(null);
  const biography = useRef<HTMLDivElement>(null);
  const [cinematic, setCinematic] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress: localProgress } = useScroll({ target: sequence, offset: ['start start', 'end end'] });
  const scrollYProgress = shared?.enabled ? shared.openingProgress : localProgress;
  const reportReady = shared?.setOpeningReady;
  useLayoutEffect(() => { reportReady?.(cinematic); }, [cinematic, reportReady]);

  useLayoutEffect(() => {
    const media = window.matchMedia(openingQuery);
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const available = window.innerHeight - 160;
      const fits = (intro.current?.offsetHeight ?? Infinity) <= available
        && (biography.current?.offsetHeight ?? Infinity) <= available;
      setCinematic(media.matches && fits);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (intro.current) observer.observe(intro.current);
    if (biography.current) observer.observe(biography.current);
    media.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Measure the resting layout, never the heading's animated bounding box.
  // The actual H2 travels; the white ink mask moves with it and needs no visibility handoff.
  useLayoutEffect(() => {
    if (!cinematic) return;
    let disposed = false;
    const measure = () => {
      if (disposed || !stage.current || !title.current || !biography.current) return;
      const stageBox = stage.current.getBoundingClientRect();
      const bioColumn = biography.current.parentElement!;
      const bioLeft = bioColumn.offsetLeft + biography.current.offsetLeft;
      const bioTop = bioColumn.offsetTop - bioColumn.offsetHeight / 2 + biography.current.offsetTop;
      const heading = title.current;
      const lines = [...heading.querySelectorAll<HTMLElement>(':scope > .home-bio-title-line')];
      const width = Math.max(...lines.map(line => line.offsetWidth));
      const scale = Math.min(1.45, stageBox.width * 0.86 / Math.max(width, 1));
      titleGeometry.set({
        x: stageBox.width / 2 - bioLeft - width * scale / 2,
        y: stageBox.height * 0.62 - (bioTop + heading.offsetTop) - heading.offsetHeight * scale / 2,
        scale,
        left: bioLeft,
        width: heading.offsetWidth,
        stageWidth: stageBox.width,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage.current!);
    observer.observe(biography.current!);
    observer.observe(title.current!);
    document.fonts.ready.then(measure);
    return () => { disposed = true; observer.disconnect(); };
  }, [cinematic, titleGeometry]);

  const expand = useTransform(scrollYProgress, p => chapterProgress(p, openingScore.expand));
  const settle = useTransform(scrollYProgress, p => chapterProgress(p, openingScore.settle));
  // This isolated media frame changes geometry; text never participates in its layout.
  const frameLeft = useTransform(() => `${((1 - expand.get()) * 37.4 + settle.get() * 4) * (1 - transfer.get()) + targetFrame.get().left * transfer.get()}%`);
  const frameTop = useTransform(() => `${((1 - expand.get()) * 10.8 + settle.get() * 13) * (1 - transfer.get()) + targetFrame.get().top * transfer.get()}%`);
  const frameWidth = useTransform(() => `${(100 - (1 - expand.get()) * 40.4 - settle.get() * 59) * (1 - transfer.get()) + targetFrame.get().width * transfer.get()}%`);
  const frameHeight = useTransform(() => `${(100 - (1 - expand.get()) * 16.6 - settle.get() * 24) * (1 - transfer.get()) + targetFrame.get().height * transfer.get()}%`);
  const portraitOpacity = useTransform(scrollYProgress, p => 1 - chapterProgress(p, openingScore.portraitExit));
  const imageScale = useTransform(expand, [0, 1], [1.045, 1]);
  const introOpacity = useTransform(scrollYProgress, p => 1 - chapterProgress(p, [0.12, 0.3]));
  const introY = useTransform(scrollYProgress, p => -70 * chapterProgress(p, [0.06, 0.34]));
  const introTitleOpacity = useTransform(scrollYProgress, p => 1 - chapterProgress(p, openingScore.introExit));
  const introTitleY = useTransform(scrollYProgress, p => -24 * chapterProgress(p, openingScore.introExit));
  const mapY = useTransform(scrollYProgress, p => `${-12 * p}%`);
  const bioOpacity = useTransform(scrollYProgress, p => chapterProgress(p, openingScore.biography));
  const bioY = useTransform(bioOpacity, [0, 1], [34, 0]);
  const statementOpacity = useTransform(scrollYProgress, p => chapterProgress(p, openingScore.statement));
  const statementX = useTransform(() => titleGeometry.get().x * (1 - chapterProgress(scrollYProgress.get(), openingScore.titleTravel)));
  const statementY = useTransform(() => titleGeometry.get().y * (1 - chapterProgress(scrollYProgress.get(), openingScore.titleTravel)) + 18 * (1 - chapterProgress(scrollYProgress.get(), openingScore.statement)));
  const statementScale = useTransform(() => 1 + (titleGeometry.get().scale - 1) * (1 - chapterProgress(scrollYProgress.get(), openingScore.titleTravel)));
  // White ink stays clipped to the photograph as its edge passes under the title.
  // Read the same scroll sample for geometry and mask, including rapid reversals.
  const photoInkClip = useTransform(() => {
    const geometry = titleGeometry.get();
    const p = scrollYProgress.get();
    const remaining = 1 - chapterProgress(p, openingScore.titleTravel);
    const scale = 1 + (geometry.scale - 1) * remaining;
    const frameRight = (100 - (1 - chapterProgress(p, openingScore.expand)) * 3 - chapterProgress(p, openingScore.settle) * 55) / 100 * geometry.stageWidth;
    const headingLeft = geometry.left + geometry.x * remaining;
    const frameEdge = frameRight * (1 - transfer.get()) + (targetFrame.get().left + targetFrame.get().width) / 100 * geometry.stageWidth * transfer.get();
    const visible = Math.max(0, Math.min(geometry.width, (frameEdge - headingLeft) / scale));
    return `inset(-12% ${100 * (1 - visible / geometry.width)}% -12% 0px)`;
  });
  const shadeOpacity = useTransform(scrollYProgress, p => chapterProgress(p, openingScore.statement) * (1 - chapterProgress(p, [0.78, 0.90])));

  const surfaceOpacity = useTransform(transfer, p => 1 - chapterProgress(p, [0, .75]));
  const mapOpacity = useTransform(surfaceOpacity, p => p * .055);
  const bioExit = useTransform(transfer, p => 1 - chapterProgress(p, [0, .45]));
  const bioExitY = useTransform(transfer, p => -48 * p);
  // Keep the matching DOM photograph until the first revealed canvas frame exists.
  const openingVisibility = useTransform(() => transfer.get() >= 1 && (!shared?.canvasReady.get() || shared.canvasPresented.get()) ? 'hidden' : 'visible');

  const syncControls = () => {
    const covered = cinematic && scrollYProgress.get() > .3;
    if (introControls.current) introControls.current.inert = covered;
    if (bottomControls.current) bottomControls.current.inert = covered;
  };
  useMotionValueEvent(scrollYProgress, 'change', syncControls);
  useLayoutEffect(syncControls, [cinematic, scrollYProgress]);

  const discover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cinematic || !sequence.current) return;
    event.preventDefault();
    if (shared?.enabled) {
      biography.current?.focus({ preventScroll: true });
      shared.navigate(introScore.biography);
      return;
    }
    const node = sequence.current;
    const start = window.scrollY + node.getBoundingClientRect().top;
    biography.current?.focus({ preventScroll: true });
    window.scrollTo({ top: start + (node.offsetHeight - window.innerHeight) * 0.96, behavior: 'smooth' });
  };

  return (
    <motion.div inherit={false} initial={false} className={`home-opening ${cinematic ? 'home-opening--cinematic' : ''}`} style={{ visibility: shared?.enabled ? openingVisibility : 'visible' }} aria-hidden={shared?.enabled && shared.transferProgress.get() >= 1 ? true : undefined}>
      <HomeHeroMobile />
      <section ref={sequence} className="opening-sequence" aria-label="Kennismaken met Fabrice" data-cinematic={cinematic}>
        <div ref={stage} className="opening-stage">
          {shared?.enabled && <motion.div inherit={false} initial={false} className="opening-surface" style={{ opacity: surfaceOpacity }} aria-hidden="true" />}
          <motion.div inherit={false} initial={false} className="opening-map" style={{ y: cinematic ? mapY : 0, opacity: shared?.enabled ? mapOpacity : .055 }} aria-hidden="true" />
          <motion.div inherit={false} initial={false} className="opening-city" style={{ opacity: shared?.enabled ? surfaceOpacity : 1 }} aria-hidden="true">Oostende.</motion.div>
          <motion.div inherit={false} initial={false} className="opening-intro">
            <div ref={intro} className="opening-intro-inner">
              <motion.h1 inherit={false} initial={false} className="opening-title" aria-label="Ik ben Fabrice Goffin" style={{ opacity: cinematic ? introTitleOpacity : 1, y: cinematic ? introTitleY : 0 }}>
                <span className="opening-line"><span className={reduced ? '' : 'opening-arrive'}>Ik ben</span></span>
                <span className="opening-line opening-line--red"><span className={reduced ? '' : 'opening-arrive opening-arrive--second'}>Fabrice<span className="opening-period">.</span></span></span>
              </motion.h1>
              <motion.div ref={introControls} inherit={false} initial={false} style={{ opacity: cinematic ? introOpacity : 1, y: cinematic ? introY : 0 }}>
              <p className="opening-description">Ik ben een Oostendse ondernemer met een groot hart voor dieren. Sinds eind 2024 ben ik Schepen bevoegd voor <strong>Dierenwelzijn</strong>, <strong>Digitalisering</strong> en <strong>Ontmoetingcentra</strong>.</p>
              <div className="opening-actions">
                <Link className="opening-contact" to="/contact">Contacteer mij <ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></Link>
                <Link className="opening-about" to="/over">Over Fabrice <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></Link>
              </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.figure inherit={false} initial={false} className="opening-frame" style={cinematic ? { left: frameLeft, top: frameTop, width: frameWidth, height: frameHeight } : undefined} aria-label="Fabrice Goffin, thuis en met zijn hond op het strand">
            <img className="opening-dog" src="/images/diervriendelijk.webp" width="1920" height="1920" alt="" aria-hidden="true" loading="eager" />
            <motion.img inherit={false} initial={false} className="opening-portrait" src="/images/ORIGINEELfabrice-hero.webp" width="1920" height="1280" alt="Fabrice Goffin" fetchPriority="high" style={{ opacity: cinematic ? portraitOpacity : 1, scale: cinematic ? imageScale : 1 }} />
            <motion.div inherit={false} initial={false} className="opening-image-shade" style={{ opacity: cinematic ? shadeOpacity : 0 }} aria-hidden="true" />
          </motion.figure>
          <motion.div inherit={false} initial={false} id={cinematic && !shared?.enabled ? 'home-bio' : undefined} className="opening-biography" style={shared?.enabled ? { opacity: bioExit, y: bioExitY } : undefined}>
            <div ref={biography} tabIndex={-1}><HomeBioContent animated={false} titleRef={title}
              titleStyle={cinematic ? { opacity: statementOpacity, x: statementX, y: statementY, scale: statementScale, transformOrigin: '0 0' } : undefined}
              photoInkStyle={cinematic ? { clipPath: photoInkClip } : undefined}
              detailsStyle={cinematic ? { opacity: bioOpacity, y: bioY } : undefined}
            /></div>
          </motion.div>
          <motion.div ref={bottomControls} inherit={false} initial={false} className="opening-bottom" style={{ opacity: cinematic ? introOpacity : 1 }}>
            <span>Vooruit Plus — Oostende</span>
            <a href="#home-bio" onClick={discover}>Ontdek mijn verhaal <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" /></a>
            <span>2024 — 2030</span>
          </motion.div>
        </div>
      </section>
      <div className="opening-bio-fallback"><HomeBio id={cinematic ? 'home-bio-static' : 'home-bio'} /></div>
    </motion.div>
  );
}
