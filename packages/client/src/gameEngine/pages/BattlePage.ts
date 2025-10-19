import { StyleColors } from "@src/styles/colors";

import AbstractGamePage from "../AbstractGamePage";
import PageManager from "../PageManager";
import { EGamePage } from "../types";
import { drawPageTitle } from "../utils/drawPageTitle";

export default class BattlePage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Страница сражения');
  }

  override handleClick(x: number, y: number): void {
    if (x > 240 && y > 1) {
      PageManager.getInstance().setPage(EGamePage.raids);
    }
  }
}