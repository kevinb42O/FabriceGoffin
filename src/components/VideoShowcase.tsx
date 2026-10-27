import { motion, useScroll, useTransform, useInView, useReducedMotion, useMotionValue, type MotionValue, type MotionStyle } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './VideoShowcase.css';

const slides = [
  {
    id: 'digitale_zoo',
    image: '/images/zoo-cinema.webp',
    title1: 'De Digitale',
    title2: 'Zoo',
    description: 'Een unieke belevenis in het Kursaal waar technologie en dierenwelzijn hand in hand gaan. Wandel tussen indrukwekkende olifanten of zwem met walvissen, zonder één dier uit zijn natuurlijke leefomgeving te halen.',
    link: '/realisaties#dw-l-1',
    action: 'Bekijk de realisatie',
    video: '/videos/zoo_compressed.mp4',
    label: 'Digitale Zoo',
    aspect: '9 / 16',
    ratio: .5625,
  },
  {
    id: 'gemeenteraad',
    image: '/images/gemeenteraad.webp',
    title1: 'Actie in de',
    title2: 'Gemeenteraad',
    description: "Bekijk mijn recentste tussenkomsten en debatten over de thema’s die Oostende en haar bewoners aanbelangen.",
    link: '/nieuws',
    action: 'Bekijk het nieuws',
    video: '/videos/gemeenteraad.mp4',
    label: 'Gemeenteraad',
    aspect: '4 / 5',
    ratio: .8,
  },
];

