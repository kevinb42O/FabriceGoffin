import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { SEO } from '../components/SEO';
import {
  CATEGORIES,
  HorizontalTimeline,
  catCfg,
} from '../components/HorizontalTimeline';
import { CategoryPicker } from '../components/CategoryPicker';
import type { TimelineCategory } from '../data/tijdlijn';

export default function Tijdlijn() {
  const [selected, setSelected] = useState<TimelineCategory | null>(null);
  const [previewKey, setPreviewKey] = useState<TimelineCategory>(
    CATEGORIES[0]!.key,
  );
  const reduceMotion = useReducedMotion();

  const activeCfg = selected ? catCfg(selected) : null;
  const previewCfg = catCfg(previewKey);

  // Preload the other panel images so hover swaps are instant.
  useEffect(() => {
    CATEGORIES.forEach((c) => {
      const img = new Image();
      img.src = c.panelImage;
    });
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Realisaties — Fabrice Goffin"
        description="Realisaties en projecten in de maak van Fabrice Goffin, opgedeeld per bevoegdheid."
        url="/tijdlijn"
      />

      <section
        className="relative bg-white text-zinc-900 pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden"
      >
        {/* Eyebrow */}
        <div className="relative z-10 px-4 md:px-12 max-w-5xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-red-600" aria-hidden />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-red-600">
              Bevoegdheden
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-start max-w-[1600px] mx-auto">
          {/* Always render picker, pass isCompact */}
          <motion.div 
            layout
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className={`flex flex-col items-center md:items-start shrink-0 ${
              selected === null ? 'w-full' : ''
            }`}
          >
            <CategoryPicker
              onPick={setSelected}
              onActiveChange={setPreviewKey}
              isCompact={selected !== null}
            />
            
            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 md:mt-16 w-full flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-zinc-900 text-white rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-4 focus-visible:ring-zinc-400"
                  >
                    <ArrowLeft className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-1" aria-hidden />
                    <span className="relative z-10 text-[11px] font-black tracking-[0.25em] uppercase mt-0.5">Andere Bevoegdheid</span>
                    <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeCfg?.bg || 'bg-red-600'}`} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─────────────── TIMELINE STATE ─────────────── */}
          <AnimatePresence mode="popLayout">
            {selected !== null && (
              <motion.div
                layout
                key={`timeline-${selected}`}
                className="flex-1 min-w-0 xl:pl-8 mt-16 xl:mt-0"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: 40, filter: 'blur(8px)' }
                }
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, filter: 'blur(8px)' }}
                transition={{ type: "spring", bounce: 0, duration: 0.8, delay: 0.1 }}
              >
              <header className="px-4 md:px-12 mb-10 md:mb-14 max-w-5xl">
                {/* Title — animates in */}
                <motion.h1
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-black tracking-[-0.025em] leading-[1] text-zinc-900"
                >
                  {activeCfg?.label}
                </motion.h1>

                <motion.div
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className={`mt-5 h-[3px] w-20 origin-left ${activeCfg?.bg}`}
                  aria-hidden
                />

                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="mt-5 max-w-xl text-base text-zinc-600 leading-relaxed"
                >
                  Realisaties en projecten in de maak. Klik op een kaart voor
                  meer informatie.
                </motion.p>
              </header>

              {/* Timeline itself plays its own staged buildup on mount */}
              <HorizontalTimeline filter={selected} />
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
