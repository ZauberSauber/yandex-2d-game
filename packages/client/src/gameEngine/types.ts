import type PageManager from './PageManager';

export enum ESkillName {
  employmentWork = 'employmentWork',
  hacking = 'hacking',
  research = 'research',
  productTesting = 'productTesting',
  scavenging = 'scavenging',
  freelance = 'freelance',
  spy = 'spy',
  carTheft = 'carTheft',
  mercenary = 'mercenary',
  hostages = 'hostages',
  corporateRaids = 'corporateRaids',
}

export type TSkill = {
  name: string;
  lvl: number;
  expToLvl: number;
  exp: number;
  timeToGetExp: number;
  description: string;
  isActive: boolean;
};

export type TSkills = {
  [skill in ESkillName]: TSkill;
};

export type TRGB = {
  r: number;
  g: number;
  b: number;
};

export enum EGamePage {
  character = 'character',
  skills = 'skills',
  inventory = 'inventory',
  raids = 'raids',
  factory = 'factory',
  battle = 'battle',
}

export type TGamePage = {
  [page in EGamePage]: {
    title: string;
    isNotNav?: boolean;
  };
};

export type TPageManager = PageManager;
