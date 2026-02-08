import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
    x: number;
    y: number;
    id: number;
    size: number;
}

interface RippleEffectProps {
    children: React.ReactNode;
    className?: string;
    rippleColor?: string;
    duration?: number;
}

/**
 * RippleEffect
 * Expands a fading circle from the point of interaction.
 */
export const RippleEffect: React.FC<RippleEffectProps> = ({
    children,
    className = '',
    rippleColor = 'rgba(255, 255, 255, 0.35)',
    duration = 0.6
}) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple: Ripple = {
            x,
            y,
            size,
            id: Date.now()
        };

        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, duration * 1000);
    }, [duration]);

    return (
        <div
            className={`relative overflow-hidden cursor-pointer select-none ${className}`}
            onMouseDown={createRipple}
        >
            {children}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration, ease: "easeOut" }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: ripple.x - ripple.size / 2,
                            top: ripple.y - ripple.size / 2,
                            width: ripple.size,
                            height: ripple.size,
                            backgroundColor: rippleColor,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
