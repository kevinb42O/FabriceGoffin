import { chapterProgress } from './homeMotion';

// Mobile uses the same native-scroll chapters, with room for the full biography.
export const mobileScore = { biography: 2.1, transfer: 4.1, gallery: 4.9, galleryEnd: 9.15, release: 10.15 } as const;
export const mobileChapter = (moment: number, from: number, to: number) => chapterProgress(moment, [from, to]);
export const mobileGalleryPhase = (moment: number, count: number) => Math.max(0, Math.min(count - 1, (moment - mobileScore.gallery) / (mobileScore.galleryEnd - mobileScore.gallery) * (count - 1)));

/** Coordinates are measured in the same CSS pixels as the sticky stage. */
export function mobileImageFrame(width: number, height: number, top: number, aspect = 1) {
  if (width > height * 1.3) {
    const imageHeight = Math.max(80, Math.min(height - 220, width * .4 / aspect));
    return { left: width * .74 - imageHeight * aspect / 2, top: 145 + (height - 215 - imageHeight) / 2, width: imageHeight * aspect, height: imageHeight };
  }
  const available = Math.max(80, height - top - 86);
  const imageHeight = Math.min(available, (width - 48) / aspect);
  return { left: (width - imageHeight * aspect) / 2, top: top + (available - imageHeight) / 2, width: imageHeight * aspect, height: imageHeight };
}
