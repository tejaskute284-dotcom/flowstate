import React from 'react';
import { motion } from "motion/react";
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

interface ElasticToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    label?: string;
}

/**
 * ElasticToggle
 * Premium switch with high-stiffness spring physics and layout-optimized movement.
 */
export const ElasticToggle: React.FC<ElasticToggleProps> = ({
    checked,
    onChange,
    className = '',
    label
}) => {
    if (prefersReducedMotion()) {
        return (
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                {label && <span className="text-sm font-medium">{label}</span>}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <motion.button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-[var(--color-accent-blue)]' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    animate={{ x: checked ? 24 : 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        mass: 0.8
                    }}
                    className="w-4 h-4 bg-white rounded-full shadow-lg fs-gpu-layer"
                />
            </motion.button>
            {label && (
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {label}
                </span>
            )}
        </div>
    );
};
