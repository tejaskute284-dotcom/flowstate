import { motion, AnimatePresence } from 'motion/react';
import { Search, Mail, Calendar, Clock, User, Hash, Command as CommandIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  type: 'email' | 'contact' | 'event' | 'action';
  title: string;
  subtitle: string;
  icon: any;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (result: SearchResult) => void;
}

export function CommandPalette({ isOpen, onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'email',
      title: 'Budget Approval Needed',
      subtitle: 'From Prasad Kulkarni',
      icon: Mail,
    },
    {
      id: '2',
      type: 'event',
      title: 'Design Review',
      subtitle: 'Tomorrow at 2:00 PM',
      icon: Calendar,
    },
    {
      id: '3',
      type: 'contact',
      title: 'Manasvi Sharma',
      subtitle: 'manasvi@company.com',
      icon: User,
    },
    {
      id: '4',
      type: 'action',
      title: 'Enable Focus Mode',
      subtitle: 'Block notifications',
      icon: Clock,
    },
  ];

  const filteredResults = query
    ? mockResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : mockResults;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        onSelect?.(filteredResults[selectedIndex]);
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, filteredResults, onClose, onSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div
              className="bg-white rounded-2xl overflow-hidden border border-[#ECF0F1]"
              style={{ boxShadow: 'var(--shadow-level-4)' }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#ECF0F1]">
                <Search className="w-5 h-5 text-[#95A5A6]" />
                <input
                  type="text"
                  placeholder="Search emails, contacts, events..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  autoFocus
                  className="flex-1 bg-transparent outline-none text-[#2C3E50] fs-body placeholder:text-[#95A5A6]"
                />
                <div className="flex items-center gap-1 text-[#95A5A6] fs-caption">
                  <CommandIcon className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredResults.length > 0 ? (
                  <div className="py-2">
                    {filteredResults.map((result, index) => {
                      const Icon = result.icon;
                      const isSelected = index === selectedIndex;

                      return (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className={`
                            flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors
                            ${isSelected ? 'bg-[#F5F8FF]' : 'hover:bg-[#FAFBFC]'}
                          `}
                          onClick={() => {
                            onSelect?.(result);
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div
                            className={`
                            w-10 h-10 rounded-lg flex items-center justify-center
                            ${
                              result.type === 'email'
                                ? 'bg-[#E3F2FD] text-[#2180E0]'
                                : result.type === 'event'
                                ? 'bg-[#F3E5F5] text-[#9C27B0]'
                                : result.type === 'contact'
                                ? 'bg-[#E8F5E9] text-[#27AE60]'
                                : 'bg-[#FFF7ED] text-[#FF6B35]'
                            }
                          `}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[#2C3E50] fs-body font-medium truncate">
                              {result.title}
                            </div>
                            <div className="text-[#95A5A6] fs-label truncate">
                              {result.subtitle}
                            </div>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-[#2180E0] fs-caption flex items-center gap-1"
                            >
                              <span>↵</span>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="text-6xl mb-3">🔍</div>
                    <p className="text-[#95A5A6] fs-body">No results found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-[#ECF0F1] bg-[#FAFBFC]">
                <div className="flex items-center gap-4 text-[#95A5A6] fs-caption">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white rounded border border-[#ECF0F1] text-xs">
                      ↑
                    </kbd>
                    <kbd className="px-2 py-1 bg-white rounded border border-[#ECF0F1] text-xs">
                      ↓
                    </kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white rounded border border-[#ECF0F1] text-xs">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white rounded border border-[#ECF0F1] text-xs">
                      Esc
                    </kbd>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
