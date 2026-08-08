import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Camera, Smartphone, Scan, Receipt, X, ChevronRight } from 'lucide-react';

interface MorphingFabProps {
  onOpenAddTransaction: () => void;
  onOpenOcrScanner: () => void;
  onOpenWidgetModal: () => void;
  onOpenQrisScan: () => void;
  isDark?: boolean;
  liquidGlassEnabled?: boolean;
}

export const MorphingFab: React.FC<MorphingFabProps> = ({
  onOpenAddTransaction,
  onOpenOcrScanner,
  onOpenWidgetModal,
  onOpenQrisScan,
  isDark = true,
  liquidGlassEnabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuContainerClass = liquidGlassEnabled
    ? (isDark
        ? 'bg-gradient-to-b from-white/20 via-slate-950/85 to-black/95 border-white/25 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.4)] backdrop-blur-lg transform-gpu'
        : 'bg-gradient-to-b from-white/95 via-white/85 to-slate-100/90 border-white/90 text-slate-900 shadow-[0_20px_50px_rgba(108,76,245,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-lg transform-gpu')
    : (isDark
        ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
        : 'bg-white border-slate-200 text-slate-900 shadow-xl');

  const buttonClass = isOpen
    ? (liquidGlassEnabled
        ? 'bg-gradient-to-b from-rose-500 via-rose-600 to-rose-900 shadow-[0_15px_35px_rgba(244,63,94,0.55)] border-white/40 transform-gpu'
        : 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-md')
    : (liquidGlassEnabled
        ? (isDark
            ? 'bg-gradient-to-b from-white/25 via-indigo-600/80 to-slate-950/90 shadow-[0_15px_40px_rgba(108,76,245,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.5)] border-white/30 transform-gpu'
            : 'bg-gradient-to-b from-white/95 via-indigo-500 to-indigo-900 shadow-[0_15px_35px_rgba(108,76,245,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.9)] border-white/90 text-white transform-gpu')
        : 'bg-[#6C4CF5] hover:bg-[#5b3ed6] text-white border-transparent shadow-md');

  const itemClass = (colorType: 'indigo' | 'amber' | 'emerald' | 'cyan') => {
    if (liquidGlassEnabled) {
      if (isDark) {
        return 'bg-gradient-to-r from-white/10 via-slate-900/60 to-slate-950/40 border-white/15 text-slate-100 hover:border-white/30 hover:bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transform-gpu';
      } else {
        return 'bg-gradient-to-r from-white/80 via-white/60 to-slate-50/70 border-white/80 text-slate-900 hover:border-indigo-400 hover:bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transform-gpu';
      }
    } else {
      if (isDark) {
        return 'bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-750 hover:border-slate-600';
      } else {
        return 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100 hover:border-slate-300';
      }
    }
  };

  return (
    <div className="fixed bottom-[100px] right-4 sm:right-6 z-50 select-none">
      {/* Lightweight Dark Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <div className="relative z-50">
        {/* Expanded Menu Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className={`absolute bottom-16 right-0 p-3.5 rounded-[32px] border space-y-2.5 min-w-[260px] max-w-[290px] overflow-hidden ${menuContainerClass}`}
            >
              {/* iOS 18 Specular Reflection Sheen across top edge - glass mode only */}
              {liquidGlassEnabled && (
                <>
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-[32px] z-10" />
                </>
              )}

              {/* Header */}
              <div className={`flex items-center justify-between px-2 pt-1 pb-1.5 border-b relative z-20 ${isDark ? 'border-white/15' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${liquidGlassEnabled ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse' : 'bg-indigo-500'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`}>
                    Menu Cepat
                  </span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${isDark ? 'bg-white/10 text-white/90 border-white/20' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  Aksi
                </span>
              </div>

              <div className="space-y-1.5 relative z-20">
                {/* Action 1: Add Transaction */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAddTransaction();
                  }}
                  className={`w-full p-2.5 rounded-2xl border transition-all duration-200 active:scale-95 text-left flex items-center justify-between group cursor-pointer ${itemClass('indigo')}`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/25 text-indigo-400 flex items-center justify-center border border-indigo-400/20 shrink-0 shadow-sm">
                      <Receipt className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black block truncate">Catat Transaksi</span>
                      <span className="text-[9.5px] opacity-75 font-medium block truncate">Pemasukan & Pengeluaran</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>

                {/* Action 2: OCR Receipt Camera */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenOcrScanner();
                  }}
                  className={`w-full p-2.5 rounded-2xl border transition-all duration-200 active:scale-95 text-left flex items-center justify-between group cursor-pointer ${itemClass('amber')}`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/25 text-amber-400 flex items-center justify-center border border-amber-400/20 shrink-0 shadow-sm">
                      <Camera className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black block truncate">Scan Struk AI</span>
                      <span className="text-[9.5px] opacity-75 font-medium block truncate">Deteksi Otomatis Cam OCR</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>

                {/* Action 3: QRIS Payment Scan */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenQrisScan();
                  }}
                  className={`w-full p-2.5 rounded-2xl border transition-all duration-200 active:scale-95 text-left flex items-center justify-between group cursor-pointer ${itemClass('emerald')}`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/25 text-emerald-400 flex items-center justify-center border border-emerald-400/20 shrink-0 shadow-sm">
                      <Scan className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black block truncate">Bayar QRIS</span>
                      <span className="text-[9.5px] opacity-75 font-medium block truncate">Pindai Kode QR Cepat</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>

                {/* Action 4: Widget HP */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenWidgetModal();
                  }}
                  className={`w-full p-2.5 rounded-2xl border transition-all duration-200 active:scale-95 text-left flex items-center justify-between group cursor-pointer ${itemClass('cyan')}`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/25 text-cyan-400 flex items-center justify-center border border-cyan-400/20 shrink-0 shadow-sm">
                      <Smartphone className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black block truncate">Widget Layar HP</span>
                      <span className="text-[9.5px] opacity-75 font-medium block truncate">Pin ke Home Screen</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button ("Menu Cepat") */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center gap-2.5 px-4.5 py-3.5 rounded-full font-black text-xs transition-transform duration-150 active:scale-95 overflow-hidden cursor-pointer border ${buttonClass}`}
        >
          {/* Top Specular Reflection Glow Beam - glass mode only */}
          {liquidGlassEnabled && (
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none rounded-t-full z-10" />
          )}

          {/* Icon Container with Smooth Rotation */}
          <div
            className={`relative z-20 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 shadow-sm ${
              isDark ? 'bg-white/20 border-white/40 text-white' : 'bg-white/90 border-slate-200 text-[#6C4CF5]'
            } ${isOpen ? 'rotate-135' : 'rotate-0'}`}
          >
            {isOpen ? <X className="w-3.5 h-3.5 text-white" /> : <Plus className="w-4 h-4 drop-shadow-xs" />}
          </div>

          {/* Label Text "Menu Cepat" */}
          <span className="relative z-25 tracking-wide drop-shadow-xs font-extrabold flex items-center gap-1.5 text-white">
            <span>{isOpen ? 'Tutup' : 'Menu Cepat'}</span>
            {!isOpen && (
              <span className={`w-2 h-2 rounded-full ${liquidGlassEnabled ? 'bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)] animate-pulse' : 'bg-emerald-400'}`} />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
