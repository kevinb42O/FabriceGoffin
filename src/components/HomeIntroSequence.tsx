import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { HomeNieuwsPreview } from './HomeNieuwsPreview';
import { HomeHero } from './HomeHero';
import { HomeStandpuntenPreview } from './HomeStandpuntenPreview';
import { standpunten } from '../data/standpunten';
import { chapterProgress } from '../lib/homeMotion';
import { firstStandpuntFrame, galleryStart, introDistance, newsTransferDistance, newsTransferProgress, introPhases, introScore, IntroSequenceContext, type IntroFrame } from '../lib/introSequence';
import './HomeIntroSequence.css';

export function HomeIntroSequence() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [scene, setScene] = useState({ preload: false, galleryActive: false, galleryVisible: false });
  const total = introDistance(standpunten.length) + (enabled ? newsTransferDistance : 0);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const nativeMoment = useTransform(scrollYProgress, p => p * total);
  const softenedMoment = useSpring(nativeMoment, { stiffness: 220, damping: 30, mass: .65, restDelta: .0001 });
  // One clock keeps the photo, title, ink mask and handoff together. Remove the
  // short wheel-step smoothing gradually before the gallery, which owns its
  // own camera damping. Native page scrolling and the gallery pace stay intact.
  const moment = useTransform(() => {
    const native = nativeMoment.get();
    const smoothing = enabled ? 1 - chapterProgress(native, [introScore.opening + introScore.transfer * .45, galleryStart]) : 0;
    return native + (softenedMoment.get() - native) * smoothing;
  });
  const openingProgress = useTransform(moment, p => introPhases(p, standpunten.length).opening);
  const transferProgress = useTransform(moment, p => chapterProgress(introPhases(p, standpunten.length).transfer, [0, 1]));
  const galleryProgress = useTransform(moment, p => introPhases(p, standpunten.length).gallery);
  const newsProgress = useTransform(moment, p => enabled ? newsTransferProgress(p, standpunten.length) : 0);
  const firstFrame = useMotionValue<IntroFrame>({ left: 10, top: 10, width: 45, height: 80 });
  const canvasReady = useMotionValue(false);
  const canvasPresented = useMotionValue(false);
  const reportFrame = useCallback((frame: IntroFrame) => firstFrame.set(frame), [firstFrame]);
  const setOpeningReady = useCallback((ready: boolean) => setEnabled(ready), []);
  const updateScene = (value: number) => {
    const next = {
      preload: enabled && value > .65,
      galleryActive: enabled && value >= introScore.opening - .12 && value < total,
      galleryVisible: enabled && value >= galleryStart && newsTransferProgress(value, standpunten.length) < .35,
    };
    setScene(previous => previous.preload === next.preload && previous.galleryActive === next.galleryActive && previous.galleryVisible === next.galleryVisible ? previous : next);
  };
  useMotionValueEvent(moment, 'change', updateScene);
  useLayoutEffect(() => { updateScene(moment.get()); }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled || !stage.current) return;
    const node = stage.current;
    const measure = () => {
      if (node.clientWidth && node.clientHeight) firstFrame.set(firstStandpuntFrame(node.clientWidth, node.clientHeight));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, firstFrame]);

  // A hash can arrive before the lazy route and measured opening have settled.
  useEffect(() => {
    const targetId = location.hash.slice(1);
    if (!['home-news', 'home-films', 'home-social'].includes(targetId)) return;
    let cancelled = false;
    let frame = 0;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!cancelled) document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant' });
        });
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [enabled]);

  const navigate = useCallback((nextMoment: number) => {
    const node = root.current;
    if (!node) return;
    const top = scrollY + node.getBoundingClientRect().top;
    window.scrollTo({ top: top + (node.offsetHeight - (stage.current?.offsetHeight ?? innerHeight)) * nextMoment / total, behavior: 'smooth' });
  }, [total]);

  return <IntroSequenceContext.Provider value={{ enabled, openingProgress, transferProgress, galleryProgress, newsProgress, firstFrame, canvasReady, canvasPresented, overlayHost: stage, ...scene, setOpeningReady, reportFrame, navigate }}>
    <div ref={root} className={`intro-sequence ${enabled ? 'intro-sequence--unified' : ''}`} style={enabled ? { height: `${(total + 1) * 100}svh` } : undefined}>
      {enabled && <><div id="home-bio" className="intro-anchor" style={{ top: `${introScore.biography * 100}svh` }} aria-hidden="true" /><div id="home-standpunten" className="intro-anchor" style={{ top: `${galleryStart * 100}svh` }} aria-hidden="true" /></>}
      <div ref={stage} className="intro-stage"><HomeHero /><HomeStandpuntenPreview /></div>
    </div>
    <HomeNieuwsPreview />
  </IntroSequenceContext.Provider>;
}
