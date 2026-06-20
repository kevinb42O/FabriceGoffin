import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { StaggerText } from './StaggerText';
import { standpunten } from '../data/standpunten';

/**
 * Mobile-only Speerpunten section — native horizontal swipe carousel.
 *
 * The desktop version pins a section for several viewports of vertical
 * scrolling to translate a horizontal track. On a touchscreen that pattern is
 * hostile: thumbs want to swipe sideways, not scroll three screens of nothing.
 *
 * This variant is a CSS scroll-snap carousel with image-rich cards, a live
 * pagination row, a "X van N" counter, and a swipe hint that auto-dismisses
 * after the first user interaction. Each card deep-links into the detail
 * page with `?p=<nummer>` so the matching drawer auto-opens.
 */

const items = standpunten.map((s) => ({
  nummer: s.nummer,
  titel: s.titel,
  tekst: s.kort,
  image: s.image,
}));

export function HomeStandpuntenMobile() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track scroll position to update pagination + dismiss the swipe hint.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      // Each card is one viewport-page wide; round-trip to nearest index.
      const cardWidth = el.clientWidth;
      if (cardWidth === 0) return;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIdx(Math.max(0, Math.min(items.length - 1, idx)));
      setHasInteracted(true);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Tap on a dot — scroll to that card.
  const goTo = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  }, []);

  // Subtle parallax on the section title as the user scrolls in.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-50 border-t border-zinc-200 py-20 lg:hidden overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-[2px] bg-red-600" />
          <span className="text-red-600 font-medium uppercase tracking-[0.22em] text-[10px]">
            Mijn programma
          </span>
        </motion.div>

        <motion.h2
          style={{ y: titleY }}
          className="text-[clamp(40px,11vw,68px)] font-black uppercase tracking-tighter text-zinc-900 leading-[0.85]"
        >
          <StaggerText text="Speerpunten" />
        </motion.h2>

        <p className="mt-4 text-zinc-600 font-medium leading-relaxed max-w-md">
          Zes prioriteiten waarmee ik Oostende sterker, slimmer en
          diervriendelijker maak. Swipe en tap voor het volledige standpunt.
        </p>
      </div>

      {/* Swipe track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollPaddingLeft: '1.5rem',
            scrollPaddingRight: '1.5rem',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Leading spacer keeps first card aligned with header gutter */}
          <div className="shrink-0 w-6" aria-hidden="true" />

          {items.map((item, i) => (
            <article
              key={item.nummer}
              className="snap-center shrink-0 w-[85vw] max-w-[420px] mr-4 last:mr-0"
            >
              <Link
                to={`/standpunten?p=${item.nummer}`}
                aria-label={`Lees meer over standpunt ${item.nummer}: ${item.titel}`}
                className="group block relative h-[480px] rounded-3xl overflow-hidden bg-zinc-900 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] active:scale-[0.99] transition-transform"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.titel}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient stack */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/15" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-600/15" />

                {/* Top-left number badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2.5">
                  <span className="text-red-400 font-black text-xs tracking-[0.25em]">
                    {item.nummer}
                  </span>
                  <div className="w-8 h-[2px] bg-red-500/80" />
                </div>

                {/* Top-right "lees meer" affordance */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Bottom content block */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3
                    className="text-white font-medium uppercase tracking-tight leading-[0.95] mb-3 break-words text-[clamp(19px,5.8vw,30px)]"
                  >
                    {item.titel}
                  </h3>
                  <p className="text-zinc-200 text-[15px] leading-relaxed font-medium">
                    {item.tekst}
                  </p>
                </div>
              </Link>
            </article>
          ))}

          {/* Trailing spacer */}
          <div className="shrink-0 w-6" aria-hidden="true" />
        </div>

        {/* Swipe hint — fades out after first scroll */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={
            hasInteracted
              ? { opacity: 0, x: 0 }
              : { opacity: 1, x: [0, 14, 0] }
          }
          transition={
            hasInteracted
              ? { duration: 0.4 }
              : { x: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }, opacity: { delay: 0.6, duration: 0.6 } }
          }
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/85 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
          aria-hidden="true"
        >
          Swipe
          <ArrowRight className="w-3 h-3" />
        </motion.div>
      </div>

      {/* Pagination row */}
      <div className="px-6 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {items.map((_, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ga naar speerpunt ${i + 1}`}
                aria-current={active ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'w-8 bg-red-600'
                    : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            );
          })}
        </div>

        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 tabular-nums">
          <span className="text-zinc-900">{String(activeIdx + 1).padStart(2, '0')}</span>
          <span className="mx-1.5 text-zinc-300">/</span>
          <span>{String(items.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 mt-10">
        <Link
          to="/standpunten"
          className="group flex items-center justify-between w-full h-14 px-6 rounded-full bg-zinc-900 text-white font-black uppercase tracking-widest text-[13px] active:scale-[0.98] transition-transform shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)]"
        >
          <span>Bekijk Alle Standpunten</span>
          <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 group-active:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}
