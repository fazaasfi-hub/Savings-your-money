export type CardTexture = 'MATTE' | 'METALIK' | 'CARBON' | 'HOLOGRAM' | 'GLASS';
export type AccentColor = 'INDIGO' | 'EMERALD' | 'ROSE' | 'AMBER' | 'CYAN' | 'PURPLE';

export const ACCENT_COLOR_MAP: Record<AccentColor, {
  primary: string;
  gradient: string;
  border: string;
  text: string;
  bgSoft: string;
}> = {
  INDIGO: {
    primary: '#6C4CF5',
    gradient: 'from-[#6C4CF5] to-indigo-600',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    bgSoft: 'bg-indigo-500/10'
  },
  EMERALD: {
    primary: '#10B981',
    gradient: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    bgSoft: 'bg-emerald-500/10'
  },
  ROSE: {
    primary: '#F43F5E',
    gradient: 'from-rose-500 to-pink-600',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    bgSoft: 'bg-rose-500/10'
  },
  AMBER: {
    primary: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bgSoft: 'bg-amber-500/10'
  },
  CYAN: {
    primary: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bgSoft: 'bg-cyan-500/10'
  },
  PURPLE: {
    primary: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bgSoft: 'bg-purple-500/10'
  }
};

export function getCardTextureStyle(texture: CardTexture = 'GLASS', isDark: boolean = true): string {
  switch (texture) {
    case 'CARBON':
      return isDark
        ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-zinc-800 shadow-xl relative overflow-hidden before:absolute before:inset-0 before:opacity-15 before:bg-[radial-gradient(#333_1px,transparent_1px)] before:[background-size:8px_8px]'
        : 'bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white border-slate-700 shadow-xl';
    case 'METALIK':
      return isDark
        ? 'bg-gradient-to-tr from-slate-900 via-zinc-800 to-slate-900 border-slate-700/80 shadow-2xl relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent'
        : 'bg-gradient-to-tr from-slate-200 via-zinc-100 to-slate-300 border-slate-300 shadow-lg text-slate-900';
    case 'HOLOGRAM':
      return isDark
        ? 'bg-gradient-to-br from-indigo-950/80 via-purple-900/40 to-slate-900 border-indigo-500/40 shadow-xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500/10 before:via-cyan-500/10 before:to-amber-500/10'
        : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-indigo-200 shadow-md text-slate-900';
    case 'MATTE':
      return isDark
        ? 'bg-[#181B2A] border-slate-800 shadow-md'
        : 'bg-slate-50 border-slate-200 shadow-xs text-slate-900';
    case 'GLASS':
    default:
      return isDark
        ? 'bg-[#1E293B]/90 backdrop-blur-md border-slate-800/80 shadow-lg'
        : 'bg-white/90 backdrop-blur-md border-slate-200/90 shadow-md text-slate-900';
  }
}
