import { useState } from 'react';
import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { StaggerText } from '../components/StaggerText';
import { SEO } from '../components/SEO';

export default function Nieuws() {
  const [visibleCount, setVisibleCount] = useState(3);
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const otherArticles = featuredArticle ? articles.filter(a => a.slug !== featuredArticle.slug) : articles;
  const visibleArticles = otherArticles.slice(0, visibleCount);
  const canShowMore = visibleCount < otherArticles.length;

  if (!featuredArticle) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <h1>Geen artikelen gevonden</h1>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO 
        title="Nieuws — Fabrice Goffin" 
        description="Volg de laatste ontwikkelingen en realisaties voor een diervriendelijk en digitaal Oostende." 
        url="/nieuws"
      />
      <div className="min-h-screen pt-32 lg:pt-48 pb-24 bg-zinc-50 relative">

        {/* Subtle Watermark */}
        <div className="absolute top-24 left-0 w-full overflow-hidden pointer-events-none select-none">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[12vw] leading-none font-black text-zinc-200/50 whitespace-nowrap"
          >
            LAATSTE NIEUWS
          </motion.div>
        </div>

        <div className="layout-shell-wide mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[2px] bg-red-600"></div>
            <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Actueel</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h1 className="widescreen-display relative font-black uppercase tracking-tighter text-zinc-900 drop-shadow-sm font-heading flex flex-col w-max z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[120px] md:text-[180px] lg:text-[220px] text-red-600/15 -z-10 pointer-events-none select-none">
                <StaggerText text="&" delay={0.08} />
              </div>
              <StaggerText text="Nieuws" />
              <StaggerText text="Updates" delay={0.16} />
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md pl-0 md:pl-8 md:border-l-4 md:border-red-100"
            >
              <p className="text-zinc-600 font-medium text-lg leading-relaxed">
                Volg de laatste ontwikkelingen en realisaties voor een diervriendelijk en digitaal Oostende.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="layout-shell-wide">
          
          {/* Featured Article Layout */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 md:mb-32"
          >
            <Link to={`/nieuws/${featuredArticle.slug}`} className="group flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
              <div className="w-full lg:w-[55%] aspect-[4/3] overflow-hidden rounded-2xl md:rounded-[2rem] relative shrink-0 shadow-xl">
                <img src={featuredArticle.image} alt={featuredArticle.titel} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" fetchPriority="high" width={1000} height={700} />
              </div>
              <div className="w-full lg:w-[45%] flex flex-col justify-center editorial-measure">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[2px] bg-red-600"></div>
                  <span className="text-red-600 font-black text-xs uppercase tracking-[0.2em]">
                    Uitgelicht
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 mb-6 group-hover:text-red-600 transition-colors font-heading">
                  {featuredArticle.titel}
                </h2>
                <div className="text-zinc-400 text-sm font-black uppercase tracking-widest mb-6">
                  {featuredArticle.datum}
                </div>
                <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed mb-10 line-clamp-4">
                  {featuredArticle.inhoud}
                </p>
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:text-red-600 transition-colors w-max">
                  Lees artikel
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Minimal Grid for older articles */}
          <div className="catalog-grid gap-x-10 gap-y-16">
            {visibleArticles.map((article, index) => (
               <motion.article 
                 key={article.slug}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 * index }}
                 className="h-full"
               >
                 <Link to={`/nieuws/${article.slug}`} className="group flex flex-col h-full">
                   <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 relative">
                     <img src={article.image} alt={article.titel} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy" width={800} height={600} />
                   </div>

                   <div className="flex flex-col flex-1">
                     <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-3">
                       {article.datum}
                     </div>
                     <h3 className="text-2xl font-medium tracking-tight leading-snug text-zinc-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-3 font-heading">
                       {article.titel}
                     </h3>
                     <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
                       {article.inhoud}
                     </p>
                     
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:text-red-600 transition-colors w-max mt-auto">
                       Lees meer 
                       <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                     </div>
                   </div>
                 </Link>
               </motion.article>
            ))}
          </div>

          {canShowMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount(count => Math.min(count + 3, otherArticles.length))}
                className="group inline-flex items-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-red-600 hover:shadow-xl"
              >
                Toon meer nieuws
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}
