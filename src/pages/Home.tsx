import { useSyncExternalStore } from 'react';
import { MobileHomeSequence } from '../components/MobileHomeSequence';
import PageTransition from '../components/PageTransition';
import { HomeFinale } from '../components/HomeFinale';
import { SEO } from '../components/SEO';
import { HomeIntroSequence } from '../components/HomeIntroSequence';

const mobileQuery = '(max-width: 1023px) and (prefers-reduced-motion: no-preference)';
const subscribeMobile = (callback: () => void) => {
  const media = matchMedia(mobileQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

export default function Home() {
  const mobile = useSyncExternalStore(subscribeMobile, () => matchMedia(mobileQuery).matches, () => false);
  return (
    <PageTransition>
      <SEO 
        title="Fabrice Goffin — Schepen van Oostende" 
        description="Ontdek de visie, standpunten en realisaties van Fabrice Goffin, Schepen van Dierenwelzijn, Digitalisering en Ontmoeting in Oostende."
        url="/"
      />

      {/* One native scroll sequence connects the hero, biography, priorities and news. */}
      {mobile ? <MobileHomeSequence /> : <HomeIntroSequence />}

      <HomeFinale />

    </PageTransition>
  );
}
