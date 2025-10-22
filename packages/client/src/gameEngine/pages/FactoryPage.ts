import { StyleColors } from "@src/styles/colors";

import AbstractGamePage from "../AbstractGamePage";
import { drawBar } from "../utils/drawBar";
import { drawPageTitle } from "../utils/drawPageTitle";

export default class FactoryPage extends AbstractGamePage {
  private drawActionProgress(ctx: CanvasRenderingContext2D, value: number, maxValue: number): void {
    const width = ctx.canvas.width;
    const height = 40;
    const posX = 0;
    const posY = ctx.canvas.height - height;

    drawBar(ctx, posX, posY, width, height, value, maxValue);

    // Граница
    ctx.strokeStyle = StyleColors.colorNeonPurple;
    ctx.lineWidth = 2;
    ctx.strokeRect(posX, posY, width, height);

    // Текст
    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Текущее значение: ${value.toFixed(0)}`, width / 2, posY - 10);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Производство');

    this.drawActionProgress(ctx, 100, 1000);
  }
}
