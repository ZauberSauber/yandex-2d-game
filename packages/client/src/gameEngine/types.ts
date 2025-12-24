import type { ARMORS } from './constants/armors';
import type { ITEMS } from './constants/items';
import type { MEDKITS } from './constants/medkits';
import type { WEAPONS } from './constants/weapons';
import type PageManager from './PageManager';

export enum ESkillName {
  production = 'production',
  accuracy = 'accuracy',
  defense = 'defense',
  power = 'power',
}

export type TSkill = {
  name: string;
  lvl: number;
  maxLvl: number;
  exp: number;
  isActive: boolean;
  img: string;
};

export type TSkills = {
  [skill in ESkillName]: TSkill;
};

export interface IExpMathConfig {
  multiplier: number;
  pow: number;
  sum: number;
}

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

export type TActivity = {
  startTime: number;
  duration: number;
  isComplete: boolean;
  isRunning: boolean;
  progress: number;
  onComplete?: () => void;
};

export interface IPerson extends Omit<TSetupBattleProps, 'playerHP' | 'maxPlayerHP'> {
  name: string;
  accuracy: number;
  defense: number;
  power: number;
  health: number;
}

export interface IPlayerStats {
  playerHP: number;
  maxPlayerHP: number;
  healthRegenInterval: number;
  healthRegenValue: number;
  minAttack: number;
  maxAttack: number;
  attackSpeed: number;
  criticalHitChance: number;
  damageMultiplier: number;
}

export type TSetupBattleProps = Pick<
  IPlayerStats,
  | 'playerHP'
  | 'maxPlayerHP'
  | 'minAttack'
  | 'maxAttack'
  | 'attackSpeed'
  | 'criticalHitChance'
  | 'damageMultiplier'
>;

export interface IPlayerState extends IPlayerStats {
  inventory: TInventory;
  skills: TSkills;
  battleLocation: TLocation | null;
}

type TBattleProps = {
  maxHealth: number;
  cooldown: number;
};

export type TPlayer = IPerson;

export type TBattlePlayer = TPlayer & TBattleProps;

export type TEnemy = Omit<IPerson, 'damageMultiplier' | 'criticalHitChance'> & {
  name: string;
  exp: number;
  description?: string;
  iconSrc?: string;
  lvl: number;
  damageMultiplier?: number;
};

export type TBattleEnemy = TEnemy & TBattleProps;

export type TBattle = {
  state: 'idle' | 'battle' | 'victory';
  enemy: TBattleEnemy | null;
  player: TBattlePlayer;
  enemyDefeated: number;
  activeSkill: ESkillName;
  exp: number;
};

export type TInvetoryItemName =
  | keyof typeof ITEMS
  | keyof typeof WEAPONS
  | keyof typeof MEDKITS
  | keyof typeof ARMORS;

export type TInventoryItemValue = {
  count: number;
  type: 'resource' | 'weapon' | 'armor' | 'medkit';
};

export type TInventory = Map<TInvetoryItemName, TInventoryItemValue>;

export enum EEnemy {
  scavScum = 'scavScum',
  gibberingHorde = 'gibberingHorde',
  scrapjackers = 'scrapjackers',
  ratKing = 'ratKing',
  //
  gutterPunk = 'gutterPunk',
  shadyBackAlleyDealer = 'shadyBackAlleyDealer',
  roadRashRider = 'roadRashRider',
  gangLeaderSledgehammer = 'gangLeaderSledgehammer',
  //
  rentaCop = 'rentaCop',
  adDroneAggressor = 'adDroneAggressor',
  mallMaulers = 'mallMaulers',
  securityAiSphinx = 'securityAiSphinx',
  //
  undergroundBrawler = 'undergroundBrawler',
  ghostInTheSystem = 'ghostInTheSystem',
  graftedBrute = 'graftedBrute',
  legendaryMechanic = 'legendaryMechanic',
  //
  corporateSecurityOfficer = 'corporateSecurityOfficer',
  surveillanceDroneVulture = 'surveillanceDroneVulture',
  combatCustodianAndroid = 'combatCustodianAndroid',
  assaultLeaderGreyHornet = 'assaultLeaderGreyHornet',
  //
  specOpsTrooper = 'specOpsTrooper',
  phantomSniper = 'phantomSniper',
  combatEngineer = 'combatEngineer',
  squadCommanderValkyrie = 'squadCommanderValkyrie',
  //
  corperateResearcherGoneMad = 'corperateResearcherGoneMad',
  unstableSecurityDronePrototype = 'unstableSecurityDronePrototype',
  bioEngineeredHorror = 'bioEngineeredHorror',
  leadScientistCuratorDrArkadyVolf = 'leadScientistCuratorDrArkadyVolf',
  //
  elitePrivateGuards = 'elitePrivateGuards',
  smartHomeSystem = 'smartHomeSystem',
  automatedCombatButler = 'automatedCombatButler',
  legendaryArtisan = 'legendaryArtisan',
  //
  eliteCyberGuard = 'eliteCyberGuard',
  realitySuppressor = 'realitySuppressor',
  aiAspect = 'aiAspect',
  directorOfNewTechnologies = 'directorOfNewTechnologies',
  //
  shardsOfLostMinds = 'shardsOfLostMinds',
  thresholdGuardian = 'thresholdGuardian',
  echoOfTheFirstAI = 'echoOfTheFirstAI',
  abyss = 'abyss',
}

export enum ELocation {
  megaplexDumps = 'megaplexDumps',
  gutterStreets = 'gutterStreets',
  neonDistricts = 'neonDistricts',
  undergroundTechBars = 'undergroundTechBars',
  corporateWarehouses = 'corporateWarehouses',
  specOpsBarracks = 'specOpsBarracks',
  corporateBlackBagDumps = 'corporateBlackBagDumps',
  digitizedWorkshops = 'digitizedWorkshops',
  corporateSpireCores = 'corporateSpireCores',
  netsDeadZones = 'netsDeadZones',
}

export type TItem = { name: string };

export type TLocation = {
  key: ELocation;
  name: string;
  enemies: TEnemy[];
  enemyBoss: TEnemy;
  enemysCount: number;
  resources: TInvetoryItemName[];
  reward: string;
  description?: string;
  achievementText?: string;
  isComplete?: boolean;
  img?: string;
};

export type TButton<T = string> = {
  x: number;
  y: number;
  width: number;
  height: number;
  name: T;
};
