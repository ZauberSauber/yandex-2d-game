import { StyleColors } from "@src/styles/colors";

import AbstractGamePage from "../AbstractGamePage";
import { drawBar } from "../utils/drawBar";
import { drawPageTitle } from "../utils/drawPageTitle";
import { drawImg } from "../utils/drawThumb";

export default class SkillsPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Навыки');

    this.drawSkillTable(ctx);
  }

  private drawSkillTable(ctx: CanvasRenderingContext2D) {
    const posX = 240;
    const rowHeight = 60;
    const gap = 10;
    const imgSize = 30;

    for (let i = 0; i < 3; i++) {
      const shiftY = (rowHeight + gap) * i;

      drawImg({
        ctx,
        posX,
        posY: rowHeight + shiftY + imgSize / 2,
        height: imgSize,
        width: imgSize,
      });

      ctx.fillStyle = StyleColors.colorNeonBlue;
      ctx.textAlign = 'left';

      const textYpos = rowHeight + rowHeight / 2 + shiftY + 5;
      
      // Уровень
      ctx.fillText('1/100', posX + 50, textYpos);
      // Пргресс в процентах
      ctx.fillText('25%', posX + 120, textYpos);
      // Пргресс в количестве
      ctx.fillText('250/1000', posX + 180, textYpos);

      drawBar(ctx, posX + 280, textYpos - 10, 220, 10, 25, 100);

      ctx.fillStyle = StyleColors.colorNeonPurple;
      ctx.fillRect(posX, rowHeight * 2 + shiftY, 500, 1);
    }
  }
}