import { motion } from 'motion/react';
import { Search, Command } from 'lucide-react';
import { useState } from 'react';

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  onCommandPaletteOpen?: () => void;
}

export function SearchHeader({ onSearch, onCommandPaletteOpen }: SearchHeaderProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      onCommandPaletteOpen?.();
    }
  };

  return (
    <div className="w-full bg-white border-b border-[#ECF0F1] px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl"
      >
        <div className="relative">
          <motion.div
            animate={{
              borderColor: isFocused ? '#2180E0' : '#E0E0E0',
              boxShadow: isFocused
                ? '0 0 0 4px rgba(33,128,224,0.1)'
                : '0 0 0 0px rgba(33,128,224,0.1)',
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-all cursor-text"
            onClick={() => onCommandPaletteOpen?.()}
          >
            <Search className="w-5 h-5 text-[#95A5A6]" />
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
              className="flex-1 bg-transparent outline-none text-[#2C3E50] fs-body placeholder:text-[#95A5A6]"
            />
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 text-[#95A5A6] fs-caption px-2 py-1 bg-[#F5F5F5] rounded"
            >
              <Command className="w-3 h-3" />
              <span>K</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}