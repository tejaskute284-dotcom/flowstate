import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: 'inbox' | 'calendar' | 'focus' | 'custom';
}

export function EmptyState({
  icon = '🎉',
  title,
  description,
  actionLabel,
  onAction,
  illustration = 'inbox',
}: EmptyStateProps) {
  const getIllustration = () => {
    switch (illustration) {
      case 'inbox':
        return (
          <svg
            className="w-48 h-48"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              cx="100"
              cy="100"
              r="80"
              fill="#E3F2FD"
            />
            <motion.rect
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              x="50"
              y="60"
              width="100"
              height="80"
              rx="8"
              fill="white"
              stroke="#2180E0"
              strokeWidth="3"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              d="M 50 60 L 100 100 L 150 60"
              stroke="#2180E0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              cx="135"
              cy="75"
              r="15"
              fill="#27AE60"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              d="M 128 75 L 133 80 L 142 70"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case 'calendar':
        return (
          <svg
            className="w-48 h-48"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              cx="100"
              cy="100"
              r="80"
              fill="#F3E5F5"
            />
            <motion.rect
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              x="55"
              y="55"
              width="90"
              height="90"
              rx="8"
              fill="white"
              stroke="#9C27B0"
              strokeWidth="3"
            />
            <motion.line
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              x1="55"
              y1="80"
              x2="145"
              y2="80"
              stroke="#9C27B0"
              strokeWidth="2"
            />
            <motion.rect
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.2 }}
              x="65"
              y="48"
              width="8"
              height="14"
              rx="4"
              fill="#9C27B0"
            />
            <motion.rect
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.65, duration: 0.2 }}
              x="127"
              y="48"
              width="8"
              height="14"
              rx="4"
              fill="#9C27B0"
            />
          </svg>
        );
      case 'focus':
        return (
          <svg
            className="w-48 h-48"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              cx="100"
              cy="100"
              r="80"
              fill="#FFF7ED"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              cx="100"
              cy="100"
              r="40"
              fill="#FF6B35"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              cx="100"
              cy="100"
              r="20"
              fill="white"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {/* Illustration */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        {getIllustration()}
      </motion.div>

      {/* Icon (emoji) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
        }}
        className="text-6xl mb-4"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fs-heading-1 text-[#2C3E50] mb-2"
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-[#95A5A6] fs-body mb-6 max-w-md"
      >
        {description}
      </motion.p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="py-3 px-6 bg-white text-[#2180E0] border-2 border-[#2180E0] rounded-xl fs-body font-semibold hover:bg-[#F0F7FF] transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
