import React, { useRef, useEffect } from 'react';
import { splitText, animate, stagger } from 'animejs';
import { promoteToLayer, demoteFromLayer, prefersReducedMotion } from '@/app/lib/performanceConfig';

type AnimationType = 'reveal' | 'scramble' | 'wave' | 'fade';

interface AnimatedTextProps {
    children: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    animation?: AnimationType;
    delay?: number;
    staggerDelay?: number;
    className?: string;
    onComplete?: () => void;
}

/**
 * AnimatedText Component
 * Leverages Anime.js v4 splitText for high-performance typography animations.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
    children,
    as: Component = 'span',
    animation = 'reveal',
    delay = 0,
    staggerDelay = 30,
    className = '',
    onComplete
}) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return;

        // Promote parent to GPU layer
        promoteToLayer(ref.current);

        // Initial split
        const { chars, words } = splitText(ref.current, {
            chars: { wrap: 'clip' },
            words: { wrap: 'clip' }
        });

        let animationInstance: any;

        switch (animation) {
            case 'reveal':
                animationInstance = animate(chars, {
                    translateY: ['100%', '0%'],
                    opacity: [0, 1],
                    duration: 600,
                    delay: stagger(staggerDelay, { start: delay }),
                    ease: 'out(3)'
                });
                animationInstance.then(() => {
                    if (ref.current) demoteFromLayer(ref.current);
                    onComplete?.();
                });
                break;

            case 'scramble':
                // Scramble animation pattern
                chars.forEach((char, i) => {
                    const original = char.textContent;
                    const scramblePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
                    let iterations = 0;
                    const maxIterations = 4;

                    setTimeout(() => {
                        const interval = setInterval(() => {
                            char.textContent = iterations < maxIterations
                                ? scramblePool[Math.floor(Math.random() * scramblePool.length)]
                                : original;

                            if (iterations >= maxIterations) {
                                clearInterval(interval);
                                if (i === chars.length - 1) onComplete?.();
                            }
                            iterations++;
                        }, 60);
                    }, delay + i * staggerDelay);
                });
                break;

            case 'wave':
                animationInstance = animate(chars, {
                    translateY: [
                        { to: '-30%', duration: 250, ease: 'out(2)' },
                        { to: '0%', duration: 400, ease: 'inOut(2)' }
                    ],
                    opacity: [0, 1],
                    delay: stagger(staggerDelay, { start: delay, from: 'center' })
                });
                animationInstance.then(onComplete);
                break;

            case 'fade':
                animationInstance = animate(words, {
                    opacity: [0, 1],
                    translateY: [15, 0],
                    duration: 500,
                    delay: stagger(staggerDelay * 2, { start: delay }),
                    ease: 'out(2)'
                });
                animationInstance.then(onComplete);
                break;
        }

        return () => {
            // Cleanup if needed
            if (animationInstance && typeof animationInstance.stop === 'function') {
                animationInstance.stop();
            }
        };
    }, [children, animation, delay, staggerDelay, onComplete]);

    return (
        <Component
            ref={ref as any}
            className={`${className} fs-gpu-layer`}
            style={{ display: animation === 'reveal' ? 'inline-block' : 'inline' }}
        >
            {children}
        </Component>
    );
};
