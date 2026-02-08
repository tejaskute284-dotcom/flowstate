import React from 'react';
import { motion, useScroll, useSpring } from "motion/react";
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

/**
 * ScrollProgress
 * Premium top-mounted progress bar that tracks page scroll.
 */
export const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (prefersReducedMotion()) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent-blue)] via-indigo-500 to-purple-500 origin-left z-[1000] fs-gpu-layer"
            style={{ scaleX }}
        />
    );
};
