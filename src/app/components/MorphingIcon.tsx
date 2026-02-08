import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

const iconPaths = {
    menu: "M3 12h18M3 6h18M3 18h18",
    close: "M6 18L18 6M6 6l12 12",
    arrow: "M12 5v14M5 12l7 7 7-7",
    check: "M20 6L9 17l-5-5"
};

interface MorphingIconProps {
    icon: keyof typeof iconPaths;
    size?: number;
    className?: string;
    strokeWidth?: number;
}

/**
 * MorphingIcon
 * Highly responsive SVG icon that morphs its path based on the 'icon' prop.
 */
export const MorphingIcon: React.FC<MorphingIconProps> = ({
    icon,
    size = 24,
    className = '',
    strokeWidth = 2
}) => {
    if (prefersReducedMotion()) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
                <path d={iconPaths[icon]} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <motion.path
                initial={false}
                animate={{ d: iconPaths[icon] }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8
                }}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fs-gpu-layer"
            />
        </svg>
    );
};
