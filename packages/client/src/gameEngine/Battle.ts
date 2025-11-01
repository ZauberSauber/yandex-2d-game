import { ESkillName } from './types';
import type ActivityManager from './ActivityManager';
import type { EItem, TBattle, TBattleEnemy, TBattlePlayer, TEnemy, TLocation } from './types';

const BATTLE_ACTIVITIES = {
  searchEnemy: 'searchEnemy',
  playerAttack: 'playerAttack',
  enemyAttack: 'enemyAttack',
};

export default class Battle {
  private activityManager;

  private searchTime = 2_000;

  // коэффицент шанса попадания, чем больше, тем меньше шанс попадания
  private hitChanceK = 0.3;

  // коэффицент снижения урона, чем больше, тем меньше урон
  private damageK = 1.5;

  private critChance = 0.05;

  private critMultiplier = 1.25;

  private battle: TBattle;

  private battleLocation: TLocation;

  private enemyDefeated = 0;

  private addResources;

  private addSkillExp;

  constructor(
    battleLocation: TLocation,
    activityManager: ActivityManager,
    addResources: (resources: { name: EItem; count: number }[]) => void,
    addSkillExp: (exp: number) => void
  ) {
    this.battleLocation = battleLocation;
    this.activityManager = activityManager;

    this.addResources = addResources;
    this.addSkillExp = addSkillExp;

    // стартовые значения, переопределяются при запуске битвы
    this.battle = {
      state: 'idle',
      enemy: null,
      player: {
        attackSpeed: 1000,
        cooldown: 0,
        health: 0,
        maxHealth: 0,
        name: 'Player',
        accuracy: 1,
        defense: 1,
        power: 1,
        minAttack: 1,
        maxAttack: 10,
      },
      enemyDefeated: this.enemyDefeated,
      activeSkill: ESkillName.accuracy,
      exp: 0,
    };
  }

  update(
    playerHP: number,
    accuracy: number,
    defense: number,
    power: number,
    activeSkill: ESkillName
  ): void {
    if (this.battle.state === 'battle') {
      this.battle.player = {
        ...this.battle.player,
        accuracy,
        defense,
        power,
      };
      this.battle.activeSkill = activeSkill;

      this.calculateBattle(playerHP);
    } else {
      this.battle.exp = 0;
    }
  }

  start(playerHP: number, maxPlayerHP: number): void {
    this.battle.state = 'idle';
    this.battle.player.health = playerHP;
    this.battle.player.maxHealth = maxPlayerHP;

    this.searchEnemy();
  }

  getBattleState(): TBattle {
    return this.battle;
  }

  stop(): void {
    this.battle.state = 'idle';
    Object.values(BATTLE_ACTIVITIES).forEach((activityName) => {
      this.activityManager.stopActivity(activityName);
    });
  }

  private calculateBattle(playerHP: number) {
    if (!this.battle.enemy) {
      return;
    }

    const { cooldown: playerCooldown, attack: playerAttack } = this.getAttack('player');
    const { cooldown: enemyCooldown, attack: enemyAttack } = this.getAttack('enemy');

    const newPlayerHP = Math.max(playerHP - enemyAttack, 0);
    const enemyHP = Math.max(this.battle.enemy.health - playerAttack, 0);

    if (enemyHP <= 0 && this.battle.state !== 'idle') {
      this.battle.state = 'idle';
      this.enemyDefeated += 1;
      this.addSkillExp(this.battle.enemy.exp);

      if (this.enemyDefeated >= this.battleLocation.enemysCount) {
        this.addResources([{ name: this.battleLocation.resources[0], count: 5 }]);
        this.stop();
        this.battle.state = 'victory';
      } else {
        this.addResources([{ name: this.battleLocation.resources[0], count: 1 }]);
        this.searchEnemy();
      }
    }

    this.battle = {
      ...this.battle,
      player: {
        ...this.battle.player,
        health: newPlayerHP,
        cooldown: playerCooldown,
      },
      enemy: {
        ...this.battle.enemy,
        health: enemyHP,
        cooldown: enemyCooldown,
      },
      enemyDefeated: this.enemyDefeated,
    };
  }

  private getAttack(person: 'enemy' | 'player'): {
    cooldown: number;
    attack: number;
  } {
    const timeName =
      person === 'player' ? BATTLE_ACTIVITIES.playerAttack : BATTLE_ACTIVITIES.enemyAttack;
    const time =
      person === 'player' ? this.battle.player.attackSpeed : this.battle.enemy?.attackSpeed || 0;
    const activityState = this.activityManager.getActivityState(timeName);

    if (!activityState) {
      this.activityManager.startActivity(timeName, time);
    }

    let finalDamage = 0;

    if (activityState?.isComplete) {
      const attacker =
        person === 'player'
          ? (this.battle.player as TBattlePlayer)
          : (this.battle.enemy as TBattleEnemy);
      const defender =
        person === 'player'
          ? (this.battle.enemy as TBattleEnemy)
          : (this.battle.player as TBattlePlayer);

      const hitChance =
        attacker?.accuracy / (attacker?.accuracy + defender?.defense * this.hitChanceK);
      const currentChance = Math.random();

      if (currentChance <= hitChance) {
        const damageMultiplier =
          attacker?.power / (attacker?.power + defender?.defense * this.damageK);
        const potentialDamage =
          Math.random() * (attacker?.maxAttack - attacker?.minAttack) + attacker?.minAttack;
        const isCritical = Math.random() < this.critChance;

        finalDamage = Math.floor(
          potentialDamage * damageMultiplier * (isCritical ? this.critMultiplier : 1)
        );
      }

      this.activityManager.stopActivity(timeName);
    }

    return {
      cooldown: activityState?.progress || 0,
      attack: finalDamage,
    };
  }

  private searchEnemy(): void {
    this.activityManager.startActivity(BATTLE_ACTIVITIES.searchEnemy, this.searchTime, () => {
      const enemy = this.getEnemy();

      this.battle.enemy = {
        accuracy: enemy?.accuracy || 1,
        defense: enemy?.defense || 1,
        power: enemy?.power || 1,
        attackSpeed: enemy?.attackSpeed || 0,
        minAttack: enemy?.minAttack || 1,
        maxAttack: enemy?.maxAttack || 10,
        cooldown: 0,
        exp: enemy?.exp || 0,
        health: enemy?.health || 100,
        maxHealth: enemy?.health || 100,
        name: enemy?.name || 'Enemy',
        description: enemy?.description || '',
      };

      this.activityManager.stopActivity(BATTLE_ACTIVITIES.searchEnemy);
      this.battle.state = 'battle';
    });
  }

  private getEnemy(): TEnemy | null {
    if (!this.battleLocation) {
      return null;
    }

    const location = this.battleLocation;

    // Если побеждено достаточно врагов, возвращаем босса
    if (this.enemyDefeated >= location.enemysCount - 1) {
      return { ...location.enemyBoss };
    }

    const randomIndex = Math.floor(Math.random() * location.enemies.length);
    return { ...location.enemies[randomIndex] };
  }
}
