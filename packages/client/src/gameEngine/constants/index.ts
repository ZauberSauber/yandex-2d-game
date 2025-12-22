import { ARMORS } from './armors';
import { ITEMS } from './items';
import { MEDKITS } from './medkits';
import { WEAPONS } from './weapons';
import type { TGamePage } from '../types';

export const HEAD_FONT = '32px Rajdhani, sans-serif';
export const MAIN_FONT = '16px Rajdhani, sans-serif';

export const TARGET_FPS = 30;
export const FRAME_INTERVAL = 1000 / TARGET_FPS;

export const MESSAGE_DURATION = 1;

export const SCALE = 1.5;

export const PAGE_X = 240;

export const GAME_PAGES: TGamePage = {
  character: {
    title: 'Персонаж',
  },
  skills: {
    title: 'Навыки',
  },
  inventory: {
    title: 'Инвентарь',
  },
  raids: {
    title: 'Рейды',
  },
  factory: {
    title: 'Производство',
  },
  battle: {
    title: 'Бой',
    isNotNav: true,
  },
};

export const CRAFT_BUTTTON_PREFIX = 'craft_';

export const INVENTORY_ITEMS = { ...ITEMS, ...WEAPONS, ...MEDKITS, ...ARMORS };
