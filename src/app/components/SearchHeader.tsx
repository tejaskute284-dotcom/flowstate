import { motion } from 'motion/react';
import { Search, Command, Menu, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useState } from 'react';
import { ThemeSwitch } from './ThemeSwitch';

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  onCommandPaletteOpen?: () => void;
  onMenuToggle?: () => void;
  isSidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export function SearchHeader({
  onSearch,
  onCommandPaletteOpen,
  onMenuToggle,
  isSidebarCollapsed,
  onSidebarToggle
}: SearchHeaderProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      onCommandPaletteOpen?.();
    }
  };

  return (
    <div className="w-full bg-[var(--color-bg-card)] border-b border-[var(--color-divider)] px-6 py-4 flex items-center gap-4 transition-colors">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuToggle}
        className="p-2 -ml-2 text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-light)] rounded-lg md:hidden transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Toggle (Desktop) */}
      <button
        onClick={onSidebarToggle}
        className="p-2 -ml-2 text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-light)] rounded-lg hidden md:block transition-colors"
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 max-w-2xl"
      >
        <div className="relative">
          <motion.div
            animate={{
              borderColor: isFocused ? 'var(--color-meeting)' : 'var(--color-divider)',
              boxShadow: isFocused
                ? 'var(--shadow-glow-sm)'
                : '0 0 0 0px rgba(59,130,246,0.1)',
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-surface)] border-2 rounded-xl px-4 py-3 transition-all cursor-text fs-glass"
            onClick={() => onCommandPaletteOpen?.()}
            role="search"
            aria-label="Search and Commands"
          >
            <Search className="w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type="text"
              placeholder="Search emails, contacts... (⌘K)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent outline-none text-[var(--color-text-primary)] fs-body placeholder:text-[var(--color-text-tertiary)]"
              aria-label="Search input"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 text-[var(--color-text-tertiary)] fs-caption px-2 py-1 bg-[var(--color-bg-light)] rounded"
            >
              <Command className="w-3 h-3" />
              <span>K</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Theme Switch - Top Right */}
      <div className="ml-auto">
        <ThemeSwitch />
      </div>
    </div>
  );
}
