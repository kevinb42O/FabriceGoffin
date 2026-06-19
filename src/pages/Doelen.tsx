import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { StaggerText } from '../components/StaggerText';
import { Shield, Rocket, Link2, Heart } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function Doelen() {
  return (
    <PageTransition>
      <SEO title="Doelen & Realisaties — Fabrice Goffin" description="Bekijk de doelen en bereikte realisaties van Fabrice Goffin voor Oostende." />
      <div className="bg-white relative">
        
        {/* Full-bleed Hero Section */}
        <div className="relative w-full min-h-[70vh] lg:min-h-[85vh] py-32 flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               src="/images/asiel-render.jpg" 
               alt="Centrum voor Dierenwelzijn Render" 
               className="w-full h-full object-cover object-center" 
               fetchPriority="high"
             />
             {/* Gradient overlay to ensure text readability on the left */}
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-none lg:max-w-[90vw]">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-6 flex items-center gap-4"
            >
              <span className="w-16 h-[2px] bg-red-500"></span>
              Onze Missie
            </motion.p>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white uppercase drop-shadow-2xl">
              <StaggerText el="span" className="block" text="Voor Nu &" />
              <StaggerText el="span" className="block whitespace-nowrap" text="De Toekomst." />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-zinc-900 mb-6">Meest Diervriendelijke Stad</h3>
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
                <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-6">Veilige Feesten</h3>
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
                <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-6">Smart City</h3>
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
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-6">Samenwerking Versterken</h3>
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
