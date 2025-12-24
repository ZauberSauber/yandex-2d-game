import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { HEAD_FONT, INVENTORY_ITEMS, MAIN_FONT, PAGE_X, SCALE } from '../constants';
import PlayerManager from '../PlayerManager';
import { drawPageTitle } from '../utils/drawPageTitle';
import type { TButton, TInventoryItemValue, TInvetoryItemName } from '../types';

export default class InventoryPage extends AbstractGamePage {
  private isAnimating: boolean = true;

  private visibleRows: number = 17;

  private rowHeight: number = 30;

  private scrollOffset: number = 0;

  private items: { key: TInvetoryItemName; item: TInventoryItemValue }[] = [];

  constructor() {
    super();

    this.buttonManager.addButton([
      {
        name: 'up',
        x: 740,
        y: 470,
        width: 30,
        height: 40,
      },
      {
        name: 'down',
        x: 740,
        y: 520,
        width: 30,
        height: 40,
      },
    ]);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.isAnimating) {
      this.isAnimating = false;
    }

    this.drawInventory(ctx, PAGE_X, 80);
  }

  override onEnter(): void {
    this.items = Array.from(PlayerManager.getInstance().getInventory(), ([key, item]) => ({
      key,
      item,
    }));

    this.isAnimating = true;
  }

  override onExit(): void {
    this.isAnimating = true;
  }

  override handleClick(x: number, y: number): void {
    const buttonName = this.buttonManager.getButtonName(x, y);

    if (!buttonName) {
      return;
    }

    if (buttonName === 'up') {
      this.scrollUp();
    }

    if (buttonName === 'down') {
      this.scrollDown();
    }
  }

  private scrollUp() {
    if (this.scrollOffset > 0) {
      this.scrollOffset--;
      this.isAnimating = true;
    }
  }

  private scrollDown() {
    if (this.scrollOffset < this.items.length - this.visibleRows) {
      this.scrollOffset++;
      this.isAnimating = true;
    }
  }

  private drawInventory(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorDarkBg : StyleColors.colorNeonBlue;
    ctx.fillRect(posX, 0, ctx.canvas.width - posX, ctx.canvas.height);

    drawPageTitle(ctx, this.isDarkTheme, 'Инвевнтарь');

    if (this.items.length === 0) {
      ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorDarkBg;
      ctx.font = MAIN_FONT;
      ctx.textAlign = 'center';
      ctx.fillText(
        'Сейчас инвентарь пуст',
        ctx.canvas.width / (2 * SCALE) + 100,
        ctx.canvas.height / (2 * SCALE)
      );

      return;
    }

    for (let i = 0; i < this.visibleRows; i++) {
      const itemIndex = i + this.scrollOffset;
      if (itemIndex >= this.items.length) break;

      const rowY = posY + i * this.rowHeight;

      ctx.fillStyle = StyleColors.colorNeonBlue;
      ctx.font = MAIN_FONT;
      ctx.textAlign = 'left';
      ctx.fillText(INVENTORY_ITEMS[this.items[itemIndex].key].name, posX, rowY);
      ctx.textAlign = 'right';
      ctx.fillText(`${this.items[itemIndex].item.count}`, ctx.canvas.width / SCALE - 80, rowY);
    }

    const upButton = this.buttonManager.getButtonByName('up') as TButton;
    const downButton = this.buttonManager.getButtonByName('down') as TButton;

    ctx.strokeStyle = StyleColors.colorNeonBlue;
    ctx.textAlign = 'center';
    ctx.font = HEAD_FONT;

    // код стрелки вниз '\u2193', код стрелки вверх '\u2191'
    if (
      this.items.length > this.visibleRows &&
      this.items.length - this.scrollOffset !== this.visibleRows
    ) {
      ctx.strokeRect(downButton.x, downButton.y, downButton.width, downButton.height);
      ctx.fillText(
        '\u2193',
        downButton.x + downButton.width / 2,
        downButton.y + downButton.height / 2 + 5
      );
    }

    if (this.scrollOffset > 0) {
      ctx.strokeRect(upButton.x, upButton.y, upButton.width, upButton.height);
      ctx.fillText('\u2191', upButton.x + upButton.width / 2, upButton.y + upButton.height / 2 + 5);
    }
  }
}
