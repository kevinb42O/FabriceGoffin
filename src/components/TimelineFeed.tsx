import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useMotionTemplate } from 'motion/react';
import {
  PawPrint,
  Cpu,
  Users,
  Building2,
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sprout,
  Check,
} from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import {
  tijdlijn,
  type TimelineCategory,
  type TimelineItem,
} from '../data/tijdlijn';

// ──────────────────────────────────────────────────────────────
//  Category configuration
// ──────────────────────────────────────────────────────────────
export interface CategoryConfig {
  key: TimelineCategory;
  label: string;
  displayLabel?: React.ReactNode;
  shortLabel: string;
  Icon: typeof PawPrint;
  text: string;
  bg: string;
  soft: string;
  border: string;
  borderStrong: string;
  ring: string;
  /** raw hex used for inline motion animations (line/stem fills) */
  hex: string;
  panelImage: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'Dierenwelzijn',
    label: 'Dierenwelzijn',
    shortLabel: 'Dierenwelzijn',
    Icon: PawPrint,
    text: 'text-red-600',
    bg: 'bg-red-600',
    soft: 'bg-red-50',
    border: 'border-red-200',
    borderStrong: 'border-red-600',
    ring: 'ring-red-600',
    hex: '#dc2626',
    panelImage: '/images/diervriendelijk-taart.jpeg',
  },
  {
    key: "OC's",
    label: 'Ontmoeting',
    shortLabel: "OC's",
    Icon: Building2,
    text: 'text-red-600',
    bg: 'bg-red-600',
    soft: 'bg-red-50',
    border: 'border-red-200',
    borderStrong: 'border-red-600',
    ring: 'ring-red-600',
    hex: '#dc2626',
    panelImage: '/images/gemeenteraad-taart.jpeg',
  },
  {
    key: 'Digitalisatie',
    label: 'Digitalisatie',
    shortLabel: 'Digitalisatie',
    Icon: Cpu,
    text: 'text-red-600',
    bg: 'bg-red-600',
    soft: 'bg-red-50',
    border: 'border-red-200',
    borderStrong: 'border-red-600',
    ring: 'ring-red-600',
    hex: '#dc2626',
    panelImage: '/images/contacteermij-taart.jpeg',
  },
  {
    key: 'Buurten & Wijken',
    label: 'Buurten &\nWijken',
    displayLabel: (
      <span className="relative inline-flex flex-col leading-[0.85]">
        <span 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] text-[100px] md:text-[140px] lg:text-[180px] text-zinc-200/80 font-black select-none pointer-events-none"
          style={{ zIndex: -1 }}
        >
          &amp;
        </span>
        <span className="relative z-10">Buurten</span>
        <span className="relative z-10">Wijken</span>
      </span>
    ),
    shortLabel: 'Buurten',
    Icon: Users,
    text: 'text-red-600',
    bg: 'bg-red-600',
    soft: 'bg-red-50',
    border: 'border-red-200',
    borderStrong: 'border-red-600',
    ring: 'ring-red-600',
    hex: '#dc2626',
    panelImage: '/images/opkomst-taart.jpeg',
  },
  {
    key: 'Overige projecten algemeen',
    label: 'Overige\nProjecten',
    shortLabel: 'Overige',
    Icon: Sparkles,
    text: 'text-red-600',
    bg: 'bg-red-600',
    soft: 'bg-red-50',
    border: 'border-red-200',
    borderStrong: 'border-red-600',
    ring: 'ring-red-600',
    hex: '#dc2626',
    panelImage: '/realisaties/hoornaar-taart.jpeg',
  },
];

export const catCfg = (cat: TimelineCategory) =>
  CATEGORIES.find((c) => c.key === cat)!;

/** Counts per category, used by the picker too. */
export function countsFor(cat: TimelineCategory) {
  const items = tijdlijn.filter((i) => i.category === cat);
  return {
    total: items.length,
    realisaties: items.filter((i) => i.status === 'Realisatie').length,
    lopend: items.filter((i) => i.status === 'Lopend').length,
  };
}

const STATUS_LABEL = {
  Realisatie: 'Gerealiseerd',
  Lopend: 'In de maak',
} as const;

// ──────────────────────────────────────────────────────────────
//  Hooks
// ──────────────────────────────────────────────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(min-width: 768px)').matches
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

// ──────────────────────────────────────────────────────────────
//  Main component
// ──────────────────────────────────────────────────────────────
interface TimelineFeedProps {
  /** Restrict to one bevoegdheid. If omitted, all tracks render. */
  filter?: TimelineCategory;
}

