import { useEffect, useRef, useState } from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import {
  CATEGORIES,
  countsFor,
  type CategoryConfig,
} from './HorizontalTimeline';
import type { TimelineCategory } from '../data/tijdlijn';

interface Props {
  onPick: (category: TimelineCategory) => void;
  /** Called whenever the focused/hovered category changes — the parent can
   *  use this to swap a background image, etc. */
  onActiveChange?: (category: TimelineCategory) => void;
  /** When true, hides the text side-rail to make room for the timeline */
  isCompact?: boolean;
}

// ──────────────────────────────────────────────────────────────
//  Geometry
// ──────────────────────────────────────────────────────────────
const N = CATEGORIES.length;               // 5
const SEG = 360 / N;                       // 72°
const SIZE = 560;                          // SVG canvas (responsive via CSS)
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUT = SIZE / 2 - 6;                // outer ring radius
const R_IN = SIZE * 0.32;                  // inner ring (hub edge)
const ICON_R = (R_OUT + R_IN) / 2;         // where the icon sits
const GAP_DEG = 1.4;                       // separator between wedges

const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

function wedgePath(rOut: number, rIn: number, a1: number, a2: number) {
  const so = polar(rOut, a1);
  const eo = polar(rOut, a2);
  const ei = polar(rIn, a2);
  const si = polar(rIn, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return [
    `M ${so.x} ${so.y}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${eo.x} ${eo.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${rIn} ${rIn} 0 ${large} 0 ${si.x} ${si.y}`,
    'Z',
  ].join(' ');
}

// Center angle for segment i — segment 0 sits at the left (west).
const segmentCenter = (i: number) => -180 + i * SEG;

// ──────────────────────────────────────────────────────────────
//  Picker
// ──────────────────────────────────────────────────────────────
export function CategoryPicker({ onPick, onActiveChange, isCompact }: Props) {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const tooltipLeft = useMotionValue('50%');
  const tooltipTop = useMotionValue('50%');
  const rotation = useMotionValue(0);
  const dragStart = useRef(0);
  const isDragging = useRef(false);

  const active: CategoryConfig = CATEGORIES[activeIdx]!;
  const counts = countsFor(active.key);
  const Icon = active.Icon;

  // Notify the parent whenever the displayed category changes.
  useEffect(() => {
    onActiveChange?.(active.key);
  }, [active.key, onActiveChange]);

  // ── Tooltip placement ──
  // Distance from wheel center to label, in percent of the wheel box.
  // R_OUT / SIZE ≈ 0.49, so 62% sits just outside the outer wedge edge.
  const TOOLTIP_R = 62;
  const updateTooltipPos = (idx: number, r: number) => {
    const angle = segmentCenter(idx) + r;
    const rad = (angle * Math.PI) / 180;
    tooltipLeft.set(`${50 + TOOLTIP_R * Math.cos(rad)}%`);
    tooltipTop.set(`${50 + TOOLTIP_R * Math.sin(rad)}%`);
  };

  // Live-derive the active wedge from rotation — hub updates in real time
  // as the wheel spins (drag, spring-back, animated select all included).
  useMotionValueEvent(rotation, 'change', (r) => {
    const idx = ((-Math.round(r / SEG)) % N + N) % N;
    if (idx !== activeIdx) setActiveIdx(idx);
    if (hoveredIdx !== null) {
      updateTooltipPos(hoveredIdx, r);
    }
  });

  const onWedgeEnter = (i: number) => {
    setHoveredIdx(i);
    updateTooltipPos(i, rotation.get());
  };
  const onWedgeLeave = () => {
    setHoveredIdx(null);
  };

  // ── Selection ────────────────────────────────────────────────
  const selectIdx = (i: number) => {
    // Choose the equivalent target nearest to current rotation
    // so spinning across the seam doesn't reverse direction.
    const current = rotation.get();
    const baseTarget = -i * SEG;
    const delta = ((baseTarget - current) % 360 + 540) % 360 - 180;
    const target = current + delta;
    animate(rotation, target, {
      type: 'spring',
      stiffness: 140,
      damping: 20,
      mass: 0.8,
    });
    // activeIdx will be picked up by the rotation subscriber as the spring
    // settles — no eager set needed.
  };

  // ── Drag rotation ────────────────────────────────────────────
  const onPanStart = () => {
    isDragging.current = true;
    dragStart.current = rotation.get();
  };
  const onPan = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    // horizontal drag → rotation, scaled for feel
    rotation.set(dragStart.current + info.offset.x * 0.4);
  };
  const onPanEnd = (
    _: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    setTimeout(() => { isDragging.current = false; }, 0);
    const projected = rotation.get() + info.velocity.x * 0.04;
    const snapped = Math.round(projected / SEG) * SEG;
    animate(rotation, snapped, {
      type: 'spring',
      stiffness: 160,
      damping: 22,
    });
  };

  // ── Keyboard ─────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectIdx((activeIdx + 1) % N);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectIdx((activeIdx - 1 + N) % N);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPick(active.key);
    }
  };

  return (
    <motion.div layout transition={{ type: "spring", bounce: 0, duration: 0.8 }} className={`px-4 md:px-12 w-full`}>
      <motion.div layout transition={{ type: "spring", bounce: 0, duration: 0.8 }} className={`mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:gap-10 lg:gap-16 max-w-[1400px] w-full`}>
        {/* ── Side rail ── */}
        <AnimatePresence mode="popLayout">
          {!isCompact && (
            <motion.div
              layout
              key="side-rail"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3 } }}
              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              className="order-2 md:order-1 pt-4 md:pt-12 shrink-0 w-full md:w-[500px] lg:w-[600px]"
            >
          {/* Main Editorial Header */}
          <div className="mb-14">
            <h1 className="text-[40px] sm:text-[48px] lg:text-[64px] font-black tracking-[-0.025em] leading-[1.05] text-zinc-900 mb-6">
              Mijn<br />
              <span className="text-zinc-400">Standpunten</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-600 leading-relaxed max-w-md">
              Ontdek de thema's en projecten waar ik vol overtuiging mijn schouders onder zet. Een heldere visie voor de toekomst, met concrete realisaties en ambitieuze plannen in de maak.
            </p>
          </div>

          {/* Active Category Display */}
          <div className="relative mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <div className={`flex items-center gap-4 text-[11px] md:text-[13px] font-bold tracking-[0.3em] uppercase mb-6 ${active.text}`}>
                  <motion.span 
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </motion.span>
                  <span className="w-10 h-[2px] bg-current opacity-30 rounded-full"></span>
                  <motion.span
                    initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    Thema
                  </motion.span>
                </div>
                
                <h2 className="text-[56px] md:text-[64px] lg:text-[80px] font-black tracking-[-0.03em] leading-[0.9] text-zinc-900 mb-8 whitespace-pre overflow-visible">
                  {active.displayLabel || active.label}
                </h2>

                <div className="flex items-center gap-12 mb-10">
                  <div className="flex flex-col">
                    <motion.div 
                      initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                      className={`text-[56px] sm:text-[64px] font-black leading-none tracking-tighter ${active.text}`}
                    >
                      {counts.realisaties}
                    </motion.div>
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 mt-3">
                      {counts.realisaties === 1 ? 'Realisatie' : 'Realisaties'}
                    </div>
                  </div>
                  
                  {counts.lopend > 0 && (
                    <>
                      <motion.div 
                        initial={reduceMotion ? false : { height: 0 }}
                        animate={{ height: 56 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="w-[2px] bg-zinc-200 rounded-full"
                      />
                      <div className="flex flex-col">
                        <motion.div 
                          initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
                          className={`text-[56px] sm:text-[64px] font-black leading-none tracking-tighter ${active.text}`}
                        >
                          {counts.lopend}
                        </motion.div>
                        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 mt-3">
                          In de maak
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls row */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                type="button"
                onClick={() => selectIdx((activeIdx - 1 + N) % N)}
                aria-label="Vorige bevoegdheid"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden />
              </motion.button>
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                type="button"
                onClick={() => selectIdx((activeIdx + 1) % N)}
                aria-label="Volgende bevoegdheid"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
              >
                <ChevronRight className="w-5 h-5" aria-hidden />
              </motion.button>
            </div>
          </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Wheel ── */}
        <motion.div
          layout
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2 relative mx-auto md:mx-0 shrink-0"
          style={{
            width: isCompact ? 'clamp(240px, 40vw, 400px)' : 'clamp(280px, 45vw, 560px)',
            aspectRatio: '1',
          }}
        >
          {/* Wheel Background Image */}
          <div className="absolute top-[18%] left-[18%] w-[64%] h-[64%] rounded-full overflow-hidden pointer-events-none z-0">
             <AnimatePresence mode="popLayout">
               <motion.img
                 key={(hoveredIdx !== null ? CATEGORIES[hoveredIdx]!.key : active.key) + '-disc'}
                 src={hoveredIdx !== null ? CATEGORIES[hoveredIdx]!.panelImage : active.panelImage}
                 alt=""
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute inset-0 w-full h-full object-cover"
               />
             </AnimatePresence>
          </div>

          {/* Rotating wheel */}
          <motion.div
            className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing select-none focus:outline-none rounded-full"
            style={{ rotate: rotation }}
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
            tabIndex={0}
            role="listbox"
            aria-label="Kies een bevoegdheid"
            onKeyDown={onKeyDown}
          >
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {CATEGORIES.map((cfg, i) => {
                const center = segmentCenter(i);
                const a1 = center - SEG / 2 + GAP_DEG / 2;
                const a2 = center + SEG / 2 - GAP_DEG / 2;
                const d = wedgePath(R_OUT, R_IN, a1, a2);
                const isActive = i === activeIdx;
                return (
                  <path
                    key={cfg.key}
                    d={d}
                    fill={isActive ? cfg.hex : '#f4f4f5'}
                    className="cursor-pointer transition-colors duration-300 hover:fill-zinc-200"
                    onClick={() => {
                      if (isDragging.current) return;
                      selectIdx(i);
                      if (isCompact) {
                        onPick(cfg.key);
                      }
                    }}
                    onMouseEnter={() => onWedgeEnter(i)}
                    onMouseLeave={onWedgeLeave}
                    role="option"
                    aria-selected={isActive}
                    aria-label={cfg.label}
                  />
                );
              })}
              {/* Outer hairline */}
              <circle
                cx={CX}
                cy={CY}
                r={R_OUT + 1}
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={1}
              />
              {/* Inner hairline */}
              <circle
                cx={CX}
                cy={CY}
                r={R_IN - 1}
                fill="none"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth={1}
              />
            </svg>

            {/* Counter-rotating icons inside each wedge */}
            {CATEGORIES.map((cfg, i) => (
              <WheelIcon
                key={cfg.key}
                cfg={cfg}
                index={i}
                rotation={rotation}
                isActive={i === activeIdx}
              />
            ))}
          </motion.div>

          {/* ── Hover tooltip — sits just outside the hovered wedge ── */}
          <AnimatePresence>
            {hoveredIdx !== null && (
              <motion.div
                key="wedge-tooltip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ left: tooltipLeft, top: tooltipTop }}
              >
                <div className="px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]">
                  {CATEGORIES[hoveredIdx]?.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Center hub IS the primary action ── */}
          <motion.button
            type="button"
            onClick={() => onPick(active.key)}
            aria-label={`Bekijk realisaties en projecten voor ${active.label}`}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className={`absolute z-20 rounded-full bg-transparent flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${active.ring} group`}
            style={{
              // R_IN / (SIZE/2) ≈ 0.64 → hub fills 64% of wheel
              top: '18%',
              left: '18%',
              width: '64%',
              height: '64%',
            }}
          >
            {/* Centered icon orb (re-pops on category change) */}
            <motion.div
              key={active.key + '-orb'}
              initial={reduceMotion ? false : { scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className={`relative flex items-center justify-center rounded-full ${active.bg} shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110`}
              style={{ width: '38%', height: '38%' }}
            >
              {/* Quiet hover ring — only appears on hover/focus */}
              <span
                aria-hidden
                className={`absolute -inset-2 rounded-full border ${active.borderStrong} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300`}
              />
              <Icon
                className="text-white"
                style={{ width: '46%', height: '46%' }}
                aria-hidden
              />
            </motion.div>

            {/* Hover-reveal CTA — appears below the icon */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[74%] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-sm text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 pointer-events-none whitespace-nowrap shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]"
            >
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase">
                Bekijk
              </span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
//  Counter-rotating icon (its own component so the useTransform
//  hook isn't called inside a loop).
// ──────────────────────────────────────────────────────────────
function WheelIcon({
  cfg,
  index,
  rotation,
  isActive,
}: {
  cfg: CategoryConfig;
  index: number;
  rotation: MotionValue<number>;
  isActive: boolean;
}) {
  // Counter-rotate so the icon stays upright in the viewport.
  const counter = useTransform(rotation, (r) => -r);

  const angle = segmentCenter(index);
  const rad = (angle * Math.PI) / 180;
  // Position as % of the wheel box (responsive without re-measuring).
  const leftPct = ((CX + ICON_R * Math.cos(rad)) / SIZE) * 100;
  const topPct = ((CY + ICON_R * Math.sin(rad)) / SIZE) * 100;

  const Icon = cfg.Icon;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: 0,
        height: 0,
      }}
    >
      <motion.div
        style={{ rotate: counter }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`group flex items-center justify-center rounded-full transition-all duration-300 ${
            isActive ? 'bg-white/20 backdrop-blur-[1px] ring-1 ring-white/80 scale-110 shadow-sm' : 'scale-100'
          }`}
          style={{
            width: 'clamp(36px, 6vw, 52px)',
            height: 'clamp(36px, 6vw, 52px)',
          }}
        >
          <Icon
            className={`transition-all duration-300 ${
              isActive ? 'text-white opacity-100' : 'text-zinc-400 opacity-100 group-hover:text-zinc-600'
            }`}
            style={{
              width: 'clamp(18px, 3vw, 26px)',
              height: 'clamp(18px, 3vw, 26px)',
            }}
            aria-hidden
          />
        </div>
      </motion.div>
    </div>
  );
}

export default CategoryPicker;
