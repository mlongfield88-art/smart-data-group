import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  index?: number;
  hoverGlow?: boolean;
}

export default function AnimatedCard({
  children,
  className = '',
  index = 0,
  hoverGlow = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        hoverGlow
          ? {
              y: -6,
              boxShadow: '0 20px 40px rgba(91, 123, 212, 0.15), 0 0 0 1px rgba(91, 123, 212, 0.2)',
              transition: { duration: 0.3 },
            }
          : { y: -4, transition: { duration: 0.3 } }
      }
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
}
