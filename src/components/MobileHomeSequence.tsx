import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionStyle } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { HomeBioContent } from './HomeBio';
import { HomeNieuwsPreview } from './HomeNieuwsPreview';
import { IntroSequenceContext } from '../lib/introSequence';
import { galleryInk } from '../lib/standpuntenMotion';
import { mobileChapter as chapter, mobileGalleryPhase, mobileImageFrame, mobileScore } from '../lib/mobileHomeMotion';
import { standpunten } from '../data/standpunten';
import './MobileHomeSequence.css';

const moods = [
  { background: '#f5f1e8', ink: '#292b24', accent: '#ba663f', blob1: '#ede1c4', blob2: '#e2d9c9' },
  { background: '#e8eee7', ink: '#263a32', accent: '#417062', blob1: '#c6d8c3', blob2: '#dae3cc' },
  { background: '#e5edf0', ink: '#253b48', accent: '#50728a', blob1: '#c9dce2', blob2: '#d9e7ea' },
  { background: '#242c40', ink: '#faf5eb', accent: '#d6ac83', blob1: '#343f5c', blob2: '#4c3a50' },
  { background: '#eee3db', ink: '#483329', accent: '#8f6655', blob1: '#dfcabc', blob2: '#e8d8cb' },
  { background: '#f1eae1', ink: '#442a29', accent: '#ac3538', blob1: '#e6cfc8', blob2: '#e9dfd0' },
];

