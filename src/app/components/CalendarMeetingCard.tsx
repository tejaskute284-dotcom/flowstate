import { motion } from 'motion/react';
import { Mail, Users, MoreVertical, AlertCircle } from 'lucide-react';
import { useState } from 'react';

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

export function CalendarMeetingCard({
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
      }}
      className="relative"
      style={{ touchAction: 'none' }}
    >
      {/* Conflict Warning Banner */}
      {hasConflict && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: -12, opacity: 1 }}
          className="absolute left-4 -top-3 z-10 fs-gradient-focus text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5"
          style={{ boxShadow: 'var(--shadow-focus)' }}
        >
          <AlertCircle className="w-4 h-4" />
          {conflictMessage || 'Schedule Conflict'}
        </motion.div>
      )}

      <motion.div
        className="relative rounded-xl p-4 border-l-4 border-[#2180E0] fs-gradient-card-meeting cursor-grab active:cursor-grabbing"
        style={{
          boxShadow: isHovered || isDragging
            ? 'var(--shadow-level-2)'
            : 'var(--shadow-level-1)',
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="fs-heading-2 text-[#2C3E50] flex-1">{title}</h3>
          <button className="text-[#95A5A6] hover:text-[#2C3E50] transition-colors p-1 rounded hover:bg-white/50">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Time */}
        <div className="text-[#556674] fs-body mb-3">
          {startTime} - {endTime}
        </div>

        {/* Attendees */}
        <div className="flex items-center gap-2 text-[#556674] fs-label mb-3">
          <Users className="w-4 h-4" />
          <span>{attendees} attendees</span>
        </div>

        {/* Email Context Box (Glassmorphism) */}
        {emailContext && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="fs-glass-light rounded-lg p-3 mt-3"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#2180E0] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-[#556674] fs-label mb-1">
                  Email Context
                </div>
                <div className="text-[#2C3E50] fs-label italic">
                  "{emailContext.promise}"
                </div>
                <div className="text-[#95A5A6] fs-caption mt-1">
                  — {emailContext.sender}
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
          className="flex gap-2 mt-3 overflow-hidden"
        >
          <button className="flex-1 py-2 px-3 fs-gradient-meeting text-white rounded-lg fs-label font-semibold hover:shadow-lg transition-shadow">
            Accept
          </button>
          <button className="flex-1 py-2 px-3 bg-white text-[#2180E0] border border-[#2180E0] rounded-lg fs-label font-semibold hover:bg-[#F0F7FF] transition-colors">
            Decline
          </button>
          <button className="py-2 px-3 bg-white text-[#556674] border border-[#ECF0F1] rounded-lg fs-label font-semibold hover:bg-[#F5F5F5] transition-colors">
            Maybe
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
