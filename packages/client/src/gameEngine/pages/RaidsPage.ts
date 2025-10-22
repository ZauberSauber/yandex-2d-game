import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT } from '../constants';
import { EGamePage } from '../types';
import { drawImg } from '../utils/drawImg';
import { drawMultilineText } from '../utils/drawMultilineText';
import { drawPageTitle } from '../utils/drawPageTitle';

export default class RaidsPage extends AbstractGamePage {
  private activeRaid = {
    name: 'Свалки Мегаполиса',
    description: 'Горы электронного и промышленного мусора на окраинах города',
    enemies: ['Бандиты-Падальщики', 'Бомжи-Мутанты', 'Ловчие-Таксидермисты', 'Крысиный Король'],
    bounty: 'Мусорный криптор',
  };

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Рейды');

    this.drawRaidCard(ctx, 240, 60);
    this.drawButtons(ctx, 420, 340);
  }

  private drawRaidCard(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
    // Рамка
    ctx.strokeStyle = StyleColors.colorNeonBlue;
    ctx.lineWidth = 1;
    ctx.strokeRect(posX, posY, 540, 265);

    drawImg({
      ctx,
      posX: posX + 10,
      posY: posY + 10,
      width: 140,
      height: 140,
    });

    const textX = posX + 160;

    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    // Название локации
    ctx.fillText(this.activeRaid.name, textX, posY + 25);
    // Описание локации
    drawMultilineText({
      ctx,
      maxWidth: 360,
      posX: textX,
      posY: posY + 50,
      text: this.activeRaid.description,
      lineHeight: 20,
    });
    // Противники
    drawMultilineText({
      ctx,
      maxWidth: 360,
      posX: textX,
      posY: posY + 95,
      text: `Противники: ${this.activeRaid.enemies.join(', ')}`,
      lineHeight: 20,
    });

    ctx.fillText('Количество: 10', textX, posY + 160);
    ctx.fillText('Макс ур противников: 25', textX, posY + 185);
    ctx.fillText(`Награда: ${this.activeRaid.bounty}`, textX, posY + 210);

    ctx.strokeStyle = StyleColors.colorNeonPink;
    ctx.lineWidth = 1;
    ctx.strokeRect(textX, posY + 225, 100, 30);

    ctx.fillStyle = StyleColors.colorNeonPink;
    ctx.fillText('Рейд', textX + 30, posY + 225 + 20);
  }

  private drawButtons(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
    ctx.strokeStyle = StyleColors.colorNeonBlue;
    ctx.strokeRect(posX, posY, 80, 40);
    ctx.strokeRect(posX + 120, posY, 80, 40);

    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText('< назад', posX + 10, posY + 25);
    ctx.fillText('вперёд >', posX + 130, posY + 25);
  }

  override handleClick(x: number, y: number): void {
    if (x > 240 && y > 1) {
      if (this.changePage) {
        this.changePage(EGamePage.battle);
      }
    }
  }
}
