import ActivityManager from './ActivityManager';
import Battle from './Battle';
import { SKILLS } from './mock/skills';
import { ESkillName } from './types';
import type { EItem, TBattle, TLocation } from './types';

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

  private attackSpeed = 1000;

  private accuracy = 1;

  private defense = 1;

  private power = 1;

  private activeSkill: ESkillName = ESkillName.accuracy;

  private battleLocation: TLocation | null = null;

  private battle: Battle | null = null;

  constructor() {
    if (PlayerManager._instance) {
      return PlayerManager._instance;
    }

    this.activityManager = ActivityManager.getInstance();

    this.accuracy = SKILLS.accuracy.lvl;
    this.defense = SKILLS.defense.lvl;
    this.power = SKILLS.power.lvl;

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
      this.battle.update(this.playerHP, this.accuracy, this.defense, this.power, this.activeSkill);

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

    const skill = SKILLS[this.activeSkill];

    skill.exp += exp;

    while (true) {
      // Опыт_для_уровня = A * (Уровень ^ B) + C; A=50, B=2, C=100
      const expToNextLevel = 50 * Math.pow(skill.lvl, 2) + 100;

      if (skill.exp < expToNextLevel) {
        break;
      }

      skill.lvl += 1;
      skill.exp -= expToNextLevel;
    }

    this.accuracy = SKILLS.accuracy.lvl;
    this.defense = SKILLS.defense.lvl;
    this.power = SKILLS.power.lvl;
  }

  getPlayerState(): { health: number; accuracy: number; defense: number; power: number } {
    return {
      accuracy: this.accuracy,
      defense: this.defense,
      power: this.power,
      health: this.playerHP,
    };
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
    this.battle.start(this.playerHP, this.maxPlayerHP);
  }

  getBattleState(): TBattle {
    if (this.battle) {
      return this.battle.getBattleState();
    }

    return {
      state: 'idle',
      enemy: null,
      player: {
        accuracy: this.accuracy,
        defense: this.defense,
        power: this.power,
        minAttack: this.minAttack,
        maxAttack: this.maxAttack,
        attackSpeed: this.attackSpeed,
        cooldown: 0,
        health: this.playerHP,
        maxHealth: this.maxPlayerHP,
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
