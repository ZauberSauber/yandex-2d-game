import { ENEMIES } from './enemies';
import { ITEMS } from './items';
import type { ELocation, TLocation } from '../types';

export const LOCATIONS: Record<ELocation, TLocation> = {
  megaplexDumps: {
    name: 'Свалки Мегаполиса',
    enemies: [ENEMIES.scavScum, ENEMIES.gibberingHorde, ENEMIES.scrapjackers],
    enemyBoss: ENEMIES.ratKing,
    enemysCount: 10,
    resources: [ITEMS.rustyIron],
    bounty: 'Мусорный криптор',
  },
  gutterStreets: {
    name: 'Улицы Отбросов',
    enemies: [ENEMIES.gutterPunk, ENEMIES.shadyBackAlleyDealer, ENEMIES.roadRashRider],
    enemyBoss: ENEMIES.gangLeaderSledgehammer,
    enemysCount: 10,
    resources: [ITEMS.waterPipes],
    bounty: 'Уличный криптор',
  },
  neonDistricts: {
    name: 'Районы Световой Рекламы',
    enemies: [ENEMIES.rentaCop, ENEMIES.adDroneAggressor, ENEMIES.mallMaulers],
    enemyBoss: ENEMIES.securityAiSphinx,
    enemysCount: 10,
    resources: [ITEMS.cheapPolymerPlastic],
    bounty: 'Световой криптор',
  },
  undergroundTechBars: {
    name: 'Подпольные Техно-Бары',
    enemies: [ENEMIES.undergroundBrawler, ENEMIES.ghostInTheSystem, ENEMIES.graftedBrute],
    enemyBoss: ENEMIES.legendaryMechanic,
    enemysCount: 10,
    resources: [ITEMS.aluminumAlloys],
    bounty: 'Техно-Барный криптор',
  },
  corporateWarehouses: {
    name: 'Корпоративные Склады',
    enemies: [
      ENEMIES.corporateSecurityOfficer,
      ENEMIES.surveillanceDroneVulture,
      ENEMIES.combatCustodianAndroid,
    ],
    enemyBoss: ENEMIES.assaultLeaderGreyHornet,
    enemysCount: 10,
    resources: [ITEMS.specialPolymers],
    bounty: 'Складской криптор',
  },
  specOpsBarracks: {
    name: 'Казармы Спецподразделений',
    enemies: [ENEMIES.specOpsTrooper, ENEMIES.phantomSniper, ENEMIES.combatEngineer],
    enemyBoss: ENEMIES.squadCommanderValkyrie,
    enemysCount: 10,
    resources: [ITEMS.carbonFiber],
    bounty: 'Спец криптор',
  },
  corporateBlackBagDumps: {
    name: 'Засекреченные Мусоропроводы',
    enemies: [
      ENEMIES.corperateResearcherGoneMad,
      ENEMIES.unstableSecurityDronePrototype,
      ENEMIES.bioEngineeredHorror,
    ],
    enemyBoss: ENEMIES.leadScientistCuratorDrArkadyVolf,
    enemysCount: 10,
    resources: [ITEMS.metamaterials],
    bounty: 'Складской криптор',
  },
  digitizedWorkshops: {
    name: 'Оцифрованные Мастерские Легенд',
    enemies: [ENEMIES.elitePrivateGuards, ENEMIES.smartHomeSystem, ENEMIES.automatedCombatButler],
    enemyBoss: ENEMIES.legendaryArtisan,
    enemysCount: 10,
    resources: [ITEMS.polishedMacrame],
    bounty: 'Мастерский криптор',
  },
  corporateSpireCores: {
    name: 'Центральные Ядра Корпоративных Башен',
    enemies: [ENEMIES.eliteCyberGuard, ENEMIES.realitySuppressor, ENEMIES.aiAspect],
    enemyBoss: ENEMIES.directorOfNewTechnologies,
    enemysCount: 10,
    resources: [ITEMS.nanocarbonTubes],
    bounty: 'Ядерный криптор',
  },
  netsDeadZones: {
    name: 'Мертвые Зоны Сети',
    enemies: [
      ENEMIES.shardsOfLostMinds,
      ENEMIES.thresholdGuardian,
      ENEMIES.echoOfTheFirstAI,
    ],
    enemyBoss: ENEMIES.abyss,
    enemysCount: 10,
    resources: [ITEMS.unidentifiedCrystallineStructures],
    bounty: 'Мертвый криптор',
  }
};
