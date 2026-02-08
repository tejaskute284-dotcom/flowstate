import { useCallback, useRef, RefObject } from 'react';
import { animate, PlaybackControls } from 'popmotion';
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

/**
 * useInertiaScroll
 * Provides momentum-based scrolling for touch and mouse interactions.
 */
export function useInertiaScroll(scrollRef: RefObject<HTMLElement>) {
    const lastPos = useRef(0);
    const velocity = useRef(0);
    const anim = useRef<PlaybackControls | null>(null);

    const onMomentumStart = useCallback((initialVelocity: number) => {
        if (prefersReducedMotion() || !scrollRef.current) return;

        anim.current?.stop();
        anim.current = animate({
            from: 0, // Using animate for decay needs a from value or it's implicitly handled by velocity
            to: 0,   // dummy to for animate interface
            type: 'decay',
            velocity: initialVelocity,
            power: 0.8,
            timeConstant: 350,
            onUpdate: (v: number) => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop -= v * 0.1;
                }
            }
        });
    }, [scrollRef]);


    const onDragStart = useCallback((pos: number) => {
        anim.current?.stop();
        lastPos.current = pos;
        velocity.current = 0;
    }, []);

    const onDragMove = useCallback((pos: number) => {
        velocity.current = pos - lastPos.current;
        lastPos.current = pos;
    }, []);

    return { onMomentumStart, onDragStart, onDragMove, velocity: velocity.current };
}
