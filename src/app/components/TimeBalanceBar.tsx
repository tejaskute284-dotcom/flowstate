import { motion } from 'motion/react';

interface TimeBalanceBarProps {
  focusTime: number; // percentage
  meetings: number; // percentage
  emailTasks: number; // percentage
}

export function TimeBalanceBar({
  focusTime,
  meetings,
  emailTasks,
}: TimeBalanceBarProps) {
  return (
    <div className="bg-[var(--color-bg-light)] rounded-2xl p-1.5 overflow-hidden h-14 border border-[var(--color-divider)] shadow-inner">
      <div className="flex h-full gap-1.5">
        {/* Focus Time Segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${focusTime}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-[var(--color-focus)] to-[var(--color-action-required)] rounded-xl flex items-center justify-center overflow-hidden group cursor-pointer shadow-lg shadow-orange-500/20"
          whileHover={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-white text-[13px] font-bold tracking-wide relative z-10"
          >
            {focusTime}%
          </motion.span>
        </motion.div>

        {/* Meetings Segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${meetings}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative bg-gradient-to-br from-[var(--color-meeting)] to-[var(--color-accent-primary)] rounded-xl flex items-center justify-center overflow-hidden group cursor-pointer shadow-lg shadow-blue-500/20"
          whileHover={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-white text-[13px] font-bold tracking-wide relative z-10"
          >
            {meetings}%
          </motion.span>
        </motion.div>

        {/* Email/Tasks Segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${emailTasks}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative bg-gradient-to-br from-[var(--color-text-tertiary)] to-[var(--color-text-muted)] rounded-xl flex items-center justify-center overflow-hidden group cursor-pointer"
          whileHover={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-white text-[13px] font-bold tracking-wide relative z-10"
          >
            {emailTasks}%
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
