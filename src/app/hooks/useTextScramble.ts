import { useCallback } from 'react';
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

/**
 * useTextScramble Hook
 * Provides a function to programmatically scramble text content of an element.
 */
export function useTextScramble() {
    const scramble = useCallback((element: HTMLElement, newText: string, options = { duration: 600, stagger: 40 }) => {
        if (prefersReducedMotion()) {
            element.textContent = newText;
            return;
        }

        const charsPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        const originalText = element.textContent || '';
        const length = Math.max(originalText.length, newText.length);
        let frame = 0;
        const totalFrames = Math.floor(options.duration / 16); // ~60fps

        const animate = () => {
            let output = '';
            const progress = frame / totalFrames;

            for (let i = 0; i < length; i++) {
                // Calculate probability of being the final character based on progress
                const revealProbability = (progress * (length / (i + 1))) * 0.5;

                if (i < frame || Math.random() < revealProbability) {
                    output += newText[i] || '';
                } else if (i < (originalText.length || newText.length)) {
                    output += charsPool[Math.floor(Math.random() * charsPool.length)];
                }
            }

            element.textContent = output;

            if (frame < length) {
                frame++;
                requestAnimationFrame(animate);
            } else {
                element.textContent = newText; // Final safety set
            }
        };

        animate();
    }, []);

    return { scramble };
}
