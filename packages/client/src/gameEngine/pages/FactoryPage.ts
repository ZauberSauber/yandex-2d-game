import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT } from '../constants';
import { ARMORS } from '../constants/armors';
import { MEDKITS } from '../constants/medkits';
import { WEAPONS } from '../constants/weapons';
import PlayerManager from '../PlayerManager';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawMultilineText } from '../utils/drawMultilineText';
import { drawPageTitle } from '../utils/drawPageTitle';
import { getExpToNextLvl } from '../utils/expToNextLvl';
import type { TButton } from '../types';

export default class FactoryPage extends AbstractGamePage {
  private posX = 240;

  private posY = 60;

  private blockHeight = 120;

  private blockPosY = 320;

  private tabs = new Map();

  private activeTab;

  private currentCraftItem = 'Костюм Сингулярности "Энигма';

  constructor() {
    super();

    this.tabs.set('weapon', { name: 'Оружие', content: Object.values(WEAPONS) });
    this.tabs.set('armor', { name: 'Броня', content: Object.values(ARMORS) });
    this.tabs.set('medkit', { name: 'Аптечки', content: Object.values(MEDKITS) });

    let i = 0;
    this.tabs.forEach((_, key) => {
      const button = {
        name: key,
        x: this.posX + 20 + 185 * i,
        y: this.blockPosY - 15,
        width: 100,
        height: 25,
      };
      this.buttonManager.addButton(button);

      i++;
    });

    this.activeTab = this.tabs.get('weapon');
  }

  private drawFactoryLvl(ctx: CanvasRenderingContext2D): void {
    const {
      skills: {
        production,
        production: { lvl, exp, maxLvl },
      },
    } = PlayerManager.getInstance().playerState;
    const { expToNextLvl, expToPercentages } = getExpToNextLvl(production);

    drawBar({
      ctx,
      posX: this.posX,
      posY: this.posY,
      width: 530,
      height: 5,
      value: expToPercentages,
      maxValue: 100,
    });

    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorDarkBg;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText(`Ур. ${lvl} / ${maxLvl}`, 240, this.posY + 25);
    ctx.textAlign = 'right';
    ctx.fillText(`опыт: ${exp} / ${expToNextLvl}`, 770, this.posY + 25);
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
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
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
      src: 'public/img/suit.png',
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

    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'center';

    this.tabs.forEach((tab, key) => {
      if (tab.name === this.activeTab.name) {
        // Выбранная вкладка крафта
        ctx.fillStyle = StyleColors.colorNeonPink;
      } else {
        ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
      }

      const button = this.buttonManager.getButtonByName(key) as TButton;
      ctx.fillText(tab.name, button.x + button.width / 2, button.y + button.height / 2 + 5);
    });

    // Иконки предметов
    // TODO: если уровеь крафта < уровня предмета, то иконка будет залочена
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;

    const iconShift = 52;

    for (let index = 0; index < this.activeTab.content.length; index++) {
      drawImg({
        ctx,
        posX: this.posX + 10 + index * iconShift,
        posY: posY + 20,
        width: 30,
        height: 30,
        src: this.activeTab.content[index].imageSrc,
      });

      if (index > 0) {
        ctx.fillText(`${index * 10} ур`, this.posX + index * iconShift + 10, posY + 70);
      }
    }

    ctx.strokeStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.lineWidth = 1;
    ctx.strokeRect(this.posX, posY - 20, 530, this.blockHeight);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorDarkBg : StyleColors.colorNeonBlue;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, this.isDarkTheme, 'Производство');

    this.drawFactoryLvl(ctx);
    this.drawCraftItem(ctx);
    this.drawBlock(ctx);
  }

  override handleClick(x: number, y: number): void {
    const buttonName = this.buttonManager.getButtonName(x, y);

    if (!buttonName) {
      return;
    }

    if (this.tabs.has(buttonName)) {
      this.activeTab = this.tabs.get(buttonName);
    }
  }
}
