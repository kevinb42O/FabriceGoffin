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
      <SEO title="Nieuws — Fabrice Goffin" description="Volg de laatste ontwikkelingen en realisaties voor een diervriendelijk en digitaal Oostende." />
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

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[2px] bg-red-600"></div>
            <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Actueel</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-medium uppercase tracking-tighter leading-[0.85] text-zinc-900 drop-shadow-sm max-w-3xl">
              <StaggerText text="Nieuws & Updates" />
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-sm pl-0 md:pl-8 md:border-l-4 md:border-red-100"
            >
              <p className="text-zinc-600 font-medium text-lg leading-relaxed">
                Volg de laatste ontwikkelingen en realisaties voor een diervriendelijk en digitaal Oostende.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Featured Article Layout */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Link to={`/nieuws/${featuredArticle.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100 block">
              <div className="aspect-video lg:aspect-auto h-full overflow-hidden relative">
                <img src={featuredArticle.image} alt={featuredArticle.titel} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" fetchPriority="high" />
              </div>
              <div className="p-10 md:p-16 flex flex-col justify-center bg-white relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                <span className="inline-block px-3 py-1 bg-zinc-100 text-red-600 font-black text-xs uppercase tracking-widest rounded-sm mb-6 w-max">
                  Uitgelicht — {featuredArticle.datum}
                </span>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-none text-zinc-900 mb-6 group-hover:text-red-600 transition-colors">
                  {featuredArticle.titel}
                </h2>
                <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed mb-10 line-clamp-3 md:line-clamp-4">
                  {featuredArticle.inhoud}
                </p>
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:text-red-600 transition-colors w-max">
                  Lees artikel
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Grid for older articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleArticles.map((article, index) => (
               <motion.article 
                 key={article.slug}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 * index }}
                 className="h-full"
               >
                 <Link to={`/nieuws/${article.slug}`} className="group flex flex-col bg-white rounded-3xl border border-zinc-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                   <div className="aspect-[4/3] w-full overflow-hidden relative">
                     <img src={article.image} alt={article.titel} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-sm">
                       {article.datum}
                     </div>
                   </div>

                   <div className="p-8 flex flex-col flex-1">
                     <h3 className="text-xl font-medium tracking-tight leading-snug text-zinc-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                       {article.titel}
                     </h3>
                     <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
                       {article.inhoud}
                     </p>
                     
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-600 transition-colors w-max mt-auto">
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
