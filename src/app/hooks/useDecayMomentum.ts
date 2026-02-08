import { useCallback, useRef } from 'react';
import { animate, PlaybackControls } from 'popmotion';
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

interface DecayOptions {
    power?: number;
    timeConstant?: number;
    modifyTarget?: (v: number) => number;
}

/**
 * useDecayMomentum
 * Simulates physical inertia for elements after a drag or flick gesture.
 */
export function useDecayMomentum(elementRef: React.RefObject<HTMLElement>, options: DecayOptions = {}) {
    const currentAnim = useRef<PlaybackControls | null>(null);

    const applyDecay = useCallback((velocity: number, onUpdate: (v: number) => void) => {
        if (prefersReducedMotion() || Math.abs(velocity) < 10) return;

        currentAnim.current?.stop();

        currentAnim.current = animate({
            from: 0,
            to: 0,
            type: 'decay',
            velocity,
            power: options.power ?? 0.8,
            timeConstant: options.timeConstant ?? 350,
            onUpdate,
            onComplete: () => {
                // Handle completion if needed
            }
        });
    }, [options]);


    const stopMomentum = useCallback(() => {
        currentAnim.current?.stop();
    }, []);

    return { applyDecay, stopMomentum };
}
