import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { instagramPosts } from '../data/instagram';
import { Heart, MessageCircle, Instagram, Plus, Minus } from 'lucide-react';
import { StaggerText } from './StaggerText';
import { contact } from '../data/contact';

export function SocialWall() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show 8 items initially, which spans roughly 2-3 rows on desktop
  const visiblePosts = isExpanded ? instagramPosts : instagramPosts.slice(0, 8);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 mb-4"
          >
             <Instagram className="w-6 h-6 text-red-600" />
             <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Volg mee online</span>
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
            <StaggerText text="@goffinfabrice" />
          </h3>
        </div>
        
        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          href={contact.socials.instagram}
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 md:mt-0 px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-red-600 transition-colors duration-300"
        >
          Volg op Instagram
        </motion.a>
      </div>

      <div className="relative">
        <motion.div 
           layout
           className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
        >
          <AnimatePresence>
            {visiblePosts.map((post) => (
              <motion.a
                layout
                key={post.id}
                href={contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-100 ${post.span} block cursor-pointer shadow-sm hover:shadow-xl transition-shadow`}
              >
                <img 
                  src={post.image} 
                  alt={post.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Mobile/touch: always-visible info strip — desktop hides this in favor of the hover overlay below */}
                <div className="lg:hidden absolute inset-x-0 bottom-0 pointer-events-none">
                   <div className="h-24 bg-gradient-to-t from-zinc-950/85 via-zinc-950/40 to-transparent" />
                   <div className="absolute inset-x-0 bottom-0 px-3 pb-3 flex items-center justify-between gap-2 text-white">
                     <div className="flex items-center gap-1.5 text-xs font-bold drop-shadow-md">
                       <Heart className="w-3.5 h-3.5 fill-white" />
                       <span className="tabular-nums">{post.likes}</span>
                     </div>
                     <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center">
                       <Instagram className="w-3.5 h-3.5 text-white" />
                     </div>
                   </div>
                </div>

                {/* Desktop hover overlay — full immersive caption */}
                <div className="hidden lg:flex absolute inset-0 bg-zinc-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-center items-center p-6 text-center">
                   <Instagram className="w-8 h-8 text-white/50 mb-4 absolute top-6 right-6" />
                   
                   <div className="flex gap-6 mb-4 text-white">
                     <div className="flex items-center gap-2 font-bold text-lg">
                       <Heart className="w-6 h-6 fill-white" />
                       <span>{post.likes}</span>
                     </div>
                     <div className="flex items-center gap-2 font-bold text-lg">
                       <MessageCircle className="w-6 h-6 fill-white" />
                       <span>{post.comments}</span>
                     </div>
                   </div>
                   
                   <p className="text-white/90 text-sm md:text-base font-medium line-clamp-3 md:line-clamp-4 leading-snug max-w-[80%]">
                     {post.caption}
                   </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Premium Fade Out Overlay when collapsed */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 rounded-b-2xl"></div>
        )}
      </div>

      {/* Expand/Collapse Button */}
      <motion.div layout className="mt-8 flex justify-center z-20 relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-zinc-200 hover:border-zinc-900 text-zinc-900 font-black uppercase tracking-widest text-sm hover:bg-zinc-900 hover:text-white transition-all duration-300 rounded-full shadow-sm hover:shadow-xl"
        >
          {isExpanded ? (
            <>
              Minder tonen <Minus className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </>
          ) : (
            <>
              Toon meer foto's <Plus className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
