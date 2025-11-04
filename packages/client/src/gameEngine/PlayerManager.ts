import ActivityManager from './ActivityManager';
import Battle from './Battle';
import { SKILLS } from './mock/skills';
import { ESkillName } from './types';
import { getExpToNextLvl } from './utils/expToNextLvl';
import type { EItem, IPlayerState, TBattle, TLocation } from './types';

export default class PlayerManager {
  private static _instance: PlayerManager | null = null;

  private activityManager;

  private inventory: Map<string, number> = new Map();

  private lastTimeStamps: Map<string, number> = new Map();

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

  private activeSkill: ESkillName = ESkillName.accuracy;

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

  update(currentTime: number): void {
    this.lastTimeStamps.set('update', currentTime);

    if (this.battle) {
      this.battle.update(
        this.playerHP,
        this.skills.accuracy.lvl,
        this.skills.defense.lvl,
        this.skills.power.lvl,
        this.activeSkill
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

  heal(): void {
    // todo: добавить лечение
  }

  setActiveSkill(skillName: ESkillName): void {
    this.activeSkill = skillName;
  }

  addSkillExp(exp: number): void {
    if (exp === 0) {
      return;
    }

    const skill = this.skills[this.activeSkill];

    skill.exp += exp;

    while (true) {
      const { expToNextLvl } = getExpToNextLvl(skill);

      if (skill.exp < expToNextLvl) {
        break;
      }

      skill.lvl += 1;
      skill.exp -= expToNextLvl;
    }

    this.skills.accuracy.lvl = SKILLS.accuracy.lvl;
    this.skills.defense.lvl = SKILLS.defense.lvl;
    this.skills.power.lvl = SKILLS.power.lvl;
  }

  get playerState(): IPlayerState {
    return {
      skills: {
        accuracy: this.skills.accuracy,
        defense: this.skills.defense,
        power: this.skills.power,
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
    this.inventory = new Map<string, number>([]);
    this.lastTimeStamps = new Map<string, number>([]);
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

  setInventoryItem(itemName: string, count: number): void {
    const itemCount = (this.inventory.get(itemName) || 0) + count;

    if (itemCount > 0) {
      this.inventory.set(itemName, itemCount);
    } else {
      this.inventory.delete(itemName);
    }
  }

  getInventory(): Map<string, number> {
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

  private addResources(resources: { name: EItem; count: number }[]): void {
    resources.forEach((resource) => {
      this.setInventoryItem(resource.name, resource.count);
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
