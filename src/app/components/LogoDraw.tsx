import React, { useRef, useEffect } from 'react';
import { animate, svg, stagger } from 'animejs';
import { promoteToLayer, demoteFromLayer, prefersReducedMotion } from '@/app/lib/performanceConfig';

interface LogoDrawProps {
    className?: string;
    color?: string;
    size?: number;
}

/**
 * LogoDraw
 * Animates SVG paths drawing in for a premium logo entry effect.
 */
export const LogoDraw: React.FC<LogoDrawProps> = ({
    className = '',
    color = 'currentColor',
    size = 48
}) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return;

        promoteToLayer(ref.current);

        const animation = animate(svg.createDrawable(ref.current.querySelectorAll('path')), {
            draw: ['0 0', '0 1'],
            stroke: color,
            duration: 1200,
            delay: stagger(100),
            ease: 'inOut(3)'
        });

        animation.then(() => {
            if (ref.current) demoteFromLayer(ref.current);
        });

        return () => {
            if (animation && typeof animation.stop === 'function') animation.stop();
        };
    }, [color]);

    return (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
