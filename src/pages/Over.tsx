import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { ImageReveal } from '../components/ImageReveal';
import { SEO } from '../components/SEO';

export default function Over() {
  return (
    <PageTransition>
      <SEO title="Over Fabrice — Fabrice Goffin" description="Leer meer over Fabrice Goffin, zijn achtergrond, en zijn passie voor dierenwelzijn en Oostende." />
      <div className="w-full">
        {/* Full Bleed Hero Section */}
        <div className="relative w-full min-h-[85vh] flex items-center justify-end overflow-hidden bg-zinc-900">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/shotstrand.webp" 
              alt="Fabrice Goffin op het strand" 
              className="w-full h-full object-cover object-center lg:object-[center_30%]"
              fetchPriority="high"
            />
            {/* Subtle gradient on the right side to ensure text readability, leaving the left clear */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-2/3 bg-gradient-to-l from-zinc-900/90 via-zinc-900/40 to-transparent"></div>
            {/* Bottom gradient to blend into the next section smoothly */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          {/* Hero Content (Right Aligned) */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-end pt-32 pb-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 xl:w-5/12 flex flex-col items-end text-right"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-red-500 font-black uppercase tracking-[0.2em] text-sm drop-shadow-md">Biografie</span>
                <div className="w-16 h-[3px] bg-red-600"></div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium uppercase tracking-tighter text-white leading-[0.85] mb-8 drop-shadow-2xl font-heading">
                Over<br />Fabrice
              </h1>
              
              <p className="text-xl md:text-2xl text-zinc-100 font-medium leading-relaxed drop-shadow-lg">
                Na mijn studies Economie aan de universiteit in Antwerpen kreeg ik op 24-jarige leeftijd, in 1995, de kans om directeur te worden binnen de World Trade Centre Association.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white px-6 md:px-12 lg:px-24 pb-24">
          <div className="max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg md:prose-xl prose-zinc max-w-none font-medium leading-relaxed"
          >

            <div className="md:columns-2 gap-12">
              <p className="drop-cap">
                Een kans die ik met beide handen greep. Als jongste directeur heb ik er het klappen van de zweep geleerd in een internationale business context. Vanuit mijn blijvende zoektocht naar nieuwe uitdagingen ben ik in 2001 een andere weg ingeslagen en de kunstwereld binnengestapt. Het werd een boeiende reis doorheen verschillende landen en werelden die resulteerde in vijf kunstgalerijen in eigen beheer.
              </p>
              <p>
                Toch bleven al van jongs af aan twee grote passies mijn werk en leven doorkruisen: ‘Star Wars’ en dierenwelzijn. Twee heel verschillende passies, maar vanaf 2011 zijn ze beiden mijn leven gaan beheersen.
              </p>
            </div>

            <div className="my-12 py-8 border-y-2 border-zinc-100">
               <h3 className="text-2xl font-medium uppercase tracking-tight text-zinc-900 mb-4 font-heading">Zorabots & Talemate</h3>
               <p className="text-zinc-600 text-base m-0">
                 In 2011 werkte ik samen met een van mijn beste vrienden, Tommy, het idee uit voor een robot gericht op het verbeteren van mensenlevens. Zo is ‘Zora’ geboren, een zorgrobot ontstaan uit onze gedeelde passie voor ‘Star Wars’. En zo was ook ‘Zorabots’ een feit, als roboticabedrijf.
               </p>
            </div>

            <div className="my-12 grid md:grid-cols-12 gap-8 items-start">
               <div className="md:col-span-7 flex flex-col gap-6">
                  <p>
                    In 2014 ondertussen was het houden, vertroetelen en leven met huisdieren niet meer voldoende om mijn passie voor dieren te voeden dus werd ik vrijwilliger bij het dierenasiel, Het Blauwe Kruis van de Kust. Het werd een avontuur waar ik me steeds verder voor engageerde. In 2016 werd ik er voorzitter van de Raad van Bestuur, en tot op vandaag ben ik er actief vrijwilliger, voorzitter en ben ik bovendien activist voor dierenwelzijn in Oostende, Vlaanderen en België.
                  </p>
                  <p>
                    Dat alles kan ik gelukkig en alleen maar doen met de steun van mijn vrouw Nelly, en van mijn, ondertussen volwassen, kinderen Paul, Daniel en Lisa.
                  </p>
               </div>
               <div className="md:col-span-5">
                  <div className="relative shadow-xl group rounded-2xl overflow-hidden aspect-[4/5] w-full">
                    <ImageReveal src="/images/fabriceennova.webp" alt="Fabrice en Nova" />
                    <div className="absolute z-10 bottom-0 left-0 w-full p-4 bg-gradient-to-t from-zinc-900/80 to-transparent">
                      <p className="text-white text-sm font-bold tracking-widest uppercase m-0 font-heading">Fabrice & Nova</p>
                    </div>
                  </div>
               </div>
            </div>

            <p>
              Vandaag is Zorabots als bedrijf uitgegroeid tot Talemate, een wereldwijde speler voor software voor robotica, IoT en metaverse. Het Blauwe Kruis van de Kust is verder gegroeid tot een efficiënte en sterke organisatie voor de opvang van jaarlijks meer dan 200 honden, 400 katten, en heel wat konijnen en knaagdieren. Met dit dierenasiel staan we bovendien op de drempel van het uitgroeien tot een Centrum voor Dierenwelzijn in de Oostendse regio. Het zijn verwezenlijkingen waar ik bijzonder trots op ben. Het is dan ook met spijt in het hart dat ik afscheid neem van Talemate als co-CEO en als voorzitter van Het Blauwe Kruis van de Kust. Maar Oostende roept.
            </p>

            <blockquote className="my-12 text-2xl md:text-3xl text-zinc-900 font-black uppercase tracking-tight leading-snug border-l-4 border-red-600 pl-6 md:pl-10">
              "Mijn engagement, ervaring en dierenliefde combineer ik nu in mijn nieuwe uitdaging als Oostends Schepen bevoegd voor Digitalisering, Ontmoeting en Dierenwelzijn."
            </blockquote>

            <p>
              Ik zet me vol enthousiasme in voor het verbeteren van dierenwelzijn, voor een optimale bescherming van dieren en om van Oostende de diervriendelijkste stad van Vlaanderen te maken. Ik smijt mij dagelijks om mensen samen te brengen in onze Oostendse wijken, en ben een luisterend oor voor iedereen die het nodig heeft. En ik engageer me om van Oostende een sterke digitale stad te maken ten dienste van haar inwoners en iedereen die onze stad bezoekt.
            </p>

            {/* Afsluitende Foto (Opkomst) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="mt-16 w-full relative rounded-2xl overflow-hidden shadow-lg border border-zinc-100 group"
            >
              <img 
                src="/images/opkomst.webp" 
                alt="Opkomst Fabrice Goffin" 
                className="w-full h-auto object-contain transition-transform duration-[2s] ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
            </motion.div>

          </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
