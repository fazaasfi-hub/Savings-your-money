import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NavTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LiquidGlassBottomBarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  isDark: boolean;
  navTabs: NavTab[];
  accentConfig: {
    dockGradient: string;
    dockText: string;
    hex: string;
    primaryText: string;
  };
  liquidGlassEnabled?: boolean;
}

export const LiquidGlassBottomBar: React.FC<LiquidGlassBottomBarProps> = ({
  currentScreen,
  setCurrentScreen,
  isDark,
  navTabs,
  accentConfig,
  liquidGlassEnabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabCentersRef = useRef<number[]>([]);
  const [dragActiveIndex, setDragActiveIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.hasAttribute('contenteditable'))
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setTimeout(() => {
        const activeEl = document.activeElement;
        if (
          !activeEl ||
          !(
            activeEl.tagName === 'INPUT' ||
            activeEl.tagName === 'TEXTAREA' ||
            activeEl.hasAttribute('contenteditable')
          )
        ) {
          setIsKeyboardOpen(false);
        }
      }, 100);
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleFocusOut);

    const vv = window.visualViewport;
    let resizeTimeout: any = null;
    const handleViewportResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        if (vv) {
          const isSmaller = vv.height < window.innerHeight * 0.85;
          if (isSmaller) {
            setIsKeyboardOpen(true);
          } else {
            const activeEl = document.activeElement;
            const isInputFocused =
              activeEl &&
              (activeEl.tagName === 'INPUT' ||
                activeEl.tagName === 'TEXTAREA' ||
                activeEl.hasAttribute('contenteditable'));
            if (!isInputFocused) {
              setIsKeyboardOpen(false);
            }
          }
        }
      }, 150);
    };

    if (vv) {
      vv.addEventListener('resize', handleViewportResize);
    }

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleFocusOut);
      if (vv) {
        vv.removeEventListener('resize', handleViewportResize);
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Find index of current active tab
  const getActiveIndex = () => {
    const index = navTabs.findIndex((tab) => {
      if (tab.id === currentScreen) return true;
      if (
        tab.id === 'tools' &&
        ['tools', 'aiAdvisor', 'recurring', 'debt', 'export', 'splitBill'].includes(currentScreen)
      ) {
        return true;
      }
      return false;
    });
    return index >= 0 ? index : 0;
  };

  const activeIndex = dragActiveIndex !== null ? dragActiveIndex : getActiveIndex();

  // Optimized lookup from cached centers to completely prevent layout thrashing
  const getTabFromCachedCenters = (clientX: number): number => {
    let closestIndex = 0;
    let minDistance = Infinity;

    tabCentersRef.current.forEach((centerX, index) => {
      if (centerX > 0) {
        const distance = Math.abs(clientX - centerX);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    return closestIndex;
  };

  // High performance pointer tracking for ultra-smooth 60 FPS sliding
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const idx = getTabFromCachedCenters(e.clientX);
      setDragActiveIndex((prev) => (prev !== idx ? idx : prev));
    };

    const handlePointerUp = (e: PointerEvent) => {
      const idx = getTabFromCachedCenters(e.clientX);
      const targetTab = navTabs[idx];
      if (targetTab) {
        setCurrentScreen(targetTab.id);
      }
      setIsDragging(false);
      setDragActiveIndex(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, navTabs, setCurrentScreen]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    // Cache the tab centers to prevent layout thrashing (getBoundingClientRect) during pointer drag
    const centers: number[] = [];
    tabRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        centers.push(rect.left + rect.width / 2);
      } else {
        centers.push(0);
      }
    });
    tabCentersRef.current = centers;

    const idx = getTabFromCachedCenters(e.clientX);
    setDragActiveIndex(idx);
  };

  const containerClasses = liquidGlassEnabled
    ? (isDark
        ? 'bg-gradient-to-b from-white/20 via-slate-950/70 to-black/95 border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.45)] backdrop-blur-2xl transform-gpu'
        : 'bg-gradient-to-b from-white/90 via-white/75 to-slate-100/85 border border-white/90 shadow-[0_20px_50px_rgba(108,76,245,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl transform-gpu')
    : (isDark
        ? 'bg-slate-900 border-slate-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border'
        : 'bg-white border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border');

  const indicatorClasses = liquidGlassEnabled
    ? (isDark
        ? 'bg-gradient-to-b from-white/35 via-white/20 to-white/5 border border-white/60 shadow-[0_8px_25px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.9)] transform-gpu'
        : 'bg-gradient-to-b from-white via-white/90 to-white/70 border border-white/80 shadow-[0_6px_20px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,1)] transform-gpu')
    : (isDark
        ? 'bg-slate-800 border-transparent'
        : 'bg-slate-100 border-transparent');

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] max-w-xl z-50 select-none touch-none transition-all duration-300 ease-out ${
        isKeyboardOpen 
          ? 'bottom-0 opacity-0 pointer-events-none translate-y-24' 
          : 'bottom-4 opacity-100 translate-y-0'
      }`}
    >
      {/* Outer Floating Pill Frame */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className={`relative p-1.5 rounded-[32px] transition-all duration-300 overflow-hidden cursor-grab active:cursor-grabbing ${containerClasses}`}
      >
        {/* iOS 18 Specular Reflection Glare across top edge - glass mode only */}
        {liquidGlassEnabled && (
          <>
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-[32px] z-10" />
          </>
        )}

        {/* Elegant static accent edge glow - glass mode only */}
        {liquidGlassEnabled && (
          <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#6C4CF5]/40 via-cyan-400/40 via-[#6C4CF5]/40 to-transparent pointer-events-none z-20" />
        )}

        {/* Dock Navigation Items Grid */}
        <div className="grid grid-cols-6 gap-0.5 items-center relative z-20">
          {navTabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const Icon = tab.icon;

            const iconClass = isActive
              ? (liquidGlassEnabled
                  ? (isDark
                      ? 'drop-shadow-[0_2px_6px_rgba(255,255,255,0.85)] text-white scale-110'
                      : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] text-indigo-950 scale-110')
                  : 'scale-110')
              : 'opacity-70 scale-100';

            const textClass = isActive
              ? (liquidGlassEnabled
                  ? (isDark
                      ? 'opacity-100 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-black'
                      : 'opacity-100 text-indigo-950 font-black')
                  : 'opacity-100 font-black')
              : 'opacity-70';

            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setCurrentScreen(tab.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl w-full transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-white font-black'
                      : 'text-indigo-950 font-black'
                    : isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                title={tab.label}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Active Indicator Pill */}
                {isActive && (
                  <motion.div
                    layoutId="liquidGlassActiveIndicator"
                    className={`absolute -inset-1.5 rounded-[22px] -z-10 ${indicatorClasses}`}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 26,
                      mass: 0.7,
                    }}
                  >
                    {/* Top Specular Edge Highlight - glass mode only */}
                    {liquidGlassEnabled && (
                      <div className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/95 to-transparent" />
                    )}
                  </motion.div>
                )}

                <div className="shrink-0 flex items-center justify-center">
                  <Icon
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 ${iconClass}`}
                    style={isActive && !liquidGlassEnabled ? { color: accentConfig.hex } : undefined}
                  />
                </div>
                <span
                  className={`text-[9.5px] sm:text-[10px] font-extrabold mt-1 truncate tracking-tight text-center w-full transition-all duration-200 ${textClass}`}
                  style={isActive && !liquidGlassEnabled ? { color: accentConfig.hex } : undefined}
                >
                  {tab.label}
                </span>

                {/* Elegant Minimalist Indicator Dot - non-glass mode only */}
                {isActive && !liquidGlassEnabled && (
                  <div 
                    className="absolute bottom-1 w-1 h-[3px] rounded-full"
                    style={{ backgroundColor: accentConfig.hex }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
