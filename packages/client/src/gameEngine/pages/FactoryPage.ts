import { message } from 'antd';

import { StyleColors } from '@src/styles/colors';

import AbstractGamePage from '../AbstractGamePage';
import ActivityManager from '../ActivityManager';
import { CRAFT_BUTTTON_PREFIX, MAIN_FONT } from '../constants';
import { ARMORS } from '../constants/armors';
import { ITEMS } from '../constants/items';
import { LOCATIONS } from '../constants/locations';
import { MEDKITS } from '../constants/medkits';
import { WEAPONS } from '../constants/weapons';
import PlayerManager from '../PlayerManager';
import { ESkillName } from '../types';
import { drawBar } from '../utils/drawBar';
import { drawImg } from '../utils/drawImg';
import { drawMultilineText } from '../utils/drawMultilineText';
import { drawPageTitle } from '../utils/drawPageTitle';
import { getExpToNextLvl } from '../utils/getExpToNextLvl';
import { getItemCraftTime } from '../utils/getItemCraftTime';
import { getItemExp } from '../utils/getItemExp';
import type { TButton, TInvetoryItemName } from '../types';

const convertToTabContent = (items: Record<string, Record<string, unknown>>) =>
  Object.entries(items).map((item) => ({ ...item[1], id: item[0] }));

export default class FactoryPage extends AbstractGamePage {
  private playerManager;

  private activityManager;

  private posX = 240;

  private posY = 60;

  private blockHeight = 120;

  private blockPosY = 320;

  private tabs = new Map();

  private activeTab;

  private currentCraftItem: {
    name: string;
    lvl: number;
    description: string;
    imageSrc: string;
    id: TInvetoryItemName;
  } | null = null;

  private assembleButtonName = 'assemble';

  private resKey: TInvetoryItemName = 'rustyIron';

  private resName = '';

  private needToAssemble = 0;

  private playerHasToAssemble = 0;

  constructor() {
    super();

    this.playerManager = PlayerManager.getInstance();
    this.activityManager = ActivityManager.getInstance();

    this.tabs.set('weapon', { name: 'Оружие', content: convertToTabContent(WEAPONS) });
    this.tabs.set('armor', { name: 'Броня', content: convertToTabContent(ARMORS) });
    this.tabs.set('medkit', { name: 'Аптечки', content: convertToTabContent(MEDKITS) });

    let i = 0;
    this.tabs.forEach((_, key) => {
      const button = {
        name: key,
        x: this.posX + 20 + 185 * i,
        y: this.blockPosY - 15,
        width: 100,
        height: 25,
      };
      this.buttonManager.addButton(button);

      i++;
    });

    const iconShift = 52;

    // Кнопки для выбора предметов
    for (let index = 0; index < 10; index++) {
      const button = {
        name: `${CRAFT_BUTTTON_PREFIX}${index}`,
        x: this.posX + 10 + index * iconShift,
        y: this.blockPosY + 20,
        width: 30,
        height: 30,
      };

      this.buttonManager.addButton(button);
    }

    // Кнопка "Сделать"
    this.buttonManager.addButton({
      name: this.assembleButtonName,
      x: this.posX,
      y: this.posY + 170,
      width: 90,
      height: 40,
    });

    this.activeTab = this.tabs.get('weapon');
    this.currentCraftItem = this.activeTab.content[0];
    this.setCraftRequirements();
  }

  private setCraftRequirements(): void {
    if (!this.currentCraftItem) {
      return;
    }

    this.resKey = Object.values(LOCATIONS)[this.currentCraftItem.lvl - 1].resources[0];
    this.resName = ITEMS[this.resKey as keyof typeof ITEMS]?.name || 'неизветсно';
    this.needToAssemble = this.currentCraftItem.lvl;
    this.playerHasToAssemble = this.playerManager.getInventory().get(this.resKey) || 0;
  }

  private craftItem(): void {
    if (!this.currentCraftItem) {
      return;
    }

    const itemId = this.currentCraftItem.id;
    const craftTime = getItemCraftTime(this.currentCraftItem.lvl);
    const exp = getItemExp(this.currentCraftItem.lvl);

    if (this.playerHasToAssemble < this.needToAssemble) {
      this.activityManager.stopActivity(this.assembleButtonName);
      message.error('Не достаточно ресурсов');
      return;
    }

    this.activityManager.startActivity(this.assembleButtonName, craftTime, () => {
      this.playerManager.addSkillExp(exp, ESkillName.production);
      this.playerManager.addResources([
        { name: this.resKey, count: -this.needToAssemble },
        { name: itemId, count: 1 },
      ]);
      this.setCraftRequirements();

      this.craftItem();
    });
  }

  private drawFactoryLvl(ctx: CanvasRenderingContext2D): void {
    const {
      skills: {
        production: { lvl, exp, maxLvl },
      },
    } = this.playerManager.playerState;
    const { expToNextLvl, expToPercentages } = getExpToNextLvl({ lvl, currentExp: exp });

    drawBar({
      ctx,
      posX: this.posX,
      posY: this.posY,
      width: 530,
      height: 5,
      value: expToPercentages,
      maxValue: 100,
    });

    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorDarkBg;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText(`Ур. ${lvl} / ${maxLvl}`, 240, this.posY + 25);
    ctx.textAlign = 'right';
    ctx.fillText(`опыт: ${exp} / ${expToNextLvl}`, 770, this.posY + 25);
  }

