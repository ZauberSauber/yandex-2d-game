import { StyleColors } from '@src/styles/colors';

import { MAIN_FONT, SCALE } from '../constants';

export const drawPageTitle = (ctx: CanvasRenderingContext2D, isDark: boolean, title = '') => {
  ctx.save();

  ctx.fillStyle = isDark ? StyleColors.colorNeonBlue : StyleColors.colorDarkBg;
  ctx.font = MAIN_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(title, ctx.canvas.width / (2 * SCALE), 20);

  ctx.restore();
};
