import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT, PAGE_X } from '../constants';
import PlayerManager from '../PlayerManager';
import { EGamePage, ESkillName } from '../types';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawPageTitle } from '../utils/drawPageTitle';
import type { TButton } from '../types';

export default class BattlePage extends AbstractGamePage {
  constructor() {
    super();

    this.buttonManager.addButton([
      {
        name: 'heal',
        x: 340,
        y: 450,
        width: 80,
        height: 80,
      },
      {
        name: 'run',
        x: 580,
        y: 450,
        width: 80,
        height: 80,
      },
      {
        name: ESkillName.accuracy,
        x: 400,
        y: 340,
        width: 60,
        height: 60,
      },
      {
        name: ESkillName.defense,
        x: 470,
        y: 340,
        width: 60,
        height: 60,
      },
      {
        name: ESkillName.power,
        x: 540,
        y: 340,
        width: 60,
        height: 60,
      },
    ]);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = StyleColors.colorDarkBg;
    ctx.fillRect(PAGE_X, 0, ctx.canvas.width - PAGE_X, ctx.canvas.height);

    drawPageTitle(ctx, 'Страница сражения');

    this.drawBattle(ctx);
  }

  override onEnter(): void {
    PlayerManager.getInstance().setupBattle();
  }

  override onExit(): void {
    PlayerManager.getInstance().stopBattle();
  }

  private drawBattle(ctx: CanvasRenderingContext2D) {
    const battle = PlayerManager.getInstance().getBattleState();

    if (battle.state === 'victory') {
      if (this.changePage) {
        this.changePage(EGamePage.raids);
      }
    }

    // хп игрока
    drawBar({
      ctx,
      posX: 240,
      posY: 140,
      width: 120,
      height: 5,
      value: battle.player.health,
      maxValue: battle.player.maxHealth,
      endHexColor: StyleColors.colorNeonPink,
    });

    // готовность игрока к атаке
    drawBar({
      ctx,
      posX: 240,
      posY: 170,
      width: 120,
      height: 5,
      value: battle.player.cooldown,
      maxValue: battle.player.attackSpeed,
      startHexColor: StyleColors.colorNeonBlue,
    });

    // хп врага
    drawBar({
      ctx,
      posX: 640,
      posY: 140,
      width: 120,
      height: 5,
      value: battle.enemy?.health ?? 100,
      maxValue: battle.enemy?.maxHealth || 100,
      endHexColor: StyleColors.colorNeonPink,
    });

    // готовность врага к атаке
    drawBar({
      ctx,
      posX: 640,
      posY: 170,
      width: 120,
      height: 5,
      value: battle.enemy?.cooldown ?? 100,
      maxValue: battle.enemy?.attackSpeed || 100,
      startHexColor: StyleColors.colorNeonBlue,
    });

    ctx.font = MAIN_FONT;
    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.textAlign = 'left';
    ctx.fillText('Вы', 240, 120);
    ctx.fillText('Враг', 640, 120);

    if (battle.state === 'idle') {
      ctx.fillText('Поиск врага...', 410, 160);
    } else {
      // Иконка врага
      drawImg({
        ctx,
        posX: 400,
        posY: 60,
        width: 200,
        height: 200,
      });
    }

    // Обводка иконки
    ctx.strokeStyle = StyleColors.colorNeonPurple;
    ctx.lineWidth = 2;
    ctx.strokeRect(400, 60, 200, 200);

    // Название противника
    const enemyName = battle.state === 'idle' ? '' : battle.enemy?.name;

    ctx.textAlign = 'center';
    ctx.fillText(enemyName || '', 500, 290);

    // Счётчик врагов
    ctx.textAlign = 'left';
    ctx.fillText(`Побеждено: ${battle.enemyDefeated}`, 640, 260);

    ctx.textAlign = 'center';
    ctx.fillText('Стиль атаки', 500, 330);

    // Кнопки выбора стиля атаки
    const accuracyButton = this.buttonManager.getButtonByName(ESkillName.accuracy) as TButton;
    const defenseButton = this.buttonManager.getButtonByName(ESkillName.defense) as TButton;
    const powerButton = this.buttonManager.getButtonByName(ESkillName.power) as TButton;
    const activeButton = this.buttonManager.getButtonByName(battle.activeSkill) as TButton;

    drawImg({
      ctx,
      posX: accuracyButton.x,
      posY: accuracyButton.y,
      width: accuracyButton.width,
      height: accuracyButton.height,
    });

    drawImg({
      ctx,
      posX: defenseButton.x,
      posY: defenseButton.y,
      width: defenseButton.width,
      height: defenseButton.height,
    });

    drawImg({
      ctx,
      posX: powerButton.x,
      posY: powerButton.y,
      width: powerButton.width,
      height: powerButton.height,
    });

    ctx.strokeStyle = StyleColors.colorNeonBlue;
    ctx.lineWidth = 2;
    ctx.strokeRect(activeButton.x, activeButton.y, activeButton.width, activeButton.height);

    // Кнопка лечения
    const healButton = this.buttonManager.getButtonByName('heal') as TButton;
    drawImg({
      ctx,
      posX: healButton.x,
      posY: healButton.y,
      width: healButton.width,
      height: healButton.height,
    });

    // Количество аптечек
    ctx.fillStyle = StyleColors.colorNeonCyan;
    ctx.textAlign = 'center';
    ctx.fillText('10', healButton.x + healButton.width / 2, healButton.y - 10);

    // Кнопка сбежать
    const runButton = this.buttonManager.getButtonByName('run') as TButton;
    drawImg({
      ctx,
      posX: runButton.x,
      posY: runButton.y,
      width: runButton.width,
      height: runButton.height,
    });
  }

  override handleClick(x: number, y: number): void {
    const buttonName = this.buttonManager.getButtonName(x, y);

    if (!buttonName) {
      return;
    }

    if (buttonName === ESkillName.accuracy) {
      PlayerManager.getInstance().setActiveSkill(ESkillName.accuracy);
    }

    if (buttonName === ESkillName.defense) {
      PlayerManager.getInstance().setActiveSkill(ESkillName.defense);
    }

    if (buttonName === ESkillName.power) {
      PlayerManager.getInstance().setActiveSkill(ESkillName.power);
    }

    if (buttonName === 'heal') {
      PlayerManager.getInstance().heal();
    }

    if (buttonName === 'run') {
      PlayerManager.getInstance().stopBattle();

      if (this.changePage) {
        this.changePage(EGamePage.raids);
      }
    }
  }
}
