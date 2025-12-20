import type { IPlayerState, TSkills } from '@src/gameEngine/types';

import { LOCATIONS } from '@src/gameEngine/constants/locations';
import { ELocation } from '@src/gameEngine/types';

/** Моковые данные для выбранной миссии */
const SKILLS: TSkills = {
  accuracy: {
    name: 'Точность',
    lvl: 1,
    maxLvl: 100,
    exp: 10,
    isActive: false,
    img: 'img/hud/accuracy.png',
  },
  defense: {
    name: 'Защита',
    lvl: 1,
    maxLvl: 100,
    exp: 10,
    isActive: false,
    img: 'img/hud/defense.png',
  },
  power: {
    name: 'Сила',
    lvl: 2,
    maxLvl: 100,
    exp: 25,
    isActive: false,
    img: 'img/hud/strength.png',
  },
  production: {
    name: 'Производство',
    lvl: 2,
    maxLvl: 10,
    exp: 50,
    isActive: false,
    img: 'img/hud/health.png',
  },
};

export const PLAYER_INFO: IPlayerState = {
  inventory: new Map([]),
  playerHP: 120,
  maxPlayerHP: 120,
  healthRegenInterval: 30_000,
  healthRegenValue: 1, // Для проверки перехода на экран завершения можно указать отрицательно значение
  minAttack: 10,
  maxAttack: 15,
  criticalHitChance: 0.1,
  attackSpeed: 1000,
  skills: SKILLS,
  battleLocation: LOCATIONS[ELocation.gutterStreets],
  damageMultiplier: 1.1,
};
