import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { StaggerText } from './StaggerText';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

const slides = [
  {
    id: 'digitale_zoo',
    bgImage: '/images/zoo2.jpeg',
    badge: 'Realisatie',
    title1: 'De Digitale',
    title2: 'Zoo',
    description: "Een unieke belevenis in het Kursaal waar technologie en dierenwelzijn hand in hand gaan. Wandel tussen indrukwekkende olifanten of zwem met walvissen, zonder één dier uit zijn natuurlijke leefomgeving te halen.",
    buttonLink: '/realisaties#dw-l-1',
    buttonText: 'Bekijk de realisatie',
    video: '/videos/zoo_compressed.mp4'
  },
  {
    id: 'gemeenteraad',
    bgImage: '/images/gemeenteraad.webp',
    badge: 'In de kijker',
    title1: 'Actie in de',
    title2: 'Gemeenteraad',
    description: "Bekijk mijn recentste tussenkomsten en debatten over de thema's die Oostende en haar bewoners aanbelangen.",
    buttonLink: '/nieuws',
    buttonText: 'Bekijk het nieuws',
    video: '/videos/gemeenteraad.mp4'
  }
];

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isInView = useInView(containerRef, { amount: 0.3 }); // Trigger when 30% is visible

  const currentSlide = slides[currentIndex]!;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Auto-play/pause based on viewport intersection
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView, currentIndex]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden min-h-screen flex items-center">
       {/* Background Image with Overlay */}
       <AnimatePresence>
         <motion.div 
           key={currentSlide.bgImage}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
           style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
         />
       </AnimatePresence>
       <div className="absolute inset-0 z-0 bg-zinc-950/85 backdrop-blur-[2px]" />

       {/* Background ambient accents */}
       <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
       <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3 z-0"></div>

       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Typography */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center order-2 lg:order-2 relative z-20 py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id + "-content"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-[2px] bg-red-600"></div>
                   <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs">{currentSlide.badge}</span>
                 </div>

                 <h2 className="text-5xl lg:text-6xl xl:text-7xl font-medium uppercase tracking-tighter text-white mb-8 leading-[0.85] font-heading">
                   <StaggerText text={currentSlide.title1} key={currentSlide.id + "-title1"} /><br />
                   <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)] font-heading">
                     <StaggerText text={currentSlide.title2} delay={0.2} key={currentSlide.id + "-title2"} />
                   </span>
                 </h2>
                 
                 <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed mb-10 max-w-lg">
                   {currentSlide.description}
                 </p>
                 
                 <div>
                    <MagneticButton>
                      <Link 
                        to={currentSlide.buttonLink} 
                        className="group flex items-center justify-center sm:justify-start gap-4 px-8 py-4 bg-white text-zinc-950 font-black uppercase tracking-widest text-sm rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-max shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] block"
                      >
                        <span>{currentSlide.buttonText}</span>
                        <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-red-500 flex items-center justify-center transition-colors inline-flex ml-2">
                          <ArrowRight className="w-4 h-4 text-zinc-900 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </MagneticButton>
                 </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex gap-3 mt-12">
              {slides.map((slide, index) => (
                <button
                  key={slide.id + "-dot"}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex ? "w-8 bg-red-600" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ga naar slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Vertical Video Container */}
          <motion.div 
             style={{ y, scale, opacity }}
             onPanEnd={(e, info) => {
               const swipe = info.offset.x;
               if (swipe < -40) {
                 nextSlide();
               } else if (swipe > 40) {
                 setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
               }
             }}
             className="lg:col-span-5 lg:col-start-1 relative w-full max-w-[450px] mx-auto lg:ml-0 lg:mr-auto order-1 lg:order-1 z-20 touch-pan-y"
          >
             {/* Main Vertical Video Player */}
             <div 
                className="aspect-[11/16] w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-950 border border-white/20 ring-4 ring-zinc-900 relative z-10 group isolate"
             >
                <div
                  className={`absolute inset-0 transition-transform duration-700 will-change-transform ${isPlaying ? 'scale-100' : 'scale-105 group-hover:scale-100'}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.video
                      key={currentSlide.video}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      ref={videoRef}
                      src={currentSlide.video}
                      className="block w-full h-full object-cover absolute inset-0"
                      playsInline
                      autoPlay
                      muted={isMuted}
                      onEnded={nextSlide}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      preload="auto"
                    />
                  </AnimatePresence>
                </div>
                
                {/* A11y: Toegankelijke verborgen overlay knop voor keyboard control */}
                <button
                  type="button"
                  className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-red-600 z-10"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Video pauzeren' : 'Video afspelen'}
                />
                
                {/* Custom Glassmorphism UI */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 flex flex-col justify-between transition-opacity duration-500 pointer-events-none z-20 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                   
                   {/* Top Bar (Mute & Badge) */}
                   <div className="w-full p-6 sm:p-8 flex justify-between items-start">
                     <div className="flex items-center gap-3 px-4 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                       <span className="text-white text-[10px] sm:text-xs font-medium uppercase tracking-widest drop-shadow-md font-heading">
                         {isPlaying ? 'Aan het afspelen' : 'Klaar om te spelen'}
                       </span>
                     </div>

                     <button 
                       onClick={toggleMute}
                       aria-label={isMuted ? 'Geluid inschakelen' : 'Geluid uitschakelen'}
                       className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 pointer-events-auto"
                     >
                       {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                     </button>
                   </div>

                   {/* Center Big Play Button */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     {!isPlaying && (
                       <button 
                         onClick={togglePlay}
                         aria-label="Video afspelen"
                         className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-red-600/90 backdrop-blur-xl border border-red-400/30 flex items-center justify-center text-white transition-all duration-500 ease-out shadow-[0_0_80px_rgba(220,38,38,0.5)] pointer-events-auto hover:scale-110 hover:bg-red-500 group-hover:shadow-[0_0_100px_rgba(220,38,38,0.7)]"
                       >
                         <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-2" fill="currentColor" />
                       </button>
                     )}
                   </div>

                </div>
             </div>

             {/* Mobile Swipe Hint BELOW the video */}
             <motion.div 
               className="mt-8 flex justify-center md:hidden pointer-events-none"
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 0.8 }}
             >
               <motion.div
                 animate={{ x: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="flex items-center gap-3 px-6 py-2.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-white shadow-lg"
               >
                 <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Swipe</span>
                 <ChevronRight className="w-4 h-4 text-red-500" />
               </motion.div>
             </motion.div>

          </motion.div>
       </div>

       {/* Next Arrow */}
       <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex">
         <button 
           onClick={nextSlide}
           className="w-16 h-16 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-500 group hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
           aria-label="Volgende video"
         >
           <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" />
         </button>
       </div>
    </section>
  );
}
