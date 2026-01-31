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
    <div className="bg-[#F5F5F5] rounded-xl p-1 overflow-hidden h-12">
      <div className="flex h-full gap-1">
        {/* Focus Time Segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${focusTime}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative fs-gradient-meeting rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.05, zIndex: 10 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-white text-sm font-semibold drop-shadow-md relative z-10"
          >
            {focusTime}%
          </motion.span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
          
          {/* Tooltip on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: -40 }}
            className="absolute bg-[#2C3E50] text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
            style={{ boxShadow: 'var(--shadow-level-3)' }}
          >
            Focus Time: {focusTime}%
          </motion.div>
        </motion.div>

        {/* Meetings Segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${meetings}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative bg-gradient-to-r from-[#95A5A6] to-[#AAB7B8] rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.05, zIndex: 10 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-white text-sm font-semibold drop-shadow-md relative z-10"
          >
            {meetings}%
          </motion.span>
          
          {/* Tooltip on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: -40 }}
            className="absolute bg-[#2C3E50] text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
            style={{ boxShadow: 'var(--shadow-level-3)' }}
          >
            Meetings: {meetings}%
          </motion.div>
        </motion.div>

        {/* Email/Tasks Segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${emailTasks}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative bg-gradient-to-r from-[#BDC3C7] to-[#D5DBDB] rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.05, zIndex: 10 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-[#556674] text-sm font-semibold drop-shadow-sm relative z-10"
          >
            {emailTasks}%
          </motion.span>
          
          {/* Tooltip on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: -40 }}
            className="absolute bg-[#2C3E50] text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
            style={{ boxShadow: 'var(--shadow-level-3)' }}
          >
            Email/Tasks: {emailTasks}%
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
