import { motion } from 'motion/react';
import { Switch } from '@/app/components/ui/switch';

interface SettingsViewProps {
    focusActive: boolean;
    onFocusToggle: (checked: boolean) => void;
}

export const SettingsView = ({ focusActive, onFocusToggle }: SettingsViewProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl space-y-8"
        >
            <div className="mb-6">
                <h1 className="fs-display text-[var(--color-text-primary)] mb-2">
                    Focus Time Settings
                </h1>
                <p className="text-[var(--color-text-secondary)] fs-body">
                    Protect your deep work time
                </p>
            </div>

            <div className="space-y-6">
                {/* Focus Mode Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fs-glass-pro p-8 rounded-3xl relative overflow-hidden"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="fs-heading-1 text-[var(--color-text-primary)] mb-2">
                                Enable Focus Mode
                            </h2>
                            <p className="text-[var(--color-text-secondary)] fs-body">
                                Block notifications and meeting requests during focus time
                            </p>
                        </div>
                        <Switch
                            checked={focusActive}
                            onCheckedChange={onFocusToggle}
                            className="data-[state=checked]:bg-[#FF6B35]"
                        />
                    </div>

                    {focusActive && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="pt-6 mt-6 border-t border-[var(--color-divider)]"
                        >
                            <p className="text-[var(--color-text-secondary)] fs-body mb-4">
                                Focus active until 5:00 PM
                            </p>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-[var(--color-bg-light)] text-[var(--color-text-secondary)] rounded-lg fs-label font-medium hover:bg-[var(--color-bg-elevated)] transition-colors">
                                    Extend 1 hour
                                </button>
                                <button className="px-4 py-2 bg-[var(--color-bg-light)] text-[var(--color-text-secondary)] rounded-lg fs-label font-medium hover:bg-[var(--color-bg-elevated)] transition-colors">
                                    End now
                                </button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Default Focus Hours */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="fs-glass-pro p-8 rounded-3xl"
                >
                    <h2 className="fs-heading-1 text-[var(--color-text-primary)] mb-4">
                        Default Focus Hours
                    </h2>
                    <p className="text-[var(--color-text-secondary)] fs-body mb-6">
                        Set your preferred times for deep work
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[var(--color-bg-light)] rounded-2xl border border-[var(--color-divider)]">
                            <span className="text-[var(--color-text-primary)] fs-body font-medium">
                                Morning Focus
                            </span>
                            <span className="text-[var(--color-text-secondary)] fs-label">
                                9:00 AM - 11:30 AM
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[var(--color-bg-light)] rounded-2xl border border-[var(--color-divider)]">
                            <span className="text-[var(--color-text-primary)] fs-body font-medium">
                                Afternoon Deep Work
                            </span>
                            <span className="text-[var(--color-text-secondary)] fs-label">
                                2:00 PM - 4:30 PM
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
