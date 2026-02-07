import { motion } from 'motion/react';
import { Mail, Calendar as CalendarIcon, Clock, Target } from 'lucide-react';
import { StatCard } from '@/app/components/StatCard';
import { TimeBalanceBar } from '@/app/components/TimeBalanceBar';

interface DashboardViewProps {
    actionEmailsCount: number;
}

export const DashboardView = ({ actionEmailsCount }: DashboardViewProps) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return '☀️ Good morning';
        if (hour < 18) return '🌤️ Good afternoon';
        return '🌙 Good evening';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-8"
        >
            <motion.div variants={itemVariants} className="mb-8">
                <h1 className="fs-display text-[var(--color-text-primary)] mb-2">
                    {getGreeting()}, Kartik
                </h1>
                <p className="text-[var(--color-text-secondary)] fs-body font-medium">
                    You have {actionEmailsCount} priority actions today
                </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <StatCard
                    icon={CalendarIcon}
                    value={8}
                    label="Meetings Today"
                    color="blue"
                />
                <StatCard
                    icon={Clock}
                    value={4}
                    label="Hours of Focus Time"
                    color="orange"
                />
                <StatCard
                    icon={Target}
                    value={12}
                    label="Tasks Completed"
                    color="green"
                />
            </motion.div>

            {/* Time Balance */}
            <motion.div
                variants={itemVariants}
                className="fs-card-3d p-8 max-w-4xl relative overflow-hidden"
            >
                {/* Subtle Grain Overlay for Dark Mode */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:block hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <h2 className="fs-heading-1 text-[var(--color-text-primary)] mb-6">
                    Time Balance Today
                </h2>
                <TimeBalanceBar focusTime={60} meetings={22} emailTasks={18} />
                <div className="flex flex-wrap gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-rose-500 rounded-full shadow-sm" />
                        <span className="text-[var(--color-text-secondary)] text-sm font-medium">
                            Focus Time (60%)
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-sm" />
                        <span className="text-[var(--color-text-secondary)] text-sm font-medium">
                            Meetings (22%)
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full shadow-sm" />
                        <span className="text-[var(--color-text-secondary)] text-sm font-medium">
                            Email/Tasks (18%)
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Priority Actions */}
            <motion.div
                variants={itemVariants}
                className="fs-card-3d p-8 max-w-4xl relative overflow-hidden"
            >
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none dark:block hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <h2 className="fs-heading-1 text-[var(--color-text-primary)] mb-6">
                    Priority Actions
                </h2>
                <div className="space-y-4">
                    <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-2xl group transition-all"
                    >
                        <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                        <div className="flex-1">
                            <p className="text-[var(--color-text-primary)] font-bold">
                                Budget approval needed by EOD
                            </p>
                            <p className="text-[var(--color-text-secondary)] text-sm font-medium">
                                From Prasad Kulkarni
                            </p>
                        </div>
                        <button className="px-5 py-2.5 fs-gradient-action text-white rounded-lg text-sm font-bold shadow-lg shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-500/30 transition-all hover:-translate-y-0.5">
                            Review Now
                        </button>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl group transition-all"
                    >
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                        <div className="flex-1">
                            <p className="text-[var(--color-text-primary)] font-bold">
                                Design review at 2:00 PM
                            </p>
                            <p className="text-[var(--color-text-secondary)] text-sm font-medium">
                                Prepare mockup feedback
                            </p>
                        </div>
                        <button className="px-5 py-2.5 bg-[var(--color-bg-card)] text-blue-600 border-2 border-blue-500 rounded-lg text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-sm">
                            View Details
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
