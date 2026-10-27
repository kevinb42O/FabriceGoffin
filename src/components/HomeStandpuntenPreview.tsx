import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal, flushSync } from 'react-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { standpunten } from '../data/standpunten';
import { fitStandpuntDesktop, galleryInk, standpuntProgress, standpuntenDistance, standpuntenPhase } from '../lib/standpuntenMotion';
import { galleryStart, useIntroSequence } from '../lib/introSequence';
import { chapterProgress } from '../lib/homeMotion';
import './HomeStandpunten.css';

// Alternate the image and editorial column, as in Webaanzee's project gallery.
const moods = [
  { x: -.85, accent: '#ba663f', background: '#f5f1e8', blob1: '#ede1c4', blob2: '#e2d9c9', ink: '#292b24' },
  { x: .85, accent: '#417062', background: '#e8eee7', blob1: '#c6d8c3', blob2: '#dae3cc', ink: '#263a32' },
  { x: -.8, accent: '#50728a', background: '#e5edf0', blob1: '#c9dce2', blob2: '#d9e7ea', ink: '#253b48' },
  { x: .85, accent: '#d6ac83', background: '#242c40', blob1: '#343f5c', blob2: '#4c3a50', ink: '#faf5eb' },
  { x: -.85, accent: '#8f6655', background: '#eee3db', blob1: '#dfcabc', blob2: '#e8d8cb', ink: '#483329' },
  { x: .85, accent: '#ac3538', background: '#f1eae1', blob1: '#e6cfc8', blob2: '#e9dfd0', ink: '#442a29' },
];
const galleryInks = moods.map(mood => mood.ink);
const animatedQuery = '(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 650px), (prefers-reduced-motion: no-preference) and (max-width: 1023px) and (min-height: 740px)';

