import { motion } from 'motion/react';
import { Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface EmailCardProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  intent: 'action' | 'meeting' | 'fyi';
  hasMeetingLink?: boolean;
  isExpanded?: boolean;
  threadContent?: string;
  onToggleExpand?: (id: string) => void;
  onArchive?: (id: string) => void;
}

export function EmailCard({
  id,
  sender,
  subject,
  preview,
  time,
  intent,
  hasMeetingLink = false,
  isExpanded = false,
  threadContent,
  onToggleExpand,
  onArchive,
}: EmailCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeStyle = () => {
    switch (intent) {
      case 'action':
        return 'fs-gradient-action text-white text-[11px] font-bold uppercase px-2 py-1 rounded fs-animate-pulse';
      case 'meeting':
        return 'bg-[#E3F2FD] text-[#2180E0] text-[11px] font-medium px-2 py-1 rounded border border-[#2180E0]';
      case 'fyi':
        return 'bg-[#F5F5F5] text-[#95A5A6] text-[11px] font-normal px-2 py-1 rounded opacity-80';
      default:
        return '';
    }
  };

  const getBadgeText = () => {
    switch (intent) {
      case 'action':
        return 'ACTION REQUIRED';
      case 'meeting':
        return 'MEETING-RELATED';
      case 'fyi':
        return 'FYI';
      default:
        return '';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      <motion.div
        className="bg-white rounded-xl p-5 cursor-pointer fs-hover-lift border border-transparent transition-all duration-200"
        style={{
          boxShadow: isHovered
            ? 'var(--shadow-level-2)'
            : 'var(--shadow-level-1)',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => onToggleExpand?.(id)}
        whileHover={{
          backgroundColor: '#F8FBFF',
          borderColor: '#E3F2FD',
          scale: 1.01,
        }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex flex-col gap-2">
          {/* Header with badge and sender */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <span className={getBadgeStyle()}>{getBadgeText()}</span>
              <span className="font-semibold text-[#2C3E50] fs-body truncate">
                {sender}
              </span>
            </div>
          </div>

          {/* Subject */}
          <div className="text-[#2C3E50] fs-body font-normal">{subject}</div>

          {/* Preview */}
          <div className="text-[#95A5A6] fs-body truncate">{preview}</div>

          {/* Footer with time and meeting indicator */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-[#95A5A6] fs-label">{time}</span>
            {hasMeetingLink && (
              <div className="flex items-center gap-1 text-[#2180E0] fs-label">
                <Calendar className="w-4 h-4" />
                <span>Meeting linked</span>
              </div>
            )}
          </div>

          {/* Action buttons on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.15, delay: isHovered ? 0.05 : 0 }}
            className="flex gap-2 overflow-hidden"
          >
            <motion.button
              initial={{ x: -10, opacity: 0 }}
              animate={{
                x: isHovered ? 0 : -10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="flex-1 py-2 px-4 fs-gradient-meeting text-white rounded-lg fs-label font-semibold hover:shadow-lg transition-shadow"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand?.(id);
              }}
            >
              View Thread
            </motion.button>
            <motion.button
              initial={{ x: -10, opacity: 0 }}
              animate={{
                x: isHovered ? 0 : -10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.15, delay: 0.1 }}
              className="py-2 px-4 bg-white text-[#2180E0] border-2 border-[#2180E0] rounded-lg fs-label font-semibold hover:bg-[#F0F7FF] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onArchive?.(id);
              }}
            >
              Archive
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded thread content */}
      {isExpanded && threadContent && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white rounded-xl p-5 overflow-hidden"
          style={{ boxShadow: 'var(--shadow-level-2)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="fs-heading-2 text-[#2C3E50]">Thread Content</h3>
            <button
              onClick={() => onToggleExpand?.(id)}
              className="text-[#95A5A6] hover:text-[#2C3E50] transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="text-[#556674] fs-body leading-relaxed">
            {threadContent}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-3 px-4 fs-gradient-success text-white rounded-lg fs-body font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Mark as Resolved
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
