import { motion } from 'motion/react';
import { ImageReveal } from './ImageReveal';

/**
 * Mobile-only gallery — clean stacked cards.
 *
 * Why this exists: the desktop gallery uses scroll-driven y-parallax
 * (`useTransform(scrollY, [500, 2000], [100, -100])`) that fights touch
 * scrolling and looks jittery on mid-tier phones. This variant drops the
 * parallax, gives both cards a strong dark overlay caption (the desktop
 * right card had no caption at all), and keeps the cinematic image-reveal.
 */
export function HomeGalleryMobile() {
  return (
    <section className="lg:hidden bg-white border-t border-zinc-100 py-16 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-8 h-[2px] bg-red-600" />
        <span className="text-red-600 font-medium uppercase tracking-[0.22em] text-[10px]">
          In de praktijk
        </span>
      </motion.div>

      <div className="flex flex-col gap-5">
        {/* Hero card — Centrum voor Dierenwelzijn */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)]"
        >
          <ImageReveal
            src="/images/asiel-render.webp"
            alt="Centrum voor Dierenwelzijn"
          />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="w-10 h-1 bg-red-500 mb-4" />
            <span className="text-red-400 font-medium uppercase tracking-[0.22em] text-[10px] mb-3 block">
              Toekomst
            </span>
            <h3 className="text-white text-2xl font-medium uppercase tracking-tight leading-[0.95]">
              Nieuw Centrum voor Dierenwelzijn
            </h3>
            <p className="text-zinc-300 mt-2 text-sm font-medium">
              Toekomstige visualisatie van het asiel
            </p>
          </div>
        </motion.article>

        {/* Secondary card — Werkbezoek */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)]"
        >
          <ImageReveal src="/images/werkbezoek.webp" alt="Werkbezoek" />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="w-10 h-1 bg-red-500 mb-4" />
            <span className="text-red-400 font-medium uppercase tracking-[0.22em] text-[10px] mb-3 block">
              Op het terrein
            </span>
            <h3 className="text-white text-2xl font-medium uppercase tracking-tight leading-[0.95]">
              Werkbezoek
            </h3>
            <p className="text-zinc-300 mt-2 text-sm font-medium">
              In gesprek met partners en bewoners
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
