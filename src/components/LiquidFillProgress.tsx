import React from 'react';
import { motion } from 'motion/react';

interface LiquidFillProgressProps {
  percentage: number;
  height?: string;
  className?: string;
  waveColor?: string;
  isCompleted?: boolean;
}

export const LiquidFillProgress: React.FC<LiquidFillProgressProps> = ({
  percentage,
  height = 'h-16',
  className = '',
  waveColor = 'from-indigo-500/30 via-cyan-500/40 to-emerald-500/40',
  isCompleted = false
}) => {
  const fillPercent = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden bg-slate-900/40 border border-white/10 ${className}`}>
      {/* Background Liquid fill level */}
      <motion.div
        className="absolute bottom-0 inset-x-0 w-full transition-all duration-700 ease-out"
        style={{ height: `${fillPercent}%` }}
      >
        {/* Animated Wave SVG on top edge */}
        <div className="absolute -top-3 left-0 right-0 w-[200%] h-4 pointer-events-none opacity-80">
          <motion.svg
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full text-indigo-400 fill-current"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,-20 1200,40 L1200,120 L0,120 Z" />
          </motion.svg>
        </div>

        {/* Liquid Gradient Body */}
        <div
          className={`w-full h-full bg-gradient-to-t ${
            isCompleted
              ? 'from-emerald-600/80 via-teal-500/70 to-emerald-400/60'
              : waveColor
          }`}
        />
      </motion.div>

      {/* Surface reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
