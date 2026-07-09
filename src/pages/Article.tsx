import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { articles } from '../data/articles';
import { ArrowLeft, ArrowRight, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';
import { StaggerText } from '../components/StaggerText';
import { SEO } from '../components/SEO';

export default function Article() {
  const { slug } = useParams();
  const articleIndex = articles.findIndex(a => a.slug === slug);
  const article = articleIndex !== -1 ? articles[articleIndex] : null;

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex !== -1 && articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  // Haal de 3 meest recente artikelen op voor de sidebar (exclusief het huidige artikel)
  const recentArticles = articles.filter(a => a.slug !== slug).slice(0, 3);

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

  // Helper for social sharing
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.fabricegoffin.be';
  const shareUrl = `${siteUrl}/nieuws/${article.slug}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(article.titel);

  return (
    <PageTransition>
      <SEO 
        title={`${article.titel} — Fabrice Goffin`} 
        description={article.inhoud.slice(0, 150) + '...'} 
        image={article.image}
        url={`/nieuws/${article.slug}`}
        type="article"
      />
      <article className="min-h-screen pt-24 lg:pt-32 pb-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
          
          {/* Breadcrumb Navigation */}
          <Link to="/nieuws" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-red-600 transition-colors w-max mb-12 lg:mb-20">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Terug naar overzicht
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 xl:col-span-8">
              
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 font-black text-xs uppercase tracking-widest rounded-sm mb-6">
                  <Clock className="w-3 h-3" />
                  {article.datum}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-medium uppercase tracking-tighter leading-[0.95] text-zinc-900 font-heading">
                  <StaggerText text={article.titel} delay={0.1} />
                </h1>
              </div>

              {/* Author & Share Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-zinc-100 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden border-2 border-white shadow-sm">
                    <img src="/images/ORIGINEELfabrice-hero.webp" alt="Fabrice Goffin" className="w-full h-full object-cover object-[center_top]" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900 text-sm uppercase tracking-wide">Fabrice Goffin</div>
                    <div className="text-zinc-500 text-xs uppercase tracking-widest">Schepen</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Deel dit artikel</span>
                  <div className="flex items-center gap-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-600 hover:bg-[#1877F2] hover:text-white transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-600 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-600 hover:bg-[#0A66C2] hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Hero Image */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full rounded-3xl overflow-hidden mb-16 relative bg-zinc-50 flex items-center justify-center border border-zinc-100"
              >
                <img src={article.image} alt={article.titel} className="w-full h-auto max-h-[75vh] object-contain" loading="lazy" />
              </motion.div>

              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg prose-zinc max-w-none text-zinc-700 font-medium leading-relaxed"
              >
                {article.fullText.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "text-2xl md:text-3xl font-bold text-zinc-900 mb-10 leading-snug" : "mb-6 text-[17px] md:text-lg"}>
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Previous/Next Navigation */}
              <div className="mt-20 pt-10 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                {prevArticle ? (
                  <Link to={`/nieuws/${prevArticle.slug}`} className="group flex flex-col items-start text-left bg-zinc-50 p-6 sm:p-8 hover:bg-zinc-100 transition-colors rounded-3xl border border-zinc-100 hover:border-zinc-200">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 group-hover:text-red-600 transition-colors flex items-center gap-2">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Vorig Artikel
                    </span>
                    <span className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 font-heading">{prevArticle.titel}</span>
                  </Link>
                ) : <div className="hidden md:block"></div>}
                
                {nextArticle ? (
                  <Link to={`/nieuws/${nextArticle.slug}`} className="group flex flex-col items-end text-right md:col-start-2 bg-zinc-50 p-6 sm:p-8 hover:bg-zinc-100 transition-colors rounded-3xl border border-zinc-100 hover:border-zinc-200">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 group-hover:text-red-600 transition-colors flex items-center gap-2">
                      Volgend Artikel <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 font-heading">{nextArticle.titel}</span>
                  </Link>
                ) : <div className="hidden md:block"></div>}
              </div>

            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 xl:col-span-4 hidden lg:block">
              <div className="sticky top-32">
                <div className="mb-8 flex items-center gap-4">
                  <div className="w-8 h-[2px] bg-red-600"></div>
                  <h3 className="text-red-600 font-bold uppercase tracking-[0.15em] text-sm">Lees ook</h3>
                </div>

                <div className="flex flex-col gap-6">
                  {recentArticles.map((recent) => (
                    <Link key={recent.slug} to={`/nieuws/${recent.slug}`} className="group flex flex-col bg-white rounded-3xl border border-zinc-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="aspect-[16/10] w-full overflow-hidden relative bg-zinc-50">
                        <img src={recent.image} alt={recent.titel} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-zinc-900 text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded-sm">
                          {recent.datum}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col">
                        <h4 className="text-[17px] font-medium tracking-tight leading-snug text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-3 font-heading mb-4">
                          {recent.titel}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-600 transition-colors w-max mt-auto">
                          Lees meer 
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Call to Action in sidebar */}
                <div className="mt-10 bg-zinc-900 rounded-3xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <h4 className="text-white font-heading font-medium text-2xl uppercase leading-none mb-4">Blijf op de hoogte</h4>
                  <p className="text-zinc-400 text-sm mb-6 font-medium">Mis geen enkele update over de visie en realisaties in Oostende.</p>
                  <Link to="/contact" className="inline-flex items-center justify-center w-full bg-white text-zinc-900 font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-red-600 hover:text-white transition-colors">
                    Contacteer Fabrice
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </article>
    </PageTransition>
  );
}
