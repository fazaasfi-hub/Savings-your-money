import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppLogoIcon } from '../AppLogoIcon';

interface SplashScreenProps {
  onFinishLaunch: (destination: 'ONBOARDING' | 'LOGIN' | 'DASHBOARD') => void;
  isFirstInstall?: boolean;
  isLoggedIn?: boolean;
}

const LOADING_STATUSES = [
  'Mempersiapkan akun...',
  'Menyiapkan enkripsi data...',
  'Sinkronisasi saldo & target...',
  'Hampir selesai...'
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinishLaunch,
  isFirstInstall = false,
  isLoggedIn = true
}) => {
  const [phase, setPhase] = useState<'BOX_OUTLINE' | 'ICON_FILLED' | 'LOADING'>('BOX_OUTLINE');
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Phase transitions: Outline -> Icon fill -> Progress Bar
  useEffect(() => {
    // Phase 1: Icon fills in after 500ms
    const fillTimer = setTimeout(() => {
      setPhase('ICON_FILLED');
    }, 500);

    // Phase 2: Loading progress bar appears at 1200ms
    const progressTimer = setTimeout(() => {
      setPhase('LOADING');
    }, 1100);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  // Cycle progress steps once in LOADING phase
  useEffect(() => {
    if (phase !== 'LOADING') return;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STATUSES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 420);

    return () => clearInterval(stepInterval);
  }, [phase]);

  // Exit trigger when loading finishes
  useEffect(() => {
    if (phase === 'LOADING' && currentStep === LOADING_STATUSES.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (isFirstInstall) {
            onFinishLaunch('ONBOARDING');
          } else if (!isLoggedIn) {
            onFinishLaunch('LOGIN');
          } else {
            onFinishLaunch('DASHBOARD');
          }
        }, 450);
      }, 400);

      return () => clearTimeout(exitTimer);
    }
  }, [phase, currentStep, isFirstInstall, isLoggedIn, onFinishLaunch]);

  const progressPercent = phase === 'LOADING'
    ? Math.round(((currentStep + 1) / LOADING_STATUSES.length) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.98 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-50 bg-[#0A0D18] text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-80 h-80 bg-[#6C4CF5]/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-xs space-y-6">
        
        {/* Phase 1 & 2: Box & Icon Animation */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glowing outer ring when box/icon is active */}
            <motion.div
              animate={{
                scale: phase === 'BOX_OUTLINE' ? [1, 1.08, 1] : [1, 1.12, 1],
                opacity: phase === 'BOX_OUTLINE' ? [0.3, 0.6, 0.3] : [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 bg-gradient-to-r from-[#6C4CF5] to-cyan-400 rounded-3xl blur-md"
            />

            {/* Box container that smoothly transitions from outline to filled */}
            <motion.div
              animate={{
                backgroundColor: phase === 'BOX_OUTLINE' ? 'rgba(18, 22, 41, 0.2)' : 'rgba(18, 22, 41, 1)',
                borderColor: phase === 'BOX_OUTLINE' ? 'rgba(108, 76, 245, 0.8)' : 'rgba(255, 255, 255, 0.12)'
              }}
              transition={{ duration: 0.5 }}
              className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-3xl border-2 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              {/* App Icon: Fades/scales in during ICON_FILLED phase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: phase !== 'BOX_OUTLINE' ? 1 : 0,
                  scale: phase !== 'BOX_OUTLINE' ? 1 : 0.6
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <AppLogoIcon size="2xl" className="w-full h-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Title & Tagline: Appears along with the Icon */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: phase !== 'BOX_OUTLINE' ? 1 : 0,
              y: phase !== 'BOX_OUTLINE' ? 0 : 8
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="text-2xl font-black tracking-widest text-white uppercase">
              FZ SAVINGS
            </h1>
            <p className="text-xs font-medium text-slate-400 tracking-wider">
              Aplikasi Tabungan Digital
            </p>
          </motion.div>
        </div>

        {/* Phase 3: Progress Bar Morphs / Appears underneath */}
        <motion.div
          initial={{ opacity: 0, y: 12, height: 0 }}
          animate={{
            opacity: phase === 'LOADING' ? 1 : 0,
            y: phase === 'LOADING' ? 0 : 12,
            height: phase === 'LOADING' ? 'auto' : 0
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full space-y-2.5 pt-1 overflow-hidden"
        >
          <div className="w-full bg-slate-900/90 h-1.5 rounded-full overflow-hidden p-0 border border-white/10 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6C4CF5] via-indigo-500 to-cyan-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>

          <div className="h-5 flex items-center justify-between text-xs text-slate-400 font-medium px-0.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.18 }}
              >
                {LOADING_STATUSES[currentStep]}
              </motion.span>
            </AnimatePresence>
            <span className="font-mono font-bold text-indigo-400 text-[11px]">{progressPercent}%</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
