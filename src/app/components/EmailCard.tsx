import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { useState, memo } from 'react';

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

function EmailCardComponent({
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
        return 'bg-red-50 text-[var(--color-action-required)] border-red-100 ring-1 ring-[var(--color-action-required)]/10 dark:bg-red-500/10 dark:border-red-500/20';
      case 'meeting':
        return 'bg-blue-50 text-[var(--color-meeting)] border-blue-100 ring-1 ring-[var(--color-meeting)]/10 dark:bg-blue-500/10 dark:border-blue-500/20';
      case 'fyi':
        return 'bg-slate-50 text-[var(--color-text-tertiary)] border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50';
      default:
        return '';
    }
  };

  const getBadgeIcon = () => {
    switch (intent) {
      case 'action': return <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-action-required)] animate-pulse" />;
      case 'meeting': return <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-meeting)]" />;
      case 'fyi': return <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)]" />;
      default: return null;
    }
  };

  const getBadgeText = () => {
    switch (intent) {
      case 'action': return 'Action Required';
      case 'meeting': return 'Meeting';
      case 'fyi': return 'FYI';
      default: return '';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <motion.div
        className={`rounded-3xl p-5 cursor-pointer border transition-all duration-300 relative overflow-hidden fs-card-3d focus-visible:ring-2 focus-visible:ring-[var(--color-meeting)] focus-visible:ring-offset-2 outline-none ${isExpanded
          ? 'bg-[var(--color-bg-card)] shadow-xl ring-1 ring-black/5 dark:ring-[var(--color-meeting)]/20 border-transparent'
          : 'bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-light)] border-[var(--color-divider)] hover:border-[var(--color-divider)] hover:shadow-lg'
          }`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => onToggleExpand?.(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleExpand?.(id);
          }
        }}
        whileTap={{ scale: 0.995 }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${getBadgeText()}: ${subject} from ${sender}`}
      >
        <div className="flex flex-col gap-3 relative z-10">
          {/* Header with badge and sender */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <span className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${getBadgeStyle()}`}>
                {getBadgeIcon()}
                {getBadgeText()}
              </span>
              <span className="font-semibold text-[var(--color-text-primary)] text-[15px] truncate font-heading">
                {sender}
              </span>
            </div>
            <span className="text-[var(--color-text-tertiary)] text-xs font-medium font-mono">{time}</span>
          </div>

          {/* Subject */}
          <div className={`text-[15px] font-medium transition-colors ${isExpanded ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
            {subject}
          </div>

          {/* Preview */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--color-text-secondary)] text-sm truncate leading-relaxed"
            >
              {preview}
            </motion.div>
          )}

          {/* Meeting Link Indicator */}
          {hasMeetingLink && !isExpanded && (
            <div className="flex items-center gap-1.5 text-[var(--color-meeting)] text-xs font-medium mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Meeting linked</span>
            </div>
          )}

          {/* Action buttons on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered && !isExpanded ? 1 : 0,
              height: isHovered && !isExpanded ? 'auto' : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex gap-2 overflow-hidden"
          >
            <button
              className="flex-1 py-2 px-4 bg-[var(--color-meeting)] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand?.(id);
              }}
            >
              View Thread
            </button>
            <button
              className="py-2 px-4 bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-divider)] rounded-xl text-xs font-semibold hover:bg-[var(--color-bg-light)] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onArchive?.(id);
              }}
            >
              Archive
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded thread content */}
      <AnimatePresence>
        {isExpanded && threadContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--color-bg-light)] rounded-b-2xl border-x border-b border-[var(--color-divider)] p-6 -mt-2 pt-8 relative z-0 mx-2 mb-2">
              <div className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-6">
                {threadContent}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle resolve
                  }}
                  className="flex-1 py-2.5 px-4 bg-[var(--color-success)] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Resolved
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive?.(id);
                  }}
                  className="px-4 py-2.5 bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-divider)] rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-light)] transition-colors"
                >
                  Archive
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const EmailCard = memo(EmailCardComponent);
