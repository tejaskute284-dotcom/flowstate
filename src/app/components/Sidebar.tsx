import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed?: boolean;
  onToggleButton?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

export function Sidebar({
  activeView,
  onViewChange,
  isCollapsed = false,
  onToggleButton
}: SidebarProps) {
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

  const handleKeyDown = (e: React.KeyboardEvent, index: number, items: NavItem[]) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      document.getElementById(`nav-item-${items[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = (index - 1 + items.length) % items.length;
      document.getElementById(`nav-item-${items[nextIndex].id}`)?.focus();
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 256,
        x: 0,
        opacity: 1
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`h-screen flex flex-col p-4 relative z-50 fs-glass-pro border-r-0 shadow-2xl overflow-hidden transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}
      role="complementary"
      aria-label="Main Sidebar"
    >
      {/* Logo */}
      <motion.div
        className={`mb-10 pt-2 ${isCollapsed ? 'px-0' : 'px-3'}`}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 min-w-[32px] rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-3 h-3 bg-white rounded-full opacity-90" />
          </div>
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight font-heading whitespace-nowrap"
            >
              FlowState
            </motion.h1>
          )}
        </div>
        {!isCollapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--color-text-tertiary)] text-xs font-medium tracking-wide pl-11"
          >
            FOCUS OS
          </motion.p>
        )}
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2" aria-label="Primary Navigation">
        {navItems.map((item, index) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              id={`nav-item-${item.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              onClick={() => onViewChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index, navItems)}
              aria-label={`${item.label} view ${item.count ? `(${item.count} items)` : ''}`}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden outline-none ${isActive
                ? 'text-white shadow-lg shadow-blue-500/25 dark:shadow-indigo-500/40'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/50 dark:hover:bg-white/10 focus-visible:bg-white/50 dark:focus-visible:bg-white/10'
                }`}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active Background with Gradient */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon & Label */}
              <span className={`text-xl relative z-10 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300 ${isCollapsed ? 'mx-auto' : ''}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex-1 text-left font-medium text-[15px] relative z-10 tracking-wide ${isActive ? 'font-semibold' : ''}`}
                >
                  {item.label}
                </motion.span>
              )}

              {/* Counter Badge */}
              {item.count !== undefined && !isCollapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`relative z-10 px-2 py-0.5 rounded-full text-[11px] font-bold min-w-[20px] text-center transition-colors duration-300 ${isActive
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 group-hover:bg-rose-200 dark:group-hover:bg-rose-900/60'
                    }`}
                >
                  {item.count}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6 opacity-60" />

      {/* Bottom Navigation */}
      <nav className="space-y-2" aria-label="Secondary Navigation">
        {bottomItems.map((item, index) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              id={`nav-item-${item.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + 0.1 * index, duration: 0.3 }}
              onClick={() => onViewChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index, bottomItems)}
              aria-label={`${item.label} view`}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 outline-none ${isActive
                ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/50 dark:hover:bg-white/10 focus-visible:bg-white/50 dark:focus-visible:bg-white/10'
                }`}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`text-lg opacity-80 ${isCollapsed ? 'mx-auto' : ''}`}>{item.icon}</span>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 text-left font-medium text-[14px]"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 dark:from-indigo-500/20 to-transparent pointer-events-none" />
    </motion.div>
  );
}
