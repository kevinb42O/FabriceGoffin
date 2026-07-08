import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { SEO } from '../components/SEO';
import {
  CATEGORIES,
  TimelineFeed,
  catCfg,
} from '../components/TimelineFeed';
import { MagneticButton } from '../components/MagneticButton';
import { StaggerText } from '../components/StaggerText';
import { CategoryPicker } from '../components/CategoryPicker';
import type { TimelineCategory } from '../data/tijdlijn';

export default function Realisaties() {
  const [selected, setSelected] = useState<TimelineCategory | null>(null);
  const [previewKey, setPreviewKey] = useState<TimelineCategory>(
    CATEGORIES[0]!.key,
  );
  const reduceMotion = useReducedMotion();

  const activeCfg = selected ? catCfg(selected) : null;
  const previewCfg = catCfg(previewKey);

  const handleThemeChange = (newTheme: TimelineCategory | null) => {
    setSelected(newTheme);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedIdx = selected ? CATEGORIES.findIndex((c) => c.key === selected) : -1;
  const handlePrev = () => {
    if (selectedIdx !== -1) {
      handleThemeChange(CATEGORIES[(selectedIdx - 1 + CATEGORIES.length) % CATEGORIES.length]!.key);
    }
  };
  const handleNext = () => {
    if (selectedIdx !== -1) {
      handleThemeChange(CATEGORIES[(selectedIdx + 1) % CATEGORIES.length]!.key);
    }
  };

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
        description="Realisaties en projecten in de maak van Fabrice Goffin, opgedeeld per thema."
        url="/realisaties"
      />

      <section
        className="relative text-zinc-900 pt-32 md:pt-48 pb-24 md:pb-32 min-h-screen bg-zinc-50"
      >
        {/* Dynamic Elegant Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={previewCfg.panelImage}
              src={previewCfg.panelImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          {/* Lighter frosting: you can clearly see the image, but text remains readable */}
          <div className="absolute inset-0 bg-zinc-50/70 backdrop-blur-[12px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-start max-w-[1600px] mx-auto">
          {/* Always render picker, pass isCompact */}
          <motion.div 
            layout
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className={`flex flex-col items-center md:items-start shrink-0 xl:sticky xl:top-40 ${
              selected === null ? 'w-full' : ''
            }`}
          >
            <CategoryPicker
              onPick={handleThemeChange}
              onActiveChange={setPreviewKey}
              isCompact={selected !== null}
              activeKey={selected}
            />
            
            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 md:mt-16 w-full flex justify-center items-center gap-3 sm:gap-6"
                >
                  <motion.button
                    whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                    type="button"
                    onClick={handlePrev}
                    aria-label="Vorig thema"
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
                  </motion.button>

                  <MagneticButton>
                    <button
                      type="button"
                      onClick={() => handleThemeChange(null)}
                      className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-zinc-900 text-white rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-4 focus-visible:ring-zinc-400 shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:-translate-x-1" aria-hidden />
                      <span className="relative z-10 text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase mt-0.5">Ander Thema</span>
                      <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeCfg?.bg || 'bg-red-600'}`} />
                    </button>
                  </MagneticButton>

                  <motion.button
                    whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                    type="button"
                    onClick={handleNext}
                    aria-label="Volgend thema"
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
                  </motion.button>
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
                <div className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-black tracking-[-0.025em] leading-[1] text-zinc-900 min-h-[1.2em]">
                  {activeCfg?.displayLabel ? (
                    <motion.h1
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    >
                      {activeCfg.displayLabel}
                    </motion.h1>
                  ) : (
                    <StaggerText el="h1" text={activeCfg?.label || ''} delay={0.1} />
                  )}
                </div>

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
              <TimelineFeed filter={selected} />
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
