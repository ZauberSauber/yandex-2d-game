import type { TRGB } from '../types';

export function getProgressColor(startRGB: TRGB, endRGB: TRGB, progress: number): string {
  // Линейная интерполяция для каждой компоненты
  const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * progress);
  const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * progress);
  const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * progress);

  return `rgb(${r}, ${g}, ${b})`;
}
