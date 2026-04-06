import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  src: string;
  alt: string;
  aspectRatio?: string;
  speed?: number;
  overlay?: boolean;
  overlayDirection?: 'bottom' | 'top' | 'both';
  className?: string;
}

export default function ParallaxImage({
  src,
  alt,
  aspectRatio = '21/9',
  speed = 0.15,
  overlay = true,
  overlayDirection = 'both',
  className = '',
}: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  const gradients: Record<string, string> = {
    bottom: 'linear-gradient(to top, #051a53 0%, transparent 40%)',
    top: 'linear-gradient(to bottom, #051a53 0%, transparent 40%)',
    both: 'linear-gradient(to top, #051a53 0%, transparent 30%), linear-gradient(to bottom, #051a53 0%, transparent 30%)',
  };

  return (
    <div
      ref={ref}
      className={`parallax-image-wrap ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        width: '100%',
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          position: 'absolute',
          inset: '-15%',
          width: '130%',
          height: '130%',
          objectFit: 'cover',
        }}
      />
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: gradients[overlayDirection],
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}
