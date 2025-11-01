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
  exp: number;
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

export type TActivity = {
  startTime: number;
  duration: number;
  isComplete: boolean;
  progress: number;
  onComplete?: () => void;
};

export type TPerson = {
  name: string;
  accuracy: number;
  defense: number;
  power: number;
  health: number;
  minAttack: number;
  maxAttack: number;
  attackSpeed: number;
};

type TBattleProps = {
  maxHealth: number;
  cooldown: number;
};

export type TPlayer = TPerson;

export type TBattlePlayer = TPlayer & TBattleProps;

export type TEnemy = TPerson & {
  exp: number;
  description?: string;
  iconSrc?: string;
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

export enum EItem {
  rustyIron = 'rustyIron',
  scrapsOfAluminumCans = 'scrapsOfAluminumCans',
  copperWires = 'copperWires',
  oldPlasticHousings = 'oldPlasticHousings',
  tireRubber = 'tireRubber',
  //
  waterPipes = 'waterPipes',
  sheetSteel = 'sheetSteel',
  remeltedPlastic = 'remeltedPlastic',
  refurbishedElectronics = 'refurbishedElectronics',
  batteriesFromOldConsoles = 'batteriesFromOldConsoles',
  //
  cheapPolymerPlastic = 'cheapPolymerPlastic',
  lowGradeSteel = 'lowGradeSteel',
  silicone = 'silicone',
  standardPrintedCircuit = 'standardPrintedCircuit',
  fiberglass = 'fiberglass',
  //
  aluminumAlloys = 'aluminumAlloys',
  copperForHeatSinks = 'copperForHeatSinks',
  ceramicInserts = 'ceramicInserts',
  homemadeCarbonFibers = 'homemadeCarbonFibers',
  //
  specialPolymers = 'specialPolymers',
  stainlessSteel = 'stainlessSteel',
  lightweightAluminumAlloys = 'lightweightAluminumAlloys',
  standardizedHQPrintedCircuit = 'standardizedHQPrintedCircuit',
  //
  carbonFiber = 'carbonFiber',
  titaniumAlloys = 'titaniumAlloys',
  bulletproofGlass = 'bulletproofGlass',
  compositeCeramicTiles = 'compositeCeramicTiles',
  //
  metamaterials = 'metamaterials',
  shapeMemoryAlloys = 'shapeMemoryAlloys',
  organosyntheticFlesh = 'organosyntheticFlesh',
  superconductingElements = 'superconductingElements',
  liquidCrystals = 'liquidCrystals',
  //
  polishedMacrame = 'polishedMacrame',
  solidTitanium = 'solidTitanium',
  goldAndPlatinumForConductors = 'goldAndPlatinumForConductors',
  volcanicGlass = 'volcanicGlass',
  //
  nanocarbonTubes = 'nanocarbonTubes',
  transparentAluminum = 'transparentAluminum',
  programmableMatter = 'programmableMatter',
  quantumProcessors = 'quantumProcessors',
  //
  unidentifiedCrystallineStructures = 'unidentifiedCrystallineStructures',
  solidLightMatter = 'solidLightMatter',
  blackCeramics = 'blackCeramics',
  metalFromTheCoreOfADeadAi = 'metalFromTheCoreOfADeadAi',
  frozenData = 'frozenData',
}

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
  name: string;
  enemies: TEnemy[];
  enemyBoss: TEnemy;
  enemysCount: number;
  resources: EItem[];
  reward: string;
  description?: string;
};

export type TButton<T = string> = {
  x: number;
  y: number;
  width: number;
  height: number;
  name: T;
};
