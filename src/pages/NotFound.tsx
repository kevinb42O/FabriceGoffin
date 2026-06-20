import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageTransition from '../components/PageTransition';
import { SEO } from '../components/SEO';

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="Pagina niet gevonden — Fabrice Goffin" description="Deze pagina bestaat niet of is verplaatst." />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white relative overflow-hidden">
        {/* Large 404 Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[30vw] font-medium text-zinc-50 leading-none tracking-tighter font-heading">404</span>
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Pagina niet gevonden</span>
              <div className="w-12 h-[2px] bg-red-600"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter text-zinc-900 mb-6 font-heading">
              Oeps.
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 font-medium leading-relaxed mb-12">
              De pagina die je zoekt bestaat niet of is verplaatst. Geen zorgen — navigeer terug naar een bekende plek.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-full transition-colors duration-300 shadow-lg hover:shadow-red-600/30"
              >
                Naar Home
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black uppercase tracking-widest text-sm rounded-full transition-colors duration-300"
              >
                Contacteer Ons
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
