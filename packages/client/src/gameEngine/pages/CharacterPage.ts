import { StyleColors } from "@src/styles/colors";

import AbstractGamePage from "../AbstractGamePage";
import { drawPageTitle } from "../utils/drawPageTitle";

export default class CharacterPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, 'Страница персонажа');
  }
}