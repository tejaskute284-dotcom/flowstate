import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'inbox', label: 'Action', icon: '🎯', count: 3 },
    { id: 'calendar', label: 'Meetings', icon: '📅' },
    { id: 'fyi', label: 'FYI', icon: '💬' },
    { id: 'resolved', label: 'Resolved', icon: '✅' },
  ];

  const bottomItems: NavItem[] = [
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <motion.div
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-60 bg-[#FAFBFC] border-r border-[#ECF0F1] h-screen flex flex-col p-4"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 px-3"
      >
        <h1 className="fs-heading-1 text-[#2C3E50]">FlowState</h1>
        <p className="text-[#95A5A6] fs-caption mt-1">
          Communication for focus
        </p>
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item, index) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'fs-gradient-meeting text-white shadow-md'
                  : 'text-[#556674] hover:bg-white/60'
              }`}
              whileHover={{ scale: isActive ? 1 : 1.02, x: isActive ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-1 text-left font-medium fs-body">
                {item.label}
              </span>
              {item.count !== undefined && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E74C3C] text-white fs-animate-pulse'
                  } px-2 py-0.5 rounded-full text-xs font-bold min-w-[24px] text-center`}
                >
                  {item.count}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-[#ECF0F1] my-4" />

      {/* Bottom Navigation */}
      <nav className="space-y-1">
        {bottomItems.map((item, index) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + 0.1 * index, duration: 0.3 }}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#E3F2FD] text-[#2180E0]'
                  : 'text-[#556674] hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 text-left font-medium fs-body">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </motion.div>
  );
}
