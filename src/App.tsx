/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, MotionConfig } from 'motion/react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Standpunten = lazy(() => import('./pages/Standpunten'));
const Realisaties = lazy(() => import('./pages/Realisaties'));
const Nieuws = lazy(() => import('./pages/Nieuws'));
const Article = lazy(() => import('./pages/Article'));
const Over = lazy(() => import('./pages/Over'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Voorwaarden = lazy(() => import('./pages/Voorwaarden'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
              <Suspense fallback={<div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center"><div className="w-10 h-10 border-4 border-zinc-200 border-t-red-600 rounded-full animate-spin"></div></div>}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/over" element={<Over />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/standpunten" element={<Standpunten />} />
                  {/* /doelen content lives on /standpunten now — redirect old URLs */}
                  <Route path="/doelen" element={<Navigate to="/standpunten" replace />} />
                  <Route path="/realisaties" element={<Realisaties />} />
                  <Route path="/tijdlijn" element={<Navigate to="/realisaties" replace />} />
                  <Route path="/nieuws" element={<Nieuws />} />
                  <Route path="/nieuws/:slug" element={<Article />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/voorwaarden" element={<Voorwaarden />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
