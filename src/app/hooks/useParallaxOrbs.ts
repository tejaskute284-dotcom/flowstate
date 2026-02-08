import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_PERFORMANCE_DEFAULTS } from '@/app/lib/performanceConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallaxOrbs
 * Applies depth-based parallax effects to background elements.
 */
export function useParallaxOrbs(containerRef: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Global GSAP defaults
            gsap.defaults(GSAP_PERFORMANCE_DEFAULTS);

            // Deep Orb (Layer 1) - Slow & Subtle
            gsap.to('.orb-deep', {
                y: '-15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.2
                }
            });

            // Mid Orb (Layer 2) - Medium Velocity
            gsap.to('.orb-mid', {
                y: '-35%',
                x: '5%',
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.8
                }
            });

            // Front Orb (Layer 3) - High Velocity & Depth
            gsap.to('.orb-near', {
                y: '-60%',
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.5
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef]);
}
