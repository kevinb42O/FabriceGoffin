import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';

const links = [
  { path: '/', label: 'Home' },
  { path: '/over', label: 'Over Mij' },
  { path: '/standpunten', label: 'Standpunten' },
  { path: '/nieuws', label: 'Nieuws' },
  { path: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide navbar when scrolling down past 250px
    const shouldHide = latest > previous && latest > 250;
    setHidden((prev) => (prev !== shouldHide ? shouldHide : prev));
    
    // Add glassmorphism background when scrolled past 50px
    const shouldBeScrolled = latest > 50;
    setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden && !isOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'bg-transparent py-3 md:py-4' 
            : isScrolled 
              ? 'py-2 md:py-2.5 bg-white/80 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-b border-zinc-200/50' 
              : 'py-3 md:py-4 bg-white border-b border-transparent'
        }`}
      >
        <div className="w-full px-4 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="relative z-50 group flex items-center gap-3 md:gap-4">
             {/* Official Emblem Icon */}
             <div className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 transition-all duration-500 ${isOpen ? 'bg-white' : 'bg-zinc-900 group-hover:bg-red-600'}`}>
               <span className={`font-black text-sm md:text-base tracking-tighter transition-colors duration-500 ${isOpen ? 'text-zinc-900' : 'text-white'}`}>
                 FG
               </span>
               {/* Accent Square */}
               <div className={`absolute bottom-0 right-0 w-2 h-2 transition-colors duration-500 ${isOpen ? 'bg-red-600' : 'bg-red-600 group-hover:bg-white'}`} />
             </div>

             {/* Text Block */}
             <div className="flex flex-col justify-center">
               <span className={`text-[12px] md:text-[13px] font-black tracking-[0.2em] uppercase leading-none transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-900'}`}>
                 FABRICE GOFFIN
               </span>
               <span className={`text-[7.5px] md:text-[8px] font-bold tracking-[0.2em] uppercase leading-none mt-1 transition-colors duration-300 ${isOpen ? 'text-zinc-400' : 'text-red-600'} hidden lg:block`}>
                 DIERENWELZIJN • DIGITALISERING • ONTMOETING
               </span>
               <span className={`text-[7.5px] font-bold tracking-[0.3em] uppercase leading-none mt-1 transition-colors duration-300 ${isOpen ? 'text-zinc-400' : 'text-red-600'} lg:hidden`}>
                 SCHEPEN
               </span>
             </div>
          </Link>

          {/* Desktop Nav & Menu Toggle */}
          <div className="flex items-center gap-6 relative z-50">
            {/* Desktop Nav Links */}
            <motion.div 
              animate={{ opacity: isOpen ? 0 : 1, filter: isOpen ? 'blur(4px)' : 'blur(0px)', pointerEvents: isOpen ? 'none' : 'auto' }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-8 lg:gap-12"
            >
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative group px-1 py-1 text-xs font-bold tracking-[0.2em] uppercase overflow-hidden"
                    {...(isActive ? { 'aria-current': 'page' as const } : {})}
                  >
                    <motion.span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? 'text-red-600' : 'text-zinc-500 group-hover:text-zinc-900'
                      }`}
                    >
                      {link.label}
                    </motion.span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Hover effect */}
                    {!isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
                    )}
                  </Link>
                );
              })}
            </motion.div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Navigatiemenu sluiten' : 'Navigatiemenu openen'}
              className={`group flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded-sm ${isOpen ? 'text-white' : 'text-zinc-900'}`}
            >
              <span className="hidden md:block relative overflow-hidden h-4 w-[60px]">
                <motion.span 
                  animate={{ y: isOpen ? -20 : 0 }} 
                  className="absolute top-0 left-0 w-full h-4 leading-none flex items-center justify-end"
                >
                  MENU
                </motion.span>
                <motion.span 
                  animate={{ y: isOpen ? 0 : 20 }} 
                  className={`absolute top-0 left-0 w-full h-4 leading-none flex items-center justify-end ${isOpen ? 'text-red-500' : 'text-red-600'}`}
                >
                  SLUITEN
                </motion.span>
              </span>
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 7 : 0,
                  }}
                  className={`block w-full h-[2px] transform origin-center transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-zinc-900 group-hover:bg-red-600'}`}
                />
                <motion.span
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    x: isOpen ? 10 : 0,
                  }}
                  className={`block w-full h-[2px] transition-all duration-300 ${isOpen ? 'bg-white' : 'bg-zinc-900 group-hover:bg-red-600'}`}
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -7 : 0,
                  }}
                  className={`block w-full h-[2px] transform origin-center transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-zinc-900 group-hover:bg-red-600'}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-zinc-950 text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Navigatiemenu"
          >
            <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
              <div tabIndex={-1} className="w-full h-full flex flex-col items-center justify-center p-8 outline-none">
            {/* Background Texture / Abstract Element for high-end feel */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
               <motion.div 
                 initial={{ scale: 1.2, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 1.5, ease: 'easeOut' }}
                 className="absolute -top-[50%] -right-[20%] w-[100vw] h-[100vw] rounded-full bg-red-900/40 blur-[120px]"
               />
               <motion.div 
                 initial={{ scale: 1.2, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                 className="absolute -bottom-[50%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-zinc-800/80 blur-[100px]"
               />
            </div>

            <div className="flex flex-col gap-2 md:gap-6 items-center relative z-10 w-full max-w-4xl mt-12 md:mt-0">
              {links.map((link, i) => (
                <div key={link.path} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', rotate: 5, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: '100%', rotate: -5, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1], 
                      delay: i * 0.1 + 0.2 
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group relative text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-black tracking-tighter leading-[0.9] transition-colors uppercase block"
                      {...(location.pathname === link.path ? { 'aria-current': 'page' as const } : {})}
                    >
                      <motion.span 
                        className={`inline-block transition-colors duration-500 ${location.pathname === link.path ? 'text-red-500' : 'text-white group-hover:text-red-500'}`}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-8 md:bottom-12 text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase w-full px-8 text-center flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4"
            >
              <div className="hidden md:block">Fabrice Goffin © 2026</div>
              <div className="leading-relaxed max-w-[200px] md:max-w-none">Schepen van Dierenwelzijn & Digitalisering — Oostende</div>
              <div className="hidden md:block" aria-hidden="true" />
            </motion.div>
              </div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
