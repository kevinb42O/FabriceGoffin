import { motion, useScroll, useTransform } from 'motion/react';
import { ImageReveal } from './ImageReveal';

export function HomeGallery() {
  const { scrollY } = useScroll();
  const yGalleryLeft = useTransform(scrollY, [500, 2000], [100, -100]);
  const yGalleryRight = useTransform(scrollY, [500, 2000], [200, -200]);

  return (
      <section className="hidden lg:block py-24 px-6 md:px-12 lg:px-24 bg-white relative z-0 overflow-hidden border-t border-zinc-100">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="md:col-span-8"
            >
              <motion.div style={{ y: yGalleryLeft }} className="aspect-video relative shadow-xl rounded-sm h-full w-full">
                <ImageReveal 
                  src="/images/asiel-render.jpg" 
                  alt="Centrum voor Dierenwelzijn" 
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-zinc-900/90 to-transparent">
                   <div className="w-12 h-1 bg-red-600 mb-4"></div>
                   <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">Nieuw Centrum voor Dierenwelzijn</h3>
                   <p className="text-zinc-300 mt-2 font-medium">Toekomstige visualisatie van het asiel</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="md:col-span-4"
            >
              <motion.div style={{ y: yGalleryRight }} className="aspect-auto md:aspect-[3/4] relative shadow-xl rounded-sm h-full w-full">
                <ImageReveal 
                  src="/images/werkbezoek.jpg" 
                  alt="Werkbezoek" 
                />
              </motion.div>
            </motion.div>
         </div>
      </section>
  );
}
