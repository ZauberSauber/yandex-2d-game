import { StyleColors } from "@src/styles/colors";

import { MAIN_FONT } from "../constants";

export const drawPageTitle = (ctx: CanvasRenderingContext2D, title = '') => {
  ctx.save();

  ctx.fillStyle = StyleColors.colorNeonBlue;
  ctx.font = MAIN_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(title, ctx.canvas.width / 2, 20);

  ctx.restore();
}
