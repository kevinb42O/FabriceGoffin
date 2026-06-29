import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, Rocket, Link2, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { StaggerText } from '../components/StaggerText';
import { SEO } from '../components/SEO';
import FocusTrap from 'focus-trap-react';

import { standpunten } from '../data/standpunten';

export default function Standpunten() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedStandpunt, setSelectedStandpunt] = useState<number | null>(null);

  // Deep-link support: /standpunten?p=03 auto-opens the matching drawer.
  // Re-runs when the query string changes so navigating between cards on the
  // home page (without unmounting this route) still works.
  useEffect(() => {
    const p = searchParams.get('p');
    if (!p) return;
    const idx = standpunten.findIndex((s) => s.nummer === p);
    if (idx >= 0) {
      setActiveIndex(idx);
      setSelectedStandpunt(idx);
    }
  }, [searchParams]);

  // Preload images to prevent blank flashes on hover
  useEffect(() => {
    standpunten.forEach((punt) => {
      const img = new Image();
      img.src = punt.image;
    });
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedStandpunt !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedStandpunt]);

  // Closing the drawer also clears the `?p=` deep-link param so the URL
  // reflects the current UI state and reopening the page on home works clean.
  const closeDrawer = () => {
    setSelectedStandpunt(null);
    if (searchParams.has('p')) {
      const next = new URLSearchParams(searchParams);
      next.delete('p');
      setSearchParams(next, { replace: true });
    }
  };

  return (
    <PageTransition>
      <SEO 
        title="Standpunten — Fabrice Goffin" 
        description="Ontdek de speerpunten en standpunten van Fabrice Goffin voor een diervriendelijker en digitaler Oostende." 
        url="/standpunten"
      />
      <div className="min-h-screen relative overflow-hidden flex flex-col bg-zinc-50">
        
        {/* Full Width Dynamic Background */}
        <div className="absolute inset-0 z-0">
           <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={standpunten[activeIndex]!.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover object-[50%_20%] absolute top-0 left-0"
                alt={standpunten[activeIndex]!.titel}
                loading="eager"
                fetchPriority="high"
              />
           </AnimatePresence>
           
           {/* Elegant premium gradient on the left for text readability */}
           <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-zinc-50 via-zinc-50/95 to-transparent pointer-events-none"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24 flex-1 flex flex-col justify-center">
           <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              
              {/* Title Column */}
              <div className="lg:col-span-6 lg:sticky lg:top-40 flex flex-col justify-center">
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex items-center gap-4 mb-8"
                 >
                    <div className="w-12 h-[3px] bg-red-600"></div>
                    <p className="text-red-600 font-black uppercase tracking-[0.2em] text-sm md:text-base drop-shadow-sm">
                       Onze visie in actie
                    </p>
                 </motion.div>
                 
                 <motion.h1 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-5xl md:text-7xl lg:text-[70px] xl:text-[85px] font-black tracking-tighter leading-[0.85] uppercase drop-shadow-sm flex flex-col"
                 >
                   <span className="text-zinc-900 block overflow-hidden">
                      <StaggerText text="ONZE" delay={0.1} />
                   </span>
                   <span className="text-zinc-900 block overflow-hidden">
                      <StaggerText text="VISIE" delay={0.3} />
                   </span>
                   <motion.span 
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                     className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-red-500 block mt-4 md:mt-6 pb-2"
                   >
                      VOOR
                   </motion.span>
                   <motion.span 
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                     className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-red-500 block pb-4"
                   >
                      OOSTENDE.
                   </motion.span>
                 </motion.h1>

                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.9 }}
                   className="mt-8 pl-6 border-l-2 border-red-500/30 text-zinc-600 text-base md:text-lg font-medium leading-relaxed max-w-md hidden lg:block"
                 >
                    <p className="mb-4">
                      Samen met Vooruit wil ik van Oostende de diervriendelijkste stad van Vlaanderen maken met een ruim pakket aan concrete speerpunten. Ook dieren hebben rechten en die moeten te allen tijde gerespecteerd worden.
                    </p>
                    <p className="text-zinc-500 text-sm italic">
                      Selecteer een standpunt uit de lijst om meer te lezen over de plannen en de bijhorende impact op onze stad.
                    </p>
                 </motion.div>
              </div>

              {/* List Container */}
              <div className="lg:col-span-6 flex flex-col w-full group">
                {standpunten.map((punt, index) => (
                   <button 
                     key={index}
                     aria-label={`Lees meer over ${punt.titel}`}
                     className={`w-full text-left rounded-2xl mb-4 border overflow-hidden transition-all duration-300 cursor-pointer backdrop-blur-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${activeIndex === index ? 'bg-white/95 border-white shadow-xl shadow-zinc-900/5 scale-[1.01]' : 'bg-white/60 border-white/40 hover:bg-white/80 hover:border-white/60 hover:scale-[1.005]'}`}
                     onMouseEnter={() => setActiveIndex(index)}
                     onFocus={() => setActiveIndex(index)}
                     onClick={() => {
                       setActiveIndex(index);
                       setSelectedStandpunt(index);
                     }}
                   >
                      <div className="px-6 py-5 md:px-8 md:py-6 relative">
                        {/* Active Indicator Line */}
                        <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-500 ${activeIndex === index ? 'bg-red-600' : 'bg-transparent'}`}></div>
                        
                        {/* Header */}
                        <div className="flex items-center justify-between w-full gap-4">
                          <div className="flex items-center gap-5">
                            <span className={`text-lg md:text-xl font-bold transition-colors ${activeIndex === index ? 'text-red-600' : 'text-zinc-400'}`}>
                              {punt.nummer}
                            </span>
                            <h3 className={`text-base md:text-lg lg:text-xl font-bold tracking-wide uppercase transition-colors ${activeIndex === index ? 'text-zinc-900' : 'text-zinc-500'}`}>
                              {punt.titel}
                            </h3>
                          </div>
                          <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-zinc-900 text-white shadow-md' : 'bg-white/50 text-zinc-400 group-hover:bg-white/80 group-hover:text-zinc-900'}`}>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                             </svg>
                          </div>
                        </div>
                      </div>
                   </button>
                ))}
              </div>
           </div>
        </div>

        {/* Drawer Overlay */}
        <AnimatePresence>
          {selectedStandpunt !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => closeDrawer()}
                className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100]"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 w-full md:w-[90vw] xl:w-[1200px] bg-white z-[110] shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label={standpunten[selectedStandpunt]!.titel}
              >
                <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
                  <div tabIndex={-1} className="w-full h-full flex flex-col md:flex-row outline-none">
                {/* Drawer Left (Image) */}
                <div className="relative h-[40vh] md:h-full w-full md:w-5/12 lg:w-1/2 shrink-0">
                  <img 
                    src={standpunten[selectedStandpunt]!.image} 
                    alt={standpunten[selectedStandpunt]!.titel} 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    width={1000}
                    height={1000}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-6 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] text-white mb-4 bg-red-600`}>
                      STANDPUNT {standpunten[selectedStandpunt]!.nummer}
                    </span>
                    <h2 
                      className="text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl font-medium text-white leading-[1.1] uppercase tracking-tight break-words hyphens-auto font-heading"
                      lang="nl"
                    >
                      {standpunten[selectedStandpunt]!.titel}
                    </h2>
                  </div>
                </div>

                {/* Drawer Right (Scrollable text) */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-20 pb-24 custom-scrollbar relative bg-zinc-50">
                  {/* Close button (floating top right of the text area) */}
                  <button 
                    onClick={() => closeDrawer()}
                    aria-label="Sluit standpunt"
                    className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white hover:bg-zinc-100 shadow-md border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 transition-all z-10 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="max-w-2xl mx-auto md:mt-12">
                    {standpunten[selectedStandpunt]!.inhoud.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className={`mb-8 leading-relaxed ${
                          i === 0 
                            ? 'text-xl md:text-2xl font-medium text-zinc-800 first-letter:text-6xl md:first-letter:text-7xl lg:first-letter:text-8xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]' 
                            : 'text-lg text-zinc-600'
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                  </div>
                </FocusTrap>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* DOELEN & REALISATIES — verplaatst van de oude /doelen pagina  */}
      {/* ============================================================ */}
      <div className="bg-white relative">

        {/* Full-bleed Hero Section */}
        <div className="relative w-full min-h-[70vh] lg:min-h-[85vh] py-32 flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src="/images/asiel-render.webp"
              alt="Centrum voor Dierenwelzijn Render"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Gradient overlay to ensure text readability on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-none lg:max-w-[90vw]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-6 flex items-center gap-4"
            >
              <span className="w-16 h-[2px] bg-red-500"></span>
              Onze Missie
            </motion.p>
            <h2 className="text-6xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.9] text-white uppercase drop-shadow-2xl font-heading">
              <StaggerText el="span" className="block" text="Voor Nu &" />
              <StaggerText el="span" className="block whitespace-nowrap" text="De Toekomst." />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed mt-8 max-w-xl"
            >
              Een visie voor een diervriendelijk, veilig en vooruitstrevend Oostende.
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl text-3xl md:text-4xl lg:text-5xl text-zinc-900 font-black tracking-tight leading-tight mb-20 relative"
          >
            <span className="text-red-600 absolute -top-10 -left-6 text-9xl opacity-20">"</span>
            Dieren zijn voor zovele Oostendenaars een warme bron van liefde en nabijheid. Hun welzijn, daar moet een stad zich voor inzetten.
          </motion.div>

          {/* Premium Bento Box Grid for Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Goal 1: Large Feature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-zinc-50 rounded-[2rem] p-10 md:p-14 group hover:bg-zinc-100 transition-colors duration-500 border border-zinc-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                <Heart className="w-64 h-64 text-red-600" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 font-black mb-8 group-hover:scale-110 transition-transform">
                    01
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-medium uppercase tracking-tight text-zinc-900 mb-6 font-heading">Meest Diervriendelijke Stad</h3>
                  <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">
                    We beschermen dieren met strikte maatregelen en introduceren het Ethisch Certificaat voor dierenartsen die niet samenwerken met broodfokkers. Zo bannen we illegale praktijken uit Oostende en zorgen we voor een warm nest voor elk dier.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Goal 2: Vertical Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4 bg-red-600 text-white rounded-[2rem] p-10 md:p-14 group hover:bg-red-700 transition-colors duration-500 shadow-xl shadow-red-600/20 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute -bottom-10 -right-10 opacity-10 transform group-hover:rotate-12 transition-transform duration-700">
                <Shield className="w-64 h-64 text-white" />
              </div>
              <div className="relative z-10">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white font-black mb-8 backdrop-blur-md">
                  02
                </span>
                <h3 className="text-3xl lg:text-4xl font-medium uppercase tracking-tight mb-6 font-heading">Veilige Feesten</h3>
                <p className="text-lg text-white/90 font-medium leading-relaxed">
                  Een absolute stop op traditioneel knalvuurwerk dat dieren in paniek brengt. We maken de overstap naar spectaculaire droneshows en geluidsarm vuurwerk voor alle grote evenementen in de stad.
                </p>
              </div>
            </motion.div>

            {/* Goal 3: Square Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 bg-zinc-900 text-white rounded-[2rem] p-10 md:p-14 group hover:bg-zinc-950 transition-colors duration-500 relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 transform group-hover:scale-125 transition-transform duration-700">
                <Rocket className="w-80 h-80 text-white" />
              </div>
              <div className="relative z-10">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white font-black mb-8 backdrop-blur-md group-hover:bg-red-600 transition-colors">
                  03
                </span>
                <h3 className="text-3xl lg:text-4xl font-medium uppercase tracking-tight mb-6 font-heading">Smart City</h3>
                <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                  Door in te zetten op een echte Smart City maken we van Oostende een technologische hub. Een digitale toekomst ten dienste van ons allen. Een transparante en verbonden stadsomgeving met slimme mobiliteit.
                </p>
              </div>
            </motion.div>

            {/* Goal 4: Wide Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 bg-zinc-50 rounded-[2rem] p-10 md:p-14 group hover:bg-zinc-100 transition-colors duration-500 border border-zinc-100 relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-y-1/4 group-hover:-translate-y-4 transition-transform duration-700">
                <Link2 className="w-72 h-72 text-zinc-900" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-200 text-zinc-900 font-black mb-8 group-hover:scale-110 transition-transform">
                    04
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-medium uppercase tracking-tight text-zinc-900 mb-6 font-heading">Samenwerking Versterken</h3>
                  <p className="text-lg text-zinc-600 font-medium leading-relaxed max-w-xl">
                    Beleid maak je niet alleen. Dat begint bij een stevige versterking van de samenwerking met organisaties die zich inzetten voor dierenwelzijn, geluidsarm vuurwerk en een vernieuwend jeugdbeleid. We slaan de handen in elkaar.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
