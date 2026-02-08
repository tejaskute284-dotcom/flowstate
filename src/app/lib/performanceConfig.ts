/**
 * Performance Configurations
 * Optimizes animation engines for 60fps rendering by focusing on GPU-accelerated properties.
 */

export const GPU_SAFE_PROPERTIES = {
    transform: true,
    opacity: true,
    filter: true,
    clipPath: true,
};

export const GSAP_PERFORMANCE_DEFAULTS = {
    force3D: true,        // Encourages translate3d() for compositor layer
    lazy: true,           // Batches DOM writes to end of tick
    autoRound: true,      // Keeps pixels crisp
    overwrite: 'auto',    // Efficiently kills conflicting tweens
};

/**
 * Checks if the browser prefers reduced motion for accessibility
 */
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hints to the browser to prepare for GPU-accelerated animations
 */
export const promoteToLayer = (element: HTMLElement) => {
    element.style.willChange = 'transform, opacity';
};

/**
 * Resets the hardware acceleration hint after animation completion
 */
export const demoteFromLayer = (element: HTMLElement) => {
    element.style.willChange = 'auto';
};
