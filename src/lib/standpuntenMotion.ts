export function standpuntenDistance(count: number) {
  return Math.max(0, count - 1) * .8;
}

/** One continuous camera journey: no item holds, snapping or per-item easing. */
export function standpuntenPhase(progress: number, count: number) {
  return Math.max(0, Math.min(1, progress)) * Math.max(0, count - 1);
}

export function standpuntProgress(index: number, count: number) {
  if (count <= 1) return 0;
  const safeIndex = Math.max(0, Math.min(count - 1, index));
  return safeIndex / (count - 1);
}

/** Ink follows the rendered camera continuously, rather than switching at the item index. */
export function galleryInk(phase: number, colors: readonly string[]) {
  const safe = Math.max(0, Math.min(colors.length - 1, phase));
  const index = Math.floor(safe);
  const t = safe - index;
  const eased = t * t * (3 - 2 * t);
  const from = parseInt(colors[index]!.slice(1), 16);
  const to = parseInt(colors[Math.min(index + 1, colors.length - 1)]!.slice(1), 16);
  const channel = (shift: number) => Math.round(((from >> shift) & 255) * (1 - eased) + ((to >> shift) & 255) * eased);
  return `rgb(${channel(16)} ${channel(8)} ${channel(0)})`;
}

/** Match the gallery's 45° camera, five world units from each resting image. */
export function fitStandpuntDesktop(width: number, height: number, aspect: number, onRight: boolean) {
  const visibleWorldHeight = 2 * Math.tan(Math.PI / 8) * 5;
  const pixelsPerWorldUnit = height / visibleWorldHeight;
  const imageHeight = Math.min(height * .86, height - 156, width * .61 / aspect);
  return {
    scale: imageHeight / (3 * pixelsPerWorldUnit),
    x: (onRight ? .165 : -.165) * width / pixelsPerWorldUnit,
  };
}
