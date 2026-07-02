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
      // Minder hoge pin (250vh i.p.v. 450vh) zorgt ervoor dat het sneller scrollt en minder irritant is
      className="hidden lg:block relative h-[250vh] bg-zinc-50 border-t border-zinc-200 z-10"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8 shrink-0">
          <h2 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter text-zinc-900 font-heading">
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
              className="group flex-none relative w-[82vw] lg:w-[420px] xl:w-[460px] h-[480px] rounded-3xl overflow-hidden bg-zinc-900 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] active:scale-[0.99] transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <img
                src={item.image}
                alt={item.titel}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/15" />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-600/15" />

              <div className="absolute top-5 left-5 flex items-center gap-2.5">
                <span className="text-red-400 font-black text-xs tracking-[0.25em]">
                  {item.nummer}
                </span>
                <div className="w-8 h-[2px] bg-red-500/80" />
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white font-medium uppercase tracking-tight leading-[0.95] mb-3 break-words text-[clamp(22px,2.2vw,34px)] font-heading">
                  {item.titel}
                </h3>
                <p className="text-zinc-200 text-[17px] leading-relaxed font-medium font-heading">
                  {item.kort}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
