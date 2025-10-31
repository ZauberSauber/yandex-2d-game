import { EItem   } from '../types';
import { ENEMIES } from './enemies';
import type {ELocation, TLocation} from '../types';

export const LOCATIONS: Record<ELocation, TLocation> = {
  megaplexDumps: {
    name: 'Свалки Мегаполиса',
    enemies: [ENEMIES.scavScum, ENEMIES.gibberingHorde, ENEMIES.scrapjackers],
    enemyBoss: ENEMIES.ratKing,
    enemysCount: 10,
    resources: [EItem.rustyIron],
    reward: 'Мусорный криптор',
  },
  gutterStreets: {
    name: 'Улицы Отбросов',
    enemies: [ENEMIES.gutterPunk, ENEMIES.shadyBackAlleyDealer, ENEMIES.roadRashRider],
    enemyBoss: ENEMIES.gangLeaderSledgehammer,
    enemysCount: 10,
    resources: [EItem.waterPipes],
    reward: 'Уличный криптор',
  },
  neonDistricts: {
    name: 'Районы Световой Рекламы',
    enemies: [ENEMIES.rentaCop, ENEMIES.adDroneAggressor, ENEMIES.mallMaulers],
    enemyBoss: ENEMIES.securityAiSphinx,
    enemysCount: 10,
    resources: [EItem.cheapPolymerPlastic],
    reward: 'Световой криптор',
  },
  undergroundTechBars: {
    name: 'Подпольные Техно-Бары',
    enemies: [ENEMIES.undergroundBrawler, ENEMIES.ghostInTheSystem, ENEMIES.graftedBrute],
    enemyBoss: ENEMIES.legendaryMechanic,
    enemysCount: 10,
    resources: [EItem.aluminumAlloys],
    reward: 'Техно-Барный криптор',
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
    resources: [EItem.specialPolymers],
    reward: 'Складской криптор',
  },
  specOpsBarracks: {
    name: 'Казармы Спецподразделений',
    enemies: [ENEMIES.specOpsTrooper, ENEMIES.phantomSniper, ENEMIES.combatEngineer],
    enemyBoss: ENEMIES.squadCommanderValkyrie,
    enemysCount: 10,
    resources: [EItem.carbonFiber],
    reward: 'Спец криптор',
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
    resources: [EItem.metamaterials],
    reward: 'Складской криптор',
  },
  digitizedWorkshops: {
    name: 'Оцифрованные Мастерские Легенд',
    enemies: [ENEMIES.elitePrivateGuards, ENEMIES.smartHomeSystem, ENEMIES.automatedCombatButler],
    enemyBoss: ENEMIES.legendaryArtisan,
    enemysCount: 10,
    resources: [EItem.polishedMacrame],
    reward: 'Мастерский криптор',
  },
  corporateSpireCores: {
    name: 'Центральные Ядра Корпоративных Башен',
    enemies: [ENEMIES.eliteCyberGuard, ENEMIES.realitySuppressor, ENEMIES.aiAspect],
    enemyBoss: ENEMIES.directorOfNewTechnologies,
    enemysCount: 10,
    resources: [EItem.nanocarbonTubes],
    reward: 'Ядерный криптор',
  },
  netsDeadZones: {
    name: 'Мертвые Зоны Сети',
    enemies: [ENEMIES.shardsOfLostMinds, ENEMIES.thresholdGuardian, ENEMIES.echoOfTheFirstAI],
    enemyBoss: ENEMIES.abyss,
    enemysCount: 10,
    resources: [EItem.unidentifiedCrystallineStructures],
    reward: 'Мертвый криптор',
  },
};
