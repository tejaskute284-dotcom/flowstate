import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { Sidebar } from '@/app/components/Sidebar';
import { SearchHeader } from '@/app/components/SearchHeader';
import { FocusBanner } from '@/app/components/FocusBanner';
import { CommandPalette, SearchResult } from '@/app/components/CommandPalette';
import { GradientOrbs } from '@/app/components/GradientOrbs';
import { ScrollProgress } from '@/app/components/ScrollProgress';
import { Toaster, toast } from 'sonner';

// Import Views
import { InboxView } from '@/app/views/InboxView';
import { CalendarView } from '@/app/views/CalendarView';
import { DashboardView } from '@/app/views/DashboardView';
import { SettingsView } from '@/app/views/SettingsView';
import { ThreadView } from '@/app/views/ThreadView';
import { ProfileView } from '@/app/views/ProfileView';

// Import Mock Data
import { actionEmails, meetings } from '@/app/data/mockData';
import { pageVariants } from '@/app/lib/pageTransitions';

export default function App() {
  const [activeView, setActiveView] = useState('inbox');
  const [focusActive, setFocusActive] = useState(false);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      wrapper: scrollContainerRef.current,
      content: contentRef.current,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
        description: "You won't receive notifications until 5:00 PM",
      });
    } else {
      toast.info('Focus Mode Deactivated', {
        description: 'Notifications resumed',
      });
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'inbox':
        return (
          <InboxView
            emails={actionEmails}
            expandedEmailId={expandedEmailId}
            onEmailToggle={handleEmailToggle}
            onEmailArchive={handleEmailArchive}
          />
        );
      case 'calendar':
        return <CalendarView meetings={meetings} />;
      case 'resolved':
        return <DashboardView actionEmailsCount={actionEmails.length} />;
      case 'settings':
        return (
          <SettingsView
            focusActive={focusActive}
            onFocusToggle={handleFocusToggle}
          />
        );
      case 'fyi':
        return <ThreadView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <InboxView
          emails={actionEmails}
          expandedEmailId={expandedEmailId}
          onEmailToggle={handleEmailToggle}
          onEmailArchive={handleEmailArchive}
        />;
    }
  };

  return (
    <div className="h-screen flex bg-[var(--color-bg-base)] fs-ambient-bg overflow-hidden relative font-sans text-[var(--color-text-primary)]">
      <Toaster position="bottom-right" richColors />

      {/* Gradient Orbs Background */}
      <GradientOrbs variant="background" />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelect={(result: SearchResult) => {
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
      <div className={`hidden md:block transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] z-[70] md:hidden"
            >
              <Sidebar
                activeView={activeView}
                onViewChange={(view) => {
                  setActiveView(view);
                  setIsMobileMenuOpen(false);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${focusActive ? 'mt-14 scale-[0.99] origin-top' : ''}`}>
        <SearchHeader
          onCommandPaletteOpen={() => setCommandPaletteOpen(true)}
          onMenuToggle={() => setIsMobileMenuOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div id="scroll-container" ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          <div ref={contentRef} className="min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
