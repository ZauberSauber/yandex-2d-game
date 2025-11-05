import type { TSkills } from '../types';

export const SKILLS: TSkills = {
  accuracy: {
    name: 'Точность',
    lvl: 1,
    maxLvl: 100,
    exp: 0,
    isActive: false,
    img: 'public/img/hud/accuracy.png',
  },
  defense: {
    name: 'Защита',
    lvl: 1,
    maxLvl: 100,
    exp: 0,
    isActive: false,
    img: 'public/img/hud/defense.png',
  },
  power: {
    name: 'Сила',
    lvl: 1,
    maxLvl: 100,
    exp: 0,
    isActive: false,
    img: 'public/img/hud/strength.png',
  },
  production: {
    name: 'Производство',
    lvl: 1,
    maxLvl: 10,
    exp: 0,
    isActive: false,
    // изначально здесь было здоровье, картинку можно позже заменить
    img: 'public/img/hud/health.png',
  },
};
