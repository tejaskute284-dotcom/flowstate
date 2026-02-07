import { motion } from 'motion/react';
import { EmailCard } from '@/app/components/EmailCard';
import { Email } from '@/app/data/mockData';

interface InboxViewProps {
    emails: Email[];
    expandedEmailId: string | null;
    onEmailToggle: (id: string) => void;
    onEmailArchive: (id: string) => void;
}

export const InboxView = ({
    emails,
    expandedEmailId,
    onEmailToggle,
    onEmailArchive,
}: InboxViewProps) => {
    const pageVariants = {
        initial: { opacity: 0, y: 10, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.98 },
    };

    const pageTransition = {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
    };

    return (
        <motion.div
            key="inbox"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="max-w-7xl mx-auto"
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="fs-display text-[var(--color-text-primary)] mb-2">
                    Action Required
                </h1>
                <p className="text-[var(--color-text-secondary)] fs-body font-medium">
                    {emails.length} emails need your decision
                </p>
            </motion.div>

            <div className="space-y-4 max-w-4xl mx-auto px-2 sm:px-0">
                {emails.map((email, index) => (
                    <motion.div
                        key={email.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                    >
                        <EmailCard
                            {...email}
                            isExpanded={expandedEmailId === email.id}
                            onToggleExpand={onEmailToggle}
                            onArchive={onEmailArchive}
                        />
                    </motion.div>
                ))}
            </div>

            {emails.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20"
                >
                    <div className="text-8xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                        All caught up!
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        No action-required emails
                    </p>
                    <button className="py-3 px-6 bg-[var(--color-bg-card)] text-[var(--color-meeting)] border-2 border-[var(--color-meeting)] rounded-xl font-semibold hover:bg-[var(--color-bg-light)] transition-colors">
                        View All Emails
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};
