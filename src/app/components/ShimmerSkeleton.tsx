import React from 'react';
import { prefersReducedMotion } from '@/app/lib/performanceConfig';

interface ShimmerSkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
}

/**
 * ShimmerSkeleton
 * Premium placeholder with hardware-accelerated shimmer effect.
 */
export const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({
    className = '',
    width = '100%',
    height = '1rem',
    borderRadius = '0.5rem'
}) => {
    const style = {
        width,
        height,
        borderRadius
    };

    if (prefersReducedMotion()) {
        return (
            <div
                className={`bg-gray-200 dark:bg-gray-800 ${className}`}
                style={style}
            />
        );
    }

    return (
        <div
            className={`fs-animate-shimmer bg-gray-200 dark:bg-gray-800 ${className}`}
            style={style}
        />
    );
};
