import { motion } from 'motion/react';
import { Mail, Users, MoreVertical, AlertCircle } from 'lucide-react';
import { useState, memo } from 'react';

interface CalendarMeetingCardProps {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: number;
  emailContext?: {
    sender: string;
    promise: string;
  };
  hasConflict?: boolean;
  conflictMessage?: string;
}

function CalendarMeetingCardComponent({
  id,
  title,
  startTime,
  endTime,
  attendees,
  emailContext,
  hasConflict = false,
  conflictMessage,
}: CalendarMeetingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      layout
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{
        scale: 1.05,
        opacity: 0.9,
        rotate: -2,
        boxShadow: 'var(--shadow-level-3)',
        cursor: 'grabbing',
        zIndex: 50,
      }}
      className="relative group"
      style={{ touchAction: 'none' }}
    >
      {/* Conflict Warning Banner */}
      {hasConflict && (
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: -12, opacity: 1 }}
          className="absolute left-4 top-0 z-0 bg-[var(--color-focus)] text-white text-[10px] font-bold px-2 py-0.5 rounded-t-md flex items-center gap-1 shadow-sm uppercase tracking-wider dark:shadow-[0_0_10px_rgba(251,146,60,0.3)]"
        >
          <AlertCircle className="w-3 h-3" />
          {conflictMessage || 'Conflict'}
        </motion.div>
      )}

      <motion.div
        className={`relative rounded-2xl p-5 border bg-[var(--color-bg-card)] transition-all duration-300 overflow-hidden fs-card-3d focus-visible:ring-2 focus-visible:ring-[var(--color-meeting)] focus-visible:ring-offset-2 outline-none ${hasConflict ? 'border-orange-200 ring-1 ring-orange-100 dark:border-orange-800 dark:ring-orange-900/50' : 'border-[var(--color-divider)]'
          } ${isHovered || isDragging ? 'shadow-xl -translate-y-1' : 'shadow-sm'}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`Meeting: ${title} from ${startTime} to ${endTime} with ${attendees} attendees. ${hasConflict ? `Conflict: ${conflictMessage || 'Overlaps'}` : ''}`}
      >
        {/* Left Accent Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${hasConflict ? 'bg-[var(--color-focus)]' : 'bg-[var(--color-meeting)]'}`} />

        {/* Header */}
        <div className="flex items-start justify-between mb-2 pl-2">
          <div className="flex-1">
            <h3 className="font-bold text-[var(--color-text-primary)] text-[16px] leading-tight font-heading group-hover:text-[var(--color-meeting)] transition-colors">
              {title}
            </h3>
          </div>
          <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors p-1 rounded-full hover:bg-[var(--color-bg-light)] opacity-0 group-hover:opacity-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Time & Attendees */}
        <div className="pl-2 flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm font-medium">
            <span className={`${hasConflict ? 'text-[var(--color-focus)]' : 'text-[var(--color-meeting)]'}`}>
              {startTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
            <span>{endTime}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] text-xs font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>{attendees} attendees</span>
          </div>
        </div>

        {/* Email Context Box (Glassmorphism) */}
        {emailContext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 bg-blue-50/50 dark:bg-blue-500/10 rounded-xl p-3 border border-blue-100/50 dark:border-blue-500/20 relative overflow-hidden group/context fs-glass"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-transparent backdrop-blur-sm -z-10" />

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5 opacity-70">
                  Context
                </div>
                <div className="text-[var(--color-text-secondary)] text-xs font-medium italic leading-relaxed">
                  "{emailContext.promise}"
                </div>
                <div className="text-[var(--color-text-tertiary)] text-[10px] font-medium mt-1.5 flex items-center gap-1">
                  <span className="w-3 h-px bg-[var(--color-text-tertiary)]" />
                  {emailContext.sender}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons on Hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0,
          }}
          transition={{ duration: 0.2 }}
          className="flex gap-2 mt-4 ml-2 overflow-hidden"
        >
          <button
            className="flex-1 py-1.5 px-3 bg-[var(--color-meeting)] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            aria-label={`Join ${title} meeting`}
          >
            Join
          </button>
          <button
            className="px-3 py-1.5 bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-divider)] rounded-lg text-xs font-semibold hover:bg-[var(--color-bg-light)] transition-colors"
            aria-label={`Reschedule ${title} meeting`}
          >
            Reschedule
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export const CalendarMeetingCard = memo(CalendarMeetingCardComponent);
