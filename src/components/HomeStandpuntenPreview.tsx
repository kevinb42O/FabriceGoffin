import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { StaggerText } from './StaggerText';
import { MagneticButton } from './MagneticButton';
import { standpunten } from '../data/standpunten';

export function HomeStandpuntenPreview() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Map vertical scroll progress to horizontal translation of the card track.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['calc(0% - 0vw)', 'calc(-100% + 100vw)']);

  return (
    <section
      ref={targetRef}
      // 6 cards instead of 4: pin a bit longer so the horizontal scroll feels paced, not sprinted.
      className="hidden lg:block relative h-[450vh] bg-zinc-50 border-t border-zinc-200 z-10"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8 shrink-0">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900">
            <StaggerText text="Speerpunten" />
          </h2>
          <MagneticButton>
            <Link
              to="/standpunten"
              className="group flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-red-600 hover:text-zinc-900 transition-colors w-max"
            >
              Bekijk Alles
              <div className="w-12 h-[2px] bg-red-600 transition-all group-hover:w-24 group-hover:bg-zinc-900"></div>
            </Link>
          </MagneticButton>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-6 px-6 md:px-12 lg:px-24 w-max shrink-0"
        >
          {standpunten.map((item) => (
            <Link
              key={item.nummer}
              to={`/standpunten?p=${item.nummer}`}
              aria-label={`Lees meer over standpunt ${item.nummer}: ${item.titel}`}
              className="group flex-none w-[85vw] md:w-[460px] flex flex-col bg-white p-12 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-500 relative cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500"></div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-black uppercase tracking-widest text-red-600">
                  {item.nummer}
                </span>
                <span className="w-10 h-10 rounded-full bg-zinc-100 group-hover:bg-zinc-900 text-zinc-500 group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tight text-zinc-900 mb-6 pr-4 leading-[0.95]">
                {item.titel}
              </h3>
              <p className="text-zinc-600 text-lg leading-relaxed mb-6 flex-1 font-medium">
                {item.kort}
              </p>

              <span className="mt-auto inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 group-hover:text-red-600 transition-colors">
                Lees meer
                <span className="w-8 h-[2px] bg-zinc-900 group-hover:bg-red-600 group-hover:w-14 transition-all"></span>
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
