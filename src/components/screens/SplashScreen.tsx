import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, CheckCircle2, Database, Lock, Bell, Cpu, Zap, Star } from 'lucide-react';
import { AppLogoIcon } from '../AppLogoIcon';

interface SplashScreenProps {
  onFinishLaunch: (destination: 'ONBOARDING' | 'LOGIN' | 'DASHBOARD') => void;
  isFirstInstall?: boolean;
  isLoggedIn?: boolean;
}

const INITIALIZATION_STEPS = [
  { id: 1, text: 'Menginisialisasi Secure Room Database...', icon: Database, category: 'STORAGE' },
  { id: 2, text: 'Sinkronisasi DataStore & Enkripsi Prefs...', icon: Cpu, category: 'SECURITY' },
  { id: 3, text: 'Verifikasi Autentikasi Biometrik & Sesi...', icon: Lock, category: 'AUTH' },
  { id: 4, text: 'Menyiapkan Notifikasi Real-time & WorkManager...', icon: Bell, category: 'SERVICES' },
  { id: 5, text: 'FZ Savings Premium Siap Digunakan', icon: Zap, category: 'READY' }
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinishLaunch,
  isFirstInstall = false,
  isLoggedIn = true
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < INITIALIZATION_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 320);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (currentStepIndex === INITIALIZATION_STEPS.length - 1) {
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
        }, 500);
      }, 700);

      return () => clearTimeout(exitTimer);
    }
  }, [currentStepIndex, isFirstInstall, isLoggedIn, onFinishLaunch]);

  const progressPercent = Math.round(((currentStepIndex + 1) / INITIALIZATION_STEPS.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.96 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-50 bg-[#090D16] text-white flex flex-col justify-between p-6 overflow-hidden select-none"
    >
      {/* Premium Multi-Layered Animated Ambient Gradient Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1],
            rotate: [0, 90, 180, 270],
            x: ['-50%', '-45%', '-55%', '-50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-[#6C4CF5]/15 rounded-full blur-[120px] opacity-60"
        />
        <motion.div
          animate={{
            scale: [0.9, 1.1, 1, 0.9],
            rotate: [0, -60, -120, -180],
            y: ['0%', '10%', '-5%', '0%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0ea5e9]/10 rounded-full blur-[100px] opacity-40"
        />
      </div>

      {/* Top Header Vault Security Tag */}
      <div className="pt-3 flex justify-between items-center z-10 text-[10px] font-mono tracking-wider text-indigo-300/80">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-[#6C4CF5] animate-pulse" />
          <span className="font-bold text-indigo-200">SECURE VAULT OS</span>
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.15 }}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 font-sans font-bold text-[10px] text-amber-400"
        >
          <Star className="w-3 h-3 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>PRO v2.5</span>
        </motion.div>
      </div>

      {/* Main Center Modern Minimalist Logo */}
      <div className="my-auto flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 14, 
            mass: 0.8
          }}
          whileHover={{ scale: 1.05 }}
          className="relative w-28 h-28 rounded-[32px] overflow-hidden shadow-2xl shadow-indigo-500/20 border border-indigo-500/30 mb-7 flex items-center justify-center bg-[#16181D]"
        >
          {/* Shimmer sweeping beam */}
          <motion.div
            animate={{
              x: ['-100%', '150%'],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10"
          />

          <AppLogoIcon size="2xl" className="w-full h-full rounded-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-black tracking-[0.25em] text-white uppercase font-sans">
            {"FZ SAVINGS".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3, delay: 0.3 + idx * 0.04 }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
          <p className="text-xs font-semibold text-slate-400 tracking-[0.15em] uppercase">
            Enterprise Financial Vault
          </p>
        </motion.div>
      </div>

      {/* Bottom Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 space-y-3.5 max-w-sm mx-auto w-full pb-4"
      >
        <div className="bg-slate-900/70 border border-slate-800 p-4.5 rounded-[24px] shadow-2xl backdrop-blur-xl space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span>Memuat sistem...</span>
            </span>
            <span className="font-mono font-bold text-cyan-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6C4CF5] via-indigo-500 to-cyan-400 rounded-full"
              initial={{ width: '5%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            />
          </div>

          <div className="pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 px-3.5 py-2.5 rounded-xl border border-slate-850"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  {React.createElement(INITIALIZATION_STEPS[currentStepIndex].icon, {
                    className: 'w-4 h-4 text-cyan-400 shrink-0 animate-bounce'
                  })}
                  <span className="font-medium truncate">{INITIALIZATION_STEPS[currentStepIndex].text}</span>
                </div>
                {currentStepIndex === INITIALIZATION_STEPS.length - 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2 animate-bounce" />
                ) : (
                  <span className="text-[9px] font-mono font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50 shrink-0 animate-pulse">
                    {INITIALIZATION_STEPS[currentStepIndex].category}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
