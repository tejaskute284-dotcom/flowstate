import { motion } from 'motion/react';

import { useRef } from 'react';
import { useParallaxOrbs } from '@/app/hooks/useParallaxOrbs';

interface GradientOrbsProps {
  variant?: 'login' | 'empty' | 'background';
}

export function GradientOrbs({ variant = 'background' }: GradientOrbsProps) {
  const getOrbConfig = () => {
    switch (variant) {
      case 'login':
        return [
          {
            size: 500,
            blur: 100,
            color: 'rgba(33, 128, 224, 0.3)',
            x: '80%',
            y: '-10%',
            duration: 20,
          },
          {
            size: 400,
            blur: 80,
            color: 'rgba(255, 107, 53, 0.25)',
            x: '-10%',
            y: '70%',
            duration: 25,
          },
        ];
      case 'empty':
        return [
          {
            size: 300,
            blur: 60,
            color: 'rgba(39, 174, 96, 0.2)',
            x: '50%',
            y: '50%',
            duration: 15,
          },
        ];
      default:
        return [
          {
            size: 600,
            blur: 120,
            color: 'rgba(33, 128, 224, 0.15)',
            x: '90%',
            y: '10%',
            duration: 30,
          },
          {
            size: 500,
            blur: 100,
            color: 'rgba(255, 107, 53, 0.12)',
            x: '10%',
            y: '80%',
            duration: 35,
          },
        ];
    }
  };

  const orbs = getOrbConfig();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
