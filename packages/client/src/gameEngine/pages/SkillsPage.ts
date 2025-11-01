import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { PAGE_X } from '../constants';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawPageTitle } from '../utils/drawPageTitle';

export default class SkillsPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(PAGE_X, 0, ctx.canvas.width - PAGE_X, ctx.canvas.height);

    drawPageTitle(ctx, 'Навыки');

    this.drawSkillTable(ctx);
  }

  private drawSkillTable(ctx: CanvasRenderingContext2D) {
    const posX = PAGE_X;
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

      drawBar({
        ctx,
        posX: posX + 280,
        posY: textYpos - 10,
        width: 220,
        height: 10,
        value: 25,
        maxValue: 100,
      });

      ctx.fillStyle = StyleColors.colorNeonPurple;
      ctx.fillRect(posX, rowHeight * 2 + shiftY, 500, 1);
    }
  }
}
