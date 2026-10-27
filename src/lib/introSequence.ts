import { createContext, useContext } from 'react';
import type { RefObject } from 'react';
import type { MotionValue } from 'motion/react';
import { fitStandpuntDesktop, standpuntenDistance } from './standpuntenMotion';

export type IntroFrame = { left: number; top: number; width: number; height: number };
// Native viewport distances: leave room for the full-screen statement and a
// settled biography before the photograph travels into the priorities.
export const introScore = { opening: 2.8, transfer: .95, biography: 2.52 } as const;
export const clampProgress = (value: number) => {
  if (value <= Number.EPSILON * 8) return 0;
  if (value >= 1 - Number.EPSILON * 8) return 1;
  return value;
};
export const galleryStart = introScore.opening + introScore.transfer;
export const newsTransferDistance = 1;
export const newsTransferProgress = (moment: number, count: number) => clampProgress((moment - introDistance(count)) / newsTransferDistance);
export const introDistance = (count: number) => galleryStart + standpuntenDistance(count);

export function introPhases(moment: number, count: number) {
  return {
    opening: clampProgress(moment / introScore.opening),
    transfer: clampProgress((moment - introScore.opening) / introScore.transfer),
    gallery: clampProgress((moment - galleryStart) / Math.max(.001, standpuntenDistance(count))),
  };
}

export function firstStandpuntFrame(width: number, height: number): IntroFrame {
  const fitted = fitStandpuntDesktop(width, height, 1, false);
  const visibleWorldHeight = 2 * Math.tan(Math.PI / 8) * 5;
  const imageHeight = 3 * fitted.scale / visibleWorldHeight * height;
  return {
    left: (width * .335 - imageHeight / 2) / width * 100,
    top: (height - imageHeight) / height * 50,
    width: imageHeight / width * 100,
    height: imageHeight / height * 100,
  };
}

type IntroSequence = {
  enabled: boolean;
  openingProgress: MotionValue<number>;
  transferProgress: MotionValue<number>;
  galleryProgress: MotionValue<number>;
  newsProgress: MotionValue<number>;
  firstFrame: MotionValue<IntroFrame>;
  canvasReady: MotionValue<boolean>;
  canvasPresented: MotionValue<boolean>;
  overlayHost: RefObject<HTMLDivElement | null>;
  preload: boolean;
  galleryActive: boolean;
  galleryVisible: boolean;
  setOpeningReady: (ready: boolean) => void;
  reportFrame: (frame: IntroFrame) => void;
  navigate: (moment: number) => void;
};
export const IntroSequenceContext = createContext<IntroSequence | null>(null);
export const useIntroSequence = () => useContext(IntroSequenceContext);
