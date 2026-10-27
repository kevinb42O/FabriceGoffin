import { useLayoutEffect, useRef, useState } from 'react';
import { useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { VideoShowcase } from './VideoShowcase';
import { SocialWall } from './SocialWall';

export function HomeFinale() {
  const introduction = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const { scrollYProgress } = useScroll({ target: introduction, offset: ['start end', 'end end'] });

  const progress = useMotionValue(1);
  // One evolving backdrop connects the cinema's outer frame and the collage.
  const surface = useTransform(progress, [0, .24, .72, 1], ['#101b18', '#382822', '#b63232', '#b63232']);
  useMotionValueEvent(scrollYProgress, 'change', value => progress.set(animated ? value : 1));
  useLayoutEffect(() => { progress.set(animated ? scrollYProgress.get() : 1); }, [animated, progress, scrollYProgress]);

  useLayoutEffect(() => {
    const media = matchMedia('(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference), (max-width: 1023px) and (prefers-reduced-motion: no-preference)');
    const update = () => setAnimated(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return <>
    <VideoShowcase departure={progress} departureEnabled={animated} surface={surface} />
    <SocialWall sceneRef={introduction} progress={progress} animated={animated} surface={surface} />
  </>;
}
