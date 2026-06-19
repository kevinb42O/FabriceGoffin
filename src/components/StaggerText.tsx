import { motion, useReducedMotion } from 'motion/react';
import type { ElementType } from 'react';

const spring = { type: 'spring', stiffness: 400, damping: 30 } as const;

interface StaggerTextProps {
  text: string;
  className?: string;
  el?: ElementType;
}

export function StaggerText({ text, className = "", el: Wrapper = 'span', delay = 0 }: StaggerTextProps & { delay?: number }) {
  const words = text.split(' ');
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: spring,
    },
    hidden: {
      opacity: 0,
      y: 60,
      rotateZ: 2,
      transition: spring,
    },
  };

  if (shouldReduceMotion) {
    return <Wrapper className={className}>{text}</Wrapper>;
  }

  return (
    <Wrapper className={className}>
      <motion.span 
        variants={container} 
        initial="hidden" 
        animate="visible" 
        className="inline-flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, index) => (
          <span key={index} className="overflow-hidden inline-block pb-2 -mb-2">
            <motion.span variants={child} className="inline-block transform-origin-bottom-left">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
