import { Variants } from "motion/react";

/**
 * Page Transitions
 * Orchestrated animation variants for main views.
 */
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.98,
        y: 20,
        filter: 'blur(10px)'
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 25,
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: -15,
        filter: 'blur(5px)',
        transition: {
            duration: 0.25,
            ease: "easeInOut"
        }
    }
};

/**
 * Child element variants to be used with staggerChildren
 */
export const childVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};
