import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT } from '../constants';
import { EGamePage } from '../types';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawPageTitle } from '../utils/drawPageTitle';

export default class BattlePage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Страница сражения');

    this.drawBattle(ctx);
  }

  private drawBattle(ctx: CanvasRenderingContext2D) {
    // хп игрока
    drawBar({
      ctx,
      posX: 240,
      posY: 140,
      width: 120,
      height: 5,
      value: 90,
      maxValue: 100,
      endHexColor: StyleColors.colorNeonPink,
    });

    // готовность игрока к атаке
    drawBar({
      ctx,
      posX: 240,
      posY: 170,
      width: 120,
      height: 5,
      value: 42,
      maxValue: 100,
      startHexColor: StyleColors.colorNeonBlue,
    });

    // хп врага
    drawBar({
      ctx,
      posX: 640,
      posY: 140,
      width: 120,
      height: 5,
      value: 90,
      maxValue: 100,
      endHexColor: StyleColors.colorNeonPink,
    });

    // готовность врага к атаке
    drawBar({
      ctx,
      posX: 640,
      posY: 170,
      width: 120,
      height: 5,
      value: 42,
      maxValue: 100,
      startHexColor: StyleColors.colorNeonBlue,
    });

    ctx.font = MAIN_FONT;
    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.textAlign = 'left';
    ctx.fillText('Вы', 240, 120);
    ctx.fillText('Враг', 640, 120);

    // Иконка врага
    drawImg({
      ctx,
      posX: 400,
      posY: 60,
      width: 200,
      height: 200,
    });

    // Обводка иконки
    ctx.strokeStyle = StyleColors.colorNeonPurple;
    ctx.lineWidth = 2;
    ctx.strokeRect(400, 60, 200, 200);

    // Кнопка лечения
    drawImg({
      ctx,
      posX: 340,
      posY: 320,
      width: 80,
      height: 80,
    });

    // Количество аптечек
    ctx.fillStyle = StyleColors.colorNeonCyan;
    ctx.textAlign = 'center';
    ctx.fillText('10', 380, 310);

    // Кнопка сбежать
    drawImg({
      ctx,
      posX: 580,
      posY: 320,
      width: 80,
      height: 80,
    });
  }

  override handleClick(x: number, y: number): void {
    if (x > 240 && y > 1) {
      if (this.changePage) {
        this.changePage(EGamePage.raids);
      } else {
      }
    }
  }
}
