import { motion } from 'motion/react';

export const ProfileView = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
        >
            <div className="mb-6">
                <h1 className="fs-display text-[var(--color-text-primary)] mb-2">Profile</h1>
                <p className="text-[var(--color-text-secondary)] fs-body">
                    Manage your account settings
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fs-card-3d p-8 relative overflow-hidden"
            >
                {/* Glow Effect Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />

                <h2 className="fs-heading-1 text-[var(--color-text-primary)] mb-6">
                    User Account
                </h2>

                <div className="flex items-center gap-6 mb-8 p-4 bg-[var(--color-bg-light)] rounded-3xl border border-[var(--color-divider)]">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-500/20">
                            K
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-[var(--color-bg-card)] rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h3 className="fs-heading-2 text-[var(--color-text-primary)] flex items-center gap-2">
                            Kartik Desai
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-full">Pro</span>
                        </h3>
                        <p className="text-[var(--color-text-secondary)] fs-body">d.kartik@example.com</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 fs-glass-light rounded-2xl border border-[var(--color-divider)]">
                        <p className="text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-widest mb-1">Focus Time</p>
                        <p className="text-[var(--color-text-primary)] text-xl font-bold">124 hrs <span className="text-emerald-500 text-sm font-medium ml-1">↑ 12%</span></p>
                    </div>
                    <div className="p-4 fs-glass-light rounded-2xl border border-[var(--color-divider)]">
                        <p className="text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-widest mb-1">Completed</p>
                        <p className="text-[var(--color-text-primary)] text-xl font-bold">842 tasks</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <motion.div
                        whileHover={{ x: 4 }}
                        className="p-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-elevated)] rounded-2xl flex items-center justify-between border border-[var(--color-divider)] transition-all cursor-pointer group"
                    >
                        <span className="text-[var(--color-text-primary)] font-medium">Theme</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-secondary)] text-sm">System Default</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-divider)] group-hover:bg-blue-500 transition-colors" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 4 }}
                        className="p-4 bg-[var(--color-bg-light)] hover:bg-[var(--color-bg-elevated)] rounded-2xl flex items-center justify-between border border-[var(--color-divider)] transition-all cursor-pointer group"
                    >
                        <span className="text-[var(--color-text-primary)] font-medium">Notifications</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-secondary)] text-sm">Enabled</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-divider)] group-hover:bg-blue-500 transition-colors" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 4 }}
                        className="p-4 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-2xl flex items-center justify-between border border-rose-100 dark:border-rose-900/20 transition-all cursor-pointer group"
                    >
                        <span className="text-rose-600 dark:text-rose-400 font-medium">Log out</span>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
