export type DensityOption = 'COMPACT' | 'NORMAL' | 'SPACIOUS';
export type CardTextureOption = 'GLASS' | 'METALIK' | 'CARBON' | 'HOLOGRAM' | 'MATTE';
export type AccentColorOption = 'INDIGO' | 'EMERALD' | 'ROSE' | 'AMBER' | 'CYAN' | 'PURPLE';
export type BorderRadiusOption = 'NONE' | 'SM' | 'MD' | 'LG' | 'FULL';

export const getBorderRadiusClass = (radius: BorderRadiusOption = 'LG') => {
  switch (radius) {
    case 'NONE':
      return {
        card: 'rounded-none',
        button: 'rounded-none',
        modal: 'rounded-none',
        dock: 'rounded-none',
        input: 'rounded-none',
      };
    case 'SM':
      return {
        card: 'rounded-lg',
        button: 'rounded-md',
        modal: 'rounded-xl',
        dock: 'rounded-xl',
        input: 'rounded-md',
      };
    case 'MD':
      return {
        card: 'rounded-xl',
        button: 'rounded-lg',
        modal: 'rounded-2xl',
        dock: 'rounded-2xl',
        input: 'rounded-lg',
      };
    case 'FULL':
      return {
        card: 'rounded-[32px]',
        button: 'rounded-full',
        modal: 'rounded-[36px]',
        dock: 'rounded-full',
        input: 'rounded-full',
      };
    case 'LG':
    default:
      return {
        card: 'rounded-[24px]',
        button: 'rounded-2xl',
        modal: 'rounded-[28px]',
        dock: 'rounded-3xl',
        input: 'rounded-xl',
      };
  }
};

export const getDensityClasses = (density: DensityOption = 'NORMAL') => {
  switch (density) {
    case 'COMPACT':
      return {
        screenPadding: 'px-3 pt-3 pb-24',
        cardPadding: 'p-3 space-y-2.5',
        itemSpacing: 'space-y-2.5',
        fontSize: 'text-xs',
        headingSize: 'text-lg',
        iconSize: 'w-3.5 h-3.5',
      };
    case 'SPACIOUS':
      return {
        screenPadding: 'px-6 pt-5 pb-32',
        cardPadding: 'p-6 space-y-5',
        itemSpacing: 'space-y-5',
        fontSize: 'text-sm',
        headingSize: 'text-2xl',
        iconSize: 'w-5 h-5',
      };
    case 'NORMAL':
    default:
      return {
        screenPadding: 'px-5 pt-4 pb-28',
        cardPadding: 'p-4 sm:p-5 space-y-3.5',
        itemSpacing: 'space-y-4',
        fontSize: 'text-xs sm:text-sm',
        headingSize: 'text-xl',
        iconSize: 'w-4 h-4',
      };
  }
};

export const getCardTextureClasses = (texture: CardTextureOption = 'GLASS', isDark: boolean = true, liquidGlassEnabled: boolean = true) => {
  if (!liquidGlassEnabled) {
    return isDark
      ? 'bg-slate-900 border border-slate-800/80 shadow-md'
      : 'bg-white border border-slate-200 shadow-sm';
  }
  switch (texture) {
    case 'METALIK':
      return isDark
        ? 'bg-gradient-to-br from-slate-800 via-zinc-900 to-slate-950 border border-slate-600/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_10px_25px_rgba(0,0,0,0.5)]'
        : 'bg-gradient-to-br from-slate-100 via-zinc-200 to-slate-300 border border-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_20px_rgba(0,0,0,0.08)]';
    case 'CARBON':
      return isDark
        ? 'bg-[#0B0F19] bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:10px_10px] border border-slate-700/80 shadow-2xl'
        : 'bg-[#f1f5f9] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:10px_10px] border border-slate-300 shadow-lg';
    case 'HOLOGRAM':
      return isDark
        ? 'bg-gradient-to-br from-indigo-950/90 via-purple-900/70 via-pink-900/50 to-cyan-900/90 border border-purple-400/40 shadow-[0_10px_30px_rgba(168,85,247,0.3)] backdrop-blur-md'
        : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 border border-purple-300 shadow-lg';
    case 'MATTE':
      return isDark
        ? 'bg-[#121629] border border-slate-800/90 shadow-md'
        : 'bg-slate-100 border border-slate-200 shadow-sm';
    case 'GLASS':
    default:
      return isDark
        ? 'backdrop-blur-md bg-gradient-to-b from-white/15 via-slate-950/75 to-black/90 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1.5px_1.5px_rgba(255,255,255,0.35)] transform-gpu'
        : 'backdrop-blur-md bg-gradient-to-b from-white/95 via-white/85 to-slate-100/80 border border-white/90 shadow-[0_18px_40px_rgba(108,76,245,0.14),inset_0_1.5px_2px_rgba(255,255,255,0.95)] transform-gpu';
  }
};

