import React, { useRef, useCallback } from 'react';
import { animate, PlaybackControls } from 'popmotion';
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    strength?: number;
    squashStretch?: boolean;
}

/**
 * MagneticButton
 * Creates a premium "magnetic" pull effect toward the cursor.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    strength = 0.35,
    ...props
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const currentAnim = useRef<PlaybackControls | null>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current || prefersReducedMotion()) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = e.clientX - centerX;
        const y = e.clientY - centerY;

        currentAnim.current?.stop();
        currentAnim.current = animate({
            from: { x: 0, y: 0 },
            to: { x: x * strength, y: y * strength },
            type: 'spring',
            stiffness: 600,
            damping: 30,
            onUpdate: (latest: any) => {
                if (ref.current) {
                    ref.current.style.transform = `translate3d(${latest.x}px, ${latest.y}px, 0)`;
                }
            }
        });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        if (!ref.current || prefersReducedMotion()) return;

        currentAnim.current?.stop();
        currentAnim.current = animate({
            from: { x: 0, y: 0 },
            to: { x: 0, y: 0 },
            type: 'spring',
            stiffness: 400,
            damping: 20,
            onUpdate: (latest: any) => {
                if (ref.current) {
                    ref.current.style.transform = `translate3d(${latest.x}px, ${latest.y}px, 0)`;
                }
            }
        });
    }, []);


    return (
        <button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`${className} fs-gpu-layer select-none`}
            {...props}
        >
            {children}
        </button>
    );
};
