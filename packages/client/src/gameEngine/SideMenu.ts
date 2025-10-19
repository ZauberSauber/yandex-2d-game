import { StyleColors } from "@src/styles/colors";

import { GAME_PAGES, MAIN_FONT } from "./constants";
import { drawImg } from "./utils/drawThumb";
import type { EGamePage, TPageManager } from "./types";

export default class SideMenu {
  private menuButtons: { name: EGamePage; top: number; bottom: number; left: number }[] = [];

  private menuWidth = 200;

  private menuX = 10;

  private menuY = 260;

  private itemHeight = 50;

  private itemOffset = 10;

  private hoveredButtonIndex: number | null = null;

  constructor(private pageManager: TPageManager) { }

  addMenuItem(pageName: EGamePage): void {
    const topY = this.menuY + this.menuButtons.length * (this.itemHeight + this.itemOffset);
    const bottomY = topY + this.itemHeight;
  
    this.menuButtons.push({
      name: pageName,
      top: topY,
      bottom: bottomY,
      left: this.menuX,
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    const fontSize = 16;

    // Элементы меню
    ctx.font = MAIN_FONT;
    ctx.save();

    this.menuButtons.forEach((item, index) => {
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
        ctx.strokeRect(item.left, item.top, this.menuWidth, this.itemHeight);
      }

      ctx.textAlign = 'left';
      ctx.shadowColor = 'transparent';
      ctx.fillText(GAME_PAGES[item.name].title, item.left + 20, item.top + this.itemHeight / 2 + fontSize / 2);
    });

    ctx.restore();

    this.drawHUD(ctx);
  }

  private drawHUD(ctx: CanvasRenderingContext2D): void {
    // Показатели песонажа: точность, сила, защита, здоровье
    for (let index = 0; index < 4; index++) {
      drawImg({
        ctx,
        posX: 10,
        posY: 60 + 50 * index,
      });

      const text = index === 3 ? '- 100' : '- 1';
      ctx.font = MAIN_FONT;
      ctx.textAlign = 'left';
      ctx.fillStyle = StyleColors.colorNeonCyan;
      ctx.fillText(text, 60, 60 + 50 * index + 25);
    }
  }

  getButtonIndex(x: number, y: number): number {
    for (let i = 0; i < this.menuButtons.length; i++) {
      const item = this.menuButtons[i];

      if (x >= item.left && x < item.left + this.menuWidth &&
        y >= item.top && y < item.bottom) {
        return i;
      }
    }

    return -1;
  }

  handleClick(x: number, y: number): void {
    // Проверка клика по элементам меню
    if (x >= this.menuX && x < this.menuWidth && y >= this.menuY) {
      const buttonIndex = this.getButtonIndex(x, y);

      if (buttonIndex >= 0) {
        const pageName = this.menuButtons[buttonIndex].name;

        this.pageManager.setPage(pageName);
      }
    }
  }

  // Обновление позиции курсора для подсветки
  updateHover(x: number, y: number): void {
    if (x >= this.menuX && x < this.menuWidth && y >= this.menuY) {
      this.hoveredButtonIndex = this.getButtonIndex(x, y);
    } else {
      this.hoveredButtonIndex = null;
    }
  }
}
