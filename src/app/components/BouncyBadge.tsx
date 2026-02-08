import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

interface BouncyBadgeProps {
    count: number;
    max?: number;
    className?: string;
    color?: string;
}

/**
 * BouncyBadge
 * High-stiffness notification badge with organic entry and update physics.
 */
export const BouncyBadge: React.FC<BouncyBadgeProps> = ({
    count,
    max = 99,
    className = '',
    color = 'bg-[var(--color-accent-blue)]'
}) => {
    if (count <= 0) return null;

    const displayCount = count > max ? `${max}+` : count;

    if (prefersReducedMotion()) {
        return (
            <span className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full ${color} ${className}`}>
                {displayCount}
            </span>
        );
    }

    return (
        <AnimatePresence mode="popLayout">
            <motion.span
                key={count}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        stiffness: 600,
                        damping: 20,
                        mass: 0.5
                    }
                }}
                exit={{ scale: 0, opacity: 0 }}
                className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full shadow-lg ${color} ${className} fs-gpu-layer`}
            >
                {displayCount}
            </motion.span>
        </AnimatePresence>
    );
};
