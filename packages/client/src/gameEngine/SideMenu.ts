import { StyleColors } from '@src/styles/colors';

import ButtonManager from './ButtonManager';
import { GAME_PAGES, MAIN_FONT } from './constants';
import PlayerManager from './PlayerManager';
import { EGamePage } from './types';
import { drawImg } from './utils/drawImg';
import type { TPageManager } from './types';

export default class SideMenu {
  private buttonManager;

  private menuWidth = 200;

  private menuX = 10;

  private menuY = 260;

  private itemHeight = 50;

  private itemOffset = 10;

  private hoveredButtonIndex: number | null = null;

  constructor(private pageManager: TPageManager) {
    this.buttonManager = new ButtonManager<EGamePage>();
  }

  addMenuItem(pageName: EGamePage): void {
    const topY =
      this.menuY + this.buttonManager.getButtons().length * (this.itemHeight + this.itemOffset);

    this.buttonManager.addButton({
      name: pageName,
      x: this.menuX,
      y: topY,
      height: this.itemHeight,
      width: this.menuX + this.menuWidth,
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.menuWidth + 40, ctx.canvas.height);
    const fontSize = 16;

    // Элементы меню
    ctx.font = MAIN_FONT;
    ctx.save();

    this.buttonManager.getButtons().forEach((button, index) => {
      // Подсветка при наведении
      if (index === this.hoveredButtonIndex) {
        ctx.strokeStyle = StyleColors.colorNeonPink;
        ctx.fillStyle = StyleColors.colorNeonPink;

        ctx.shadowColor = StyleColors.colorNeonPink;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      } else {
        ctx.strokeStyle = StyleColors.colorNeonBlue;
        ctx.fillStyle = StyleColors.colorNeonBlue;

        ctx.shadowColor = 'transparent';
      }

      ctx.lineWidth = 1;

      // Для более интенсивного эффекта подсветки отрисовку границы нужно делать несколько раз
      const shadowPower = 3;

      for (let i = 0; i < shadowPower; i++) {
        ctx.strokeRect(button.x, button.y, this.menuWidth, this.itemHeight);
      }

      ctx.textAlign = 'left';
      ctx.shadowColor = 'transparent';
      ctx.fillText(
        GAME_PAGES[button.name || EGamePage.raids].title,
        button.x + 20,
        button.y + this.itemHeight / 2 + fontSize / 2
      );
    });

    ctx.restore();

    this.drawHUD(ctx);
  }

  private drawHUD(ctx: CanvasRenderingContext2D): void {
    const {
      playerHP,
      skills: { accuracy, defense, power },
    } = PlayerManager.getInstance().playerState;
    const props: number[] = [accuracy.lvl, defense.lvl, power.lvl, playerHP];

    // Показатели персонажа: точность, сила, защита, здоровье
    for (let index = 0; index < 4; index++) {
      drawImg({
        ctx,
        posX: 10,
        posY: 60 + 50 * index,
      });

      const text = `- ${props[index]}`;
      ctx.font = MAIN_FONT;
      ctx.textAlign = 'left';
      ctx.fillStyle = StyleColors.colorNeonCyan;
      ctx.fillText(text, 60, 60 + 50 * index + 25);
    }
  }

  handleClick(x: number, y: number): void {
    // Проверка клика по элементам меню
    const buttonIndex = this.buttonManager.getButtonIndex(x, y);

    if (buttonIndex >= 0) {
      const pageName = this.buttonManager.getButtons()[buttonIndex].name;

      this.pageManager.setPage(pageName as EGamePage);
    }
  }

  // Обновление позиции курсора для подсветки
  updateHover(x: number, y: number): void {
    this.hoveredButtonIndex = this.buttonManager.getButtonIndex(x, y);
  }
}
