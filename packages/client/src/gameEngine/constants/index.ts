import type { TGamePage } from '../types';

export const MAIN_FONT = '16px Rajdhani, sans-serif';

export const TARGET_FPS = 30;
export const FRAME_INTERVAL = 1000 / TARGET_FPS;

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