  private drawCraftItem(ctx: CanvasRenderingContext2D): void {
    const posX = this.posX;
    const posY = this.posY + 50;
    const craftItemName = this.currentCraftItem?.name || 'Выберите предмет';

    const assebleActivity = this.activityManager.getActivityState(this.assembleButtonName);
    const progress = assebleActivity?.progress || 0;

    // Полоска - прогресс изготовления предмета
    drawBar({
      ctx,
      posX,
      posY: posY,
      width: 530,
      height: 5,
      value: progress,
      maxValue: getItemCraftTime(this.currentCraftItem?.lvl || 1),
    });

    // Название предмета
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'left';
    ctx.fillText(craftItemName, posX + 100, posY + 35);

    // Описание предмета
    drawMultilineText({
      ctx,
      posX: posX + 100,
      posY: posY + 65,
      text: this.currentCraftItem?.description || '',
      maxWidth: 430,
      lineHeight: 20,
    });

    // Иконка предмета
    drawImg({
      ctx,
      posX: posX,
      posY: posY + 20,
      width: 90,
      height: 90,
      src: this.currentCraftItem?.imageSrc || 'img/suit.png',
    });

    // Кнопка "Сделать" - запускает производство, пока не кончатся ресурсы, повторное нажатие - остановка производства
    const assebleButton = this.buttonManager.getButtonByName(this.assembleButtonName) as TButton;
    const assebleButtonText = assebleActivity?.isRunning ? 'Собираю' : 'Сделать';

    ctx.strokeStyle = StyleColors.colorNeonPink;
    ctx.lineWidth = 1;
    ctx.strokeRect(assebleButton.x, assebleButton.y, assebleButton.width, assebleButton.height);

    ctx.fillStyle = StyleColors.colorNeonPink;
    ctx.fillText(assebleButtonText, assebleButton.x + 10, assebleButton.y + 25);
  }

  private drawBlock(ctx: CanvasRenderingContext2D): void {
    const posY = this.blockPosY;

    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.font = MAIN_FONT;
    ctx.textAlign = 'center';

    this.tabs.forEach((tab, key) => {
      if (tab.name === this.activeTab.name) {
        // Выбранная вкладка крафта
        ctx.fillStyle = StyleColors.colorNeonPink;
      } else {
        ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
      }

      const button = this.buttonManager.getButtonByName(key) as TButton;
      ctx.fillText(tab.name, button.x + button.width / 2, button.y + button.height / 2 + 5);
    });

    // Иконки предметов
    // TODO: если уровеь крафта < уровня предмета, то иконка будет залочена
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;

    for (let index = 0; index < this.activeTab.content.length; index++) {
      const button = this.buttonManager.getButtonByName(
        `${CRAFT_BUTTTON_PREFIX}${index}`
      ) as TButton;

      drawImg({
        ctx,
        posX: button.x,
        posY: button.y,
        width: button.width,
        height: button.height,
        src: this.activeTab.content[index].imageSrc,
      });

      if (index > 0) {
        ctx.fillText(`${index * 10} ур`, button.x + 15, button.y + 50);
      }
    }

    ctx.strokeStyle = this.isDarkTheme ? StyleColors.colorNeonBlue : StyleColors.colorNeonPurple;
    ctx.lineWidth = 1;
    ctx.strokeRect(this.posX, posY - 20, 530, this.blockHeight);
  }

  private drawItemCost(ctx: CanvasRenderingContext2D): void {
    if (!this.currentCraftItem) {
      return;
    }

    ctx.fillStyle = StyleColors.colorNeonBlue;
    ctx.textAlign = 'left';
    ctx.fillText(`Нужно: ${this.needToAssemble} ${this.resName}`, this.posX, 450);
    ctx.fillText(`У вас есть: ${this.playerHasToAssemble}`, this.posX, 470);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Фон
    ctx.fillStyle = this.isDarkTheme ? StyleColors.colorDarkBg : StyleColors.colorNeonBlue;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawPageTitle(ctx, this.isDarkTheme, 'Производство');

    this.drawFactoryLvl(ctx);
    this.drawCraftItem(ctx);
    this.drawBlock(ctx);
    this.drawItemCost(ctx);
  }

  override handleClick(x: number, y: number): void {
    const buttonName = this.buttonManager.getButtonName(x, y);

    if (!buttonName) {
      return;
    }

    if (this.tabs.has(buttonName)) {
      this.activeTab = this.tabs.get(buttonName);
    }

    if (buttonName.startsWith(CRAFT_BUTTTON_PREFIX)) {
      const activeItem = this.activeTab.content[+buttonName.split('_')[1]];

      this.currentCraftItem = activeItem;

      this.setCraftRequirements();
    }

    if (buttonName === this.assembleButtonName) {
      const craftLvl = this.playerManager.playerState.skills.production.lvl;
      const itemLvl = ((this.currentCraftItem?.lvl || 1) - 1) * 10;

      if (craftLvl < itemLvl) {
        message.error('Не достаточный уровень производства!');
        return;
      }

      if (this.activityManager.getActivityState(this.assembleButtonName)) {
        this.activityManager.stopActivity(this.assembleButtonName);
      } else {
        this.craftItem();
      }
    }
  }
}
