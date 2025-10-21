import { StyleColors } from '@src/styles/colors';

import { getProgressColor } from './getProgressColor';
import { hexToRgb } from './hexToRgb';

type TDrawBarProps = {
  ctx: CanvasRenderingContext2D;
  posX: number;
  posY: number;
  width: number;
  height: number;
  value: number;
  maxValue: number;
  startHexColor?: string;
  endHexColor?: string;
  backColor?: string;
};
export const drawBar = ({
  ctx,
  posX,
  posY,
  width,
  height,
  value,
  maxValue,
  startHexColor = StyleColors.colorNeonPink,
  endHexColor = StyleColors.colorNeonBlue,
  backColor = '#f0f0f0',
}: TDrawBarProps): void => {
  ctx.save();

  // Фон шкалы
  ctx.fillStyle = backColor;
  ctx.fillRect(posX, posY, width, height);

  // Заполненная часть
  const progressWidth = (value / maxValue) * width;
  const currentColor = getProgressColor(
    hexToRgb(startHexColor),
    hexToRgb(endHexColor),
    value / maxValue
  );
  ctx.shadowColor = currentColor;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = currentColor;
  ctx.fillRect(posX, posY, progressWidth, height);

  ctx.restore();
};
