import { motion } from 'motion/react';
import { Mail, Calendar as CalendarIcon, Target } from 'lucide-react';

export const ThreadView = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="mb-6">
                <h1 className="fs-display text-[var(--color-text-primary)] mb-2">
                    Thread Continuity
                </h1>
                <p className="text-[var(--color-text-secondary)] fs-body">
                    See the full conversation across emails and meetings
                </p>
            </div>

            <div className="max-w-4xl">
                {/* Pinned Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 dark:bg-rose-900/10 rounded-3xl p-6 mb-8 border-2 border-rose-500/30 relative overflow-hidden shadow-xl shadow-rose-500/5"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 fs-gradient-action rounded-full flex items-center justify-center shadow-lg shadow-rose-500/20">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="fs-heading-1 text-[var(--color-text-primary)]">
                            Pinned Commitment
                        </h2>
                    </div>
                    <p className="text-[var(--color-text-primary)] fs-body font-medium mb-2">
                        "I'll review the designs before tomorrow's meeting"
                    </p>
                    <p className="text-[var(--color-text-tertiary)] fs-label">
                        Promise made to Manasvi Sharma • 2 days ago
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative pl-8 space-y-8">
                    {/* Timeline line - Gradient Fade (Softer) */}
                    <div className="absolute left-3 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />

                    {/* Email 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -left-[30px] w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Mail className="w-4 h-4 text-white" />
                        </div>
                        <div className="fs-card-3d p-6 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[var(--color-text-primary)] fs-body font-semibold">
                                    Manasvi Sharma
                                </span>
                                <span className="text-[var(--color-text-tertiary)] fs-label">
                                    2 days ago
                                </span>
                            </div>
                            <p className="text-[var(--color-text-secondary)] fs-body">
                                "Hey team, I've uploaded the latest design mockups for the new dashboard. Would love to get your feedback before our review meeting on Friday. Particularly interested in thoughts on the color scheme and information hierarchy."
                            </p>
                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg fs-label font-medium border border-orange-100 dark:border-orange-800/30">
                                <span>⚡</span>
                                <span>Commitment: Review before meeting</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Your Response */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute -left-[30px] w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Mail className="w-4 h-4 text-white" />
                        </div>
                        <div className="fs-card-3d p-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[var(--color-text-primary)] fs-body font-semibold">
                                    You replied
                                </span>
                                <span className="text-[var(--color-text-tertiary)] fs-label">
                                    2 days ago
                                </span>
                            </div>
                            <p className="text-[var(--color-text-secondary)] fs-body">
                                "Looks great! I'll review the designs tonight and have feedback ready for Friday's meeting. The color scheme looks modern."
                            </p>
                        </div>
                    </motion.div>

                    {/* Meeting */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute -left-[30px] w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <CalendarIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="fs-card-3d p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[var(--color-text-primary)] fs-body font-semibold">
                                    Design Review Meeting
                                </span>
                                <span className="text-[var(--color-text-tertiary)] fs-label">
                                    Tomorrow at 2:00 PM
                                </span>
                            </div>
                            <p className="text-[var(--color-text-secondary)] fs-body mb-3">
                                Meeting with Manasvi Sharma and design team
                            </p>
                            <div className="fs-glass-light rounded-2xl p-3">
                                <div className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-[var(--color-text-primary)] fs-label font-medium">
                                            Your commitment from email thread
                                        </p>
                                        <p className="text-[var(--color-text-secondary)] fs-label italic mt-1">
                                            "I'll review the designs tonight"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
