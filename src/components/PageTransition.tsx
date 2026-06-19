import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';

const transition = { type: 'tween', ease: 'easeInOut', duration: 0.3 } as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: { 
      opacity: 0, 
      y: 10
    },
    animate: { 
      opacity: 1, 
      y: 0
    },
    exit: { 
      opacity: 0, 
      y: -10
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={shouldReduceMotion ? { duration: 0.2 } : transition}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