export const getAccentColorConfig = (accent: AccentColorOption = 'INDIGO') => {
  switch (accent) {
    case 'EMERALD':
      return {
        name: 'EMERALD',
        primaryBg: 'bg-emerald-600 hover:bg-emerald-500',
        primaryText: 'text-emerald-400',
        border: 'border-emerald-500/40',
        ring: 'ring-emerald-500',
        gradient: 'from-emerald-500 to-teal-400',
        dockGradient: 'from-emerald-400 to-teal-300',
        dockText: 'text-emerald-950',
        hex: '#10B981',
      };
    case 'ROSE':
      return {
        name: 'ROSE',
        primaryBg: 'bg-rose-600 hover:bg-rose-500',
        primaryText: 'text-rose-400',
        border: 'border-rose-500/40',
        ring: 'ring-rose-500',
        gradient: 'from-rose-500 to-pink-500',
        dockGradient: 'from-rose-400 to-pink-300',
        dockText: 'text-rose-950',
        hex: '#F43F5E',
      };
    case 'AMBER':
      return {
        name: 'AMBER',
        primaryBg: 'bg-amber-500 hover:bg-amber-400',
        primaryText: 'text-amber-400',
        border: 'border-amber-500/40',
        ring: 'ring-amber-500',
        gradient: 'from-amber-500 to-orange-400',
        dockGradient: 'from-amber-400 to-yellow-300',
        dockText: 'text-amber-950',
        hex: '#F59E0B',
      };
    case 'CYAN':
      return {
        name: 'CYAN',
        primaryBg: 'bg-cyan-500 hover:bg-cyan-400',
        primaryText: 'text-cyan-400',
        border: 'border-cyan-500/40',
        ring: 'ring-cyan-500',
        gradient: 'from-cyan-400 to-blue-500',
        dockGradient: 'from-cyan-300 to-sky-400',
        dockText: 'text-cyan-950',
        hex: '#06B6D4',
      };
    case 'PURPLE':
      return {
        name: 'PURPLE',
        primaryBg: 'bg-purple-600 hover:bg-purple-500',
        primaryText: 'text-purple-400',
        border: 'border-purple-500/40',
        ring: 'ring-purple-500',
        gradient: 'from-purple-500 to-indigo-500',
        dockGradient: 'from-purple-400 to-pink-400',
        dockText: 'text-purple-950',
        hex: '#A855F7',
      };
    case 'INDIGO':
    default:
      return {
        name: 'INDIGO',
        primaryBg: 'bg-[#6C4CF5] hover:bg-[#5b3de3]',
        primaryText: 'text-indigo-400',
        border: 'border-indigo-500/40',
        ring: 'ring-indigo-500',
        gradient: 'from-[#6C4CF5] to-cyan-400',
        dockGradient: 'from-[#00E5C9] to-[#00B4D8]',
        dockText: 'text-[#011F26]',
        hex: '#6C4CF5',
      };
  }
};
