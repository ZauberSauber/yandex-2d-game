import { StyleColors } from "@src/styles/colors";

import { getProgressColor } from "./getProgressColor";
import { hexToRgb } from "./hexToRgb";

export const drawBar = (
  ctx: CanvasRenderingContext2D,
  posX: number,
  posY: number,
  width: number,
  height: number,
  value: number,
  maxValue: number
): void => {
  ctx.save();

  // Фон шкалы
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(posX, posY, width, height);

  // Заполненная часть
  const progressWidth = (value / maxValue) * width;
  const currentColor = getProgressColor(hexToRgb(StyleColors.colorNeonPink), hexToRgb(StyleColors.colorNeonBlue), value / maxValue);
  ctx.shadowColor = currentColor;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = currentColor;
  ctx.fillRect(posX, posY, progressWidth, height);

  ctx.restore();
}