export function HomeStandpuntenPreview() {
  const shared = useIntroSequence();
  const complete = useMotionValue(1);
  const still = useMotionValue(0);
  const departure = shared?.enabled ? shared.newsProgress : still;
  const departingScale = useTransform(departure, [0, 1], [1, .94]);
  const departingY = useTransform(departure, [0, 1], [0, 24]);
  const renderedPhase = useMotionValue(0);
  const ink = useTransform(renderedPhase, p => galleryInk(p, galleryInks));
  const titleInkMask = useTransform(renderedPhase, p => {
    const light = chapterProgress(p, [2.62, 2.94]) * (1 - chapterProgress(p, [3.22, 3.48]));
    return `inset(-5% ${100 * (1 - light)}% -5% 0)`;
  });
  const transfer = shared?.enabled ? shared.transferProgress : complete;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<import('./depth-gallery/PortfolioEngine.js').PortfolioEngine | null>(null);
  const [animated, setAnimated] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const locallyNear = useInView(section, { margin: '600px 0px', once: true });
  const locallyVisible = useInView(stage, { amount: .12 });
  const near = shared?.enabled ? shared.preload : locallyNear;
  const visible = shared?.enabled ? shared.galleryActive : locallyVisible;
  const active = useRef(false);
  active.current = visible;
  const { scrollYProgress: localProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const scrollYProgress = shared?.enabled ? shared.galleryProgress : localProgress;
  const phase = useTransform(scrollYProgress, p => standpuntenPhase(p, standpunten.length));
  const fallbackScale = useTransform(scrollYProgress, p => .94 + .06 * Math.min(1, p / .08));

  useLayoutEffect(() => {
    const media = matchMedia(animatedQuery);
    const update = () => setAnimated(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const controlsOpacity = useTransform(() => chapterProgress(transfer.get(), [.38, .86]) * (1 - chapterProgress(departure.get(), [0, .32])));
  const controlsY = useTransform(departure, [0, .32], [0, -12]);
  const photoVisibility = useTransform(transfer, p => p >= 1 ? 'visible' : 'hidden');
  const syncPresentation = () => {
    if (shared?.enabled) engine.current?.setPresentation(transfer.get() >= 1, Math.min(1, scrollYProgress.get() / .06));
  };
  useMotionValueEvent(transfer, 'change', syncPresentation);
  useMotionValueEvent(departure, 'change', value => engine.current?.setDeparture(value));

  useMotionValueEvent(phase, 'change', value => {
    syncPresentation();
    engine.current?.setPosition(value);
    if (!ready || failed) {
      renderedPhase.set(value);
      setIndex(Math.max(0, Math.min(standpunten.length - 1, Math.round(value))));
    }
  });

  useEffect(() => {
    if (!animated || !near || !canvas.current) return;
    let cancelled = false;
    let instance: import('./depth-gallery/PortfolioEngine.js').PortfolioEngine | null = null;
    let resize: ResizeObserver | undefined;
    setReady(false);
    setFailed(false);
    setIndex(Math.max(0, Math.min(standpunten.length - 1, Math.round(phase.get()))));
    renderedPhase.set(phase.get());
    if (shared?.enabled) { shared.canvasReady.set(false); shared.canvasPresented.set(false); }
    const data = standpunten.map((item, i) => {
      const mood = moods[i]!;
      return { textureSrc: item.image, fallbackColor: mood.accent, accentColor: mood.accent,
        backgroundColor: mood.background, blob1Color: mood.blob1, blob2Color: mood.blob2,
        position: { x: mood.x, y: 0 }, label: { word: item.titel, color: mood.ink } };
    });
    import('./depth-gallery/PortfolioEngine.js').then(async ({ PortfolioEngine }) => {
      if (cancelled || !canvas.current) return;
      instance = new PortfolioEngine(canvas.current, data, (next: number) => {
        // Commit the whole caption before the matching WebGL frame is drawn.
        if (!cancelled) flushSync(() => setIndex(next));
      }, () => {
        if (!cancelled) {
          setFailed(true);
          shared?.canvasReady.set(false);
          shared?.canvasPresented.set(false);
        }
      }, { mapSource: innerWidth >= 1024 ? '/images/kaartoostende.webp' : undefined });
      instance.onPhase = (value: number) => { if (!cancelled) renderedPhase.set(value); };
      instance.onFirstFrame = () => {
        if (!cancelled) { setReady(true); if (shared?.enabled) shared.canvasReady.set(true); }
      };
      instance.onPresentationFrame = (presented: boolean) => {
        if (!cancelled && shared?.enabled) shared.canvasPresented.set(presented);
      };
      instance.gallery.desktopPlaneScale = .86;
      instance.gallery.mobileBreakpoint = 1023;
      instance.gallery.mobileXSpreadFactor = .1;
      const fit = () => {
        if (!instance || !canvas.current) return;
        const { clientWidth: width, clientHeight: height } = canvas.current;
        if (!width || !height) return;
        const ratio = width / height;
        instance.gallery.mobilePlaneScale = .94;
        const mobile = innerWidth < 1024;
        instance.gallery.planes.forEach((plane: { userData: { aspectRatio?: number; mobileScale?: number; desktopScale?: number; basePosition?: { x: number; y: number } } }, pointIndex: number) => {
          plane.userData.mobileScale = Math.min(.47, ratio * 4.14 / (3 * (plane.userData.aspectRatio || 1)) * .84);
          const fitted = fitStandpuntDesktop(width, height, plane.userData.aspectRatio || 1, moods[pointIndex]!.x > 0);
          plane.userData.desktopScale = fitted.scale;
          if (plane.userData.basePosition) {
            if (!mobile) plane.userData.basePosition.x = fitted.x;
            else plane.userData.basePosition.x = moods[pointIndex]!.x;
            plane.userData.basePosition.y = mobile ? (innerWidth >= 768 ? .45 : .64) : 0;
          }
        });
        instance.resize();
        const restingFrame = instance.getRestingImageFrame(0);
        if (shared?.enabled && restingFrame) shared.reportFrame(restingFrame);
      };
      instance.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
      instance.trail.configuration.responsiveSettings.mobileBreakpoint = 1023;
      instance.trail.configuration.responsiveSettings.mobileWidthScale = .25;
      resize = new ResizeObserver(fit);
      resize.observe(canvas.current);
      fit();
      engine.current = instance;
      instance.setDeparture(departure.get());
      instance.setPosition(phase.get());
      syncPresentation();
      instance.setEnabled(active.current);
      await instance.init();
      if (!cancelled) fit();
    }).catch(() => {
      instance?.dispose();
      if (!cancelled) { engine.current = null; setFailed(true); shared?.canvasReady.set(false); }
    });
    return () => {
      cancelled = true;
      resize?.disconnect();
      instance?.dispose();
      engine.current = null;
      shared?.canvasReady.set(false);
      shared?.canvasPresented.set(false);
    };
  }, [animated, near, phase, shared?.enabled]);

  useEffect(() => { syncPresentation(); engine.current?.setEnabled(animated && visible && !failed); }, [animated, visible, failed, ready, shared?.enabled]);

  const navigate = (next: number) => {
    if (!section.current || !animated) return;
    if (shared?.enabled) {
      shared.navigate(galleryStart + standpuntenDistance(standpunten.length) * standpuntProgress(next, standpunten.length));
      return;
    }
    const node = section.current;
    const top = scrollY + node.getBoundingClientRect().top;
    window.scrollTo({ top: top + (node.offsetHeight - innerHeight) * standpuntProgress(next, standpunten.length), behavior: 'smooth' });
  };
  const item = standpunten[index]!;
  const mood = moods[index]!;
  const imageOnRight = mood.x > 0;
  const frames = standpuntenDistance(standpunten.length) + 1;

  const controls = <>
        <motion.header inherit={false} initial={false} className="standpoints-header" style={{ opacity: controlsOpacity, y: controlsY }}>
          <h2 id={animated ? 'standpoints-heading' : undefined}>Speerpunten<span>.</span><motion.span inherit={false} initial={false} className="standpoints-light-title" aria-hidden="true" style={{ clipPath: titleInkMask }}>Speerpunten<span>.</span></motion.span></h2>
          <Link to="/standpunten">Alle standpunten <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></Link>
        </motion.header>
        <Link className={`standpoints-image-link ${imageOnRight ? 'standpoints-image-link--right' : ''}`} to={`/standpunten?p=${item.nummer}`} aria-label={`Lees het standpunt: ${item.titel}`} />
        <motion.div inherit={false} initial={false} className={`standpoints-copy ${imageOnRight ? 'standpoints-copy--left' : ''}`} style={{ opacity: controlsOpacity, y: controlsY }}>
            <article>
              <span className="standpoints-item-number">{item.nummer} <span>/ {String(standpunten.length).padStart(2, '0')}</span></span>
              <h3>{item.titel}</h3>
              <p>{item.kort}</p>
              <Link className="standpoints-read" to={`/standpunten?p=${item.nummer}`}>Lees het standpunt <ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></Link>
            </article>
        </motion.div>
        <motion.div inherit={false} initial={false} className="standpoints-bottom" style={{ opacity: controlsOpacity, y: controlsY }}>
          <a className="standpoints-skip" href="#home-news">Verder naar nieuws <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" /></a>
          <nav className="standpoints-controls" aria-label="Speerpunten doorlopen">
            <button type="button" onClick={() => navigate(index - 1)} disabled={index === 0} aria-label="Vorig speerpunt"><ArrowLeft size={19} strokeWidth={1.5} /></button>
            <div className="standpoints-chapters">{standpunten.map((point, i) => <button type="button" key={point.nummer} aria-label={`Toon speerpunt ${point.nummer}: ${point.titel}`} aria-current={index === i ? 'true' : undefined} onClick={() => navigate(i)}><span /></button>)}</div>
            <span className="standpoints-counter" role="status" aria-label={`Speerpunt ${index + 1} van ${standpunten.length}`}>{item.nummer} / {String(standpunten.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => navigate(index + 1)} disabled={index === standpunten.length - 1} aria-label="Volgend speerpunt"><ArrowRight size={19} strokeWidth={1.5} /></button>
          </nav>
        </motion.div>
  </>;

  return (
    <section ref={section} id={shared?.enabled ? 'home-standpunten-scene' : 'home-standpunten'} className={`standpoints ${animated ? 'standpoints--animated' : ''}`} style={animated && !shared?.enabled ? { height: `${frames * 100}svh` } : undefined} aria-labelledby="standpoints-heading" aria-hidden={shared?.enabled && !shared.galleryVisible ? true : undefined} inert={shared?.enabled && !shared.galleryVisible ? true : undefined} data-depth-ready={animated && ready && !failed} data-depth-index={index}>
      <motion.div inherit={false} initial={false} ref={stage} className="standpoints-stage" style={{ color: ink, backgroundColor: mood.background }}>
        <canvas ref={canvas} className="standpoints-canvas" aria-hidden="true" />
        {(!ready || failed) && shared?.enabled && <div className="standpoints-map-fallback" aria-hidden="true" />}
        <motion.div inherit={false} initial={false} className="standpoints-departure" style={{ scale: departingScale, y: departingY }}>
        {(!ready || failed) && <motion.div inherit={false} initial={false} className={`standpoints-poster ${imageOnRight ? 'standpoints-poster--right' : ''}`} style={{ scale: shared?.enabled ? 1 : fallbackScale, visibility: shared?.enabled ? photoVisibility : 'visible' }}><img src={item.image} alt="" /></motion.div>}
        </motion.div>
        {!shared?.enabled && controls}
      </motion.div>
      {shared?.enabled && shared.overlayHost.current && createPortal(
        <motion.div inherit={false} initial={false} className="standpoints standpoints-overlay" style={{ color: ink }} aria-hidden={!shared.galleryVisible ? true : undefined} inert={!shared.galleryVisible ? true : undefined}>{controls}</motion.div>, shared.overlayHost.current,
      )}
      <div className="standpoints-static">
        <header><h2 id={animated ? undefined : 'standpoints-heading'}>Speerpunten<span>.</span></h2><Link to="/standpunten">Alle standpunten <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link></header>
        <div className="standpoints-static-grid">{standpunten.map(point => <article key={point.nummer}><Link to={`/standpunten?p=${point.nummer}`}><img src={point.image} alt={point.titel} loading="lazy" /><div><span className="standpoints-item-number">{point.nummer} / 06</span><h3>{point.titel}</h3><p>{point.kort}</p><span className="standpoints-read">Lees het standpunt <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></span></div></Link></article>)}</div>
      </div>
    </section>
  );
}
