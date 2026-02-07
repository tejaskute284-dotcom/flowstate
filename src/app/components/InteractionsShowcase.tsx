import { motion } from 'motion/react';
import { useState } from 'react';
import { Check } from 'lucide-react';

export function InteractionsShowcase() {
  const [buttonState, setButtonState] = useState<'default' | 'hover' | 'active'>('default');
  const [toggleState, setToggleState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Button States */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Button States</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Hover and click to see squash & stretch
        </p>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(33,128,224,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 fs-gradient-meeting text-white rounded-lg fs-body font-semibold"
            style={{ boxShadow: 'var(--shadow-meeting)' }}
          >
            Primary Action
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'var(--color-bg-elevated)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-[var(--color-bg-card)] text-[var(--color-meeting)] border-2 border-[var(--color-meeting)] rounded-lg fs-body font-semibold"
          >
            Secondary Action
          </motion.button>
        </div>
      </div>

      {/* Toggle States */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Toggle Animation</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Smooth thumb slide with elastic bounce
        </p>
        <div className="flex items-center justify-center">
          <motion.button
            onClick={() => setToggleState(!toggleState)}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${toggleState ? 'bg-[#FF6B35]' : 'bg-[#E0E0E0]'
              }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 bg-[var(--color-bg-card)] rounded-full shadow-md"
              animate={{
                left: toggleState ? '36px' : '4px',
              }}
              transition={{
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1], // Elastic bounce
              }}
            />
          </motion.button>
        </div>
        <p className="text-center text-[var(--color-text-secondary)] fs-caption mt-4">
          {toggleState ? 'ON' : 'OFF'}
        </p>
      </div>

      {/* Checkbox Animation */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Checkbox States</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Click to see elastic bounce effect
        </p>
        <div className="flex items-center justify-center">
          <motion.button
            onClick={() => setCheckboxState(!checkboxState)}
            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${checkboxState
              ? 'fs-gradient-success border-transparent'
              : 'border-[var(--color-divider)] bg-[var(--color-bg-card)]'
              }`}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: checkboxState ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: checkboxState ? 1 : 0,
                opacity: checkboxState ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-6 h-6 text-white" strokeWidth={3} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Card Hover */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Card Hover</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Multi-stage hover with lift effect
        </p>
        <motion.div
          whileHover={{
            y: -4,
            scale: 1.02,
            boxShadow: 'var(--shadow-level-2)',
          }}
          transition={{ duration: 0.2 }}
          className="bg-[#F5F8FF] border border-[#E3F2FD] rounded-xl p-4 cursor-pointer"
          style={{ boxShadow: 'var(--shadow-level-1)' }}
        >
          <div className="text-[var(--color-text-primary)] fs-body font-medium mb-1">
            Hover me
          </div>
          <div className="text-[var(--color-text-tertiary)] fs-label">
            Watch the subtle lift
          </div>
        </motion.div>
      </div>

      {/* Input Focus */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Input Focus</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Click to see blue glow appear
        </p>
        <motion.input
          type="text"
          placeholder="Type something..."
          whileFocus={{
            borderColor: '#2180E0',
            boxShadow: '0 0 0 4px rgba(33,128,224,0.1)',
          }}
          transition={{ duration: 0.2 }}
          className="w-full px-4 py-3 border-2 border-[var(--color-divider)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] rounded-lg fs-body outline-none transition-all"
        />
      </div>

      {/* Badge Pulse */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Badge Pulse</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Continuous pulse for urgency
        </p>
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="fs-gradient-action text-white text-xs font-bold uppercase px-3 py-2 rounded"
          >
            Action Required
          </motion.div>
        </div>
      </div>

      {/* Drag Preview */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Drag Behavior</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Drag to see lift & rotation
        </p>
        <div className="flex justify-center">
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileDrag={{
              scale: 1.05,
              rotate: -2,
              cursor: 'grabbing',
              boxShadow: 'var(--shadow-level-3)',
            }}
            className="bg-[#E3F2FD] border-l-4 border-[#2180E0] rounded-lg p-4 cursor-grab"
          >
            <div className="text-[#2C3E50] fs-label font-medium">
              Drag me
            </div>
          </motion.div>
        </div>
      </div>

      {/* Expand Preview */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Expand Animation</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Click to see height transition
        </p>
        <motion.div
          layout
          onClick={() => { }}
          className="bg-[#F5F5F5] rounded-lg overflow-hidden cursor-pointer"
        >
          <div className="p-4">
            <div className="text-[#2C3E50] fs-body font-medium">
              Click to expand
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide In */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-divider)] fs-card-3d" style={{ boxShadow: 'var(--shadow-level-1)' }}>
        <h3 className="fs-heading-2 text-[var(--color-text-primary)] mb-4">Slide Animation</h3>
        <p className="text-[var(--color-text-tertiary)] fs-label mb-6">
          Elements slide in with stagger
        </p>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="bg-[#F5F8FF] rounded-lg p-3 text-[#556674] fs-label"
            >
              Item {i + 1}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
