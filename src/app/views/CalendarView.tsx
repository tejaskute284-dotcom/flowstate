import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { CalendarMeetingCard } from '@/app/components/CalendarMeetingCard';
import { Meeting } from '@/app/data/mockData';

interface CalendarViewProps {
    meetings: Meeting[];
}

export const CalendarView = ({ meetings }: CalendarViewProps) => {
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
            key="calendar"
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
                    Today's Calendar
                </h1>
                <p className="text-[var(--color-text-secondary)] fs-body font-medium">
                    Saturday, January 31, 2026 • {meetings.length} meetings
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {meetings.map((meeting, index) => (
                    <motion.div
                        key={meeting.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.2 }}
                    >
                        <CalendarMeetingCard {...meeting} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 max-w-3xl fs-glass-pro rounded-2xl p-6 sm:p-8 border border-[var(--color-divider)] mx-auto lg:mx-0"
            >
                <h2 className="fs-heading-1 text-[var(--color-text-primary)] mb-4">
                    Email Context Integration
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    Each meeting card shows relevant email commitments you made,
                    so you're always prepared. No more "Oh no, I forgot I promised
                    to review that!"
                </p>
                <div className="flex items-center gap-2 text-[var(--color-meeting)] font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Context preserved automatically</span>
                </div>
            </motion.div>
        </motion.div>
    );
};
