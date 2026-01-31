import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

interface FocusBannerProps {
  isActive: boolean;
  endTime: string;
  onSettingsClick?: () => void;
}

export function FocusBanner({
  isActive,
  endTime,
  onSettingsClick,
}: FocusBannerProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // Elastic bounce
      }}
      className="fixed top-0 left-0 right-0 z-50 fs-gradient-focus text-white h-14 flex items-center justify-between px-6"
      style={{ boxShadow: 'var(--shadow-focus)' }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-3 h-3 bg-white rounded-full"
        />
        <span className="text-base font-bold">
          Focus Active Until {endTime}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.95, backgroundColor: 'rgba(255,255,255,0.3)' }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
        onClick={onSettingsClick}
      >
        <Settings className="w-5 h-5" />
        <span className="font-medium">Settings</span>
      </motion.button>
    </motion.div>
  );
}
