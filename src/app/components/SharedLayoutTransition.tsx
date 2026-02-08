import React from 'react';
import { motion, AnimatePresence } from "motion/react";

interface SharedLayoutProps {
    layoutId: string;
    isExpanded: boolean;
    children: React.ReactNode;
    expandedContent: React.ReactNode;
    onClose?: () => void;
    className?: string;
    expandedClassName?: string;
}

/**
 * SharedLayoutTransition
 * Facilitates "Shared Element Transitions" using layoutId.
 * Morphs one element into another across different states or components.
 */
export const SharedLayoutTransition: React.FC<SharedLayoutProps> = ({
    layoutId,
    isExpanded,
    children,
    expandedContent,
    onClose,
    className = '',
    expandedClassName = ''
}) => {
    return (
        <>
            {!isExpanded && (
                <motion.div
                    layoutId={layoutId}
                    className={className}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {children}
                </motion.div>
            )}

            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Expanded Content */}
                        <motion.div
                            layoutId={layoutId}
                            className={`relative z-10 w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl ${expandedClassName}`}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 35,
                                mass: 1.2
                            }}
                        >
                            {expandedContent}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
