import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  color?: 'blue' | 'red' | 'orange' | 'green';
  large?: boolean;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  color = 'blue',
  large = false,
}: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'text-[#E74C3C] group-hover:border-[#E74C3C]';
      case 'blue':
        return 'text-[#2180E0] group-hover:border-[#2180E0]';
      case 'orange':
        return 'text-[#FF6B35] group-hover:border-[#FF6B35]';
      case 'green':
        return 'text-[#27AE60] group-hover:border-[#27AE60]';
      default:
        return 'text-[#2180E0] group-hover:border-[#2180E0]';
    }
  };

  const getGradientAccent = () => {
    switch (color) {
      case 'red':
        return 'fs-gradient-action';
      case 'blue':
        return 'fs-gradient-meeting';
      case 'orange':
        return 'fs-gradient-focus';
      case 'green':
        return 'fs-gradient-success';
      default:
        return 'fs-gradient-meeting';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{
        y: -4,
        rotate: 0.5,
      }}
      className={`group relative bg-white rounded-2xl p-6 border border-[#ECF0F1] fs-hover-lift cursor-pointer ${
        large ? 'col-span-2' : ''
      }`}
      style={{ boxShadow: 'var(--shadow-level-1)' }}
    >
      {/* Gradient accent on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${getGradientAccent()}`}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        className={`mb-4 ${getColorClasses()}`}
      >
        <Icon className="w-8 h-8" />
      </motion.div>

      {/* Value */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-5xl font-bold text-[#2C3E50] mb-2 tabular-nums"
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="text-[#95A5A6] fs-label font-medium">{label}</div>
    </motion.div>
  );
}
