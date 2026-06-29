import PageTransition from '../components/PageTransition';
import { VideoShowcase } from '../components/VideoShowcase';
import { SocialWall } from '../components/SocialWall';
import { SEO } from '../components/SEO';
import { HomeHero } from '../components/HomeHero';
import { HomeHeroMobile } from '../components/HomeHeroMobile';
import { HomeBio } from '../components/HomeBio';
import { HomeStandpuntenPreview } from '../components/HomeStandpuntenPreview';
import { HomeStandpuntenMobile } from '../components/HomeStandpuntenMobile';

export default function Home() {
  return (
    <PageTransition>
      <SEO 
        title="Fabrice Goffin — Schepen van Oostende" 
        description="Ontdek de visie, standpunten en realisaties van Fabrice Goffin, Schepen van Dierenwelzijn, Digitalisering en Ontmoeting in Oostende."
        url="/"
      />

      {/* 1. Hero — mobile and desktop variants render mutually exclusively */}
      <HomeHeroMobile />
      <HomeHero />

      {/* 2. Extended Bio Section */}
      <HomeBio />

      {/* 3. Speerpunten — swipe carousel on mobile, sticky horizontal on desktop */}
      <HomeStandpuntenMobile />
      <HomeStandpuntenPreview />

      {/* 4. Video Showcase Section */}
      <VideoShowcase />

      {/* 5. Social Wall Section */}
      <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 bg-zinc-50 relative z-10 border-t border-zinc-200">
         <div className="max-w-[90rem] mx-auto">
            <SocialWall />
         </div>
      </section>

    </PageTransition>
  );
}
