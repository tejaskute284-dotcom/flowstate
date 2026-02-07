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
        return 'text-rose-500 bg-rose-50 border-rose-100 group-hover:bg-rose-100/80 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50';
      case 'blue':
        return 'text-blue-500 bg-blue-50 border-blue-100 group-hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50';
      case 'orange':
        return 'text-orange-500 bg-orange-50 border-orange-100 group-hover:bg-orange-100/80 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50';
      case 'green':
        return 'text-emerald-500 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100/80 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
      default:
        return 'text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getGradientLine = () => {
    switch (color) {
      case 'red': return 'from-rose-500 to-red-600';
      case 'blue': return 'from-blue-500 to-indigo-600';
      case 'orange': return 'from-orange-500 to-amber-600';
      case 'green': return 'from-emerald-500 to-teal-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className={`group relative rounded-2xl p-6 cursor-pointer overflow-hidden fs-card-3d ${large ? 'col-span-2' : ''
        }`}
      style={{ boxShadow: 'var(--shadow-level-1)' }}
    >
      {/* Top Gradient Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradientLine()} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl border transition-colors duration-300 ${getColorClasses()}`}>
            <Icon className="w-6 h-6" />
          </div>

          {/* Decorative Sparkle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${getGradientLine()}`}
          />
        </div>

        <div>
          <div className="text-4xl font-bold text-[var(--color-text-primary)] mb-1 font-heading tracking-tight tabular-nums">
            {value}
          </div>
          <div className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide">
            {label}
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${getGradientLine()} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 rounded-full`} />
    </motion.div>
  );
}
