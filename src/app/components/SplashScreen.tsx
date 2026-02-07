
import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, utils, svg } from 'animejs';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !textRef.current) return;

    const timeline = createTimeline({
      onComplete: () => {
        if (!containerRef.current) return;
        // Fade out the entire splash screen
        animate(containerRef.current, {
          opacity: 0,
          duration: 800,
          ease: 'quadInOut',
          onComplete,
        });
      }
    });

    // 1. Logo entry (scaling and rotating from 0)
    timeline.add(logoRef.current, {
      scale: [0, 1.2, 1],
      rotate: '1turn',
      opacity: [0, 1],
      duration: 1200,
    });

    // 2. Text reveal
    timeline.add(textRef.current, {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
    }, '-=400'); // overlap with logo animation

    // 3. Staggered animation for logo paths (if any)
    // In v4, we use svg.createDrawable for path drawing
    timeline.add(svg.createDrawable('.logo-path'), {
      draw: '0 1',
      duration: 1000,
      ease: 'linear',
      delay: stagger(100),
    }, '-=1000');

    // 4. Subtle pulse before disappearing
    timeline.add(logoRef.current, {
      scale: [1, 1.05, 1],
      duration: 1000,
      loop: 1,
      ease: 'sineInOut'
    });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-bg-base)] overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Glow Effect for Dark Mode */}
        <div className="absolute inset-0 bg-[var(--color-accent-primary)] opacity-0 dark:opacity-20 blur-[100px] transition-opacity duration-1000" />
        {/* Abstract "Flow" Logo */}
        <svg
          ref={logoRef}
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8 relative z-10"
        >
          <circle cx="50" cy="50" r="45" stroke="var(--color-meeting)" strokeWidth="2" strokeDasharray="5 5" className="logo-path" />
          <path
            d="M30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70C38.9543 70 30 61.0457 30 50Z"
            fill="url(#paint0_linear)"
            className="logo-path"
          />
          <path
            d="M50 20V80"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            className="logo-path"
          />
          <defs>
            <linearGradient id="paint0_linear" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-meeting)" />
              <stop offset="1" stopColor="var(--color-accent-primary)" />
            </linearGradient>
          </defs>
        </svg>

        <div ref={textRef} className="text-center opacity-0 relative z-10">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tighter mb-2 fs-display">
            FLOWSTATE
          </h1>
          <p className="text-[var(--color-text-tertiary)] text-sm uppercase tracking-[0.2em] font-medium">
            Cognitive Harmony
          </p>
        </div>
      </div>

      {/* Modern loading indicator at the bottom */}
      <div className="absolute bottom-12 w-48 h-1 bg-[var(--color-divider)] rounded-full overflow-hidden">
        <div className="h-full bg-[var(--color-meeting)] fs-animate-shimmer" style={{ width: '40%' }}></div>
      </div>
    </div>
  );
};
