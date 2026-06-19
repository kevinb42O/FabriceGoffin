import { motion } from 'motion/react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageReveal({ src, alt, className = '' }: ImageRevealProps) {
  return (
    <motion.div 
      initial={{ clipPath: 'inset(10% 20% 10% 20%)', filter: 'brightness(1.2)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden w-full h-full ${className}`}
    >
      <motion.img 
        src={src} 
        alt={alt}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
    </motion.div>
  );
}
