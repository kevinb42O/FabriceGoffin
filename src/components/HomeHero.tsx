import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { StaggerText } from './StaggerText';
import { MagneticButton } from './MagneticButton';

export function HomeHero() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 200]);
  const yWatermark = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
      <section className="hidden lg:flex relative min-h-screen pt-32 lg:pt-48 pb-24 px-6 md:px-12 lg:px-24 flex-col justify-center overflow-hidden bg-white">
        
        {/* Kaart van Oostende — geanimeerde achtergrond (ken-burns / drift), identiek aan footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage: 'url(/images/kaartoostende.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(0.5px)',
            }}
            animate={{
              scale: [1, 1.12, 1.06, 1],
              x: ['0%', '-2%', '2%', '0%'],
              y: ['0%', '1.5%', '-1.5%', '0%'],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Oostende Watermark */}
        <motion.div 
          style={{ y: yWatermark }}
          className="absolute top-12 left-0 w-[150vw] text-[25vw] leading-none font-black text-zinc-50 select-none z-0 pointer-events-none whitespace-nowrap overflow-visible opacity-80"
        >
          OOSTENDE OOSTENDE OOSTENDE
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
          
          {/* Typography Left */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Vooruit Plus — Oostende</span>
            </motion.div>
            
            <div className="flex flex-col mb-8 z-10 relative">
               <h1 className="text-[70px] md:text-[100px] lg:text-[130px] xl:text-[150px] font-medium tracking-tighter leading-none uppercase text-zinc-900 font-heading">
                 <StaggerText text="IK BEN" />
               </h1>
               <span className="text-[70px] md:text-[100px] lg:text-[130px] xl:text-[150px] font-medium tracking-tighter leading-none uppercase text-red-600 drop-shadow-sm -mt-2 lg:-mt-6 block font-heading" aria-hidden="true">
                 <StaggerText text="FABRICE" delay={0.2} />
               </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 400, damping: 30 }}
              className="mt-8 lg:mt-12 max-w-lg"
            >
              <p className="text-lg md:text-2xl text-zinc-700 leading-relaxed font-medium mb-10">
                Ik ben een Oostendse ondernemer met een groot hart voor dieren. Sinds eind 2024 ben ik Schepen bevoegd voor <span className="text-zinc-900 font-bold border-b-2 border-red-200">Dierenwelzijn</span>, <span className="text-zinc-900 font-bold border-b-2 border-red-200">Digitalisering</span> en <span className="text-zinc-900 font-bold border-b-2 border-red-200">Ontmoeting</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <MagneticButton>
                  <Link 
                    to="/over" 
                    className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black uppercase tracking-widest text-sm rounded-full transition-colors duration-300 text-center block"
                  >
                    Over Fabrice
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link 
                    to="/contact" 
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-full transition-colors duration-300 text-center shadow-lg hover:shadow-red-600/30 block"
                  >
                    Contacteer Mij
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Vertical Context Label */}
          <aside className="hidden lg:flex lg:col-span-1 items-center justify-center relative z-10">
             <div className="absolute top-1/2 -translate-y-1/2">
               <p className="rotate-90 whitespace-nowrap text-[12px] font-black tracking-[0.4em] text-zinc-300 uppercase">
                 Oostende — 2024 / 2030
               </p>
             </div>
          </aside>

          {/* Photo Right */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
             style={{ y: yHero }}
             className="lg:col-span-5 flex items-center justify-center mt-12 lg:mt-0 relative px-6 md:px-0"
          >
             <div className="relative w-full aspect-[4/5] object-cover bg-zinc-100 shadow-2xl overflow-hidden rounded-sm">
               <img 
                 src="/images/ORIGINEELfabrice-hero.webp" 
                 alt="Fabrice Goffin"
                 className="w-full h-full object-cover object-[43%_center] transition-all duration-700 hover:scale-105" 
                 fetchPriority="high"
               />
             </div>
          </motion.div>
        </div>
      </section>
  );
}
