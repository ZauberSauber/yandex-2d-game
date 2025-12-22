import PlayerManager from '@src/gameEngine/PlayerManager';
import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { PAGE_X } from '../constants';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawPageTitle } from '../utils/drawPageTitle';
import { getExpToNextLvl } from '../utils/getExpToNextLvl';
import type { ESkillName } from '../types';

export default class SkillsPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorDarkBg : StyleColors.colorNeonBlue;
    ctx.fillRect(PAGE_X, 0, ctx.canvas.width - PAGE_X, ctx.canvas.height);

    drawPageTitle(ctx, this.isDarkTheme, 'Навыки');

    this.drawSkillTable(ctx);
  }

  private drawSkillTable(ctx: CanvasRenderingContext2D) {
    const posX = PAGE_X;
    const rowHeight = 60;
    const gap = 10;
    const imgSize = 30;

    const { skills } = PlayerManager.getInstance().playerState;

    const skillsKeysNames = Object.keys(skills) as ESkillName[];

    for (let i = 0; i < skillsKeysNames.length; i++) {
      const skill = skills[skillsKeysNames[i]];
      const { name, lvl, exp, maxLvl, img } = skill;
      const shiftY = (rowHeight + gap) * i;

      drawImg({
        ctx,
        posX,
        posY: rowHeight + shiftY + imgSize / 2,
        height: imgSize,
        width: imgSize,
        src: img,
      });

      ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;

      ctx.textAlign = 'left';

      const textYpos = rowHeight + rowHeight / 2 + shiftY + 5;

      const { expToNextLvl, expToPercentages } = getExpToNextLvl({ lvl, currentExp: exp });

      // Название навыка
      ctx.fillText(name, posX + 50, textYpos - 10);
      // Уровень
      ctx.fillText(`${lvl}/${maxLvl}`, posX + 50, textYpos + 10);
      // Прогресс в процентах
      ctx.fillText(`${expToPercentages}%`, posX + 195, textYpos);
      // Прогресс в количестве
      ctx.fillText(`${exp}/${expToNextLvl}`, posX + 250, textYpos);

      drawBar({
        ctx,
        posX: posX + 330,
        posY: textYpos - 10,
        width: 170,
        height: 10,
        value: expToPercentages < 100 ? expToPercentages : 100,
        maxValue: 100,
      });

      ctx.fillStyle = StyleColors.colorNeonPurple;
      ctx.fillRect(posX, rowHeight * 2 + shiftY, 500, 1);
    }
  }
}
