/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, MotionConfig } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import Standpunten from './pages/Standpunten';
import Doelen from './pages/Doelen';
import Nieuws from './pages/Nieuws';
import Article from './pages/Article';
import Over from './pages/Over';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Voorwaarden from './pages/Voorwaarden';
import NotFound from './pages/NotFound';

import { CustomCursor } from './components/CustomCursor';
import { GrainOverlay } from './components/GrainOverlay';

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full min-h-screen bg-white font-sans text-zinc-900 selection:bg-teal-400 selection:text-white overflow-clip">
        {/* A11y: Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-red-600 focus:text-white focus:font-black focus:uppercase focus:tracking-widest focus:text-sm focus:rounded-full focus:shadow-xl focus:outline-none"
        >
          Ga naar inhoud
        </a>
        <ScrollToTop />
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        <main id="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/over" element={<Over />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/standpunten" element={<Standpunten />} />
              <Route path="/doelen" element={<Doelen />} />
              <Route path="/nieuws" element={<Nieuws />} />
              <Route path="/nieuws/:slug" element={<Article />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/voorwaarden" element={<Voorwaarden />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
