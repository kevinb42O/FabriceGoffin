import { motion } from 'motion/react';
import { StaggerText } from './StaggerText';

export function HomeBio() {
  return (
      <section className="py-16 lg:py-32 px-6 md:px-12 lg:px-24 bg-white relative z-10 border-t border-zinc-100 overflow-hidden">
         <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] md:aspect-[4/5] lg:aspect-[3/4] w-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl lg:col-span-6 xl:col-span-5 order-2 lg:order-1 border-[6px] lg:border-8 border-white"
            >
              <img 
                src="/images/overfabrice.webp" 
                alt="Fabrice Goffin en hond" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Content Side */}
            <div className="flex flex-col justify-center order-1 lg:col-span-6 xl:col-span-7 lg:order-2">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="mb-8 lg:mb-10"
               >
                  <h2 className="text-[clamp(32px,8vw,42px)] md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[0.85] uppercase text-zinc-900 drop-shadow-sm flex flex-col font-heading">
                     <span><StaggerText text="Een hart voor dieren," /></span>
                     <span className="text-red-600"><StaggerText text="een blik op de toekomst." delay={0.2} /></span>
                  </h2>
                  <div className="w-12 lg:w-16 h-1.5 bg-red-600 mt-6 lg:mt-8"></div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-col gap-5 lg:gap-6 text-base lg:text-xl font-medium text-zinc-600 leading-relaxed"
               >
                  <p>
                    Ik ben een Oostendse ondernemer met een hart voor dieren. Founder en ex-Co-CEO van softwarebedrijf Talemate, voormalig voorzitter van het Blauwe Kruis van de Kust en bovenal een enthousiaste en gemotiveerde dierenliefhebber, die van Oostende de meest diervriendelijke stad van Vlaanderen wil maken.
                  </p>
                  <p>
                    Sinds eind 2024 ben ik Schepen in Oostende bevoegd voor Dierenwelzijn, Digitalisering en Ontmoetingcentra. Help je graag mee, heb je vragen of ideeën? Aarzel dan niet om me te contacteren.
                  </p>
                  
                  <blockquote className="mt-6 lg:mt-8 p-6 lg:p-8 bg-zinc-50 border-l-4 border-red-600 rounded-r-2xl shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-3 -top-4 lg:-right-6 lg:-top-6 text-[72px] lg:text-[120px] text-zinc-200 opacity-50 font-serif leading-none group-hover:scale-110 transition-transform select-none">"</div>
                    <p className="text-xl md:text-2xl lg:text-3xl text-zinc-900 font-black uppercase tracking-tight leading-snug drop-shadow-sm relative z-10">
                      "Laat ons samen werk maken van een hoger dierenwelzijn en een <span className="text-red-600">echte dierenbescherming</span>."
                    </p>
                  </blockquote>
               </motion.div>
            </div>
         </div>
      </section>
  );
}
