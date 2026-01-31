import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar as CalendarIcon, Clock, Target, BarChart3, CheckCircle2, Zap } from 'lucide-react';
import { Sidebar } from '@/app/components/Sidebar';
import { SearchHeader } from '@/app/components/SearchHeader';
import { FocusBanner } from '@/app/components/FocusBanner';
import { EmailCard } from '@/app/components/EmailCard';
import { CalendarMeetingCard } from '@/app/components/CalendarMeetingCard';
import { StatCard } from '@/app/components/StatCard';
import { TimeBalanceBar } from '@/app/components/TimeBalanceBar';
import { CommandPalette } from '@/app/components/CommandPalette';
import { EmptyState } from '@/app/components/EmptyState';
import { BentoGrid, BentoCard } from '@/app/components/BentoGrid';
import { GradientOrbs } from '@/app/components/GradientOrbs';
import { InteractionsShowcase } from '@/app/components/InteractionsShowcase';
import { Switch } from '@/app/components/ui/switch';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [activeView, setActiveView] = useState('inbox');
  const [focusActive, setFocusActive] = useState(false);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mock data
  const actionEmails = [
    {
      id: '1',
      sender: 'Prasad Kulkarni',
      subject: 'Budget Approval Needed - Q2 Planning',
      preview: 'Can you review and approve the Q2 budget by end of day? We need to submit to finance...',
      time: '2:34 PM',
      intent: 'action' as const,
      hasMeetingLink: true,
      threadContent: 'Hi team, I need your approval on the Q2 budget proposal. We\'ve allocated 40% for engineering, 30% for marketing, and 30% for operations. Please review the attached spreadsheet and let me know if you have any concerns. We need to submit this to finance by EOD today to stay on schedule.',
    },
    {
      id: '2',
      sender: 'Manasvi Sharma',
      subject: 'Design Review Tomorrow',
      preview: 'Quick reminder about tomorrow\'s design review at 2 PM. I\'ve shared the latest mockups...',
      time: '1:15 PM',
      intent: 'action' as const,
      hasMeetingLink: true,
      threadContent: 'Hey everyone, just a reminder that we have the design review scheduled for tomorrow at 2 PM. I\'ve shared the latest mockups in Figma. Please take a look before the meeting so we can have a productive discussion. Looking forward to your feedback!',
    },
    {
      id: '3',
      sender: 'Kartik Desai',
      subject: 'Urgent: Production Issue',
      preview: 'We\'re seeing elevated error rates in production. Need your input on the database optimization...',
      time: '12:45 PM',
      intent: 'action' as const,
      threadContent: 'Team, we have an urgent situation. Our production database is showing elevated error rates (5% vs normal 0.1%). The issue started around 11:30 AM. Initial investigation suggests it might be related to the new indexing we deployed yesterday. Can you review the query patterns and suggest optimizations? This is affecting customer experience.',
    },
  ];

  const meetingRelatedEmails = [
    {
      id: '4',
      sender: 'Riya Patel',
      subject: 'Weekly Standup Notes',
      preview: 'Here are the notes from this morning\'s standup. Key action items highlighted...',
      time: '11:00 AM',
      intent: 'meeting' as const,
      hasMeetingLink: true,
    },
  ];

  const meetings = [
    {
      id: 'm1',
      title: 'Design Review',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      attendees: 5,
      emailContext: {
        sender: 'Manasvi Sharma',
        promise: 'You promised: Review designs before meeting',
      },
      hasConflict: false,
    },
    {
      id: 'm2',
      title: 'Q2 Budget Discussion',
      startTime: '3:30 PM',
      endTime: '4:30 PM',
      attendees: 8,
      emailContext: {
        sender: 'Prasad Kulkarni',
        promise: 'Approval needed by EOD',
      },
      hasConflict: true,
      conflictMessage: 'Overlaps with focus time',
    },
    {
      id: 'm3',
      title: 'Engineering Sync',
      startTime: '4:45 PM',
      endTime: '5:30 PM',
      attendees: 12,
      emailContext: {
        sender: 'Kartik Desai',
        promise: 'Need your input on database optimization',
      },
    },
  ];

  const handleEmailToggle = (id: string) => {
    setExpandedEmailId(expandedEmailId === id ? null : id);
  };

  const handleEmailArchive = (id: string) => {
    toast.success('Email archived successfully', {
      description: 'The email has been moved to your archive.',
      action: {
        label: 'Undo',
        onClick: () => toast.info('Email restored'),
      },
    });
  };

  const handleFocusToggle = (checked: boolean) => {
    setFocusActive(checked);
    if (checked) {
      toast.success('Focus Mode Activated', {
        description: 'You won\'t receive notifications until 5:00 PM',
      });
    } else {
      toast.info('Focus Mode Deactivated', {
        description: 'Notifications resumed',
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️ Good morning';
    if (hour < 18) return '🌤️ Good afternoon';
    return '🌙 Good evening';
  };

  return (
    <div className="h-screen flex bg-[#F5F5F5] overflow-hidden relative">
      <Toaster position="bottom-right" richColors />
      
      {/* Gradient Orbs Background */}
      <GradientOrbs variant="background" />
      
      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelect={(result) => {
          console.log('Selected:', result);
          toast.success(`Opening ${result.title}`);
        }}
      />
      
      {/* Focus Banner */}
      <FocusBanner
        isActive={focusActive}
        endTime="5:00 PM"
        onSettingsClick={() => setActiveView('settings')}
      />

      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${focusActive ? 'mt-14' : ''}`}>
        <SearchHeader onCommandPaletteOpen={() => setCommandPaletteOpen(true)} />

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* SCREEN 1: Intent-First Inbox */}
            {activeView === 'inbox' && (
              <motion.div
                key="inbox"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="fs-display text-[#2C3E50] mb-2">
                    Action Required
                  </h1>
                  <p className="text-[#556674] fs-body">
                    {actionEmails.length} emails need your decision
                  </p>
                </motion.div>

                <div className="space-y-4 max-w-4xl">
                  {actionEmails.map((email, index) => (
                    <motion.div
                      key={email.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EmailCard
                        {...email}
                        isExpanded={expandedEmailId === email.id}
                        onToggleExpand={handleEmailToggle}
                        onArchive={handleEmailArchive}
                      />
                    </motion.div>
                  ))}
                </div>

                {actionEmails.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <div className="text-8xl mb-4">🎉</div>
                    <h2 className="fs-heading-1 text-[#2C3E50] mb-2">
                      All caught up!
                    </h2>
                    <p className="text-[#95A5A6] fs-body mb-6">
                      No action-required emails
                    </p>
                    <button className="py-3 px-6 bg-white text-[#2180E0] border-2 border-[#2180E0] rounded-xl fs-body font-semibold hover:bg-[#F0F7FF] transition-colors">
                      View All Emails
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* SCREEN 2: Context-Aware Calendar */}
            {activeView === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="fs-display text-[#2C3E50] mb-2">
                    Today's Calendar
                  </h1>
                  <p className="text-[#556674] fs-body">
                    Saturday, January 31, 2026 • {meetings.length} meetings
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
                  {meetings.map((meeting, index) => (
                    <motion.div
                      key={meeting.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <CalendarMeetingCard {...meeting} />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 max-w-3xl bg-white rounded-2xl p-8 border border-[#ECF0F1]"
                  style={{ boxShadow: 'var(--shadow-level-1)' }}
                >
                  <h2 className="fs-heading-1 text-[#2C3E50] mb-4">
                    Email Context Integration
                  </h2>
                  <p className="text-[#556674] fs-body leading-relaxed mb-4">
                    Each meeting card shows relevant email commitments you made,
                    so you're always prepared. No more "Oh no, I forgot I promised
                    to review that!"
                  </p>
                  <div className="flex items-center gap-2 text-[#2180E0] fs-body font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Context preserved automatically</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SCREEN 3: Protected Focus Time */}
            {activeView === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="fs-display text-[#2C3E50] mb-2">
                    Focus Time Settings
                  </h1>
                  <p className="text-[#556674] fs-body">
                    Protect your deep work time
                  </p>
                </motion.div>

                <div className="max-w-3xl space-y-6">
                  {/* Focus Mode Toggle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 border border-[#ECF0F1]"
                    style={{ boxShadow: 'var(--shadow-level-1)' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex-1">
                        <h2 className="fs-heading-1 text-[#2C3E50] mb-2">
                          Enable Focus Mode
                        </h2>
                        <p className="text-[#556674] fs-body">
                          Block notifications and meeting requests during focus time
                        </p>
                      </div>
                      <Switch
                        checked={focusActive}
                        onCheckedChange={handleFocusToggle}
                        className="data-[state=checked]:bg-[#FF6B35]"
                      />
                    </div>

                    {focusActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-6 border-t border-[#ECF0F1]"
                      >
                        <p className="text-[#556674] fs-body mb-4">
                          Focus active until 5:00 PM
                        </p>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-[#F5F5F5] text-[#556674] rounded-lg fs-label font-medium hover:bg-[#ECF0F1] transition-colors">
                            Extend 1 hour
                          </button>
                          <button className="px-4 py-2 bg-[#F5F5F5] text-[#556674] rounded-lg fs-label font-medium hover:bg-[#ECF0F1] transition-colors">
                            End now
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Default Focus Hours */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 border border-[#ECF0F1]"
                    style={{ boxShadow: 'var(--shadow-level-1)' }}
                  >
                    <h2 className="fs-heading-1 text-[#2C3E50] mb-4">
                      Default Focus Hours
                    </h2>
                    <p className="text-[#556674] fs-body mb-6">
                      Set your preferred times for deep work
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg">
                        <span className="text-[#2C3E50] fs-body font-medium">
                          Morning Focus
                        </span>
                        <span className="text-[#556674] fs-body">
                          9:00 AM - 11:00 AM
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg">
                        <span className="text-[#2C3E50] fs-body font-medium">
                          Afternoon Focus
                        </span>
                        <span className="text-[#556674] fs-body">
                          2:00 PM - 4:00 PM
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Exceptions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 border border-[#ECF0F1]"
                    style={{ boxShadow: 'var(--shadow-level-1)' }}
                  >
                    <h2 className="fs-heading-1 text-[#2C3E50] mb-4">
                      Allow Interruptions From
                    </h2>
                    <p className="text-[#556674] fs-body mb-6">
                      Choose who can interrupt your focus time
                    </p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-lg cursor-pointer hover:bg-[#ECF0F1] transition-colors">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 text-[#2180E0] rounded"
                        />
                        <span className="text-[#2C3E50] fs-body">
                          Direct manager
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-lg cursor-pointer hover:bg-[#ECF0F1] transition-colors">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-[#2180E0] rounded"
                        />
                        <span className="text-[#2C3E50] fs-body">
                          Team leads
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-lg cursor-pointer hover:bg-[#ECF0F1] transition-colors">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-[#2180E0] rounded"
                        />
                        <span className="text-[#2C3E50] fs-body">
                          Emergency alerts only
                        </span>
                      </label>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: Dashboard (Cognitive Load) */}
            {activeView === 'resolved' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="fs-display text-[#2C3E50] mb-2">
                    {getGreeting()}, Kartik
                  </h1>
                  <p className="text-[#556674] fs-body">
                    Here's your communication health for today
                  </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={Mail}
                    value={3}
                    label="Emails Needing Action"
                    color="red"
                  />
                  <StatCard
                    icon={CalendarIcon}
                    value={5}
                    label="Meetings Today"
                    color="blue"
                  />
                  <StatCard
                    icon={Clock}
                    value={4}
                    label="Hours of Focus Time"
                    color="orange"
                  />
                  <StatCard
                    icon={Target}
                    value={12}
                    label="Tasks Completed"
                    color="green"
                  />
                </div>

                {/* Time Balance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-8 mb-8 max-w-4xl border border-[#ECF0F1]"
                  style={{ boxShadow: 'var(--shadow-level-1)' }}
                >
                  <h2 className="fs-heading-1 text-[#2C3E50] mb-6">
                    Time Balance Today
                  </h2>
                  <TimeBalanceBar focusTime={60} meetings={22} emailTasks={18} />
                  <div className="flex gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 fs-gradient-meeting rounded-full" />
                      <span className="text-[#556674] fs-label">
                        Focus Time (60%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#95A5A6] rounded-full" />
                      <span className="text-[#556674] fs-label">
                        Meetings (22%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#BDC3C7] rounded-full" />
                      <span className="text-[#556674] fs-label">
                        Email/Tasks (18%)
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Priority Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-8 max-w-4xl border border-[#ECF0F1]"
                  style={{ boxShadow: 'var(--shadow-level-1)' }}
                >
                  <h2 className="fs-heading-1 text-[#2C3E50] mb-6">
                    Priority Actions
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl">
                      <div className="w-2 h-2 bg-[#E74C3C] rounded-full fs-animate-pulse" />
                      <div className="flex-1">
                        <p className="text-[#2C3E50] fs-body font-medium">
                          Budget approval needed by EOD
                        </p>
                        <p className="text-[#95A5A6] fs-label">
                          From Prasad Kulkarni
                        </p>
                      </div>
                      <button className="px-4 py-2 fs-gradient-action text-white rounded-lg fs-label font-semibold hover:shadow-lg transition-shadow">
                        Review Now
                      </button>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#EFF6FF] border border-[#93C5FD] rounded-xl">
                      <div className="w-2 h-2 bg-[#2180E0] rounded-full" />
                      <div className="flex-1">
                        <p className="text-[#2C3E50] fs-body font-medium">
                          Design review at 2:00 PM
                        </p>
                        <p className="text-[#95A5A6] fs-label">
                          Prepare mockup feedback
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-white text-[#2180E0] border-2 border-[#2180E0] rounded-lg fs-label font-semibold hover:bg-[#F0F7FF] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SCREEN 4: Thread Continuity (FYI view) */}
            {activeView === 'fyi' && (
              <motion.div
                key="thread"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="fs-display text-[#2C3E50] mb-2">
                    Thread Continuity
                  </h1>
                  <p className="text-[#556674] fs-body">
                    See the full conversation across emails and meetings
                  </p>
                </motion.div>

                <div className="max-w-4xl">
                  {/* Pinned Action Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FEF2F2] rounded-2xl p-6 mb-8 border-2 border-[#E74C3C]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 fs-gradient-action rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="fs-heading-1 text-[#2C3E50]">
                        Pinned Commitment
                      </h2>
                    </div>
                    <p className="text-[#2C3E50] fs-body font-medium mb-2">
                      "I'll review the designs before tomorrow's meeting"
                    </p>
                    <p className="text-[#95A5A6] fs-label">
                      Promise made to Manasvi Sharma • 2 days ago
                    </p>
                  </motion.div>

                  {/* Timeline */}
                  <div className="relative pl-8 space-y-8">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#ECF0F1]" />

                    {/* Email 1 */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute -left-[30px] w-6 h-6 bg-[#2180E0] rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-[#ECF0F1]" style={{ boxShadow: 'var(--shadow-level-1)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#2C3E50] fs-body font-semibold">
                            Manasvi Sharma
                          </span>
                          <span className="text-[#95A5A6] fs-label">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-[#556674] fs-body">
                          "Hey team, I've uploaded the latest design mockups for the new dashboard. Would love to get your feedback before our review meeting on Friday. Particularly interested in thoughts on the color scheme and information hierarchy."
                        </p>
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#FFF7ED] text-[#FF6B35] rounded-lg fs-label font-medium">
                          <span>⚡</span>
                          <span>Commitment: Review before meeting</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Your Response */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute -left-[30px] w-6 h-6 bg-[#27AE60] rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-[#ECF0F1]" style={{ boxShadow: 'var(--shadow-level-1)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#2C3E50] fs-body font-semibold">
                            You replied
                          </span>
                          <span className="text-[#95A5A6] fs-label">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-[#556674] fs-body">
                          "Looks great! I'll review the designs tonight and have feedback ready for Friday's meeting. The color scheme looks modern."
                        </p>
                      </div>
                    </motion.div>

                    {/* Meeting */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <div className="absolute -left-[30px] w-6 h-6 bg-[#2180E0] rounded-full flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-xl p-6 border-l-4 border-[#2180E0] fs-gradient-card-meeting">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#2C3E50] fs-body font-semibold">
                            Design Review Meeting
                          </span>
                          <span className="text-[#95A5A6] fs-label">
                            Tomorrow at 2:00 PM
                          </span>
                        </div>
                        <p className="text-[#556674] fs-body mb-3">
                          Meeting with Manasvi Sharma and design team
                        </p>
                        <div className="fs-glass-light rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-[#2C3E50] fs-label font-medium">
                                Your commitment from email thread
                              </p>
                              <p className="text-[#556674] fs-label italic mt-1">
                                "I'll review the designs tonight"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile View */}
            {activeView === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="fs-display text-[#2C3E50] mb-2">Profile</h1>
                  <p className="text-[#556674] fs-body">
                    Manage your account settings
                  </p>
                </motion.div>

                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 border border-[#ECF0F1]"
                    style={{ boxShadow: 'var(--shadow-level-1)' }}
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#2180E0] to-[#1A6FCC] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        K
                      </div>
                      <div className="flex-1">
                        <h2 className="fs-heading-1 text-[#2C3E50] mb-1">
                          Kartik Desai
                        </h2>
                        <p className="text-[#556674] fs-body">
                          kartik.desai@company.com
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-[#F5F5F5] rounded-lg">
                        <p className="text-[#95A5A6] fs-label mb-1">Role</p>
                        <p className="text-[#2C3E50] fs-body font-medium">
                          Senior Product Manager
                        </p>
                      </div>
                      <div className="p-4 bg-[#F5F5F5] rounded-lg">
                        <p className="text-[#95A5A6] fs-label mb-1">
                          Member since
                        </p>
                        <p className="text-[#2C3E50] fs-body font-medium">
                          January 2024
                        </p>
                      </div>
                      <div className="p-4 bg-[#F5F5F5] rounded-lg">
                        <p className="text-[#95A5A6] fs-label mb-1">
                          Email decisions reduced by
                        </p>
                        <p className="text-[#27AE60] fs-heading-1 font-bold">
                          93%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}