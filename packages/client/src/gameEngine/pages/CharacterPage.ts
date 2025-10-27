import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT } from '../constants';
import { drawImg } from '../utils/drawImg';
import { drawPageTitle } from '../utils/drawPageTitle';

export default class CharacterPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Страница персонажа');

    this.drawEquipment(ctx);
  }

  private drawEquipment(ctx: CanvasRenderingContext2D) {
    drawImg({
      ctx,
      posX: 260,
      posY: 100,
      width: 60,
      height: 60,
    });

    drawImg({
      ctx,
      posX: 260,
      posY: 200,
      width: 60,
      height: 60,
    });

    drawImg({
      ctx,
      posX: 260,
      posY: 300,
      width: 60,
      height: 60,
    });

    ctx.font = MAIN_FONT;
    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.fillText('- Оружие', 340, 135);
    ctx.fillText('- Броня', 340, 235);
    ctx.fillText('- Аптечка', 340, 335);

    ctx.fillText('Характеристики', 520, 100);
    ctx.fillText('Мин. урон', 520, 130);
    ctx.fillText('1', 680, 130);
    ctx.fillText('Макс. урон', 520, 155);
    ctx.fillText('10', 680, 155);
    ctx.fillText('Шанс крит. удара', 520, 180);
    ctx.fillText('10%', 680, 180);
    ctx.fillText('Множитель крита', 520, 205);
    ctx.fillText('1.5', 680, 205);
    ctx.fillText('Скорость атаки', 520, 230);
    ctx.fillText('2c', 680, 230);
    ctx.fillText('Макс. здоровье', 520, 255);
    ctx.fillText('100', 680, 255);
    ctx.fillText('Скорость регена', 520, 280);
    ctx.fillText('1/30c', 680, 280);

    ctx.strokeStyle = StyleColors.colorNeonPurple;
    ctx.lineWidth = 2;
    ctx.strokeRect(240, 80, 240, 300);
    ctx.strokeRect(500, 80, 240, 220);
  }
}
