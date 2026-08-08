import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Transaction, Category, SavingsAccount, Goal } from '../../types';
import { formatCurrency, formatNumberInput, parseNumberInput } from '../../utils/formatters';
import {
  Plus, Search, ArrowUpRight, ArrowDownRight, Repeat, Trash2, RotateCcw, Filter, Calendar as CalendarIcon, Tag, Sparkles, CheckCircle2
} from 'lucide-react';
import { translateText } from '../../utils/translations';

interface TransactionScreenProps {
  transactions: Transaction[];
  categories: Category[];
  accounts?: SavingsAccount[];
  goals?: Goal[];
  currency: 'IDR' | 'USD' | 'EUR';
  isDark?: boolean;
  language?: string;
  onAddTransaction: (tx: Transaction) => void;
  onSoftDeleteTransaction: (id: string) => void;
  onRestoreTransaction: (id: string) => void;
  onNavigateToSavings?: () => void;
}

export const TransactionScreen: React.FC<TransactionScreenProps> = ({
  transactions,
  categories,
  accounts = [],
  goals = [],
  currency,
  isDark = false,
  language = 'ID',
  onAddTransaction,
  onSoftDeleteTransaction,
  onRestoreTransaction,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'TRASH'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Default target choices
  const defaultTargetOptions = goals.length > 0
    ? goals.map(g => ({ id: g.id, name: g.name }))
    : [{ id: 'tab_utama', name: 'Tabungan Utama' }];

  // Form states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [txType, setTxType] = useState<'INCOME' | 'EXPENSE' | 'TRANSFER'>('INCOME');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');
  const [selectedTabungan, setSelectedTabungan] = useState(defaultTargetOptions[0]?.id || 'tab_utama');
  const [targetTabungan, setTargetTabungan] = useState(defaultTargetOptions[1]?.id || defaultTargetOptions[0]?.id || 'tab_utama');
  const [notes, setNotes] = useState('');

  // Automatically sync dropdowns when opening add transaction form
  React.useEffect(() => {
    if (isAdding) {
      if (defaultTargetOptions.length > 0) {
        setSelectedTabungan(defaultTargetOptions[0].id);
        setTargetTabungan(defaultTargetOptions[1]?.id || defaultTargetOptions[0].id);
      }
      if (categories.length > 0) {
        setSelectedCategory(categories[0].id);
      }
    }
  }, [isAdding]);

  const t = (text: string) => translateText(text, language);

  const filteredTransactions = transactions
    .filter((tx) => {
      // 1. Soft delete / Trash tab logic
      if (activeTab === 'TRASH') {
        if (!tx.isDeleted) return false;
      } else {
        if (tx.isDeleted) return false;
        if (activeTab !== 'ALL' && tx.type !== activeTab) return false;
      }

      // 2. Search logic
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = tx.title.toLowerCase().includes(query);
        const matchesNotes = tx.notes?.toLowerCase().includes(query) || false;
        if (!matchesTitle && !matchesNotes) return false;
      }

      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseNumberInput(amount);
    if (numAmount <= 0) return;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      title: title.trim() || (txType === 'INCOME' ? 'Setor Tabungan' : txType === 'EXPENSE' ? 'Tarik Tabungan' : 'Transfer Tabungan'),
      amount: numAmount,
      type: txType,
      categoryId: txType === 'TRANSFER' ? 'transfer' : selectedCategory,
      accountId: selectedTabungan,
      targetAccountId: txType === 'TRANSFER' ? targetTabungan : undefined,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      notes: notes.trim()
    };

    onAddTransaction(newTx);

    // Reset Form
    setTitle('');
    setAmount('');
    setNotes('');
    setIsAdding(false);
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
          <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{t("Riwayat Transaksi")}</h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t("Pencatatan arus kas & transfer antar rekening")}</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3.5 py-1.5 bg-[#6C4CF5] hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all inline-flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>{t("Tambah Transaksi")}</span>
        </button>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3 py-1.5 font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'ALL' ? 'bg-[#6C4CF5] text-white shadow-2xs' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {t("Semua")}
        </button>
        <button
          onClick={() => setActiveTab('INCOME')}
          className={`px-3 py-1.5 font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'INCOME' ? 'bg-emerald-600 text-white shadow-2xs' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {t("Pemasukan")}
        </button>
        <button
          onClick={() => setActiveTab('EXPENSE')}
          className={`px-3 py-1.5 font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'EXPENSE' ? 'bg-rose-600 text-white shadow-2xs' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {t("Pengeluaran")}
        </button>
        <button
          onClick={() => setActiveTab('TRANSFER')}
          className={`px-3 py-1.5 font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'TRANSFER' ? 'bg-indigo-600 text-white shadow-2xs' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {t("Transfer")}
        </button>
        <button
          onClick={() => setActiveTab('TRASH')}
          className={`px-3 py-1.5 font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1 ${
            activeTab === 'TRASH' ? 'bg-slate-800 text-white shadow-2xs' : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t("Tong Sampah")}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("Cari transaksi berdasarkan judul atau catatan...")}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] shadow-2xs ${
            isDark ? 'bg-[#1E293B] border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        />
      </div>

      {/* Add Transaction Modal / Form */}
      {isAdding && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 border rounded-[28px] shadow-xl space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t("Catat Transaksi Baru")}</h3>
              <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t("Pencatatan keuangan real-time")}</p>
            </div>
            <button
              onClick={() => setIsAdding(false)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              ✕
            </button>
          </div>

          {/* Type Selector */}
          <div className={`grid grid-cols-3 gap-1 p-1 rounded-2xl ${isDark ? 'bg-slate-800/80 border border-slate-700/50' : 'bg-slate-100'}`}>
            <button
              type="button"
              onClick={() => setTxType('INCOME')}
              className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all truncate text-center ${
                txType === 'INCOME' ? 'bg-emerald-600 text-white shadow-md' : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("Setor (+)")}
            </button>
            <button
              type="button"
              onClick={() => setTxType('EXPENSE')}
              className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all truncate text-center ${
                txType === 'EXPENSE' ? 'bg-rose-600 text-white shadow-md' : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("Tarik (-)")}
            </button>
            <button
              type="button"
              onClick={() => setTxType('TRANSFER')}
              className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all truncate text-center ${
                txType === 'TRANSFER' ? 'bg-[#6C4CF5] text-white shadow-md' : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("Transfer")}
            </button>
          </div>

          {/* Amount Input with Quick Buttons */}
          <div className="space-y-1.5">
            <label className={`block text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t("Nominal")}
            </label>
            <div className="relative">
              <span className={`absolute left-3.5 top-3 text-xs font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Rp</span>
              <input
                type="text"
                value={formatNumberInput(amount)}
                onChange={(e) => setAmount(parseNumberInput(e.target.value).toString())}
                placeholder="0"
                className={`w-full pl-10 pr-4 py-3 border rounded-2xl text-base font-extrabold focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] font-mono ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>
            {/* Quick amount chips */}
            <div className="flex gap-1.5 pt-1 overflow-x-auto pb-1">
              {[50000, 100000, 250000, 500000, 1000000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all whitespace-nowrap ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  +{val >= 1000000 ? `${val / 1000000}jt` : `${val / 1000}rb`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t("Judul Transaksi")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("Contoh: Setor Tabungan Bulanan, Beli Barang")}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {txType === 'TRANSFER' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t("Pilih Tabungan Asal")}</label>
                <select
                  value={selectedTabungan}
                  onChange={(e) => setSelectedTabungan(e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  {defaultTargetOptions.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t("Tabungan Tujuan")}</label>
                <select
                  value={targetTabungan}
                  onChange={(e) => setTargetTabungan(e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  {defaultTargetOptions.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t("Pilih Tabungan")}</label>
              <select
                value={selectedTabungan}
                onChange={(e) => setSelectedTabungan(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#6C4CF5] ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {defaultTargetOptions.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors ${isDark ? 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
            >
              {t("Batal")}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#6C4CF5] text-white text-xs font-extrabold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all"
            >
              {t("Simpan Transaksi")}
            </button>
          </div>
        </motion.form>
      )}

      {/* Transaction List */}
      <div className={`border rounded-[24px] divide-y overflow-hidden shadow-2xs ${
        isDark ? 'bg-[#1E293B] border-slate-800 divide-slate-800' : 'bg-white border-slate-200/80 divide-slate-100'
      }`}>
        {filteredTransactions.length === 0 ? (
          <div className={`p-8 text-center text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {activeTab === 'TRASH' ? t('Tong sampah kosong.') : t('Tidak ada transaksi ditemukan.')}
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const acc = accounts.find(a => a.id === tx.accountId);
            const goalMatch = goals.find(g => g.id === tx.accountId);
            const accountLabel = acc?.name || goalMatch?.name || 'Tabungan Utama';
            const cat = categories.find(c => c.id === tx.categoryId);

            return (
              <div key={tx.id} className={`p-3.5 flex items-center justify-between transition-colors gap-2 ${
                isDark ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50/80'
              }`}>
                <div className="flex items-center space-x-3 min-w-0 pr-1">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${
                    tx.type === 'INCOME'
                      ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200/60'
                      : tx.type === 'EXPENSE'
                      ? isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-200/60'
                      : isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-[#6C4CF5] border-indigo-200/60'
                  }`}>
                    {tx.type === 'INCOME' ? <ArrowDownRight className="w-4 h-4" /> :
                     tx.type === 'EXPENSE' ? <ArrowUpRight className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0">
                    <h4 className={`text-xs font-extrabold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{tx.title}</h4>
                    <div className={`flex items-center gap-1.5 text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className={`font-semibold truncate max-w-[80px] inline-block ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{accountLabel}</span>
                      <span>•</span>
                      <span className="shrink-0">{tx.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <div className="text-right">
                    <div className={`text-xs font-black ${
                      tx.type === 'INCOME' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') :
                      tx.type === 'EXPENSE' ? (isDark ? 'text-rose-400' : 'text-rose-600') : (isDark ? 'text-indigo-400' : 'text-[#6C4CF5]')
                    }`}>
                      {tx.type === 'INCOME' ? '+' : tx.type === 'EXPENSE' ? '-' : ''}
                      {formatCurrency(tx.amount, currency)}
                    </div>
                    <span className={`text-[9px] font-bold block truncate max-w-[90px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cat?.name || 'Umum'}</span>
                  </div>

                  {activeTab === 'TRASH' ? (
                    <button
                      onClick={() => onRestoreTransaction(tx.id)}
                      className={`p-1.5 rounded-xl transition-colors ${
                        isDark ? 'text-indigo-400 hover:bg-indigo-50/10' : 'text-indigo-600 hover:bg-indigo-50'
                      }`}
                      title={t("Pulihkan Transaksi")}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSoftDeleteTransaction(tx.id)}
                      className={`p-1.5 rounded-xl transition-colors ${
                        isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10' : 'text-slate-300 hover:text-rose-500 hover:bg-rose-50'
                      }`}
                      title={t("Hapus Transaksi")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};
