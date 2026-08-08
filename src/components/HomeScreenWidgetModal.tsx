import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Goal, SavingsAccount } from '../types';
import { formatCurrency } from '../utils/formatters';
import { X, Smartphone, Target, Sparkles, Check, Download, Layers, ShieldCheck, PlusCircle, RefreshCw, Zap } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { translateText } from '../utils/translations';

interface HomeScreenWidgetModalProps {
  goals: Goal[];
  accounts: SavingsAccount[];
  currency: string;
  isDark: boolean;
  language?: string;
  onClose: () => void;
  onQuickDeposit?: (goalId: string, amount: number) => void;
}

export const HomeScreenWidgetModal: React.FC<HomeScreenWidgetModalProps> = ({
  goals,
  accounts,
  currency,
  isDark,
  language = 'ID',
  onClose,
  onQuickDeposit
}) => {
  const [widgetSize, setWidgetSize] = useState<'SMALL' | 'MEDIUM' | 'LARGE'>('MEDIUM');
  const [widgetTheme, setWidgetTheme] = useState<'DARK' | 'LIGHT' | 'GLASS'>('DARK');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
  
  const tText = (text: string) => translateText(text, language);
  const [lastSyncStatus, setLastSyncStatus] = useState<string>('Real-time Active');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSavings = accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalGoalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalGoalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const topGoal = goals[0];

  const handleSimulatedDeposit = (goalId: string) => {
    if (onQuickDeposit) {
      onQuickDeposit(goalId, 50000);
      setLastSyncStatus(`${tText('Disinkronkan')} +Rp50.000`);
      setTimeout(() => setLastSyncStatus('Real-time Active'), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`w-full max-w-md p-6 rounded-[32px] border shadow-2xl space-y-5 overflow-hidden relative ${
          isDark ? 'bg-[#121629] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#6C4CF5]/20 text-[#6C4CF5] flex items-center justify-center border border-[#6C4CF5]/30">
              <Smartphone className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-1.5">
                <span>{tText('Widget Layar Utama HP')}</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[9px] font-black border border-cyan-500/30">
                  REAL-TIME
                </span>
              </h3>
              <p className="text-xs text-slate-400">{tText('Pantau & setor tabungan langsung dari Widget')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Widget Size Selector Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setWidgetSize('SMALL')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              widgetSize === 'SMALL' ? 'bg-[#6C4CF5] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Small (2x2)
          </button>
          <button
            onClick={() => setWidgetSize('MEDIUM')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              widgetSize === 'MEDIUM' ? 'bg-[#6C4CF5] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Medium (4x2)
          </button>
          <button
            onClick={() => setWidgetSize('LARGE')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              widgetSize === 'LARGE' ? 'bg-[#6C4CF5] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Large (4x4)
          </button>
        </div>

        {/* Theme Toggles */}
        <div className="flex items-center justify-between text-xs font-semibold px-1">
          <span className="text-slate-400">{tText('Gaya Tampilan Widget:')}</span>
          <div className="flex gap-2">
            {(['DARK', 'LIGHT', 'GLASS'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setWidgetTheme(t)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                  widgetTheme === t
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated iOS / Android Home Screen Backdrop with Live Widget */}
        <div className="relative w-full p-6 rounded-[28px] bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border border-slate-800/80 shadow-inner overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
          {/* Top Clock Bar */}
          <div className="absolute top-2.5 inset-x-4 flex justify-between items-center text-[10px] font-extrabold text-slate-400 pointer-events-none">
            <span>{currentTime}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {lastSyncStatus}
            </span>
          </div>

          {/* Simulated App Icons background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-4 gap-4 p-4 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-2xl bg-white/20" />
            ))}
          </div>

          {/* Dynamic Interactive Widget Preview Box */}
          <motion.div
            key={`${widgetSize}-${widgetTheme}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`transition-all duration-300 rounded-[24px] p-4 border shadow-2xl relative z-10 w-full mt-4 ${
              widgetSize === 'SMALL' ? 'max-w-[180px]' : widgetSize === 'MEDIUM' ? 'max-w-xs' : 'max-w-full'
            } ${
              widgetTheme === 'DARK'
                ? 'bg-[#0E1022]/95 border-white/10 text-white shadow-black/80'
                : widgetTheme === 'LIGHT'
                ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-400/30'
                : 'bg-white/10 backdrop-blur-xl border-white/20 text-white shadow-indigo-950/50'
            }`}
          >
            {/* Widget Small (2x2) */}
            {widgetSize === 'SMALL' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400">FZ SAVINGS</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{tText('Total Tabungan')}</span>
                  <div className="text-sm font-black font-mono">
                    <AnimatedCounter value={totalSavings} currency={currency} />
                  </div>
                </div>
                {topGoal && (
                  <div className="pt-2 border-t border-white/10 space-y-1 text-[9px]">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300 font-bold truncate">{topGoal.name}</span>
                      <button
                        onClick={() => handleSimulatedDeposit(topGoal.id)}
                        className="px-1.5 py-0.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-md flex items-center gap-0.5"
                        title="Setor Cepat +50rb"
                      >
                        <Zap className="w-2.5 h-2.5" />
                        <span>+50rb</span>
                      </button>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (topGoal.currentAmount / topGoal.targetAmount) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Widget Medium (4x2) */}
            {widgetSize === 'MEDIUM' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-lg bg-[#6C4CF5] text-white flex items-center justify-center font-black text-[10px]">
                      FZ
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">{tText('Widget Progres Nabung')}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold rounded-full border border-emerald-500/30">
                    LIVE SYNC
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{tText('Total Tabungan')}</span>
                    <div className="text-base font-black font-mono">
                      <AnimatedCounter value={totalSavings} currency={currency} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{tText('Target Terkumpul')}</span>
                    <div className="text-base font-black font-mono text-emerald-400">
                      <AnimatedCounter value={totalGoalSaved} currency={currency} />
                    </div>
                  </div>
                </div>

                {topGoal && (
                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-indigo-300 truncate">{topGoal.name} ({Math.round((topGoal.currentAmount / topGoal.targetAmount) * 100)}%)</span>
                      <button
                        onClick={() => handleSimulatedDeposit(topGoal.id)}
                        className="px-2 py-0.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-lg text-[9px] flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Zap className="w-3 h-3 fill-slate-950" />
                        <span>{tText('Nabung Rp50rb Direct')}</span>
                      </button>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (topGoal.currentAmount / topGoal.targetAmount) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Widget Large (4x4) */}
            {widgetSize === 'LARGE' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-[#6C4CF5] text-white flex items-center justify-center font-black text-xs shadow-md">
                      FZ
                    </div>
                    <div>
                      <span className="text-xs font-black block">{tText('Ringkasan Tabungan HP')}</span>
                      <span className="text-[9px] text-slate-400">{tText('Terhubung Aplikasi Real-time')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400">{tText('Saldo Gabungan Tabungan')}</span>
                  <div className="text-lg font-black font-mono text-emerald-400">
                    <AnimatedCounter value={totalSavings} currency={currency} />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{tText('Target Teratas:')}</span>
                  {goals.slice(0, 2).map((g) => (
                    <div key={g.id} className="p-2 rounded-xl bg-slate-900/40 border border-white/5 space-y-1 text-[10px]">
                      <div className="flex justify-between items-center font-bold">
                        <span>{g.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-indigo-400">{Math.round((g.currentAmount / g.targetAmount) * 100)}%</span>
                          <button
                            onClick={() => handleSimulatedDeposit(g.id)}
                            className="px-1.5 py-0.5 bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-300 font-bold rounded-md"
                          >
                            +50rb
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (g.currentAmount / g.targetAmount) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Installation Instruction Guide */}
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs space-y-1 text-indigo-300">
          <span className="font-extrabold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            {tText('Cara Tambahkan ke HP (Android & iOS)')}
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {tText('Tekan lama layar utama HP Anda > pilih "Widget" > cari FZ Savings > pilih ukuran widget yang Anda sukai. Widget memperbarui saldo secara real-time.')}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#6C4CF5] hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{tText('Selesai Pratinjau Widget')}</span>
        </button>
      </motion.div>
    </div>
  );
};

