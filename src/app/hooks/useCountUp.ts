import { useCallback } from 'react';
import Velocity from 'velocity-animate';
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

/**
 * useCountUp
 * High-performance number tweening using Velocity.js.
 */
export function useCountUp() {
    const animateCount = useCallback((element: HTMLElement, target: number, duration = 1500) => {
        if (prefersReducedMotion()) {
            element.textContent = target.toLocaleString();
            return;
        }

        Velocity(element, {
            tween: [target, 0]
        }, {
            duration,
            easing: [0.22, 1, 0.36, 1],
            progress: (_elements: any, _complete: any, _remaining: any, _start: any, tweenValue: any) => {
                if (element) {
                    element.textContent = Math.round(tweenValue as number).toLocaleString();
                }
            }
        });
    }, []);

    return { animateCount };
}
