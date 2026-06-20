import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Mobile-only hero — split layout (photo above, typography below on dark).
 *
 * Why this design over the previous full-bleed-with-text-overlay: portraits
 * always lose to typography on at least one phone size — text inevitably
 * lands on the face when both share the same viewport. The fix is to give
 * the photo a fixed proportional block at the top with a soft gradient bleed
 * into a zinc-950 content area below. Magazine-spread feel, zero overlap
 * risk across SE-to-Pro-Max viewports.
 *
 * No fake stats: the subtitle already names the three real portfolios
 * (Dierenwelzijn / Digitalisering / Ontmoeting), which is the credibility
 * marker that matters. "#1 dierenwelzijn" was filler.
 */
export function HomeHeroMobile() {
  const ref = useRef<HTMLDivElement>(null);

  // Subtle parallax on the photo as the user scrolls past.
  const { scrollY } = useScroll();
  const yPhoto = useTransform(scrollY, [0, 400], [0, 40]);
  const photoOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  return (
    <section
      ref={ref}
      className="relative w-full bg-zinc-950 text-white overflow-hidden lg:hidden flex flex-col min-h-dvh"
    >
      {/* Kaart van Oostende — geanimeerde achtergrond (ken-burns / drift), identiek aan footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'url(/images/kaartoostende.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(1px)',
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

      {/* Photo block — fixed proportional height, capped on tall phones.
          Sized generously so that the navbar (~60px fixed white strip) only
          occludes the very top of the frame; combined with object-position
          30% the face has comfortable headroom on every viewport. */}
      <motion.div
        style={{ y: yPhoto, opacity: photoOpacity }}
        className="relative w-full h-[60svh] min-h-[400px] max-h-[560px] shrink-0 overflow-hidden"
      >
        <img
          src="/images/ORIGINEELfabrice-hero.webp"
          alt="Fabrice Goffin"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[center_32%]"
        />

        {/* Top fade — denser near the navbar, then quickly feathered out */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(9, 9, 11, 0.58) 0%, rgba(9, 9, 11, 0.34) 42%, rgba(9, 9, 11, 0.14) 72%, rgba(9, 9, 11, 0) 100%)',
          }}
        />

        {/* Bottom transition stack — layered stops + vignette + slight diffusion for a premium blend */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(9, 9, 11, 0.99) 0%, rgba(9, 9, 11, 0.95) 22%, rgba(9, 9, 11, 0.82) 42%, rgba(9, 9, 11, 0.56) 62%, rgba(9, 9, 11, 0.24) 80%, rgba(9, 9, 11, 0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 85% at 50% 100%, rgba(9, 9, 11, 0.34) 0%, rgba(9, 9, 11, 0.18) 45%, rgba(9, 9, 11, 0.06) 68%, rgba(9, 9, 11, 0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none blur-[8px]"
          style={{
            background:
              'linear-gradient(to top, rgba(9, 9, 11, 0.58) 0%, rgba(9, 9, 11, 0) 100%)',
          }}
        />

        {/* Floating eyebrow on the photo — sits in the bottom-fade so it never collides with the face */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute left-6 right-6 bottom-6 flex items-center gap-3"
        >
          <div className="w-8 h-[2px] bg-red-500" />
          <span className="text-red-400 font-medium uppercase tracking-[0.22em] text-[10px] drop-shadow-md font-heading">
            Vooruit Plus — Oostende
          </span>
        </motion.div>
      </motion.div>

      {/* Content block — flex-1 so it takes the remaining viewport height */}
      <div
        className="relative z-10 flex-1 flex flex-col px-6 pt-7"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
      >
        {/* Headline — overflow-hidden mask drives the y-reveal */}
        <h1 className="font-medium tracking-tighter leading-[0.85] uppercase mb-5 font-heading">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block text-white text-[clamp(48px,14vw,80px)]"
            >
              IK BEN
            </motion.span>
          </span>
          <span className="block overflow-hidden -mt-1">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.36, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block text-red-500 text-[clamp(48px,14vw,80px)] drop-shadow-[0_2px_18px_rgba(220,38,38,0.25)]"
            >
              FABRICE
            </motion.span>
          </span>
        </h1>

        {/* Subtitle — the actual credibility marker (real portfolios, not invented stats) */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-zinc-300 text-[15px] leading-relaxed font-medium max-w-md font-heading"
        >
          Schepen van Oostende, bevoegd voor{' '}
          <span className="text-white font-bold border-b-2 border-red-500/60">
            Dierenwelzijn
          </span>
          ,{' '}
          <span className="text-white font-bold border-b-2 border-red-500/60">
            Digitalisering
          </span>{' '}
          en{' '}
          <span className="text-white font-bold border-b-2 border-red-500/60">
            Ontmoeting
          </span>
          .
        </motion.p>

        {/* CTAs — pinned to the bottom of available content space via mt-auto */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-auto pt-7 flex flex-col gap-2.5"
        >
          <Link
            to="/contact"
            className="group relative w-full h-[52px] rounded-full bg-red-600 text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)]"
          >
            Contacteer Mij
            <ArrowRight className="w-4 h-4 transition-transform group-active:translate-x-0.5" />
          </Link>
          <Link
            to="/over"
            className="w-full h-[52px] rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center active:scale-[0.98] transition-transform"
          >
            Over Fabrice
          </Link>
        </motion.div>

        {/* Scroll affordance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="flex items-center justify-center mt-5 text-zinc-500"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] font-heading">
              Scroll
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
