import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface AnimatedBeamProps {
  fromId: string;
  toId: string;
  color?: string;
  duration?: number;
}

export function AnimatedBeam({
  fromId,
  toId,
  color = '#2180E0',
  duration = 2,
}: AnimatedBeamProps) {
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const updatePath = () => {
      const fromElement = document.getElementById(fromId);
      const toElement = document.getElementById(toId);

      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();

        const startX = fromRect.right;
        const startY = fromRect.top + fromRect.height / 2;
        const endX = toRect.left;
        const endY = toRect.top + toRect.height / 2;

        const midX = (startX + endX) / 2;

        // Create curved path (quadratic bezier)
        const pathStr = `M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} T ${endX} ${endY}`;
        setPath(pathStr);
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [fromId, toId]);

  if (!path) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Background path */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="8 8"
        opacity={0.3}
      />
      
      {/* Animated beam */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#beamGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );
}
