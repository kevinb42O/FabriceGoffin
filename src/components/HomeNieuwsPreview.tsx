import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { articles } from '../data/articles';
import { StaggerText } from './StaggerText';

export function HomeNieuwsPreview() {
  // Filter out 'regenbooghuis' and get top 8 articles
  const topArticles = articles
    .filter(article => !article.slug.includes('regenbooghuis') && !article.titel.toLowerCase().includes('regenboog'))
    .slice(0, 8);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of container width
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-white relative z-10 border-t border-zinc-100 overflow-hidden">
      <div className="layout-shell-wide relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">
                Actueel
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-tight text-zinc-900 font-heading">
              Laatste Nieuws
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              to="/nieuws" 
              className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-900 hover:text-red-600 transition-colors w-max"
            >
              Naar al het nieuws
              <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-50 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="lg:hidden flex items-center gap-2 mb-6 text-zinc-500 font-medium text-sm">
          <Hand className="w-4 h-4 animate-pulse" />
          <span>Swipe om meer te lezen</span>
        </div>

        {/* Horizontal Scroll Carousel with Side Navigation */}
        <div className="relative group/carousel">
          
          {/* Desktop Navigation Buttons (Absolute Sidebar) */}
          <button 
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute -left-5 xl:-left-10 top-[35%] -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl border border-zinc-100 items-center justify-center text-zinc-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 z-30"
            aria-label="Scroll links"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute -right-5 xl:-right-10 top-[35%] -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl border border-zinc-100 items-center justify-center text-zinc-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 z-30"
            aria-label="Scroll rechts"
          >
            <ChevronRight className="w-6 h-6 ml-0.5" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-10 pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-x-contain"
          >
          {topArticles.map((article, index) => (
             <motion.article 
               key={article.slug}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 * index, duration: 0.5 }}
               className="w-[85vw] sm:w-[350px] lg:w-[400px] min-[2400px]:w-[460px] shrink-0 snap-start h-full"
             >
               <Link to={`/nieuws/${article.slug}`} className="group flex flex-col h-full">
                 <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 relative bg-zinc-100">
                   <img 
                     src={article.image} 
                     alt={article.titel} 
                     className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                     loading="lazy" 
                   />
                 </div>

                 <div className="flex flex-col flex-1">
                   <div className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-3">
                     {article.datum}
                   </div>
                   <h3 className="text-xl lg:text-2xl font-medium tracking-tight leading-snug text-zinc-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-3 font-heading">
                     {article.titel}
                   </h3>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
                     {article.inhoud}
                   </p>
                   
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:text-red-600 transition-colors w-max mt-auto">
                     Lees artikel 
                     <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </div>
                 </div>
               </Link>
             </motion.article>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}
