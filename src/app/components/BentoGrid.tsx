import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: 'single' | 'double' | 'wide' | 'tall';
  gradient?: boolean;
  delay?: number;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className = '',
  span = 'single',
  gradient = false,
  delay = 0,
}: BentoCardProps) {
  const getSpanClass = () => {
    switch (span) {
      case 'double':
        return 'lg:col-span-2 lg:row-span-2';
      case 'wide':
        return 'lg:col-span-2';
      case 'tall':
        return 'lg:row-span-2';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -4,
        rotate: 0.5,
      }}
      className={`
        relative bg-white rounded-2xl p-6 border border-[#ECF0F1] 
        fs-hover-lift cursor-pointer overflow-hidden group
        ${getSpanClass()} ${className}
      `}
      style={{ boxShadow: 'var(--shadow-level-1)' }}
    >
      {/* Gradient accent on hover */}
      {gradient && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl fs-gradient-meeting"
        />
      )}
      
      {/* Radial gradient spotlight effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(33, 128, 224, 0.05) 0%, transparent 70%)',
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
