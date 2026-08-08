import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Target, Sparkles, Wallet, ShieldCheck, Flame, Zap } from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export const RingingBellIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, onClick }) => {
  const [isRinging, setIsRinging] = useState(false);

  const handleClick = () => {
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 800);
    if (onClick) onClick();
  };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer inline-flex items-center justify-center select-none"
      animate={isRinging ? { rotate: [0, -20, 20, -15, 15, -5, 5, 0] } : {}}
      transition={{ duration: 0.8 }}
      whileTap={{ scale: 0.85 }}
    >
      <Bell className={className} size={size} />
    </motion.div>
  );
};

export const SpinningTargetIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, onClick }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 700);
    if (onClick) onClick();
  };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer inline-flex items-center justify-center select-none"
      animate={isSpinning ? { rotate: 360, scale: [1, 1.25, 1] } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      whileTap={{ scale: 0.85 }}
    >
      <Target className={className} size={size} />
    </motion.div>
  );
};

export const PulsingSparklesIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, onClick }) => {
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);
    if (onClick) onClick();
  };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer inline-flex items-center justify-center select-none"
      animate={isPulsing ? { scale: [1, 1.4, 0.9, 1.1, 1], rotate: [0, 15, -15, 0] } : {}}
      transition={{ duration: 0.6 }}
      whileTap={{ scale: 0.85 }}
    >
      <Sparkles className={className} size={size} />
    </motion.div>
  );
};

export const BouncingWalletIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, onClick }) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);
    if (onClick) onClick();
  };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer inline-flex items-center justify-center select-none"
      animate={isBouncing ? { y: [0, -8, 0, -4, 0] } : {}}
      transition={{ duration: 0.6 }}
      whileTap={{ scale: 0.85 }}
    >
      <Wallet className={className} size={size} />
    </motion.div>
  );
};
