import PlayerManager from '@src/gameEngine/PlayerManager';
import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { PAGE_X } from '../constants';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawPageTitle } from '../utils/drawPageTitle';
import { getExpToNextLvl } from '../utils/expToNextLvl';
import type { ESkillName } from '../types';

export default class SkillsPage extends AbstractGamePage {
  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(PAGE_X, 0, ctx.canvas.width - PAGE_X, ctx.canvas.height);

    drawPageTitle(ctx, 'Навыки');

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
      const shiftY = (rowHeight + gap) * i;

      drawImg({
        ctx,
        posX,
        posY: rowHeight + shiftY + imgSize / 2,
        height: imgSize,
        width: imgSize,
      });

      ctx.fillStyle = StyleColors.colorNeonBlue;
      ctx.textAlign = 'left';

      const textYpos = rowHeight + rowHeight / 2 + shiftY + 5;

      const skill = skills[skillsKeysNames[i]];
      const { name, lvl, exp, maxLvl } = skill;

      const { expToNextLvl, expToPercentages } = getExpToNextLvl(skill);

      // Уровень
      ctx.fillText(`${name} ${lvl}/${maxLvl}`, posX + 50, textYpos);
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
