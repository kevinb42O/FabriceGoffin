import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { StaggerText } from './StaggerText';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isInView = useInView(containerRef, { amount: 0.3 }); // Trigger when 30% is visible

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
  }, [isInView]);

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

  // Scroll-in reveal — 2D transforms only.
  //
  // We deliberately avoid rotateX/rotateY/perspective here. In Chrome (and
  // other Chromium-based browsers) any <video> whose ancestor establishes a
  // 3D rendering context is composited in software, which kills
  // hardware-accelerated video decoding and causes stuttering. Keeping the
  // entrance effect 2D (translateY + scale + opacity) lets the GPU
  // compositor render the video on a fast hardware overlay.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 relative z-10 overflow-hidden">
       {/* Background ambient accents */}
       <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
       <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 relative z-20 py-12">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-4 mb-8"
             >
               <div className="w-12 h-[2px] bg-red-600"></div>
               <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs">In de kijker</span>
             </motion.div>

             <h2 className="text-5xl lg:text-6xl xl:text-7xl font-medium uppercase tracking-tighter text-white mb-8 leading-[0.85]">
               <StaggerText text="Actie in de" /><br />
               <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                 <StaggerText text="Gemeenteraad" delay={0.2} />
               </span>
             </h2>
             
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed mb-10 max-w-lg"
             >
               Bekijk mijn recentste tussenkomsten en debatten over de thema's die Oostende en haar bewoners aanbelangen.
             </motion.p>
             
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
             >
               <MagneticButton>
                 <Link 
                   to="/nieuws" 
                   className="group flex items-center justify-center sm:justify-start gap-4 px-8 py-4 bg-white text-zinc-950 font-black uppercase tracking-widest text-sm rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-max shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] block"
                 >
                   <span>Bekijk het nieuws</span>
                   <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-red-500 flex items-center justify-center transition-colors inline-flex ml-2">
                     <ArrowRight className="w-4 h-4 text-zinc-900 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                   </div>
                 </Link>
               </MagneticButton>
             </motion.div>
          </div>

          {/* Vertical Video Container (2D-only transforms — see comment above) */}
          <motion.div 
             style={{ y, scale, opacity }}
             className="lg:col-span-5 lg:col-start-8 relative w-full max-w-[450px] mx-auto lg:ml-auto lg:mr-0 order-1 lg:order-2"
          >
             {/*
               Ambient Blur Background — static image instead of a 2nd <video>.
               Why: a blurred + mix-blend-screen <video> forces Chrome to drop
               GPU video decoding (software compositing path), causing the
               main player to stutter. A blurred poster gives the same look
               at zero per-frame cost.
             */}
             <div
               aria-hidden="true"
               className="absolute inset-0 scale-105 blur-[60px] opacity-50 saturate-150 pointer-events-none z-0 rounded-[3rem] bg-cover bg-center"
               style={{ backgroundImage: 'url(/images/werkbezoek.webp)' }}
             />

             {/* Main Vertical Video Player */}
             <div 
                className="aspect-[11/16] w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-950 border border-white/20 ring-4 ring-zinc-900 relative z-10 group isolate"
             >
                {/*
                  Wrapper handles the hover-scale so the <video> itself never
                  carries a CSS transform. Chrome software-composites any
                  <video> with `transform` inside a 3D-transformed ancestor,
                  which kills hardware-accelerated video decode.
                */}
                <div
                  className={`absolute inset-0 transition-transform duration-700 will-change-transform ${isPlaying ? 'scale-100' : 'scale-105 group-hover:scale-100'}`}
                >
                  <video
                    ref={videoRef}
                    src="/videos/gemeenteraad.mp4"
                    className="block w-full h-full object-cover"
                    playsInline
                    muted={isMuted}
                    loop
                    preload="metadata"
                    poster="/images/werkbezoek.webp"
                  />
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
                       <span className="text-white text-[10px] sm:text-xs font-medium uppercase tracking-widest drop-shadow-md">
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
          </motion.div>
       </div>
    </section>
  );
}

