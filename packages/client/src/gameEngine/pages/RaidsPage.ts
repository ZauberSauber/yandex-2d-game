import { StyleColors } from "@src/styles/colors";

import AbstractGamePage from "../AbstractGamePage";
import { MAIN_FONT } from "../constants";
import PageManager from "../PageManager";
import { EGamePage } from "../types";
import { drawPageTitle } from "../utils/drawPageTitle";
import { drawImg } from "../utils/drawThumb";

export default class RaidsPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Рейды');

    this.drawRaidCard(ctx, 240, 60, 'Морской бой');
  }

  private drawRaidCard(ctx: CanvasRenderingContext2D, posX: number, posY: number, name = 'Неизвестное пространство') {
    // Рамка
    ctx.strokeStyle = StyleColors.colorNeonBlue;
    ctx.lineWidth = 1;
    ctx.strokeRect(posX, posY, 320, 145);

    drawImg({
      ctx,
      posX: posX + 10,
      posY: posY + 10,
      width: 80,
      height: 80
    });

    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText(name, posX + 100, posY + 25);
    ctx.fillText('Противники: 10', posX + 100, posY + 45);
    ctx.fillText('Макс ур противников: 25', posX + 100, posY + 65);
    ctx.fillText('Награда: Мусорный криптор', posX + 100, posY + 85);

    ctx.strokeStyle = StyleColors.colorNeonPink;
    ctx.lineWidth = 1;
    ctx.strokeRect(posX + 100, posY + 105, 100, 30);

    ctx.fillStyle = StyleColors.colorNeonPink;
    ctx.fillText('Рейд', posX + 130, posY + 105 + 20);
  }

  override handleClick(x: number, y: number): void {
    if (x > 240 && y > 1) {
      PageManager.getInstance().setPage(EGamePage.battle);
    }
  }
}