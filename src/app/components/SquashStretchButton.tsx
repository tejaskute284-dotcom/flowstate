import React from 'react';
import { motion } from "motion/react";
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

interface SquashStretchButtonProps extends React.ComponentProps<typeof motion.button> {
    activeScale?: number;
    hoverScale?: number;
}

/**
 * SquashStretchButton
 * Implements Disney-style "Squash & Stretch" principles for organic button feedback.
 */
export const SquashStretchButton: React.FC<SquashStretchButtonProps> = ({
    children,
    className = '',
    activeScale = 0.95,
    hoverScale = 1.02,
    ...props
}) => {
    if (prefersReducedMotion()) {
        return (
            <button className={className} {...(props as any)}>
                {children}
            </button>
        );
    }

    return (
        <motion.button
            className={`${className} fs-gpu-layer`}
            whileHover={{
                scale: hoverScale,
                transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            whileTap={{
                scaleX: 1.08,
                scaleY: 0.92,
                scale: activeScale,
                transition: {
                    type: "spring",
                    stiffness: 600,
                    damping: 15,
                    mass: 0.5
                }
            }}
            {...props}
        >
            {children}
        </motion.button>
    );
};