export function MobileHomeSequence() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bio = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const samples = useRef<HTMLDivElement>(null);
  const engine = useRef<import('./depth-gallery/PortfolioEngine.js').PortfolioEngine | null>(null);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<'hero' | 'bio' | 'gallery' | 'news'>('hero');
  const [preload, setPreload] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const metrics = useMotionValue({ width: 390, height: 844, imageTop: 400, titleHeight: 100, bioWindow: 220, bioOverflow: 260 });
  const renderedPhase = useMotionValue(0);
  const photoOverlap = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const moment = useTransform(scrollYProgress, p => p * mobileScore.release);
  const galleryProgress = useTransform(moment, p => mobileGalleryPhase(p, standpunten.length) / (standpunten.length - 1));
  const transferProgress = useTransform(moment, p => chapter(p, mobileScore.transfer, mobileScore.gallery));
  const newsProgress = useTransform(moment, p => chapter(p, mobileScore.galleryEnd, mobileScore.release));
  const complete = useMotionValue(1);
  const firstFrame = useMotionValue({ left: 0, top: 50, width: 100, height: 40 });
  const canvasReady = useMotionValue(false);
  const canvasPresented = useMotionValue(false);
  const ink = useTransform(renderedPhase, p => galleryInk(p, moods.map(m => m.ink)));
  const background = useTransform(renderedPhase, p => galleryInk(p, moods.map(m => m.background)));

  const navigate = useCallback((target: number, behavior: ScrollBehavior = 'smooth') => {
    if (!root.current || !stage.current) return;
    const top = scrollY + root.current.getBoundingClientRect().top;
    window.scrollTo({ top: top + (root.current.offsetHeight - stage.current.offsetHeight) * target / mobileScore.release, behavior });
  }, []);

  useLayoutEffect(() => {
    if (!stage.current) return;
    let disposed = false;
    let previousSize: { width: number; height: number } | undefined;
    let resizeFrame = 0;
    const measure = () => {
      if (disposed || !stage.current) return;
      const { clientWidth: width, clientHeight: height } = stage.current;
      if (previousSize && (previousSize.width !== width || previousSize.height !== height) && root.current) {
        const rootTop = scrollY + root.current.getBoundingClientRect().top;
        const previousEnd = rootTop + mobileScore.release * previousSize.height;
        if (scrollY >= rootTop && scrollY < previousEnd) {
          const phase = (scrollY - rootTop) / previousSize.height;
          cancelAnimationFrame(resizeFrame);
          resizeFrame = requestAnimationFrame(() => navigate(phase, 'instant'));
        }
      }
      previousSize = { width, height };
      const copyHeight = Math.max(0, ...Array.from(samples.current?.children ?? []).map(n => (n as HTMLElement).offsetHeight));
      const titleHeight = title.current?.offsetHeight ?? 100;
      const details = bio.current?.querySelector<HTMLElement>('.home-bio-details');
      const prose = details?.querySelector<HTMLElement>('.home-bio-prose');
      const quote = details?.querySelector<HTMLElement>('blockquote');
      const landscape = width > height * 1.3;
      const bioWindow = Math.max(105, (landscape ? height - 72 : height * .48) - 98 - titleHeight - 20);
      metrics.set({ width, height, imageTop: Math.max(154 + copyHeight, height * .43), titleHeight, bioWindow,
        bioOverflow: Math.max(0, (prose?.offsetHeight ?? 0) + (quote?.offsetHeight ?? 0) + 56 - bioWindow) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage.current);
    if (title.current) observer.observe(title.current);
    if (samples.current) observer.observe(samples.current);
    document.fonts.ready.then(measure);
    return () => { disposed = true; cancelAnimationFrame(resizeFrame); observer.disconnect(); };
  }, [metrics, navigate]);

  const update = (p: number) => {
    setMode(p < 1.15 ? 'hero' : p < mobileScore.transfer + .3 ? 'bio' : p < mobileScore.galleryEnd + .4 ? 'gallery' : 'news');
    if (p > .35) setPreload(true);
    const instance = engine.current;
    if (instance && !failed) {
      instance.setPosition(mobileGalleryPhase(p, standpunten.length));
      instance.setPresentation(p >= mobileScore.gallery - .002, 1);
      instance.setDeparture(0);
      instance.setEnabled(p > .35 && p < mobileScore.release);
    }
    if (!instance || failed) {
      const phase = mobileGalleryPhase(p, standpunten.length);
      renderedPhase.set(phase);
      setIndex(Math.round(phase));
    }
  };
  useMotionValueEvent(moment, 'change', update);
  useLayoutEffect(() => update(moment.get()), [failed]);

  useEffect(() => {
    if (!preload || !canvas.current) return;
    let cancelled = false;
    let instance: import('./depth-gallery/PortfolioEngine.js').PortfolioEngine | undefined;
    let observer: ResizeObserver | undefined;
    const fit = () => {
      if (!instance || !stage.current) return;
      const { width, height, imageTop } = metrics.get();
      const pixels = height / (2 * Math.tan(Math.PI / 8) * 5);
      instance.gallery.planes.forEach((plane: { userData: { aspectRatio: number; mobileScale: number; basePosition: { x: number; y: number } } }) => {
        const frame = mobileImageFrame(width, height, imageTop, plane.userData.aspectRatio);
        plane.userData.mobileScale = frame.height / pixels / 3;
        plane.userData.basePosition.x = 0;
        plane.userData.basePosition.y = (height / 2 - frame.top - frame.height / 2) / pixels;
      });
      instance.resize();
    };
    import('./depth-gallery/PortfolioEngine.js').then(async ({ PortfolioEngine }) => {
      if (cancelled || !canvas.current) return;
      instance = new PortfolioEngine(canvas.current, standpunten.map((point, i) => ({ textureSrc: point.image,
        position: { x: 0, y: 0 }, backgroundColor: moods[i]!.background, accentColor: moods[i]!.accent,
        fallbackColor: moods[i]!.accent, blob1Color: moods[i]!.blob1, blob2Color: moods[i]!.blob2 })),
      (next: number) => { if (!cancelled) setIndex(next); }, () => { if (!cancelled) setFailed(true); }, { mapSource: '/images/kaartoostende.webp' });
      engine.current = instance;
      instance.gallery.mobileBreakpoint = 1023;
      instance.gallery.mobileXSpreadFactor = 0;
      instance.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
      instance.trail.configuration.responsiveSettings.mobileBreakpoint = 1023;
      instance.trail.configuration.responsiveSettings.mobileWidthScale = .25;
      instance.onPhase = (value: number) => {
        if (cancelled || !instance) return;
        renderedPhase.set(value);
        // Photographs can grow behind the copy. Follow their actual projected
        // edges to add ink/shade only while photography crosses the text.
        const { height, width, imageTop } = metrics.get();
        let overlap = 0;
        if (width <= height * 1.3) {
          instance.camera.updateMatrixWorld();
          for (const plane of instance.gallery.planes) {
            if (plane.material.opacity < .12 || instance.camera.position.z - plane.position.z < .1) continue;
            plane.updateMatrixWorld();
            const corner = plane.position.clone().set(-1.5, 1.5, 0).applyMatrix4(plane.matrixWorld).project(instance.camera);
            const top = (1 - corner.y) * height / 2;
            overlap = Math.max(overlap, Math.max(0, Math.min(1, (imageTop - 15 - top) / 72)) * plane.material.opacity);
          }
        }
        photoOverlap.set(overlap);
      };
      instance.onPresentationFrame = (presented: boolean) => { if (!cancelled && presented) setReady(true); };
      // Do not present before measured geometry is installed.
      instance.setPresentation(false);
      await instance.init();
      if (cancelled) { instance.dispose(); return; }
      fit();
      observer = new ResizeObserver(fit);
      observer.observe(stage.current!);
      const unsubscribe = metrics.on('change', fit);
      cleanupMetrics = unsubscribe;
      update(moment.get());
    }).catch(() => { if (!cancelled) setFailed(true); });
    let cleanupMetrics: (() => void) | undefined;
    return () => { cancelled = true; observer?.disconnect(); cleanupMetrics?.(); instance?.dispose(); engine.current = null; };
  }, [preload]);

  useEffect(() => {
    const target = location.hash.slice(1);
    const destinations: Record<string, number> = { 'home-bio': mobileScore.biography, 'home-standpunten': mobileScore.gallery };
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      timer = setTimeout(() => {
        if (target in destinations) navigate(destinations[target]!, 'instant');
        else if (['home-news', 'home-films', 'home-social'].includes(target)) document.getElementById(target)?.scrollIntoView({ behavior: 'instant' });
      }, 100);
    });
    return () => { cancelled = true; clearTimeout(timer); };
  }, [navigate]);

  const photoFrame = useTransform(() => {
    const p = moment.get();
    const { width: w, height: h, imageTop } = metrics.get();
    const landscape = w > h * 1.3;
    const start = landscape ? { left: w * .53, top: 96, width: w * .43, height: h - 164 } : { left: 24, top: h * .34, width: w - 48, height: h * .38 };
    const expanded = { left: 0, top: 0, width: w, height: h };
    const bioFrame = landscape ? mobileImageFrame(w, h, imageTop) : { left: 24, top: h * .57, width: w - 48, height: h * .36 };
    const target = mobileImageFrame(w, h, imageTop);
    const mix = (a: typeof start, b: typeof start, t: number) => ({ left: a.left + (b.left - a.left) * t, top: a.top + (b.top - a.top) * t, width: a.width + (b.width - a.width) * t, height: a.height + (b.height - a.height) * t });
    return mix(mix(mix(start, expanded, chapter(p, .15, 1.2)), bioFrame, chapter(p, 1.6, 2.15)), target, transferProgress.get());
  });
  const photoLeft = useTransform(photoFrame, f => f.left);
  const photoTop = useTransform(photoFrame, f => f.top);
  const photoWidth = useTransform(photoFrame, f => f.width);
  const photoHeight = useTransform(photoFrame, f => f.height);
  const portraitOpacity = useTransform(moment, p => 1 - chapter(p, 1.05, 1.4));
  const introOpacity = useTransform(moment, p => 1 - chapter(p, .12, .65));
  const introY = useTransform(moment, p => -40 * chapter(p, .12, .65));
  const paperOpacity = useTransform(transferProgress, p => 1 - p);
  const titleY = useTransform(() => (metrics.get().height * .45 - 92) * (1 - chapter(moment.get(), 1.55, 2.1)));
  const titleOpacity = useTransform(moment, p => chapter(p, .95, 1.3) * (1 - chapter(p, 4.1, 4.5)));
  const detailsOpacity = useTransform(moment, p => chapter(p, 1.95, 2.2) * (1 - chapter(p, 3.95, 4.4)));
  const bioShift = useTransform(() => `${-metrics.get().bioOverflow * chapter(moment.get(), 2.35, 3.9)}px`);
  const bioWindow = useTransform(metrics, m => `${m.bioWindow}px`);
  const photoInk = useTransform(() => {
    const f = photoFrame.get();
    const { width, titleHeight } = metrics.get();
    const top = 92 + titleY.get();
    return `inset(${Math.max(0, f.top - top)}px ${Math.max(0, width - 24 - f.left - f.width)}px ${Math.max(0, top + titleHeight - f.top - f.height)}px ${Math.max(0, f.left - 24)}px)`;
  });
  const galleryOpacity = useTransform(moment, p => chapter(p, 4.32, 4.85) * (1 - chapter(p, 9.15, 9.5)));
  const photoOpacity = useTransform(() => failed || !ready ? 1 : 1 - chapter(moment.get(), 4.9, 4.96));
  // Keep the final photograph travelling through the handoff: rise and grow
  // behind the incoming news, rather than receding at the bottom of the stage.
  const finalScale = useTransform(newsProgress, [0, .85, 1], [1, 1.85, 2]);
  const finalY = useTransform(() => -metrics.get().height * .48 * newsProgress.get());
  const galleryTop = useTransform(metrics, m => m.imageTop);
  const copyInk = useTransform(() => {
    const source = ink.get().match(/\d+/g)?.map(Number) ?? [41, 43, 36];
    const t = photoOverlap.get();
    return `rgb(${source.map(c => Math.round(c + (255 - c) * t)).join(' ')})`;
  });
  const shadeOpacity = useTransform(() => photoOverlap.get() * galleryOpacity.get());
  const point = standpunten[index]!;
  const currentFrame = mobileImageFrame(metrics.get().width, metrics.get().height, metrics.get().imageTop);

  return <div className="mobile-experience home-opening">
    <div ref={root} className="mobile-intro" style={{ height: `${(mobileScore.release + 1) * 100}svh` }}>
      <div id="home-bio" className="mobile-anchor" style={{ top: `${mobileScore.biography * 100}svh` }} />
      <div id="home-standpunten" className="mobile-anchor" style={{ top: `${mobileScore.gallery * 100}svh` }} />
      <div ref={stage} className="mobile-stage" data-mobile-scene={mode} data-mobile-ready={ready && !failed} data-mobile-index={index}>
        <motion.div className="mobile-gallery-surface" style={{ backgroundColor: background }} />
        <motion.canvas ref={canvas} className="mobile-canvas" style={{ scale: finalScale, y: finalY, transformOrigin: '50% 72%' }} aria-hidden="true" />
        <motion.div className="mobile-paper" style={{ opacity: paperOpacity }} aria-hidden="true" />
        <motion.figure className="mobile-travelling-photo" style={{ left: photoLeft, top: photoTop, width: photoWidth, height: photoHeight, opacity: photoOpacity }} aria-hidden="true">
          <img src="/images/diervriendelijk.webp" alt="" width="1920" height="1920" />
          <motion.img className="mobile-portrait" src="/images/ORIGINEELfabrice-hero.webp" alt="" width="1920" height="1280" fetchPriority="high" style={{ opacity: portraitOpacity }} />
        </motion.figure>
        <motion.div className="mobile-hero-copy" style={{ opacity: introOpacity, y: introY }} inert={mode !== 'hero'} aria-hidden={mode !== 'hero'}>
          <h1 className="opening-title" aria-label="Ik ben Fabrice Goffin"><span className="opening-line"><span className="opening-arrive">Ik ben</span></span><span className="opening-line opening-line--red"><span className="opening-arrive opening-arrive--second">Fabrice<span className="opening-period">.</span></span></span></h1>
          <div className="mobile-hero-bottom"><p>Schepen van Oostende, bevoegd voor <strong>Dierenwelzijn</strong>, <strong>Digitalisering</strong> en <strong>Ontmoetingcentra</strong>.</p><div className="opening-actions"><Link className="opening-contact" to="/contact">Contacteer mij <ArrowUpRight size={18} /></Link><a className="opening-about" href="#home-bio" onClick={e => { e.preventDefault(); navigate(mobileScore.biography); }}>Mijn verhaal <ArrowDown size={17} /></a></div></div>
        </motion.div>
        <motion.div ref={bio} className="mobile-biography" style={{ '--bio-shift': bioShift, '--bio-window': bioWindow } as MotionStyle} inert={mode !== 'bio'} aria-hidden={mode !== 'bio'}>
          <HomeBioContent animated={false} titleRef={title} titleStyle={{ y: titleY, opacity: titleOpacity }} photoInkStyle={{ clipPath: photoInk }} detailsStyle={{ opacity: detailsOpacity }} />
        </motion.div>
        <motion.div className="mobile-photo-shade" style={{ opacity: shadeOpacity }} aria-hidden="true" />
        <motion.section className="mobile-priorities" aria-label="Speerpunten" style={{ color: copyInk, opacity: galleryOpacity }} inert={mode !== 'gallery'} aria-hidden={mode !== 'gallery'}>
          <header><h2>Speerpunten<span>.</span></h2><Link to="/standpunten">Alle standpunten <ArrowUpRight size={16} /></Link></header>
          <article className="mobile-point"><span className="mobile-point-number">{point.nummer} / 06</span><h3>{point.titel}</h3><p>{point.kort}</p><Link className="mobile-point-read" to={`/standpunten?p=${point.nummer}`}>Lees het standpunt <ArrowUpRight size={18} /></Link></article>
          <Link className="mobile-photo-link" style={{ left: currentFrame.left, width: currentFrame.width, top: currentFrame.top, height: currentFrame.height }} to={`/standpunten?p=${point.nummer}`} aria-label={`Lees het standpunt: ${point.titel}`} />
          {failed && <motion.div className="mobile-gallery-poster" style={{ top: galleryTop, scale: finalScale, y: finalY }}><img src={point.image} alt={point.titel} /></motion.div>}
          <nav className="mobile-gallery-controls" aria-label="Speerpunten doorlopen"><button aria-label="Vorig speerpunt" disabled={index === 0} onClick={() => navigate(mobileScore.gallery + Math.max(0, index - 1) / 5 * (mobileScore.galleryEnd - mobileScore.gallery))}><ArrowLeft size={19} /></button><div>{standpunten.map((s, i) => <button key={s.nummer} aria-label={`Toon speerpunt ${s.nummer}: ${s.titel}`} aria-current={i === index ? 'true' : undefined} onClick={() => navigate(mobileScore.gallery + i / 5 * (mobileScore.galleryEnd - mobileScore.gallery))}><span /></button>)}</div><button aria-label="Volgend speerpunt" disabled={index === 5} onClick={() => navigate(mobileScore.gallery + Math.min(5, index + 1) / 5 * (mobileScore.galleryEnd - mobileScore.gallery))}><ArrowRight size={19} /></button><a href="#home-news" onClick={e => { e.preventDefault(); navigate(mobileScore.release); }} aria-label="Verder naar nieuws"><ArrowDown size={18} /></a></nav>
        </motion.section>
        <div ref={samples} className="mobile-copy-measure" aria-hidden="true" inert>{standpunten.map(point => <article className="mobile-point" key={point.nummer}><span className="mobile-point-number">{point.nummer} / 06</span><h3>{point.titel}</h3><p>{point.kort}</p><span className="mobile-point-read">Lees het standpunt <ArrowUpRight size={18} /></span></article>)}</div>
      </div>
    </div>
    <IntroSequenceContext.Provider value={{ enabled: true, openingProgress: complete, transferProgress, galleryProgress, newsProgress, firstFrame, canvasReady, canvasPresented, overlayHost: stage, preload, galleryActive: mode === 'gallery', galleryVisible: mode === 'gallery', setOpeningReady: () => {}, reportFrame: frame => firstFrame.set(frame), navigate: () => navigate(mobileScore.release) }}><HomeNieuwsPreview /></IntroSequenceContext.Provider>
  </div>;
}
