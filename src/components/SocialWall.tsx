import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue, type MotionStyle } from 'motion/react';
import { useLayoutEffect, useRef, useSyncExternalStore, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { instagramPosts } from '../data/instagram';
import { contact } from '../data/contact';
import './SocialWall.css';

const photographs = [
  { post: 0, left: 3.5, top: 9, width: 20, height: 25, rotate: -9 },
  { post: 13, left: 77, top: 12, width: 18, height: 27, rotate: 9 },
  { post: 5, left: 3, top: 65, width: 23, height: 27, rotate: -6 },
  { post: 15, left: 77, top: 66, width: 20, height: 28, rotate: 8 },
  { post: 1, left: 39, top: 79, width: 22, height: 29, rotate: -4 },
];

const mobilePhotographs = [
  { post: 0, left: 6, top: 10, width: 30, height: 22, rotate: -9 },
  { post: 13, left: 66, top: 12, width: 28, height: 22, rotate: 9 },
  { post: 5, left: 4, top: 69, width: 30, height: 22, rotate: -6 },
  { post: 15, left: 68, top: 68, width: 28, height: 22, rotate: 8 },
  { post: 1, left: 38, top: 78, width: 26, height: 18, rotate: -4 },
];
const subscribeMobile = (callback: () => void) => {
  const media = matchMedia('(max-width: 1023px)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

function Photograph({ item, progress, mobile = false }: { item: typeof photographs[number]; progress: MotionValue<number>; mobile?: boolean }) {
  const x = useTransform(progress, [mobile ? .12 : .3, mobile ? .78 : 1], [`${50 - item.left - item.width / 2}vw`, '0vw']);
  const y = useTransform(progress, [mobile ? .12 : .3, mobile ? .78 : 1], [`${80 - item.top - item.height / 2}svh`, '0svh']);
  const rotate = useTransform(progress, [mobile ? .12 : .3, mobile ? .78 : 1], [item.rotate * -.3, item.rotate]);
  const scale = useTransform(progress, [mobile ? .12 : .3, mobile ? .78 : 1], [.72, 1]);
  return <motion.figure inherit={false} initial={false} className="social-photograph"
    style={{ '--photo-left': `${item.left}%`, '--photo-top': `${item.top}%`, '--photo-width': `${item.width}%`, '--photo-height': `${item.height}%`, x, y, rotate, scale } as MotionStyle}>
    <img src={instagramPosts[item.post]!.image} alt="" loading="lazy" decoding="async" />
  </motion.figure>;
}

function ContactInvitation({ animated }: { animated: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'start start'] });
  const progress = useMotionValue(1);
  useMotionValueEvent(scrollYProgress, 'change', value => progress.set(animated ? value : 1));
  useLayoutEffect(() => { progress.set(animated ? scrollYProgress.get() : 1); }, [animated, progress, scrollYProgress]);
  const y = useTransform(progress, [0, .8], [32, 0]);
  const opacity = useTransform(progress, [.08, .68], [.5, 1]);

  return <div ref={root} className="social-invitation-surface" onFocusCapture={() => {
    if (animated && scrollYProgress.get() < 1) root.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }}>
    <motion.div inherit={false} initial={false} className="social-invitation" style={{ y, opacity }}>
      <div><h3>Spreek me<br />gerust aan<span>.</span></h3><p>Hebt u een vraag, een idee of een bezorgdheid?<br />Mijn kabinet staat open.</p></div>
      <Link className="social-contact" to="/contact"><span>Neem contact op</span><span className="social-contact-arrow"><ArrowUpRight strokeWidth={1} aria-hidden="true" /></span></Link>
    </motion.div>
  </div>;
}

export function SocialWall({ sceneRef, progress, animated = false, surface }: { sceneRef?: RefObject<HTMLDivElement | null>; progress?: MotionValue<number>; animated?: boolean; surface: MotionValue<string> }) {
  const mobile = useSyncExternalStore(subscribeMobile, () => matchMedia('(max-width: 1023px)').matches, () => false);
  const complete = useMotionValue(1);
  const position = progress ?? complete;
  const titleY = useTransform(position, [.18, .88], [42, 0]);
  const titleScale = useTransform(position, [.18, .88], [1.06, 1]);
  const titleOpacity = useTransform(position, mobile ? [.62, .86] : [.12, .48], mobile ? [0, 1] : [.15, 1]);
  return <section id="home-social" className={`social-finale ${animated ? 'social-finale--animated' : ''}`} aria-labelledby="social-heading">
    <div className="social-introduction-shell" onFocusCapture={() => {
      const node = sceneRef?.current;
      if (animated && node && (position.get() < 1 || node.getBoundingClientRect().bottom < innerHeight - 1)) window.scrollTo({ top: scrollY + node.getBoundingClientRect().top + node.offsetHeight - innerHeight, behavior: 'instant' });
    }}>
      <div ref={sceneRef} className="social-introduction" aria-hidden="true" />
      <motion.div inherit={false} initial={false} className="social-stage" style={{ backgroundColor: surface }}>
        <div className="social-photographs" aria-hidden="true">{(mobile ? mobilePhotographs : photographs).map(item => <Photograph key={item.post} item={item} progress={position} mobile={mobile} />)}</div>
        <motion.div inherit={false} initial={false} className="social-intro-copy" style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}>
          <h2 id="social-heading"><span>Oostende.</span><span>Van dichtbij.</span></h2>
          <a className="social-follow" href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Volg @goffinfabrice op Instagram (opent in een nieuw tabblad)">
            <Instagram size={19} strokeWidth={1.5} /><span>@goffinfabrice</span><ArrowUpRight size={20} strokeWidth={1.5} />
          </a>
        </motion.div>
      </motion.div>
    </div>

    <ContactInvitation animated={animated} />
  </section>;
}
