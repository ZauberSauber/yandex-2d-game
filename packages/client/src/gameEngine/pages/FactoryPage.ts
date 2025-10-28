import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT } from '../constants';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawMultilineText } from '../utils/drawMultilineText';
import { drawPageTitle } from '../utils/drawPageTitle';

export default class FactoryPage extends AbstractGamePage {
  private posX = 240;

  private posY = 60;

  private blockHeight = 120;

  private blockPosY = 320;

  private blocks = ['Заготовки', 'Оружие', 'Броня', 'Аптечки'];

  private currentCraftItem = 'Костюм Сингулярности "Энигма';

  private drawFactoryLvl(ctx: CanvasRenderingContext2D): void {
    drawBar({
      ctx,
      posX: this.posX,
      posY: this.posY,
      width: 530,
      height: 5,
      value: 10,
      maxValue: 100,
    });

    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText('Ур. 5 / 100', 240, this.posY + 25);
    ctx.textAlign = 'right';
    ctx.fillText('опыт: 30 / 200', 770, this.posY + 25);
  }

  private drawCraftItem(ctx: CanvasRenderingContext2D): void {
    const posX = this.posX;
    const posY = this.posY + 50;
    const craftItemName = this.currentCraftItem ? this.currentCraftItem : 'Выберите предмет';

    // Полоска - прогресс изготовления предмета
    drawBar({
      ctx,
      posX,
      posY: posY,
      width: 530,
      height: 5,
      value: 50,
      maxValue: 100,
    });

    // Название предмета
    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText(craftItemName, posX + 100, posY + 35);

    // Описание предмета
    drawMultilineText({
      ctx,
      posX: posX + 100,
      posY: posY + 65,
      text: 'Не имеет фиксированной формы. Он похож на текучую ртуть, которая по желанию владельца формирует обтекаемые бронепластины, щиты или шипы. Может менять цвет и текстуру.',
      maxWidth: 430,
      lineHeight: 20,
    });

    // Иконка предмета
    drawImg({
      ctx,
      posX: posX,
      posY: posY + 20,
      width: 90,
      height: 90,
    });

    // Кнопка "Сделать" - запускает производство, пока не кончатся ресурсы, повторное нажатие - остановка производства
    ctx.strokeStyle = StyleColors.colorNeonPink;
    ctx.lineWidth = 1;
    ctx.strokeRect(posX, posY + 120, 90, 40);

    ctx.fillStyle = StyleColors.colorNeonPink;
    ctx.fillText('Сделать', posX + 10, posY + 145);
  }

  private drawBlock(ctx: CanvasRenderingContext2D): void {
    const posY = this.blockPosY;

    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';

    for (let index = 0; index < this.blocks.length; index++) {
      if (index === 1) {
        // Выбранная вкладка крафта
        ctx.fillStyle = StyleColors.colorNeonPink;
      } else {
        ctx.fillStyle = StyleColors.colorNeonBlue;
      }

      ctx.fillText(this.blocks[index], this.posX + 30 + 130 * index, posY);
    }

    // Иконки предметов
    // TODO: если уровеь крафта < уровня предмета, то иконка будет залочена
    ctx.fillStyle = StyleColors.colorNeonBlue;

    const iconShift = 52;

    for (let index = 0; index < 10; index++) {
      drawImg({
        ctx,
        posX: this.posX + 10 + index * iconShift,
        posY: posY + 20,
        width: 30,
        height: 30,
      });

      if (index > 0) {
        ctx.fillText(`${index * 10} ур`, this.posX + index * iconShift + 10, posY + 70);
      }
    }

    ctx.strokeStyle = StyleColors.colorNeonBlue;
    ctx.lineWidth = 1;
    ctx.strokeRect(this.posX, posY - 20, 530, this.blockHeight);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Производство');

    this.drawFactoryLvl(ctx);
    this.drawCraftItem(ctx);
    this.drawBlock(ctx);
  }
}
