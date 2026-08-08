import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Goal } from '../../types';
import { formatCurrency, formatNumberInput, parseNumberInput } from '../../utils/formatters';
import { Target, Plus, Sparkles, Award, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LiquidFillProgress } from '../LiquidFillProgress';
import { AnimatedCounter } from '../AnimatedCounter';
import { SpinningTargetIcon, PulsingSparklesIcon } from '../InteractiveIcon';
import { translateText } from '../../utils/translations';

interface WishlistGoalScreenProps {
  goals: Goal[];
  currency: 'IDR' | 'USD' | 'EUR';
  isDark?: boolean;
  language?: string;
  onAddGoal: (goal: Goal) => void;
  onDepositGoal: (goalId: string, amount: number) => void;
}

export const WishlistGoalScreen: React.FC<WishlistGoalScreenProps> = ({
  goals,
  currency,
  isDark = false,
  language,
  onAddGoal,
  onDepositGoal,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const t = (text: string) => translateText(text, language);

  // Goal Form States
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  // Deposit Modal State
  const [selectedDepositGoalId, setSelectedDepositGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim() || !goalTarget) return;

    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      name: goalName.trim(),
      targetAmount: parseNumberInput(goalTarget),
      currentAmount: 0,
      deadline: '',
      reminderEnabled: true,
      category: 'Tabungan',
      status: 'BERJALAN'
    };

    onAddGoal(newGoal);
    setGoalName('');
    setGoalTarget('');
    setIsAdding(false);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepositGoalId || !depositAmount) return;

    const amt = parseNumberInput(depositAmount);
    if (isNaN(amt) || amt <= 0) return;

    onDepositGoal(selectedDepositGoalId, amt);

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSelectedDepositGoalId(null);
    setDepositAmount('');
  };

  const totalTargetAmount = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const overallProgress = totalTargetAmount > 0 ? Math.min(100, Math.round((totalCurrentAmount / totalTargetAmount) * 100)) : 0;
  const completedGoalsCount = goals.filter(g => g.currentAmount >= g.targetAmount && g.targetAmount > 0).length;

  const selectedGoalObj = goals.find(g => g.id === selectedDepositGoalId);

  // Helper to calculate estimated completion date based on savings velocity
  const calculateEstimatedCompletionDate = (current: number, target: number) => {
    const remaining = Math.max(0, target - current);
    if (remaining === 0) return language === 'ID' ? 'Tercapai' : 'Achieved';
    const estimatedMonthlyRate = 500000; // estimated average monthly deposit
    const monthsRemaining = Math.max(1, Math.ceil(remaining / estimatedMonthlyRate));
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + monthsRemaining);
    const monthNamesID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthNamesEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNames = language === 'ID' ? monthNamesID : monthNamesEN;
    const blnLabel = language === 'ID' ? 'bln' : 'mo';
    return `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()} (~${monthsRemaining} ${blnLabel})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-5 pb-56 select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{t("Target Nabung")}</h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t("Fokus kumpulkan tabungan & raih target uangmu")}</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3.5 py-1.5 bg-[#6C4CF5] hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all inline-flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>{t("Tambah Target")}</span>
        </button>
      </div>

      {/* Overall Progress Banner */}
      <div className="p-5 bg-gradient-to-r from-[#0B1220] via-[#1E1B4B] to-[#6C4CF5] text-white rounded-[24px] shadow-xl border border-white/10 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-200">{t("Total Progres Nabung")}</span>
              {completedGoalsCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-[9px] font-black rounded-full border border-amber-400/30 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {completedGoalsCount} {t("Target Tercapai")}
                </span>
              )}
            </div>
            <div className="text-xl font-black text-white font-mono mt-0.5">
              {formatCurrency(totalCurrentAmount, currency)} <span className="text-xs text-indigo-300 font-normal">/ {formatCurrency(totalTargetAmount, currency)}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-mono font-black text-sm text-amber-300 shadow-inner">
            {overallProgress}%
          </div>
        </div>

        <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 relative z-10">
          <div
            className="bg-gradient-to-r from-amber-400 to-indigo-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Add Goal Modal */}
      {isAdding && (
        <form onSubmit={handleCreateGoal} className={`p-5 border rounded-[24px] shadow-lg space-y-4 ${
          isDark ? 'bg-[#1E293B] border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
        }`}>
          <h3 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t("Buat Target Nabung Baru")}</h3>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t("Nama Target Tabungan")}</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder={t("Contoh: Tabungan Liburan, Uang Pangkal, Laptop")}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t("Target Nominal (Rp)")}</label>
            <input
              type="text"
              value={formatNumberInput(goalTarget)}
              onChange={(e) => setGoalTarget(parseNumberInput(e.target.value).toString())}
              placeholder="10.000.000"
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] font-mono ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900'
              }`}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className={`px-3.5 py-2 text-xs font-semibold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t("Batal")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6C4CF5] text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-md"
            >
              {t("Simpan Target")}
            </button>
          </div>
        </form>
      )}

      {/* Deposit Modal */}
      {selectedDepositGoalId && (
        <form onSubmit={handleDepositSubmit} className="p-5 bg-indigo-950 text-white rounded-[28px] shadow-2xl space-y-4 border border-indigo-500/40">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t("Setor Uang ke")} {selectedGoalObj?.name || 'Target'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setSelectedDepositGoalId(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              {t("Tutup")}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-200 mb-1">{t("Nominal Setoran (Rp)")}</label>
            <input
              type="text"
              value={formatNumberInput(depositAmount)}
              onChange={(e) => setDepositAmount(parseNumberInput(e.target.value).toString())}
              placeholder="500.000"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#6C4CF5] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            {t("Konfirmasi Setor")}
          </button>
        </form>
      )}

      {/* List Target Nabung */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className={`p-8 text-center rounded-[24px] border ${isDark ? 'bg-[#1E293B] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
            <Target className="w-8 h-8 mx-auto mb-2 opacity-50 text-indigo-400" />
            <p className="text-xs font-bold">{t("Belum ada target nabung")}</p>
            <p className="text-[11px] mt-0.5">{t("Klik tombol \"+ Tambah Target\" untuk memulai impian baru.")}</p>
          </div>
        ) : (
          goals.map((g) => {
            const percent = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
            const isCompleted = percent >= 100;
            const estimatedCompletionPill = calculateEstimatedCompletionDate(g.currentAmount, g.targetAmount);

            return (
              <div key={g.id} className={`p-5 border rounded-[24px] shadow-xs space-y-3 relative overflow-hidden ${
                isDark ? 'bg-[#1E293B] border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
              }`}>
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1 z-10">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t("TARGET TERCAPAI! 🎉")}</span>
                  </div>
                )}

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm border ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-[#6C4CF5] border-indigo-200/60'
                    }`}>
                      <SpinningTargetIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{g.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-indigo-400 font-semibold">{t(g.category || 'Tabungan')}</span>
                        {!isCompleted && (
                          <span className="px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-full text-[9px] font-extrabold flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{t("Target:")} {estimatedCompletionPill}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDepositGoalId(g.id)}
                    className={`px-3 py-1.5 text-white text-xs font-bold rounded-xl shadow-xs transition-colors ${
                      isCompleted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#6C4CF5] hover:bg-indigo-700'
                    }`}
                  >
                    + Setor
                  </button>
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-semibold">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{t("Progres Terkumpul")}</span>
                    <span className={`font-extrabold ${isCompleted ? 'text-emerald-400' : isDark ? 'text-white' : 'text-slate-900'}`}>{percent}%</span>
                  </div>

                  {/* Liquid Fill Wave Progress */}
                  <LiquidFillProgress
                    percentage={percent}
                    height="h-10"
                    isCompleted={isCompleted}
                  />

                  <div className={`flex justify-between items-center text-[10px] font-medium pt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span>{t("Terkumpul:")} <strong className={isDark ? 'text-white' : 'text-slate-800'}><AnimatedCounter value={g.currentAmount} currency={currency} /></strong></span>
                    <span>{t("Target:")} <strong className={isDark ? 'text-white' : 'text-slate-800'}>{formatCurrency(g.targetAmount, currency)}</strong></span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};


