/** Chapters are measured in native scroll distance, not animation seconds. */
export const openingScore = {
  expand: [0.02, 0.36],
  portraitExit: [0.36, 0.49],
  settle: [0.55, 0.84],
  statement: [0.32, 0.44],
  introExit: [0.18, 0.32],
  titleTravel: [0.55, 0.84],
  biography: [0.76, 0.90],
} as const;

export const openingQuery = '(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)';

export function chapterProgress(value: number, range: readonly [number, number]) {
  const t = Math.max(0, Math.min(1, (value - range[0]) / (range[1] - range[0])));
  return t * t * t * (t * (t * 6 - 15) + 10);
}
