import { useCallback, useRef } from 'react';
import { animate, PlaybackControls } from 'popmotion';
import { promoteToLayer, demoteFromLayer, prefersReducedMotion } from '@/app/lib/performanceConfig';

interface SpringOptions {
    stiffness?: number;
    damping?: number;
    mass?: number;
}

/**
 * usePhysicsSpring
 * Custom hook for high-performance physics-based animations.
 */
export function usePhysicsSpring(elementRef: React.RefObject<HTMLElement>, options: SpringOptions = {}) {
    const currentAnim = useRef<PlaybackControls | null>(null);

    const springTo = useCallback((props: Record<string, number>) => {
        if (!elementRef.current || prefersReducedMotion()) {
            if (elementRef.current) {
                Object.entries(props).forEach(([key, value]) => {
                    (elementRef.current!.style as any)[key] = value;
                });
            }
            return;
        }

        promoteToLayer(elementRef.current);

        currentAnim.current?.stop();

        // For simplicity in this implementation, we'll focus on transform: translate3d
        // In a full implementation, we'd handle complex prop mapping
        const targetX = props.x ?? 0;
        const targetY = props.y ?? 0;
        const targetScale = props.scale ?? 1;

        currentAnim.current = animate({
            from: 0,
            to: 1,
            type: 'spring',
            stiffness: options.stiffness ?? 400,
            damping: options.damping ?? 30,
            mass: options.mass ?? 1,
            onUpdate: (v: number) => {
                if (elementRef.current) {
                    elementRef.current.style.transform = `translate3d(${targetX * v}px, ${targetY * v}px, 0) scale(${1 + (targetScale - 1) * v})`;
                }
            },
            onComplete: () => {
                if (elementRef.current) demoteFromLayer(elementRef.current);
            }
        });
    }, [elementRef, options]);


    return { springTo };
}
