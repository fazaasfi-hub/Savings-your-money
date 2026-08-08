import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Repeat, Users, FileText, Calculator, Sparkles, ArrowRight } from 'lucide-react';
import { translateText } from '../../utils/translations';

interface ToolsScreenProps {
  onNavigateTool: (tool: 'aiAdvisor' | 'recurring' | 'debt' | 'export' | 'splitBill') => void;
  isDark: boolean;
  language?: string;
  liquidGlassEnabled?: boolean;
}

export const ToolsScreen: React.FC<ToolsScreenProps> = ({ 
  onNavigateTool, 
  isDark, 
  language = 'ID',
  liquidGlassEnabled = true 
}) => {
  const t = (text: string) => translateText(text, language);

  const tools = [
    {
      id: 'aiAdvisor',
      title: t('AI Financial Advisor'),
      desc: t('Audit kesehatan keuangan, skor 0-100 & rekomendasi Gemini AI'),
      icon: BrainCircuit,
      color: 'from-purple-600 to-indigo-600',
      badge: t('AI Powered')
    },
    {
      id: 'recurring',
      title: t('Auto-Save & Tagihan'),
      desc: t('Jadwalkan transfer rutin & pembayaran tagihan otomatis'),
      icon: Repeat,
      color: 'from-blue-600 to-cyan-600',
      badge: t('Otomatis')
    },
    {
      id: 'debt',
      title: t('Hutang & Piutang'),
      desc: t('Pantau uang yang dipinjamkan dan jatuh tempo rekan'),
      icon: Users,
      color: 'from-emerald-600 to-teal-600',
      badge: t('Praktis')
    },
    {
      id: 'export',
      title: t('Ekspor Laporan PDF/CSV'),
      desc: t('Unduh laporan resmi ringkasan aset & mutasi arus kas'),
      icon: FileText,
      color: 'from-amber-600 to-orange-600',
      badge: t('Dokumen')
    },
    {
      id: 'splitBill',
      title: t('Kalkulator Split Bill'),
      desc: t('Bagi rata tagihan makanan & patungan bersama teman'),
      icon: Calculator,
      color: 'from-pink-600 to-rose-600',
      badge: t('Grup')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-5 pb-56 select-none"
    >
      {/* Header */}
      <div>
        <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t("Fitur Unggulan Pro ⚡")}
        </h1>
        <p className="text-xs text-slate-400">{t("5 alat finansial canggih untuk mengoptimalkan kekayaan Anda")}</p>
      </div>

      {/* Grid of 5 Features */}
      <div className="space-y-3">
        {tools.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateTool(item.id as any)}
              className={`relative p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-300 overflow-hidden ${
                liquidGlassEnabled
                  ? (isDark 
                      ? 'backdrop-blur-md bg-gradient-to-b from-white/15 via-slate-950/75 to-black/85 border-white/20 hover:border-white/40 shadow-[0_18px_40px_rgba(0,0,0,0.7),inset_0_1.5px_1.5px_rgba(255,255,255,0.3)] transform-gpu' 
                      : 'backdrop-blur-md bg-gradient-to-b from-white/95 via-white/85 to-slate-100/80 border-white/90 hover:border-indigo-400 shadow-[0_15px_35px_rgba(108,76,245,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] transform-gpu')
                  : (isDark
                      ? 'bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-md'
                      : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm')
              }`}
            >
              {/* iOS 18 Specular Reflection Top Glare */}
              {liquidGlassEnabled && (
                <>
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-10" />
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl" />
                </>
              )}

              <div className="flex items-center space-x-3.5 relative z-20">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-slate-800/20 flex items-center justify-center text-slate-400">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