export function TimelineFeed({ filter }: TimelineFeedProps) {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => tijdlijn.find((i) => i.id === selectedId) ?? null,
    [selectedId]
  );

  const grouped = useMemo(() => {
    const source = filter
      ? CATEGORIES.filter((c) => c.key === filter)
      : CATEGORIES;
    return source.map((cfg) => {
      const items = tijdlijn.filter((i) => i.category === cfg.key);
      return {
        cfg,
        realisaties: items.filter((i) => i.status === 'Realisatie'),
        lopend: items.filter((i) => i.status === 'Lopend'),
        total: items.length,
      };
    });
  }, [filter]);

  const currentCategoryItems = useMemo(() => {
    if (!selected) return [];
    const cfg = CATEGORIES.find((c) => c.key === selected.category);
    if (!cfg) return [];
    const items = tijdlijn.filter((i) => i.category === cfg.key);
    const realisaties = items.filter((i) => i.status === 'Realisatie');
    const lopend = items.filter((i) => i.status === 'Lopend');
    return [...realisaties, ...lopend];
  }, [selected]);

  const selectedIndex = useMemo(() => {
    if (!selected) return -1;
    return currentCategoryItems.findIndex((i) => i.id === selected.id);
  }, [selected, currentCategoryItems]);

  const prevItem = selectedIndex > 0 ? currentCategoryItems[selectedIndex - 1] || null : null;
  const nextItem = selectedIndex >= 0 && selectedIndex < currentCategoryItems.length - 1 ? currentCategoryItems[selectedIndex + 1] || null : null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selected]);

  return (
    <div className="relative pb-24">
      {grouped.map(({ cfg, realisaties, lopend }) => (
        <VerticalTrack
          key={cfg.key}
          cfg={cfg}
          realisaties={realisaties}
          lopend={lopend}
          selectedId={selectedId}
          onSelect={setSelectedId}
          reduceMotion={!!reduceMotion}
        />
      ))}

      <AnimatePresence mode="wait">
        {selected && (
          <TimelinePanel
            key={selected.id}
            item={selected}
            prevItem={prevItem}
            nextItem={nextItem}
            onNavigate={setSelectedId}
            onClose={() => setSelectedId(null)}
            isDesktop={isDesktop}
            reduceMotion={!!reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
//  Vertical Track (New Feed Design)
// ──────────────────────────────────────────────────────────────
function VerticalTrack({
  cfg,
  realisaties,
  lopend,
  selectedId,
  onSelect,
  reduceMotion,
}: {
  cfg: CategoryConfig;
  realisaties: TimelineItem[];
  lopend: TimelineItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  reduceMotion: boolean;
}) {
  // Combine all items, optionally keeping them segregated or just ordered
  const items = [...realisaties, ...lopend];

  if (items.length === 0) return null;

  return (
    <div className="relative pl-6 md:pl-10">
      {/* The glowing vertical line */}
      <motion.div 
        className="absolute left-[11px] md:left-[19px] top-6 bottom-4 w-[2px] bg-zinc-200/50 origin-top rounded-full"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className={`absolute top-0 left-0 w-full h-full opacity-60 ${cfg.bg}`}
          style={{ filter: 'blur(3px)' }}
        />
      </motion.div>

      <div className="flex flex-col gap-5 md:gap-6">
        {items.map((item, i) => (
          <FeedCard
            key={item.id}
            item={item}
            cfg={cfg}
            active={selectedId === item.id}
            onClick={() => onSelect(item.id)}
            reduceMotion={reduceMotion}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function FeedCard({
  item,
  cfg,
  active,
  onClick,
  reduceMotion,
  index,
}: {
  item: TimelineItem;
  cfg: CategoryConfig;
  active: boolean;
  onClick: () => void;
  reduceMotion: boolean;
  index: number;
}) {
  const isLopend = item.status === 'Lopend';
  const Icon = isLopend ? Sprout : CheckCircle2;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${cfg.hex}15,
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Node on the line */}
      <motion.div 
        className={`absolute -left-[12px] md:-left-[20px] -translate-x-1/2 top-6 rounded-full border-white shadow-sm flex items-center justify-center ${cfg.bg} z-10 transition-transform duration-300 ${active ? 'scale-125' : ''} ${
          isLopend 
            ? 'w-3 h-3 border-[2px]'
            : 'w-4 h-4 border-[3px]'
        }`}
        initial={reduceMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: index * 0.05 + 0.2 }}
      />

      <button
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className={`group block w-full text-left p-5 md:p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-zinc-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden relative ${cfg.ring} ${
          active 
            ? `ring-2 ${cfg.ring} bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-[1.02]` 
            : 'hover:bg-white hover:border-zinc-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:scale-[1.01]'
        }`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background }}
        />
        <div className="flex items-start gap-4 md:gap-5 relative z-10">
          <div className={`shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ${cfg.soft} ${cfg.text} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5 pr-10 md:pr-14">
            <div className={`text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${cfg.text}`}>
              {STATUS_LABEL[item.status]}
            </div>
            <h3 className="text-sm md:text-base font-semibold leading-relaxed text-zinc-900 pr-4">
              {item.title}
            </h3>
          </div>
          {!isLopend && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 shadow-sm" aria-hidden>
              <Check className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
//  Panel (light)
// ──────────────────────────────────────────────────────────────
interface PanelProps {
  item: TimelineItem;
  prevItem: TimelineItem | null;
  nextItem: TimelineItem | null;
  onNavigate: (id: string) => void;
  onClose: () => void;
  isDesktop: boolean;
  reduceMotion: boolean;
}

function TimelinePanel({ item, prevItem, nextItem, onNavigate, onClose, isDesktop, reduceMotion }: PanelProps) {
  const cfg = catCfg(item.category);
  const Icon = cfg.Icon;
  const isLopend = item.status === 'Lopend';

  const backdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
  };

  const desktopPanel = {
    initial: { x: reduceMotion ? 0 : '100%' },
    animate: { x: 0 },
    exit: { x: reduceMotion ? 0 : '100%' },
    transition: { type: 'spring' as const, stiffness: 260, damping: 32 },
  };

  const mobilePanel = {
    initial: { y: reduceMotion ? 0 : '100%' },
    animate: { y: 0 },
    exit: { y: reduceMotion ? 0 : '100%' },
    transition: { type: 'spring' as const, stiffness: 260, damping: 32 },
  };

  const panelContent = (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}>
      <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="tl-panel-title">
        <motion.button
          {...backdrop}
          type="button"
          aria-label="Sluit panel"
          onClick={onClose}
          className="absolute inset-0 bg-white/60 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          {...(isDesktop ? desktopPanel : mobilePanel)}
          className={
            isDesktop
              ? 'absolute top-0 right-0 h-full w-full md:w-1/2 bg-white text-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden border-l border-zinc-200'
              : 'absolute bottom-0 left-0 right-0 h-[88vh] bg-white text-zinc-900 rounded-t-3xl shadow-[0_-12px_60px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden border-t border-zinc-200'
          }
        >
          {!isDesktop && (
            <div className="flex justify-center pt-3 pb-1 shrink-0" aria-hidden>
              <span className="block w-10 h-1.5 rounded-full bg-zinc-300" />
            </div>
          )}

          <div className="relative shrink-0 w-full aspect-[16/10] overflow-hidden bg-zinc-100">
            <img
              src={item.image || cfg.panelImage}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-zinc-700 flex items-center justify-center hover:bg-white shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <X className="w-4 h-4" aria-hidden />
            </button>

            <div className="absolute left-6 bottom-6 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 shadow-sm border border-zinc-200/50"
              >
                <Icon className="w-4 h-4" aria-hidden />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                  {cfg.label}
                </span>
              </span>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 shadow-sm border border-zinc-200/50"
              >
                {isLopend ? (
                  <Sprout className="w-4 h-4" aria-hidden />
                ) : (
                  <CheckCircle2 className="w-4 h-4" aria-hidden />
                )}
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                  {STATUS_LABEL[item.status]}
                </span>
              </span>
            </div>
          </div>

          <div className="relative grow overflow-y-auto px-6 md:px-12 py-8 md:py-12">
            <h2
              id="tl-panel-title"
              className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-zinc-900"
            >
              {item.title}
            </h2>
            <div className="mt-5 h-[3px] w-16 bg-zinc-900" aria-hidden />

            <p className="mt-8 text-base md:text-lg text-zinc-600 leading-relaxed italic">
              {isLopend
                ? `Een project dat momenteel vorm krijgt binnen het thema ${cfg.label}.`
                : `Een gerealiseerd dossier binnen het thema ${cfg.label}.`}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 text-[11px] font-bold tracking-[0.25em] uppercase">
              <div>
                <div className="text-zinc-400 mb-2">Thema</div>
                <div className="text-zinc-900">{cfg.label}</div>
              </div>
              <div>
                <div className="text-zinc-400 mb-2">Status</div>
                <div className="text-zinc-900">{STATUS_LABEL[item.status]}</div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-zinc-200 px-6 md:px-12 py-6 flex items-center justify-between bg-zinc-50/80 backdrop-blur-sm gap-4">
            {prevItem ? (
              <button
                type="button"
                onClick={() => onNavigate(prevItem.id)}
                className="group flex items-center gap-4 text-left hover:opacity-70 transition-opacity focus:outline-none flex-1 min-w-0"
              >
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-white shrink-0 group-hover:-translate-x-1 transition-transform shadow-sm">
                  <ArrowLeft className="w-5 h-5 text-zinc-900" />
                </div>
                <div className="flex flex-col min-w-0 hidden md:flex">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1">Vorige</span>
                  <span className="text-sm md:text-base font-semibold text-zinc-900 truncate pr-4">{prevItem.title}</span>
                </div>
              </button>
            ) : (
              <div className="flex-1" />
            )}

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 flex items-center justify-center text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors focus:outline-none"
            >
              Sluiten
            </button>

            {nextItem ? (
              <button
                type="button"
                onClick={() => onNavigate(nextItem.id)}
                className="group flex items-center gap-4 text-right justify-end hover:opacity-70 transition-opacity focus:outline-none flex-1 min-w-0"
              >
                <div className="flex flex-col items-end min-w-0 hidden md:flex">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1">Volgende</span>
                  <span className="text-sm md:text-base font-semibold text-zinc-900 truncate pl-4">{nextItem.title}</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-white shrink-0 group-hover:translate-x-1 transition-transform shadow-sm">
                  <ArrowRight className="w-5 h-5 text-zinc-900" />
                </div>
              </button>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </motion.div>
      </div>
    </FocusTrap>
  );

  return typeof document !== 'undefined' ? createPortal(panelContent, document.body) : null;
}

export default TimelineFeed;
