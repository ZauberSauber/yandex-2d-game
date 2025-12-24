import { message } from 'antd';

import ActivityManager from './ActivityManager';
import Battle from './Battle';
import { INVENTORY_ITEMS, MESSAGE_DURATION } from './constants';
import { SKILLS } from './mock/skills';
import { ESkillName } from './types';
import { getExpToNextLvl } from './utils/getExpToNextLvl';
import type {
  IPlayerState,
  TBattle,
  TInventory,
  TInventoryItemValue,
  TInvetoryItemName,
  TLocation,
} from './types';

export default class PlayerManager {
  private static _instance: PlayerManager | null = null;

  private activityManager;

  private inventory: Map<TInvetoryItemName, TInventoryItemValue> = new Map([
    ['rustyIron', { count: 10, type: 'resource' }],
  ]);

  private playerHP = 75;

  private maxPlayerHP = 100;

  private healthRegenInterval = 30_000;

  private healthRegenValue = 1;

  private minAttack = 2;

  private maxAttack = 10;

  private damageMultiplier = 1;

  private criticalHitChance = 0.05;

  private attackSpeed = 1000;

  private skills = SKILLS;

  private activeSkillName: ESkillName = ESkillName.accuracy;

  private battleLocation: TLocation | null = null;

  private battle: Battle | null = null;

  constructor(initStats?: IPlayerState) {
    if (PlayerManager._instance) {
      return PlayerManager._instance;
    }

    this.activityManager = ActivityManager.getInstance();

    if (initStats) this.setInitPlayerState(initStats);

    this.startRegenHealth();

    PlayerManager._instance = this;
  }

  static getInstance(): PlayerManager {
    if (!PlayerManager._instance) {
      throw new Error('Инстанс PlayerManager не создан!');
    }

    return PlayerManager._instance;
  }

  update(): void {
    if (this.battle) {
      this.battle.update(
        this.playerHP,
        this.skills.accuracy.lvl,
        this.skills.defense.lvl,
        this.skills.power.lvl,
        this.activeSkillName
      );

      const battleState = this.battle.getBattleState();

      if (battleState.state === 'battle') {
        this.playerHP = battleState.player.health;
      }
    }
  }

  getHP(): number {
    return this.playerHP;
  }

  heal(healPower: number): void {
    this.playerHP = Math.min(this.playerHP + healPower, this.maxPlayerHP);
  }

  setActiveSkill(skillName: ESkillName): void {
    this.activeSkillName = skillName;
  }

  addSkillExp(exp: number, skillName?: ESkillName): void {
    if (exp === 0) {
      return;
    }

    const skill = this.skills[skillName || this.activeSkillName];

    message.info(`Умение ${skill.name} получает ${exp} опыта`, MESSAGE_DURATION);

    skill.exp += exp;

    while (true) {
      const { expToNextLvl } = getExpToNextLvl({ lvl: skill.lvl, currentExp: skill.exp });

      if (skill.exp < expToNextLvl) {
        break;
      }

      skill.lvl += 1;
      skill.exp -= expToNextLvl;
    }

    this.skills.accuracy.lvl = SKILLS.accuracy.lvl;
    this.skills.defense.lvl = SKILLS.defense.lvl;
    this.skills.power.lvl = SKILLS.power.lvl;
    this.skills.production.lvl = SKILLS.production.lvl;
  }

  get playerState(): IPlayerState {
    return {
      skills: {
        power: this.skills.power,
        defense: this.skills.defense,
        accuracy: this.skills.accuracy,
        production: this.skills.production,
      },
      inventory: this.inventory,
      playerHP: this.playerHP,
      maxPlayerHP: this.maxPlayerHP,
      healthRegenInterval: this.healthRegenInterval,
      healthRegenValue: this.healthRegenValue,
      minAttack: this.minAttack,
      maxAttack: this.maxAttack,
      attackSpeed: this.attackSpeed,
      battleLocation: this.battleLocation,
      criticalHitChance: this.criticalHitChance,
      damageMultiplier: this.damageMultiplier,
    };
  }

  private setInitPlayerState(initStats: IPlayerState): void {
    this.skills = {
      accuracy: initStats.skills.accuracy,
      defense: initStats.skills.defense,
      power: initStats.skills.power,
      production: initStats.skills.production,
    };
    this.inventory = new Map([]);
    this.playerHP = initStats.playerHP;
    this.maxPlayerHP = initStats.maxPlayerHP;
    this.healthRegenInterval = initStats.healthRegenInterval;
    this.healthRegenValue = initStats.healthRegenValue;
    this.minAttack = initStats.minAttack;
    this.maxAttack = initStats.maxAttack;
    this.attackSpeed = initStats.attackSpeed;
    this.battleLocation = initStats.battleLocation;
    this.criticalHitChance = initStats.criticalHitChance;
    this.damageMultiplier = initStats.damageMultiplier;
  }

  private setInventoryItem(
    itemName: TInvetoryItemName,
    { count, type }: TInventoryItemValue
  ): void {
    const totalCount = (this.inventory.get(itemName)?.count || 0) + count;

    if (totalCount > 0) {
      this.inventory.set(itemName, { count: totalCount, type });

      if (count > 0) {
        message.info(`получено ${INVENTORY_ITEMS[itemName].name} ${count}шт`, MESSAGE_DURATION);
      }
    } else {
      this.inventory.delete(itemName);
    }
  }

  getInventory(): TInventory {
    return this.inventory;
  }

  setupBattle(): void {
    if (!this.battleLocation) return;

    this.battle = new Battle(
      this.battleLocation,
      this.activityManager as ActivityManager,
      this.addResources.bind(this),
      this.addSkillExp.bind(this)
    );

    this.battle.start({
      playerHP: this.playerHP,
      maxPlayerHP: this.maxPlayerHP,
      criticalHitChance: this.criticalHitChance,
      maxAttack: this.maxAttack,
      minAttack: this.minAttack,
      attackSpeed: this.attackSpeed,
      damageMultiplier: this.damageMultiplier,
    });
  }

  getBattleState(): TBattle {
    if (this.battle) {
      return this.battle.getBattleState();
    }

    return {
      state: 'idle',
      enemy: null,
      player: {
        accuracy: this.skills.accuracy.lvl,
        defense: this.skills.defense.lvl,
        power: this.skills.power.lvl,
        minAttack: this.minAttack,
        maxAttack: this.maxAttack,
        attackSpeed: this.attackSpeed,
        cooldown: 0,
        health: this.playerHP,
        maxHealth: this.maxPlayerHP,
        criticalHitChance: this.criticalHitChance,
        damageMultiplier: this.damageMultiplier,
        name: 'Player',
      },
      enemyDefeated: 0,
      activeSkill: ESkillName.accuracy,
      exp: 0,
    };
  }

  stopBattle(): void {
    if (this.battle) {
      this.battle.stop();
    }
  }

  setBattleLocation(location: TLocation): void {
    this.battleLocation = location;
  }

  public addResources(resources: { name: TInvetoryItemName; item: TInventoryItemValue }[]): void {
    resources.forEach(({ name, item }) => {
      this.setInventoryItem(name, { count: item.count, type: item.type });
    });
  }

  private onHealthRegen(): void {
    this.playerHP = Math.min(this.playerHP + this.healthRegenValue, this.maxPlayerHP);
    this.startRegenHealth();
  }

  private startRegenHealth(): void {
    this.activityManager?.startActivity(
      'healthRegen',
      this.healthRegenInterval,
      this.onHealthRegen.bind(this)
    );
  }
}
