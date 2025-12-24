import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import { MAIN_FONT, PAGE_X } from '../constants';
import { LOCATIONS } from '../constants/locations';
import PlayerManager from '../PlayerManager';
import { EGamePage, ELocation } from '../types';
import { drawImg } from '../utils/drawImg';
import { drawMultilineText } from '../utils/drawMultilineText';
import { drawPageTitle } from '../utils/drawPageTitle';
import type { TButton } from '../types';

export default class RaidsPage extends AbstractGamePage {
  private locationNames = Object.keys(LOCATIONS) as ELocation[];

  private activeLocation = LOCATIONS[ELocation.megaplexDumps];

  constructor() {
    super();
    this.buttonManager.addButton([
      {
        name: 'next',
        x: 540,
        y: 360,
        width: 80,
        height: 40,
      },
      {
        name: 'back',
        x: 420,
        y: 360,
        width: 80,
        height: 40,
      },
      {
        name: 'raid',
        x: 400,
        y: 305,
        width: 100,
        height: 30,
      },
    ]);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorDarkBg : StyleColors.colorNeonBlue;
    ctx.fillRect(PAGE_X, 0, ctx.canvas.width - PAGE_X, ctx.canvas.height);

    drawPageTitle(ctx, this.isDarkTheme, 'Рейды');

    this.drawRaidCard(ctx, PAGE_X, 60);
    this.drawButtons(ctx);
  }

  private drawRaidCard(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
    // Рамка
    ctx.strokeStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ;
    ctx.lineWidth = 1;
    ctx.strokeRect(posX, posY, 540, 285);

    // Изображение локации
    drawImg({
      ctx,
      posX: posX + 10,
      posY: posY + 10,
      width: 160,
      height: 200,
      src: this.activeLocation.img,
    });

    const textX = posX + 180;

    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    // Название локации
    ctx.fillText(this.activeLocation.name, textX, posY + 25);
    // Описание локации
    drawMultilineText({
      ctx,
      maxWidth: 360,
      posX: textX,
      posY: posY + 50,
      text: this.activeLocation?.description || '',
      lineHeight: 20,
    });
    // Противники
    drawMultilineText({
      ctx,
      maxWidth: 360,
      posX: textX,
      posY: posY + 75,
      text: `Противники: ${this.activeLocation.enemies.map((enemy) => enemy.name).join(', ')}, ${
        this.activeLocation.enemyBoss.name
      }`,
      lineHeight: 20,
    });

    ctx.fillText(`Количество: ${this.activeLocation.enemysCount}`, textX, posY + 180);
    ctx.fillText(
      `Макс ур противников: ${this.activeLocation.enemies.reduce((acc, { lvl }) => (acc > lvl ? acc : lvl), 0)}`,
      textX,
      posY + 205,
    );
    ctx.fillText(`Награда: ${this.activeLocation.reward}`, textX, posY + 230);

    const raidButton = this.buttonManager.getButtonByName('raid') as TButton;

    ctx.strokeStyle = StyleColors.colorNeonPink;
    ctx.lineWidth = 1;
    ctx.strokeRect(raidButton.x, raidButton.y, raidButton.width, raidButton.height);

    ctx.fillStyle = StyleColors.colorNeonPink;
    ctx.fillText('Рейд', raidButton.x + 30, raidButton.y + 20);
  }

  private drawButtons(ctx: CanvasRenderingContext2D) {
    const nextButton = this.buttonManager.getButtonByName('next') as TButton;
    const backButton = this.buttonManager.getButtonByName('back') as TButton;

    ctx.strokeStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;

    ctx.strokeRect(nextButton.x, nextButton.y, nextButton.width, nextButton.height);
    ctx.strokeRect(backButton.x, backButton.y, backButton.width, backButton.height);

    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText('< назад', backButton.x + 10, backButton.y + 25);
    ctx.fillText('вперёд >', nextButton.x + 10, nextButton.y + 25);
  }

  override onEnter(): void {
    const { battleLocation } = PlayerManager.getInstance().playerState;

    if (battleLocation) {
      this.activeLocation = battleLocation;
    }
  }

  override handleClick(x: number, y: number): void {
    const buttonName = this.buttonManager.getButtonName(x, y);

    if (!buttonName) {
      return;
    }

    const currentLocationIndex = this.locationNames.indexOf(this.activeLocation.key);

    if (buttonName === 'back') {
      if (currentLocationIndex > 0) {
        const activeLocationName = this.locationNames[currentLocationIndex - 1];
        this.activeLocation = LOCATIONS[activeLocationName];
      }
    }

    if (buttonName === 'next') {
      if (currentLocationIndex < this.locationNames.length - 1) {
        const activeLocationName = this.locationNames[currentLocationIndex + 1];
        this.activeLocation = LOCATIONS[activeLocationName];
      }
    }

    if (buttonName === 'raid') {
      if (this.changePage) {
        PlayerManager.getInstance().setBattleLocation(this.activeLocation);
        this.changePage(EGamePage.battle);
      }
    }
  }
}
