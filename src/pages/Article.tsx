import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { articles } from '../data/articles';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StaggerText } from '../components/StaggerText';
import { SEO } from '../components/SEO';

export default function Article() {
  const { slug } = useParams();
  const articleIndex = articles.findIndex(a => a.slug === slug);
  const article = articleIndex !== -1 ? articles[articleIndex] : null;

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex !== -1 && articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  if (!article) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-48 flex flex-col items-center justify-center bg-zinc-50">
          <h1 className="text-4xl font-medium uppercase text-zinc-900 mb-4 font-heading">Artikel niet gevonden</h1>
          <Link to="/nieuws" className="text-red-600 font-bold hover:underline">Terug naar Nieuws</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO 
        title={`${article.titel} — Fabrice Goffin`} 
        description={article.inhoud.slice(0, 150) + '...'} 
        image={article.image}
        url={`/nieuws/${article.slug}`}
        type="article"
      />
      <article className="min-h-screen pt-32 lg:pt-48 pb-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          
          <Link to="/nieuws" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-red-600 transition-colors w-max mb-12">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Terug naar overzicht
          </Link>

          <span className="inline-block px-3 py-1 bg-zinc-100 text-red-600 font-black text-xs uppercase tracking-widest rounded-sm mb-6">
            {article.datum}
          </span>

          <h1 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter leading-[0.9] text-zinc-900 mb-12 font-heading">
            <StaggerText text={article.titel} delay={0.1} />
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl mb-16 relative"
          >
            <img src={article.image} alt={article.titel} className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
            {/* Subtle Oostende watermark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-zinc max-w-none text-zinc-600 font-medium leading-relaxed"
          >
            {article.fullText.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? "text-xl md:text-2xl font-bold text-zinc-800 mb-8 leading-snug" : "mb-6"}>
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Previous/Next Navigation */}
          <div className="mt-24 pt-12 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            {prevArticle ? (
              <Link to={`/nieuws/${prevArticle.slug}`} className="group flex flex-col items-start text-left bg-zinc-50 p-6 sm:p-8 hover:bg-zinc-100 transition-colors rounded-2xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 group-hover:text-red-600 transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Vorig Artikel
                </span>
                <span className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2">{prevArticle.titel}</span>
              </Link>
            ) : <div className="hidden md:block"></div>}
            
            {nextArticle ? (
              <Link to={`/nieuws/${nextArticle.slug}`} className="group flex flex-col items-end text-right md:col-start-2 bg-zinc-50 p-6 sm:p-8 hover:bg-zinc-100 transition-colors rounded-2xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 group-hover:text-red-600 transition-colors flex items-center gap-2">
                  Volgend Artikel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2">{nextArticle.titel}</span>
              </Link>
            ) : <div className="hidden md:block"></div>}
          </div>

        </div>
      </article>
    </PageTransition>
  );
}
