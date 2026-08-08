import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SavingsAccount, Transaction, Goal, UserProfile } from '../../types';
import { formatCurrency, getTimeBasedGreeting, getInitials } from '../../utils/formatters';
import { AnimatedCounter } from '../AnimatedCounter';
import { RingingBellIcon, SpinningTargetIcon, PulsingSparklesIcon, BouncingWalletIcon } from '../InteractiveIcon';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  PlusCircle,
  MinusCircle,
  Repeat,
  Target,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Palmtree,
  Laptop,
  Eye,
  EyeOff,
  QrCode,
  CreditCard,
  Zap,
  Search,
  Bell,
  Smartphone,
  Layers,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

import { getTranslation, translateText } from '../../utils/translations';
import { AppSettings } from '../../types';
import { getCardTextureClasses, getAccentColorConfig, getBorderRadiusClass, getDensityClasses } from '../../utils/theme';

interface DashboardScreenProps {
  userProfile: UserProfile;
  accounts: SavingsAccount[];
  transactions: Transaction[];
  goals: Goal[];
  currency: 'IDR' | 'USD' | 'EUR';
  theme?: 'LIGHT' | 'DARK' | 'SYSTEM';
  language?: string;
  settings?: AppSettings;
  onNavigate: (screen: string) => void;
  onOpenQuickAction: (action: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'TARGET' | 'SCAN_QR') => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  userProfile,
  accounts,
  transactions,
  goals,
  currency,
  theme = 'DARK',
  language = 'ID',
  settings,
  onNavigate,
  onOpenQuickAction
}) => {
  const t = getTranslation(language);
  const tText = (text: string) => translateText(text, language);
  const [hideBalance, setHideBalance] = useState(false);
  const [activeAccountIndex, setActiveAccountIndex] = useState(0);
  const greetingInfo = getTimeBasedGreeting();

  const isDark = theme === 'DARK';
  const cardTextureClass = getCardTextureClasses(settings?.cardTexture, isDark, settings?.liquidGlassEnabled !== false);
  const accentConfig = getAccentColorConfig(settings?.accentColor);
  const radiusClass = getBorderRadiusClass(settings?.borderRadius);
  const densityConfig = getDensityClasses(settings?.density);
  const totalBalance = goals.reduce((acc, g) => acc + g.currentAmount, 0) + accounts.reduce((acc, a) => acc + a.balance, 0);

  const liquidGlassEnabled = settings?.liquidGlassEnabled !== false;

  const getButtonClass = (colorType: 'emerald' | 'rose' | 'indigo' | 'amber') => {
    if (liquidGlassEnabled) {
      if (isDark) {
        return `bg-gradient-to-b from-white/15 via-slate-900/60 to-${colorType}-950/20 border border-white/20 hover:border-${colorType}-400/60 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] transform-gpu`;
      } else {
        return `bg-gradient-to-b from-white/95 via-white/70 to-${colorType}-50/50 border border-white/90 hover:border-${colorType}-500/60 shadow-[0_8px_20px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,1)] transform-gpu`;
      }
    } else {
      if (isDark) {
        return `bg-slate-850 border border-slate-700 hover:border-${colorType}-500 text-slate-100 hover:bg-slate-800 hover:shadow-md`;
      } else {
        return `bg-slate-50 border border-slate-200 hover:border-${colorType}-500 text-slate-800 hover:bg-slate-100 hover:shadow-sm`;
      }
    }
  };

  // Current Month calculations
  const currentMonthStr = new Date().toISOString().slice(0, 7);
  const monthlyTransactions = transactions.filter(
    t => !t.isDeleted && t.date.startsWith(currentMonthStr)
  );

  const totalIncomeMonth = monthlyTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenseMonth = monthlyTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0);

  const savingsRate = totalIncomeMonth > 0
    ? Math.max(0, Math.round(((totalIncomeMonth - totalExpenseMonth) / totalIncomeMonth) * 100))
    : 0;

  const activeTx = transactions.filter(t => !t.isDeleted);
  const recentTransactions = activeTx.slice(0, 5);

  const growthPercent = (activeTx.length === 0 || totalBalance === 0)
    ? 0
    : Math.round(((totalIncomeMonth - totalExpenseMonth) / Math.max(1, totalBalance)) * 100);

  const netWorthData = activeTx.length === 0 ? [
    { month: 'Mei', value: totalBalance },
    { month: 'Jun', value: totalBalance },
    { month: 'Jul', value: totalBalance },
    { month: 'Agu', value: totalBalance }
  ] : [
    { month: 'Mei', value: Math.max(0, totalBalance - totalIncomeMonth) },
    { month: 'Jun', value: Math.max(0, totalBalance - (totalIncomeMonth * 0.5)) },
    { month: 'Jul', value: Math.max(0, totalBalance - (totalIncomeMonth * 0.2)) },
    { month: 'Agu', value: totalBalance }
  ];

  const healthScore = Math.min(100, Math.round(
    (savingsRate * 0.4) + 
    (goals.length > 0 ? 20 : 0) + 
    (goals.length > 0 ? (goals.reduce((a, b) => a + (b.currentAmount / Math.max(1, b.targetAmount)), 0) / goals.length) * 30 : 0) +
    (totalBalance > 0 ? 10 : 0)
  ));

  const healthStatus = healthScore >= 80 ? tText('Sangat Sehat 🎉') : healthScore >= 50 ? tText('Sehat & Stabil 👍') : tText('Perlu Ditingkatkan 💪');
  const healthColor = healthScore >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : healthScore >= 50 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

  return (
    <div className={`space-y-4 pb-56 select-none ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
      {/* 1. CLEAN HEADER (Google Wallet / Revolut Style) */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 cursor-pointer shrink-0 flex items-center justify-center bg-indigo-600/90 text-white font-bold text-xs"
            onClick={() => onNavigate('settings')}
          >
            {userProfile.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(userProfile.name)
            )}
          </div>

          <div>
            <div className={`text-[11px] font-medium flex items-center gap-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              <span>{greetingInfo.greeting}</span>
            </div>
            <h2 className={`text-sm font-bold tracking-tight truncate max-w-[150px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {userProfile.name}
            </h2>
          </div>
        </div>

        {/* Clean Controls: Search & Notifications */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('globalSearch')}
            className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 flex items-center justify-center text-zinc-300 transition-colors"
            title={t.searchTooltip}
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 flex items-center justify-center text-zinc-300 transition-colors relative"
            title={t.settingsTooltip}
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CREATED SAVINGS CARDS (Swipable if > 1, hidden if 0) */}
      {goals && goals.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                {tText('Tabungan Kamu')} ({goals.length})
              </span>
            </div>
            <button
              onClick={() => onNavigate('wishlist')}
              className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              <span>+ {tText('Buat Tabungan')}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className={`flex space-x-3 overflow-x-auto no-scrollbar py-1 ${goals.length > 1 ? 'snap-x snap-mandatory' : ''}`}>
            {goals.map((goal) => {
              const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

              return (
                <div
                  key={goal.id}
                  className={`${
                    goals.length === 1 ? 'w-full' : 'min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] shrink-0 snap-center'
                  } p-4 sm:p-5 ${radiusClass.card} ${cardTextureClass} space-y-3 overflow-hidden shadow-lg relative`}
                >
                  {/* iOS 18 Liquid Glass Specular Reflection Glare */}
                  {liquidGlassEnabled && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-[24px]" />
                    </>
                  )}
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 min-w-0">
                      <div className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-white truncate">{goal.name}</h4>
                        <span className="text-[9px] text-indigo-300 font-semibold uppercase tracking-wider block">
                          {goal.category || tText('Tabungan')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20 font-mono">
                        {progress}%
                      </span>
                      <button
                        onClick={() => setHideBalance(!hideBalance)}
                        className="p-1.5 bg-zinc-800/60 hover:bg-zinc-700/60 rounded-lg text-zinc-300 transition-colors border border-zinc-700/50"
                        title={hideBalance ? t.showBalance : t.hideBalance}
                      >
                        {hideBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Saldo Tabungan Display */}
                  <div className="pt-1">
                    <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider block mb-0.5">
                      {tText('Saldo Terkumpul')}
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono truncate">
                      {hideBalance ? 'Rp •••••••••' : formatCurrency(goal.currentAmount, currency)}
                    </div>
                  </div>

                  {/* Progress Bar & Target */}
                  <div className="space-y-1.5 pt-1 border-t border-zinc-800/80">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-zinc-400">{tText('Target:')} <strong className="text-zinc-200 font-mono">{formatCurrency(goal.targetAmount, currency)}</strong></span>
                      <span className="text-zinc-400">{goal.deadline ? `${tText('Deadline:')} ${goal.deadline}` : ''}</span>
                    </div>

                    <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-zinc-700/60">
                      <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={() => onOpenQuickAction('INCOME')}
                      className={`w-full py-2 ${accentConfig.primaryBg} text-white text-xs font-bold ${radiusClass.button} shadow-md transition-all flex items-center justify-center space-x-1.5`}
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ {tText('Setor ke Tabungan Ini')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. QUICK ACTIONS (LIQUID GLASS IPHONE / FLUTTER GLASS DOCK STYLE) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
            {t.quickActions}
          </h3>
          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
            liquidGlassEnabled
              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            {liquidGlassEnabled ? 'Liquid Glass' : 'Minimalis'}
          </span>
        </div>

        {/* Capsule Bar Container */}
        <div className={`p-2.5 ${radiusClass.card} transition-all duration-300 relative overflow-hidden ${
          liquidGlassEnabled
            ? (isDark 
                ? 'backdrop-blur-md bg-gradient-to-b from-white/10 via-slate-950/60 to-black/80 border transform-gpu border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1.5px_1px_rgba(255,255,255,0.25)]' 
                : 'backdrop-blur-md bg-gradient-to-b from-white/90 via-slate-100/70 to-white/60 border transform-gpu border-white/80 shadow-[0_20px_40px_rgba(108,76,245,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.9)]')
            : (isDark
                ? 'bg-slate-900 border border-slate-800 shadow-md'
                : 'bg-white border border-slate-200 shadow-sm')
        }`}>
          {/* Top Specular Reflection Beam - glass mode only */}
          {liquidGlassEnabled && (
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10" />
          )}

          <div className="grid grid-cols-4 gap-2 relative z-20">
            {/* Quick Action 1: Income */}
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={() => onOpenQuickAction('INCOME')}
              className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center space-y-1.5 text-center overflow-hidden transition-all duration-300 ${getButtonClass('emerald')}`}
            >
              {/* Internal Glass Highlight */}
              {liquidGlassEnabled && (
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-2xl" />
              )}
              <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-emerald-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-300" />

              <div className="relative z-10 w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/40 shadow-[0_4px_12px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <PlusCircle className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(16,185,129,0.7)]" />
              </div>
              <span className={`relative z-10 text-[10.5px] font-extrabold truncate w-full ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {t.depositCash}
              </span>
            </motion.button>

            {/* Quick Action 2: Expense */}
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={() => onOpenQuickAction('EXPENSE')}
              className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center space-y-1.5 text-center overflow-hidden transition-all duration-300 ${getButtonClass('rose')}`}
            >
              {/* Internal Glass Highlight */}
              {liquidGlassEnabled && (
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-2xl" />
              )}
              <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-rose-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-300" />

              <div className="relative z-10 w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-400/40 shadow-[0_4px_12px_rgba(244,63,94,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <MinusCircle className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(244,63,94,0.7)]" />
              </div>
              <span className={`relative z-10 text-[10.5px] font-extrabold truncate w-full ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {t.withdrawCash}
              </span>
            </motion.button>

            {/* Quick Action 3: Transfer */}
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={() => onOpenQuickAction('TRANSFER')}
              className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center space-y-1.5 text-center overflow-hidden transition-all duration-300 ${getButtonClass('indigo')}`}
            >
              {/* Internal Glass Highlight */}
              {liquidGlassEnabled && (
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-2xl" />
              )}
              <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-indigo-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-300" />

              <div className="relative z-10 w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/40 shadow-[0_4px_12px_rgba(99,102,241,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Repeat className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(99,102,241,0.7)]" />
              </div>
              <span className={`relative z-10 text-[10.5px] font-extrabold truncate w-full ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {t.transfer}
              </span>
            </motion.button>

            {/* Quick Action 4: QRIS */}
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={() => onOpenQuickAction('SCAN_QR')}
              className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center space-y-1.5 text-center overflow-hidden transition-all duration-300 ${getButtonClass('amber')}`}
            >
              {/* Internal Glass Highlight */}
              {liquidGlassEnabled && (
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-2xl" />
              )}
              <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-amber-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-300" />

              <div className="relative z-10 w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/40 shadow-[0_4px_12px_rgba(245,158,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <QrCode className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(245,158,11,0.7)]" />
              </div>
              <span className={`relative z-10 text-[10.5px] font-extrabold truncate w-full ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {t.scanQris}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3.1 SETOR TABUNGAN CEPAT & QUICK DEPOSIT PRESETS */}
      <div className={`relative overflow-hidden p-4 ${radiusClass.card} ${cardTextureClass} space-y-3`}>
        {/* iOS 18 Specular Glare */}
        {liquidGlassEnabled && (
          <>
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[24px]" />
          </>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white">{tText('Setor Tabungan Cepat')}</span>
                <span className="text-[9px] font-extrabold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded-full border border-indigo-500/30 uppercase">{tText('Tabungan')}</span>
              </div>
              <p className="text-[10px] text-zinc-300">{tText('Tambah saldo celengan tabungan kamu dengan mudah')}</p>
            </div>
          </div>
          
          <button
            onClick={() => onOpenQuickAction('INCOME')}
            className={`px-3 py-1.5 ${accentConfig.primaryBg} text-white text-[10px] font-bold ${radiusClass.button} shadow-lg transition-all shrink-0 flex items-center gap-1`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{tText('Setor Sekarang')}</span>
          </button>
        </div>

        {/* Quick Deposit Buttons */}
        <div className="pt-1 border-t border-indigo-500/20">
          <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider block mb-1.5">{tText('Nominal Setor Instant:')}</span>
          <div className="grid grid-cols-4 gap-1.5">
            {[10000, 20000, 50000, 100000].map((amt) => (
              <button
                key={amt}
                onClick={() => onOpenQuickAction('INCOME')}
                className={`py-1.5 px-2 bg-indigo-950/80 hover:bg-indigo-800/80 text-indigo-200 border border-indigo-500/30 ${radiusClass.button} text-[10px] font-bold text-center transition-colors`}
              >
                +Rp {(amt / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. NET WORTH CHART CARD */}
      <div className={`relative overflow-hidden p-4 ${radiusClass.card} ${cardTextureClass} space-y-2`}>
        {/* iOS 18 Specular Glare */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[24px]" />
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">{t.netWorthGrowth}</span>
            <div className="text-xs font-bold mt-0.5 flex items-center gap-1.5">
              <span className="text-white font-mono">{formatCurrency(totalBalance, currency)}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                growthPercent >= 0 
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
              }`}>
                {growthPercent >= 0 ? `+${growthPercent}%` : `${growthPercent}%`}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('statistics')}
            className="px-2.5 py-1 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1 border border-indigo-500/20"
          >
            <TrendingUp className="w-3 h-3" />
            <span>{t.detail}</span>
          </button>
        </div>

        <div className="h-20 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={netWorthData}>
              <defs>
                <linearGradient id="netWorthGradClean" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C4CF5" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6C4CF5" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <Tooltip formatter={(val: number) => formatCurrency(val, currency)} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6C4CF5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#netWorthGradClean)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. RECENT TRANSACTIONS LIST */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            {t.recentTransactions}
          </h3>
          <span
            className="text-[10px] font-semibold text-indigo-400 flex items-center gap-0.5 cursor-pointer hover:text-indigo-300"
            onClick={() => onNavigate('transactions')}
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div className="space-y-1.5">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className={`p-3 ${radiusClass.button} ${cardTextureClass} flex items-center justify-between transition-colors`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  tx.type === 'INCOME'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {tx.type === 'INCOME' ? '+' : '-'}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{tx.title}</h4>
                  <p className="text-[10px] text-zinc-400">{tx.date} • {tx.time || '12:00'}</p>
                </div>
              </div>

              <div className="text-right font-mono shrink-0">
                <span className={`text-xs font-bold block ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount, currency)}
                </span>
                <span className="text-[9px] text-zinc-400 font-medium block">{tx.notes || t.cashFlow}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