export function VideoShowcase({ departure, departureEnabled = false, surface }: { departure?: MotionValue<number>; departureEnabled?: boolean; surface?: MotionValue<string> }) {
  const still = useMotionValue(0);
  const exit = useTransform(() => departureEnabled ? (departure ?? still).get() : 0);
  const exitScale = useTransform(exit, [0, .58], [1, .94]);
  const exitY = useTransform(exit, [0, .58], [0, -24]);
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const film = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const near = useInView(root, { margin: '600px 0px', once: true });
  const visible = useInView(root, { amount: .35 });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playback, setPlayback] = useState<'auto' | 'paused' | 'playing'>('auto');
  const slide = slides[index]!;
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'start start'] });
  const aperture = useTransform(scrollYProgress, [0, .92], ['inset(4% 7% 4% 7% round 28px)', 'inset(0% 0% 0% 0% round 0px)']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const copyY = useTransform(scrollYProgress, [.15, .92], [52, 0]);
  const copyOpacity = useTransform(scrollYProgress, [.18, .7], [.25, 1]);
  const filmY = useTransform(scrollYProgress, [0, .92], [72, 0]);
  const filmRotate = useTransform(scrollYProgress, [0, .92], [-3, 0]);

  const select = (next: number) => {
    const target = (next + slides.length) % slides.length;
    if (target === index) return;
    film.current?.pause();
    setIndex(target);
    setPlaying(false);
    setBuffering(false);
    setFailed(false);
    setPlayback('auto');
  };

  // Keep one decoder active. User pause and reduced motion take precedence over autoplay.
  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const sync = () => {
      if (visible && (!reduced || playback === 'playing') && playback !== 'paused' && !document.hidden) {
        void video.play().catch(() => { setPlaying(false); setBuffering(false); });
      } else video.pause();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => { document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, [visible, reduced, playback, index, near]);

  const togglePlay = () => {
    const video = film.current;
    if (!video || failed) return;
    if (video.paused) {
      setPlayback('playing');
      void video.play().catch(() => setBuffering(false));
    } else {
      setPlayback('paused');
      video.pause();
    }
  };

  return (
    <motion.section inherit={false} initial={false} ref={root} id="home-films" className="home-cinema" style={{ backgroundColor: surface }} aria-labelledby="cinema-heading">
      <motion.div inherit={false} initial={false} className="cinema-surface" style={{ clipPath: reduced ? undefined : aperture, scale: reduced ? 1 : exitScale, y: reduced ? 0 : exitY, transformOrigin: '50% 100%' }}>
        <motion.div inherit={false} initial={false} className="cinema-atmosphere" style={{ scale: reduced ? 1 : imageScale }} aria-hidden="true">
          <img src={slide.image} alt="" loading="lazy" />
        </motion.div>
        <div className="cinema-shade" aria-hidden="true" />

        <div className="cinema-layout">
          <motion.div inherit={false} initial={false} className="cinema-film-column" style={{ '--film-ratio': slide.ratio, ...(reduced ? {} : { y: filmY, rotate: filmRotate }) } as MotionStyle}>
            <div className="cinema-player" style={{ aspectRatio: slide.aspect }} onTouchStart={event => { touchStart.current = { x: event.touches[0]?.clientX ?? 0, y: event.touches[0]?.clientY ?? 0 }; }} onTouchEnd={event => {
              const distance = (event.changedTouches[0]?.clientX ?? touchStart.current.x) - touchStart.current.x;
              const vertical = (event.changedTouches[0]?.clientY ?? touchStart.current.y) - touchStart.current.y;
              if (Math.abs(distance) > 60 && Math.abs(distance) > Math.abs(vertical)) select(index + (distance < 0 ? 1 : -1));
            }}>
              <video key={slide.id} ref={film} src={near ? slide.video : undefined} poster={slide.image}
                className="cinema-video" playsInline muted={muted} preload={near ? 'metadata' : 'none'}
                aria-label={slide.label}
                onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
                onPlaying={() => { setBuffering(false); setPlaying(true); }}
                onWaiting={() => setBuffering(true)} onCanPlay={() => setBuffering(false)}
                onError={() => { setFailed(true); setBuffering(false); setPlaying(false); }}
                onEnded={() => select(index + 1)}
              />
              <button className="cinema-play-surface" type="button" onClick={togglePlay} disabled={failed}
                aria-label={playing ? 'Video pauzeren' : 'Video afspelen'}>
                {!playing && !buffering && !failed && <span className="cinema-play-icon"><Play size={28} fill="currentColor" strokeWidth={1.5} /></span>}
                {buffering && !failed && <Loader2 size={32} className="cinema-loading" />}
              </button>
              {failed && <p className="cinema-error" role="status">De video kan niet worden geladen. Open de link voor meer informatie.</p>}
              <div className="cinema-player-controls">
                <button type="button" onClick={togglePlay} disabled={failed} aria-label={playing ? 'Video pauzeren' : 'Video afspelen'}>
                  {playing ? <Pause size={17} /> : <Play size={17} />}<span>{playing ? 'Pauzeren' : 'Afspelen'}</span>
                </button>
                <button type="button" onClick={() => setMuted(value => !value)} aria-label={muted ? 'Geluid inschakelen' : 'Geluid uitschakelen'} aria-pressed={!muted}>
                  {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>
              </div>
            </div>
            <div className="cinema-film-caption"><span>{slide.label}</span><span>Oostende</span></div>
          </motion.div>

          <motion.div inherit={false} initial={false} className="cinema-editorial" style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
            <div className="cinema-copy" key={slide.id}>
              <h2 id="cinema-heading" className={index === 1 ? 'cinema-heading--long' : undefined}>
                <span className="cinema-title-lead">{slide.title1}</span>
                <span className="cinema-title-main">{slide.title2}<span className="cinema-title-dot">.</span></span>
              </h2>
              <p>{slide.description}</p>
              <Link className="cinema-link" to={slide.link}>{slide.action}<ArrowUpRight size={22} strokeWidth={1.5} /></Link>
            </div>
            <nav className="cinema-chapters" aria-label="Kies een video">
              <button className="cinema-arrow" type="button" aria-label="Vorige video" onClick={() => select(index - 1)}><ArrowLeft size={19} strokeWidth={1.5} /></button>
              <div className="cinema-chapter-list">{slides.map((item, chapter) => <button type="button" key={item.id} aria-current={index === chapter ? 'true' : undefined} onClick={() => select(chapter)}>{item.label}</button>)}</div>
              <button className="cinema-arrow" type="button" aria-label="Volgende video" onClick={() => select(index + 1)}><ArrowRight size={19} strokeWidth={1.5} /></button>
            </nav>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
